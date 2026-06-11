import test from 'node:test';
import assert from 'node:assert/strict';

import {
  extractNextDataFromHtml,
  findMeetupEventUrls,
  findMeetupEventById,
  formatSiteEvent,
  mergeEvents,
  replaceEventsArrayInSource,
} from '../scripts/meetup-sync-lib.mjs';

function toNextDataHtml(payload) {
  return `<!doctype html>
<html>
  <body>
    <script id="__NEXT_DATA__" type="application/json">${JSON.stringify(payload)}</script>
  </body>
</html>`;
}

const groupHtml = toNextDataHtml({
  props: {
    pageProps: {
      events: [
        {
          id: '312408899',
          eventUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
          title: 'June Meetup',
          dateTime: '2026-06-17T18:00:00-05:00',
          status: 'ACTIVE',
        },
        {
          id: '312408875',
          eventUrl: 'https://www.meetup.com/artificialintelligencers/events/312408875/',
          title: 'July Meetup',
          dateTime: '2026-07-23T18:00:00-05:00',
          status: 'ACTIVE',
        },
        {
          id: '999',
          eventUrl: 'https://www.meetup.com/other-group/events/999/',
          title: 'Other Group',
          dateTime: '2026-07-01T18:00:00-05:00',
          status: 'ACTIVE',
        },
      ],
    },
  },
});

const eventHtml = toNextDataHtml({
  props: {
    pageProps: {
      event: {
        __typename: 'Event',
        id: '312408899',
        title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
        description:
          'Community members share demos and technical presentations on AI projects.\n\nFeatured presenters:\n• Ray on Agree Zone\n• Ean on breaking down problems for AI',
        eventUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
        dateTime: '2026-06-17T18:00:00-05:00',
        endTime: '2026-06-17T20:00:00-05:00',
        status: 'ACTIVE',
        goingCount: { totalCount: 35 },
        venue: {
          name: 'AI Freedom Lab',
          address: '1912 21st Ave S',
          city: 'Nashville',
          state: 'TN',
        },
      },
    },
  },
});

test('extractNextDataFromHtml parses embedded __NEXT_DATA__ payloads', () => {
  const data = extractNextDataFromHtml(groupHtml);
  assert.equal(data.props.pageProps.events.length, 3);
});

test('findMeetupEventUrls returns sorted unique event URLs for the target group', () => {
  const data = extractNextDataFromHtml(groupHtml);
  assert.deepEqual(findMeetupEventUrls(data, 'artificialintelligencers'), [
    'https://www.meetup.com/artificialintelligencers/events/312408899/',
    'https://www.meetup.com/artificialintelligencers/events/312408875/',
  ]);
});

