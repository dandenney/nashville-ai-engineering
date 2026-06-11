import vm from 'node:vm';

const EVENTS_ARRAY_RE = /export const events: Event\[\] = (\[[\s\S]*?\n\]);/;

export function extractNextDataFromHtml(html) {
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );

  if (!match) {
    throw new Error('Could not find __NEXT_DATA__ payload in HTML');
  }

  return JSON.parse(match[1]);
}

function walk(value, visit) {
  visit(value);

  if (Array.isArray(value)) {
    for (const item of value) {
      walk(item, visit);
    }
    return;
  }

  if (value && typeof value === 'object') {
    for (const nested of Object.values(value)) {
      walk(nested, visit);
    }
  }
}

export function findMeetupEventUrls(nextData, groupUrlname) {
  const prefix = `https://www.meetup.com/${groupUrlname}/events/`;
  const found = new Map();

  walk(nextData, (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return;
    }

    if (typeof value.eventUrl !== 'string' || !value.eventUrl.startsWith(prefix)) {
      return;
    }

    const normalizedUrl = value.eventUrl.endsWith('/')
      ? value.eventUrl
      : `${value.eventUrl}/`;

    const sortKey = typeof value.dateTime === 'string' ? value.dateTime : '';

    if (!found.has(normalizedUrl) || sortKey < found.get(normalizedUrl)) {
      found.set(normalizedUrl, sortKey);
    }
  });

  return [...found.entries()]
    .sort((a, b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]))
    .map(([url]) => url);
}

export function findMeetupEventById(nextData, eventId) {
  let found = null;

  walk(nextData, (value) => {
    if (found || !value || typeof value !== 'object' || Array.isArray(value)) {
      return;
    }

    if (String(value.id) === String(eventId) && value.title && value.eventUrl) {
      found = value;
    }
  });

  if (!found) {
    throw new Error(`Could not find meetup event ${eventId}`);
  }

  return found;
}

function normalizeWhitespace(text) {
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function stripMarkdownInline(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1')
    .replace(/(?<!_)_([^_]+)_(?!_)/g, '$1');
}

function normalizeDescription(text) {
  const normalized = normalizeWhitespace(text);
  if (!normalized) {
    return normalized;
  }

  const lines = normalized.split('\n').map((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return '';
    }

    const bulletMatch = trimmed.match(/^(?:[*-])\s+(.*)$/);
    if (bulletMatch) {
      return `• ${stripMarkdownInline(bulletMatch[1]).trim()}`;
    }

    return stripMarkdownInline(trimmed);
  });

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function formatLocation(venue) {
  if (!venue || typeof venue !== 'object') {
    return undefined;
  }

  const parts = [venue.name, venue.address, venue.city, venue.state]
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean);

  return parts.length ? parts.join(', ') : undefined;
}

export function formatSiteEvent(meetupEvent, options = {}) {
  const siteEvent = {
    id: String(meetupEvent.id),
    title: String(meetupEvent.title ?? '').trim(),
    description: normalizeDescription(String(meetupEvent.description ?? '')),
    date: String(meetupEvent.dateTime ?? '').trim(),
    location: formatLocation(meetupEvent.venue),
    currentRSVPs: Number(meetupEvent.goingCount?.totalCount ?? 0),
    registrationUrl: String(meetupEvent.eventUrl ?? '').trim(),
    bgPath: options.bgPath ?? 'bg-vicuna-13b.webp',
  };

  return Object.fromEntries(
    Object.entries(siteEvent).filter(([, value]) => value !== undefined && value !== ''),
  );
}

function normalizeRegistrationUrl(url) {
  return String(url ?? '').replace(/\/+$/, '');
}

function sortByDateDesc(events) {
  return [...events].sort((a, b) => {
    const cmp = String(b.date).localeCompare(String(a.date));
    if (cmp !== 0) return cmp;
    return String(b.id).localeCompare(String(a.id));
  });
}

export function mergeEvents(existingEvents, incomingEvents, options = {}) {
  const now = options.now ? new Date(options.now) : null;
  const mergedById = new Map(existingEvents.map((event) => [String(event.id), { ...event }]));

  for (const incoming of incomingEvents) {
    const key = String(incoming.id);
    const incomingUrl = normalizeRegistrationUrl(incoming.registrationUrl);
    const existing =
      mergedById.get(key) ||
      (incomingUrl
        ? [...mergedById.values()].find(
            (event) =>
              normalizeRegistrationUrl(event.registrationUrl) === incomingUrl,
          )
        : null);

    if (existing) {
      mergedById.delete(String(existing.id));
      mergedById.set(String(incoming.id), {
        ...existing,
        ...incoming,
        id: String(incoming.id),
      });
      continue;
    }

    if (now && Number.isFinite(now.getTime())) {
      const incomingDate = new Date(incoming.date);
      if (Number.isFinite(incomingDate.getTime()) && incomingDate < now) {
        continue;
      }
    }

    mergedById.set(key, { ...incoming });
  }

  return sortByDateDesc([...mergedById.values()]);
}

export function parseEventsArrayFromSource(source) {
  const match = source.match(EVENTS_ARRAY_RE);
  if (!match) {
    throw new Error('Could not find events array declaration in source file');
  }

  return vm.runInNewContext(match[1]);
}

function serializeValue(value, indentLevel = 0) {
  const indent = '  '.repeat(indentLevel);
  const childIndent = '  '.repeat(indentLevel + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[` +
      `\n${value.map((item) => `${childIndent}${serializeValue(item, indentLevel + 1)}`).join(',\n')}` +
      `\n${indent}]`;
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';
    return `{
${entries
  .map(([key, entryValue]) => `${childIndent}${key}: ${serializeValue(entryValue, indentLevel + 1)}`)
  .join(',\n')}
${indent}}`;
  }

  if (typeof value === 'string') {
    return `'${value
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '\\n')}'`;
  }

  return String(value);
}

function serializeEventsArray(events) {
  return serializeValue(events);
}

export function replaceEventsArrayInSource(source, events) {
  if (!EVENTS_ARRAY_RE.test(source)) {
    throw new Error('Could not find events array declaration in source file');
  }

  const replacement = `export const events: Event[] = ${serializeEventsArray(events)};`;
  return source.replace(EVENTS_ARRAY_RE, replacement);
}

export function diffEvents(existingEvents, nextEvents) {
  const existingById = new Map(existingEvents.map((event) => [String(event.id), event]));
  const nextById = new Map(nextEvents.map((event) => [String(event.id), event]));

  const added = [];
  const updated = [];

  for (const [id, event] of nextById) {
    if (!existingById.has(id)) {
      added.push(event);
      continue;
    }

    const before = existingById.get(id);
    if (JSON.stringify(before) !== JSON.stringify(event)) {
      updated.push({ before, after: event });
    }
  }

  return { added, updated };
}
