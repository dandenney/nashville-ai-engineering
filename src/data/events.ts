// Shared events data and helper functions

export interface Event {
  id: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  descriptionBodyHtml?: string;
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
    id: '312408907',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• TBD -- Let us know what you\'d like to share!',
    descriptionHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>TBD -- Let us know what you&#39;d like to share!</li></ul>',
    descriptionBodyHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>',
    date: '2026-10-21T18:00:00-05:00',
    location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
    currentRSVPs: 4,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408907/',
    bgPath: 'bg-vicuna-13b.webp'
  },
  {
    id: '312408881',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• TBD -- Let us know what you\'d like to share!',
    date: '2026-09-24T18:00:00-05:00',
    location: 'Vaco, 5501 Virginia Way, Suite 120, Brentwood, TN',
    currentRSVPs: 6,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408881/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>TBD -- Let us know what you&#39;d like to share!</li></ul>',
    descriptionBodyHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: '312408901',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• TBD -- Let us know what you\'d like to share!',
    date: '2026-08-19T18:00:00-05:00',
    location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
    currentRSVPs: 9,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408901/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>TBD -- Let us know what you&#39;d like to share!</li></ul>',
    descriptionBodyHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: '312408875',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• TBD -- Let us know what you\'d like to share!',
    date: '2026-07-23T18:00:00-05:00',
    location: 'Vaco, 5501 Virginia Way, Suite 120, Brentwood, TN',
    currentRSVPs: 33,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408875/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>TBD -- Let us know what you&#39;d like to share!</li></ul>',
    descriptionBodyHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: '312408899',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year!\n\nJoin us for this hybrid edition of "Community Demo Day!" We’re excited to hear from community members working in Product, UX and AI as they show off their hard work. We\'ll hear about the problem they solved, see their product, and lessons learned along the way. Community members will present for about 15 minutes each including Q&A.\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• Ray Arceneaux, MBA - How I help families build and control their family’s current and historical health info in one place, with Family Health Tree, based on my personal journey with Type 1 Diabetes.\n• Ean Krenzin-Blank - Breaking down problems for AI\n• Mike Gallers - A webapp built entirely with the assistance of Claude to track vehicle and home maintenance.\n• Mike Kelso - From Product Manager to Product Creator. How I used Claude to cross the technology divide…',
    date: '2026-06-17T18:00:00-05:00',
    location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
    currentRSVPs: 42,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408899/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year!</p>\n<p>Join us for this hybrid edition of &quot;Community Demo Day!&quot; We’re excited to hear from community members working in Product, UX and AI as they show off their hard work. We&#39;ll hear about the problem they solved, see their product, and lessons learned along the way. Community members will present for about 15 minutes each including Q&amp;A.</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li><strong><a href="https://www.linkedin.com/in/rayarceneaux/" target="_blank" rel="noopener noreferrer">Ray Arceneaux, MBA</a> - </strong>How I help families build and control their family’s current and historical health info in one place, with <a href="https://www.familyhealthtree.com/" target="_blank" rel="noopener noreferrer">Family Health Tree</a>, based on my personal journey with Type 1 Diabetes.</li><li><strong><a href="https://www.linkedin.com/in/ean-krenzin-blank-3b180b137/" target="_blank" rel="noopener noreferrer">Ean Krenzin-Blank</a> -</strong> Breaking down problems for AI</li><li><strong><a href="https://www.linkedin.com/in/mike-gallers/" target="_blank" rel="noopener noreferrer">Mike Gallers</a> -</strong> A webapp built entirely with the assistance of Claude to track vehicle and home maintenance.</li><li><strong><a href="https://www.linkedin.com/in/mistyblu/?skipRedirect=true#" target="_blank" rel="noopener noreferrer">Mike Kelso</a> -</strong> From Product Manager to Product Creator. How I used Claude to cross the technology divide…</li></ul>',
    descriptionBodyHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year!</p>\n<p>Join us for this hybrid edition of &quot;Community Demo Day!&quot; We’re excited to hear from community members working in Product, UX and AI as they show off their hard work. We&#39;ll hear about the problem they solved, see their product, and lessons learned along the way. Community members will present for about 15 minutes each including Q&amp;A.</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: '312408865',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• Satoshi -- From Retrieval to Readability: Structuring RAG Outputs for Decision-Making\n• Scott Hawley -- Recent work on hierarchical multi-scale representation learning for music understanding and generation\n• BettyAnn - zero to first AI-developed project\n• Dan - DESIGN.md',
    date: '2026-05-28T18:00:00-05:00',
    location: 'Vaco, 5501 Virginia Way, Suite 120, Brentwood, TN',
    currentRSVPs: 45,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408865/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>Satoshi -- From Retrieval to Readability: Structuring RAG Outputs for Decision-Making</li><li>Scott Hawley -- Recent work on hierarchical multi-scale representation learning for music understanding and generation</li><li>BettyAnn - zero to first AI-developed project</li><li>Dan - DESIGN.md</li></ul>',
    descriptionBodyHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: '312408891',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup, in our Discord channel (https://discord.com/invite/H38zBzzC), or in the LinkedIn group (https://www.linkedin.com/groups/15689171/) . And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• Carlton Davis will show how he is building a Claude skill that generates a spreadsheet to calculate and categorize his business expenses from inputs are an export of his Google Calendar and AMEX statements.\n• Rajeev Gupta will show us how he’s overcoming challenges slicing JIRA data in ways the platform doesn\'t natively support, despite having no coding background and lacking dedicated engineering support.\n• Ross Miller will demonstrate ways to improve the safety of AI responses over time for highly regulated industries like healthcare by harnessing them with type-safe error handling, automated enforcement scripts, structured adversarial review, and root cause analyses to improve safety over time.\n• Matthias Debernardini will walk us through three projects he developed: an iroh-based (https://www.iroh.computer/) peer-to-peer AI gateway and two apps he\'s using it for: one a calorie/kitchen/peptide tracker, and the second an agent bridge for Hermes (https://hermes-agent.nousresearch.com/).',
    date: '2026-04-15T18:00:00-05:00',
    location: 'AI Freedom Lab, 1912 21st Ave S, Nashville, TN',
    currentRSVPs: 63,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408891/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup, in our Discord channel</em> (<a href="https://discord.com/invite/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.com/invite/H38zBzzC</a>), or in the LinkedIn group (<a href="https://www.linkedin.com/groups/15689171/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/groups/15689171/</a>) . <em>And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>Carlton Davis will show how he is building a Claude skill that generates a spreadsheet to calculate and categorize his business expenses from inputs are an export of his Google Calendar and AMEX statements.</li><li>Rajeev Gupta will show us how he’s overcoming challenges slicing JIRA data in ways the platform doesn&#39;t natively support, despite having no coding background and lacking dedicated engineering support.</li><li>Ross Miller will demonstrate ways to improve the safety of AI responses over time for highly regulated industries like healthcare by harnessing them with type-safe error handling, automated enforcement scripts, structured adversarial review, and root cause analyses to improve safety over time.</li><li>Matthias Debernardini will walk us through three projects he developed: an iroh-based (<a href="https://www.iroh.computer/" target="_blank" rel="noopener noreferrer">https://www.iroh.computer/</a>) peer-to-peer AI gateway and two apps he&#39;s using it for: one a calorie/kitchen/peptide tracker, and the second an agent bridge for Hermes (<a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener noreferrer">https://hermes-agent.nousresearch.com/</a>).</li></ul>',
    descriptionBodyHtml: '<p>Thank you, AI Freedom Lab, for generously hosting our AI collective on the even months of the year! Join us for an insight-packed evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you here!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup, in our Discord channel</em> (<a href="https://discord.com/invite/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.com/invite/H38zBzzC</a>), or in the LinkedIn group (<a href="https://www.linkedin.com/groups/15689171/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/groups/15689171/</a>) . <em>And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: '312408860',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!\n\nWe\'re are maintaining a list of folks who express an interest in sharing what they are working on. So, please let Dan and Ram know if you\'d like to share something with the community via a message here on Meetup or in our Discord channel (https://discord.gg/H38zBzzC). And, if you know of hosts or sponsors for our community gatherings.\n\nAGENDA\n0600 pm -- Setup/Meet & Greet "free time"\n0615 pm -- Demos/presentations (15- 20 min each)\n0745 pm -- Wrap-up\n0800 pm -- Vacate Room\n\nTHE PRESENTATIONS\n\n• Satoshi - RAG orchestration using tabular data and memory\n• Erin -- Demo and technical walkthrough of Applicraft\n• Misty - Learnings from recent AI explorations\n• TBD - Open slot',
    date: '2026-03-26T18:00:00-05:00',
    location: 'Vaco Nashville, 5501 Virginia Way Suite 120, Brentwood, TN',
    currentRSVPs: 54,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312408860/',
    bgPath: 'bg-vicuna-13b.webp',
    descriptionHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>\n<p><strong>THE PRESENTATIONS</strong></p>\n<ul><li>Satoshi - RAG orchestration using tabular data and memory</li><li>Erin -- Demo and technical walkthrough of Applicraft</li><li>Misty - Learnings from recent AI explorations</li><li>TBD - Open slot</li></ul>',
    descriptionBodyHtml: '<p>Thank you, Vaco, for generously hosting our collective on the odd months of the year! Join us for an informative evening where local professional, amateur, and student community members (including you!) share “wires-out” demos, technical deep-dives, and discussions of AI-related projects or research they are working on, tools and techniques they have tried, or research papers/publications/presentations that they find insightful. This event is for those just starting to explore the technical aspects of AI, experienced AI professionals, and everyone in between. See you there!</p>\n<p>We&#39;re are maintaining a list of folks who express an interest in sharing what they are working on. So, <em>please</em> <em>let Dan and Ram know if you&#39;d like to share something with the community via a message here on Meetup or in our Discord channel (<a href="https://discord.gg/H38zBzzC" target="_blank" rel="noopener noreferrer">https://discord.gg/H38zBzzC</a>). And, if you know of hosts or sponsors for our community gatherings.</em></p>\n<p><strong>AGENDA</strong><br />0600 pm -- Setup/Meet &amp; Greet &quot;free time&quot;<br />0615 pm -- Demos/presentations (15- 20 min each)<br />0745 pm -- Wrap-up<br />0800 pm -- Vacate Room</p>'
  },
  {
    id: 'event-5',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Community members share demos and technical presentations on AI projects.\n\nFeatured presenters:\n• River Kanies on CyberMonk (LLM philosophy exploration)\n• Ryan Mitchell on Nihongo Convo (Japanese language learning app)\n• Hunter Phillips on gradio.app deployment',
    date: '2026-02-18T18:00:00-06:00',
    location: 'Bitcoin Park Nashville, 1910 21st Ave S, Nashville, TN',
    currentRSVPs: 36,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312397786',
    bgPath: 'bg-vicuna-13b.webp'
  },
  {
    id: 'event-4',
    title: 'Field Reports: What Fellow Artificial Intelligencers Are Building & Exploring',
    description: 'Community members share demos and technical presentations on AI projects.\n\nFeatured presenters:\n• Satoshi Mitsumori on construction AI analytics\n• Ben Winter on question-generator architecture\n• Adam on diagnostic tooling',
    date: '2026-01-22T18:00:00-06:00',
    location: 'Vaco Nashville, 5501 Virginia Way Suite 120, Brentwood, TN',
    currentRSVPs: 57,
    registrationUrl: 'https://www.meetup.com/artificialintelligencers/events/312397656',
    bgPath: 'bg-vicuna-13b.webp'
  },
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
  // Zeller's result: 0=Sat, 1=Sun, 2=Mon, etc. Convert to WEEKDAY_NAMES index where 0=Sun
  const weekdayIndex = (w + 6) % 7;
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
