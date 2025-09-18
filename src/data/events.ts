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
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

export function isEventUpcoming(dateString: string): boolean {
  const eventDate = new Date(dateString);
  const now = new Date();
  return eventDate > now;
}

// Get upcoming and past events
export function getUpcomingEvents(): Event[] {
  return events.filter(event => isEventUpcoming(event.date));
}

export function getPastEvents(): Event[] {
  return events.filter(event => !isEventUpcoming(event.date));
}

// Get the next upcoming event (if any)
export function getNextEvent(): Event | null {
  const upcoming = getUpcomingEvents();
  return upcoming.length > 0 ? upcoming[0] : null;
}
