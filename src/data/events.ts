// Shared events data and helper functions

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  maxAttendees?: number;
  currentRSVPs?: number;
  registrationUrl?: string;
  slides?: string;
  recording?: string;
  bgPath?: string;
}

// Single events list - you can edit this directly
export const events: Event[] = [
  {
    id: 'event-3',
    title: 'AI Engineering Discussions: What you\'re working on or experimenting with',
    description: 'Join us for an informative evening where local professional, amateur, and student community members (including you!) discuss technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful.\n\nWe are not entirely sure that we\'ll have access to audio/video, so we are planning around not having it. It will be a bonus feature if we do.',
    date: '2025-10-15T18:00:00-06:00',
    location: 'Bassline Brewing Co.',
    currentRSVPs: 15,
    registrationUrl: 'https://www.meetup.com/nashville-ai-engineering/events/311417282/?eventOrigin=home_next_event_you_are_hosting',
    bgPath: 'bg-vicuna-13b.webp'
  },
  {
    id: 'event-2',
    title: 'AI Engineering Showcase: What Our Peers Are Building & Exploring in Nashville',
    description: 'Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community.And, if you know of hosts or sponsors for our community gatherings.',
    date: '2025-09-17T17:00:00-06:00',
    location: 'Edmondson Pike Library',
    currentRSVPs: 39,
    registrationUrl: 'https://www.meetup.com/nashville-ai-engineering/events/310890574/?eventOrigin=group_past_events',
    bgPath: 'bg-vicuna-13b.webp'
  },
  {
    id: 'event-1',
    title: 'Meet and Greet!',
    description: 'This is the initial meeting! Come with a tool or workflow that you\'re using to share.\n\nAlso, please share your opinion on the format for future events.My initial thinking is that each event should be a combination of a longer talk(20- 30 mins) and 1 or 2 shorter demos / discussions(10 - 20) minutes.That said, I want to match what people are interested in!',
    date: '2025-08-13T18:00:00-06:00',
    location: 'Monday Night Brewing',
    currentRSVPs: 18,
    registrationUrl: 'https://www.meetup.com/nashville-ai-engineering/events/',
    bgPath: 'bg-vicuna-13b.webp'
  }
];

// Helper functions
// Parse date string to extract date components without timezone conversion
function parseDateString(dateString: string): { year: number; month: number; day: number; hour: number; minute: number } {
  // Parse ISO date string like '2025-08-13T18:00:00-06:00'
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!match) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10),
    hour: parseInt(match[4], 10),
    minute: parseInt(match[5], 10),
  };
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get weekday name from date components (using Zeller's congruence)
function getWeekday(year: number, month: number, day: number): string {
  const m = month < 3 ? month + 12 : month;
  const y = month < 3 ? year - 1 : year;
  const d = day;
  const w = (d + Math.floor((13 * (m + 1)) / 5) + y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)) % 7;
  // Convert from Saturday=0 to Sunday=0
  const weekdayIndex = (w + 1) % 7;
  return WEEKDAY_NAMES[weekdayIndex];
}

export function formatEventDate(dateString: string): string {
  const { year, month, day } = parseDateString(dateString);
  return `${MONTH_NAMES_SHORT[month - 1]} ${day}, ${year}`;
}

export function formatFullDate(dateString: string): string {
  const { year, month, day } = parseDateString(dateString);
  const weekday = getWeekday(year, month, day);
  return `${weekday}, ${MONTH_NAMES[month - 1]} ${day}, ${year}`;
}

export function formatEventTime(dateString: string): string {
  const { hour, minute } = parseDateString(dateString);
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour < 12 ? 'AM' : 'PM';
  const minuteStr = minute.toString().padStart(2, '0');
  // Nashville is in Central Time, so we'll display CST/CDT
  // For simplicity, we'll use CST (but you could make this dynamic)
  const timezone = 'CST';
  return `${hour12}:${minuteStr} ${ampm} ${timezone}`;
}

export function isEventUpcoming(dateString: string): boolean {
  const { year: eventYear, month: eventMonth, day: eventDay } = parseDateString(dateString);
  const now = new Date();
  
  // Get today's date in UTC to avoid timezone issues
  const todayYear = now.getUTCFullYear();
  const todayMonth = now.getUTCMonth() + 1; // getUTCMonth() returns 0-11
  const todayDay = now.getUTCDate();
  
  // Compare dates directly without timezone conversion
  if (eventYear > todayYear) return true;
  if (eventYear < todayYear) return false;
  if (eventMonth > todayMonth) return true;
  if (eventMonth < todayMonth) return false;
  return eventDay >= todayDay; // Event is upcoming if it's today or in the future
}

// Helper to compare two date strings for sorting
function compareDateStrings(a: string, b: string): number {
  const dateA = parseDateString(a);
  const dateB = parseDateString(b);
  
  if (dateA.year !== dateB.year) return dateA.year - dateB.year;
  if (dateA.month !== dateB.month) return dateA.month - dateB.month;
  return dateA.day - dateB.day;
}

// Get upcoming and past events
export function getUpcomingEvents(): Event[] {
  return events
    .filter(event => isEventUpcoming(event.date))
    .sort((a, b) => compareDateStrings(a.date, b.date));
}

export function getPastEvents(): Event[] {
  return events
    .filter(event => !isEventUpcoming(event.date))
    .sort((a, b) => compareDateStrings(b.date, a.date)); // Reverse sort for past events
}

// Get the next upcoming event (if any)
export function getNextEvent(): Event | null {
  const upcoming = getUpcomingEvents();
  return upcoming.length > 0 ? upcoming[0] : null;
}
