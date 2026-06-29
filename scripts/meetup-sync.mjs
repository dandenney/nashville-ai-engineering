#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import {
  diffEvents,
  extractNextDataFromHtml,
  findMeetupEventById,
  findMeetupEventUrls,
  formatSiteEvent,
  mergeEvents,
  parseEventsArrayFromSource,
  replaceEventsArrayInSource,
} from './meetup-sync-lib.mjs';

const DEFAULT_GROUP_URL = 'https://www.meetup.com/artificialintelligencers/';
const DEFAULT_GROUP_URLNAME = 'artificialintelligencers';
const EVENTS_FILE = path.resolve('src/data/events.ts');

function parseArgs(argv) {
  return {
    write: argv.includes('--write'),
    quiet: argv.includes('--quiet'),
    groupUrl:
      argv.find((arg) => arg.startsWith('--group-url='))?.split('=')[1] ??
      DEFAULT_GROUP_URL,
    groupUrlname:
      argv.find((arg) => arg.startsWith('--group-urlname='))?.split('=')[1] ??
      DEFAULT_GROUP_URLNAME,
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (compatible; NashvilleAIEngineeringSync/1.0; +https://nashville-ai-engineering.netlify.app)',
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function scrapeMeetupEvents({ groupUrl, groupUrlname }) {
  const groupHtml = await fetchText(groupUrl);
  const groupData = extractNextDataFromHtml(groupHtml);
  const eventUrls = findMeetupEventUrls(groupData, groupUrlname);

  const events = [];
  for (const eventUrl of eventUrls) {
    const eventId = eventUrl.match(/events\/(\d+)\/?$/)?.[1];
    if (!eventId) continue;

    const eventHtml = await fetchText(eventUrl);
    const eventData = extractNextDataFromHtml(eventHtml);
    const meetupEvent = findMeetupEventById(eventData, eventId);
    events.push(formatSiteEvent(meetupEvent));
  }

  return events;
}

function printSummary(summary, quiet) {
  if (quiet) return;

  console.log(`Added ${summary.added.length} event(s)`);
  for (const event of summary.added) {
    console.log(`  + ${event.date} :: ${event.title}`);
  }

  console.log(`Updated ${summary.updated.length} event(s)`);
  for (const { before, after } of summary.updated) {
    const changedFields = Object.keys(after).filter(
      (key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]),
    );
    console.log(`  ~ ${after.id} :: ${changedFields.join(', ')}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const source = await readFile(EVENTS_FILE, 'utf8');
  const existingEvents = parseEventsArrayFromSource(source);
  const scrapedEvents = await scrapeMeetupEvents(args);
  const mergedEvents = mergeEvents(existingEvents, scrapedEvents, { now: new Date() });
  const summary = diffEvents(existingEvents, mergedEvents);
  const nextSource = replaceEventsArrayInSource(source, mergedEvents);
  const sourceChanged = nextSource !== source;

  printSummary(summary, args.quiet);

  if (!summary.added.length && !summary.updated.length && !sourceChanged) {
    if (!args.quiet) {
      console.log('No changes detected.');
    }
    return;
  }

  if (!args.write) {
    if (!args.quiet) {
      console.log('Dry run only. Re-run with --write to update src/data/events.ts');
    }
    return;
  }

  await writeFile(EVENTS_FILE, nextSource);

  if (!args.quiet) {
    console.log(`Wrote ${EVENTS_FILE}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