test('findMeetupEventById returns the full meetup event object', () => {
  const data = extractNextDataFromHtml(eventHtml);
  const event = findMeetupEventById(data, '312408899');
  assert.equal(event.title, 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring');
  assert.equal(event.goingCount.totalCount, 35);
  assert.equal(event.venue.name, 'AI Freedom Lab');
});

test('formatSiteEvent maps meetup event data into the site event shape', () => {
  const data = extractNextDataFromHtml(eventHtml);
  const meetupEvent = findMeetupEventById(data, '312408899');
  const siteEvent = formatSiteEvent(meetupEvent);

  assert.deepEqual(siteEvent, {
    id: '312408899',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description:
      'Community members share demos and technical presentations on AI projects.\n\nFeatured presenters:\n• Ray on Agree Zone\n• Ean on breaking down problems for AI',
    descriptionHtml:
      '<p>Community members share demos and technical presentations on AI projects.</p>\n<p>Featured presenters:<br />• Ray on Agree Zone<br />• Ean on breaking down problems for AI</p>',
    descriptionBodyHtml:
      '<p>Community members share demos and technical presentations on AI projects.</p>',
    date: '2026-06-17T18:00:00-05:00',
    location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
    currentRSVPs: 35,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
    bgPath: 'bg-vicuna-13b.webp',
  });
});

test('formatSiteEvent strips markdown formatting and converts markdown bullets to plain-text bullets', () => {
  const siteEvent = formatSiteEvent({
    id: '312408899',
    title: 'Field Reports',
    description:
      'Welcome to **Community Demo Day**.\n\n**THE PRESENTATIONS**\n\n* **[Ray Arceneaux](https://example.com/ray)** - Built a tool with `Claude Code`\n* _Ean_ - Breaking down problems for AI',
    dateTime: '2026-06-17T18:00:00-05:00',
    eventUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
    goingCount: { totalCount: 35 },
    venue: {
      name: 'AI Freedom Lab',
      address: '1912 21st Ave S',
      city: 'Nashville',
      state: 'TN',
    },
  });

  assert.equal(
    siteEvent.description,
    'Welcome to Community Demo Day.\n\nTHE PRESENTATIONS\n\n• Ray Arceneaux - Built a tool with Claude Code\n• Ean - Breaking down problems for AI',
  );
  assert.equal(
    siteEvent.descriptionHtml,
    '<p>Welcome to <strong>Community Demo Day</strong>.</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li><strong><a href="https://example.com/ray" target="_blank" rel="noopener noreferrer">Ray Arceneaux</a></strong> - Built a tool with <code>Claude Code</code></li><li><em>Ean</em> - Breaking down problems for AI</li></ul>',
  );
  assert.equal(
    siteEvent.descriptionBodyHtml,
    '<p>Welcome to <strong>Community Demo Day</strong>.</p>',
  );
  assert.match(siteEvent.descriptionHtml, /<a href="https:\/\/example.com\/ray"/);
  assert.doesNotMatch(siteEvent.description, /\[[^\]]+\]\([^)]*\)|[*_`]/);
});

test('mergeEvents updates existing events and adds newly discovered upcoming events', () => {
  const existingEvents = [
    {
      id: '312408899',
      title: 'Old title',
      description: 'Old description',
      date: '2026-06-17T18:00:00-06:00',
      location: 'Old venue',
      currentRSVPs: 20,
      registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
      bgPath: 'bg-vicuna-13b.webp',
    },
    {
      id: 'event-legacy',
      title: 'Past local event',
      description: 'Keep me',
      date: '2025-01-01T18:00:00-06:00',
      location: 'Nashville',
      currentRSVPs: 10,
      registrationUrl: 'https://example.com/past',
      bgPath: 'bg-vicuna-13b.webp',
    },
  ];

  const syncedEvents = mergeEvents(
    existingEvents,
    [
      {
        id: '312408899',
        title: 'June Meetup',
        description: 'New description',
        date: '2026-06-17T18:00:00-05:00',
        location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
        currentRSVPs: 35,
        registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
        bgPath: 'bg-vicuna-13b.webp',
      },
      {
        id: '312408875',
        title: 'July Meetup',
        description: 'Fresh event',
        date: '2026-07-23T18:00:00-05:00',
        location: 'Vaco Nashville, 5501 Virginia Way Suite 120, Brentwood, TN',
        currentRSVPs: 12,
        registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408875/',
        bgPath: 'bg-vicuna-13b.webp',
      },
    ],
    { now: '2026-06-01T00:00:00-05:00' },
  );

  assert.equal(syncedEvents.length, 3);
  assert.equal(syncedEvents[0].id, '312408875');
  assert.equal(syncedEvents[1].title, 'June Meetup');
  assert.equal(syncedEvents[1].currentRSVPs, 35);
  assert.equal(syncedEvents[2].id, 'event-legacy');
});

test('mergeEvents matches existing entries by registration URL even if trailing slashes differ', () => {
  const existingEvents = [
    {
      id: 'event-9',
      title: 'Existing local event id',
      description: 'Old description',
      date: '2026-06-17T18:00:00-06:00',
      location: 'Old venue',
      currentRSVPs: 20,
      registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899',
      bgPath: 'bg-vicuna-13b.webp',
    },
  ];

  const syncedEvents = mergeEvents(
    existingEvents,
    [
      {
        id: '312408899',
        title: 'June Meetup',
        description: 'New description',
        date: '2026-06-17T18:00:00-05:00',
        location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
        currentRSVPs: 35,
        registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
        bgPath: 'bg-vicuna-13b.webp',
      },
    ],
    { now: '2026-06-01T00:00:00-05:00' },
  );

  assert.equal(syncedEvents.length, 1);
  assert.equal(syncedEvents[0].id, '312408899');
  assert.equal(syncedEvents[0].currentRSVPs, 35);
});

test('replaceEventsArrayInSource swaps only the events array declaration', () => {
  const source = `export interface Event {\n  id: string;\n}\n\nexport const events: Event[] = [\n  { id: 'old' },\n];\n\nexport function getNextEvent() {\n  return events[0] ?? null;\n}\n`;

  const updated = replaceEventsArrayInSource(source, [
    {
      id: '312408899',
      title: 'June Meetup',
      description: 'Desc',
      date: '2026-06-17T18:00:00-05:00',
      location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
      currentRSVPs: 35,
      registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
      bgPath: 'bg-vicuna-13b.webp',
    },
  ]);

  assert.match(updated, /export const events: Event\[\] = \[/);
  assert.match(updated, /312408899/);
  assert.match(updated, /export function getNextEvent/);
  assert.doesNotMatch(updated, /id: 'old'/);
  assert.doesNotMatch(updated, /"June Meetup"/);
});
