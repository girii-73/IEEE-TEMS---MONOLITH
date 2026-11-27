export interface ScheduleItem {
  time: string;
  title: string;
  nested?: {
    time: string;
    title: string;
  }[];
}

export interface JudgingBar {
  criterion: string;
  weight: number;
}

export interface DayTheme {
  id: "healthcare" | "robotics" | "cybersecurity" | "fintech";
  title: string;
  description: string;
}

export interface PassOption {
  id: "day1" | "day2" | "full";
  name: string;
  price: string;
  subtitle: string;
  detail: string;
  badge?: string;
  buttonLabel: string;
  urlKey: "day1" | "day2" | "full";
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventConfig {
  EVENT_DATES: {
    day1: string;
    day2: string;
    shortRange: string;
  };
  EVENT_START_ISO: string;
  VENUE: string;
  REG_URLS: {
    day1: string;
    day2: string;
    full: string;
  };
  SOCIALS: {
    instagram: string;
    linkedin: string;
  };
  CONTACT: {
    phone: string;
    email: string;
  };
  ORGANISER: string;
  COORDINATORS: readonly string[];
  SPEAKER: string;
}

export const EVENT: EventConfig = {
  EVENT_DATES: {
    day1: "Monday 21 December 2026",
    day2: "Tuesday 22 December 2026",
    shortRange: "21-22 December 2026",
  },
  EVENT_START_ISO: "2026-12-21T09:00:00+05:30",
  // TODO: Replace with confirmed venue once finalised; displays "Venue to be announced" when empty or unset.
  VENUE: "Venue to be announced",
  REG_URLS: {
    day1: "https://forms.gle/REPLACE_DAY1", // TODO: Replace with Day 1 registration or payment form URL
    day2: "https://forms.gle/REPLACE_DAY2", // TODO: Replace with Day 2 registration or payment form URL
    full: "https://forms.gle/REPLACE_FULL", // TODO: Replace with Both Days registration or payment form URL
  },
  SOCIALS: {
    instagram: "https://instagram.com/REPLACE", // TODO: Replace with IEEE TEMS / MONOLITH Instagram URL
    linkedin: "https://linkedin.com/company/REPLACE", // TODO: Replace with IEEE TEMS / MONOLITH LinkedIn URL
  },
  CONTACT: {
    phone: "+91 XXXXX XXXXX", // TODO: Replace with student coordinator or organiser phone number
    email: "hello@REPLACE.com", // TODO: Replace with official contact email
  },
  ORGANISER: "IEEE TEMS",
  COORDINATORS: [
    "Giriprasad K",
    "Tazim Sheriff R",
    "Thanishka Yogesh",
    "Mithrahasini",
    "Sathya",
    "Surya",
  ],
  SPEAKER: "To be announced",
};

export function getDisplayVenue(): string {
  const trimmed = EVENT.VENUE.trim();
  return trimmed.length > 0 ? trimmed : "Venue to be announced";
}

export const HERO_COPY = {
  subline: "A two-day technology festival. Lead on Day 1, build on Day 2.",
  primaryCta: "Register",
  secondaryCta: "See the schedule",
};

export const ABOUT_COPY = {
  title: "What is MONOLITH",
  description:
    "MONOLITH is a two-day festival for students who want to move from ideas to working solutions. Day 1 is a management summit with an industry speaker, a networking quest and a team pitch challenge. Day 2 is a Sprintathon where teams build technology solutions to real-world problems. Join for one day or both.",
  goals: [
    "Encourage innovation and creative thinking",
    "Apply technical knowledge in practice",
    "Build teamwork and problem-solving skills",
    "Get hands-on with emerging technologies",
    "Meet people from other colleges and fields",
  ],
};

export const DAYS_COPY = {
  title: "Two days",
  connector: "Problem statements are released on Day 1.",
  day1: {
    label: "Day 1",
    date: "21 December",
    title: "Management Summit by IEEE TEMS",
    theme: "Lead. Debate. Build.",
    tagline: "Where management meets technology.",
    passPrice: "₹100",
    parts: [
      {
        title: "Industry speaker session",
        description: `Leadership, innovation, entrepreneurship and the role of engineers in management. Speaker: ${EVENT.SPEAKER}.`,
      },
      {
        title: "Find Your Co-Founder",
        description:
          "A networking quest called the Collaboration Quest, where you meet people from other colleges and skills and finish by forming teams.",
      },
      {
        title: "Team pitch challenge",
        description:
          "Teams of 3-4 pick a real-world problem, then pitch for 3-4 minutes followed by 2 minutes of questions.",
      },
    ],
  },
  day2: {
    label: "Day 2",
    date: "22 December",
    title: "Sprintathon",
    description:
      "Teams of 2-4 build a working solution to a problem statement. Open to all engineering students.",
    passPrice: "₹150",
    rules: [
      "Every team must include a girl teammate",
      "Bring your own laptop",
      "Any language, framework, AI tool or resource is allowed",
      "Each team demos to the judges",
    ],
  },
};

export const DAY2_THEMES: DayTheme[] = [
  {
    id: "healthcare",
    title: "Healthcare technology",
    description: "Solutions that improve healthcare access and services",
  },
  {
    id: "robotics",
    title: "Robotics",
    description: "Automation and intelligent robotic systems, simulation",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Digital security, data protection and cyber threat detection",
  },
  {
    id: "fintech",
    title: "FinTech",
    description: "Digital payments, financial management and financial security",
  },
];

export const DAY1_PITCH_AREAS: string[] = [
  "AI and automation",
  "Smart cities and sustainability",
  "Healthcare and accessibility",
  "Education and social impact",
  "FinTech and digital innovation",
];

export const SCHEDULE_DATA: {
  note: string;
  day1: ScheduleItem[];
  day2: ScheduleItem[];
} = {
  note: "Both days run 9:00 AM to 4:00 PM. Timings are tentative.",
  day1: [
    { time: "9:00-9:20", title: "Registration and welcome" },
    { time: "9:20-9:35", title: "Inauguration and opening remarks" },
    { time: "9:35-10:35", title: "Industry speaker session and Q&A" },
    { time: "10:35-10:50", title: "Refreshment break" },
    { time: "10:50-12:00", title: "Find Your Co-Founder networking" },
    { time: "12:00-12:20", title: "Team formation and pitch briefing" },
    { time: "12:20-1:00", title: "Lunch" },
    { time: "1:00-1:50", title: "Problem identification and idea development" },
    { time: "1:50-3:30", title: "Team pitch presentations" },
    { time: "3:30-3:50", title: "Jury evaluation and results" },
    { time: "3:50-4:00", title: "Awards, vote of thanks and closing" },
  ],
  day2: [
    { time: "9:00-9:30", title: "Registration and check-in" },
    { time: "9:30-10:00", title: "Inauguration and instructions" },
    {
      time: "10:00-2:45",
      title: "Sprintathon development phase",
      nested: [
        { time: "11:00-11:15", title: "Break" },
        { time: "12:30-1:00", title: "Lunch" },
      ],
    },
    { time: "2:45-4:00", title: "Project evaluation and prize distribution" },
  ],
};

export const JUDGING_DATA: {
  day1: JudgingBar[];
  day2: string[];
} = {
  day1: [
    { criterion: "Innovation and creativity", weight: 25 },
    { criterion: "Problem identification", weight: 20 },
    { criterion: "Feasibility", weight: 20 },
    { criterion: "Potential impact", weight: 20 },
    { criterion: "Presentation", weight: 15 },
  ],
  day2: [
    "Innovation and originality",
    "Technical implementation",
    "Functionality (working prototype and demo)",
    "Problem-solving approach",
    "Feasibility",
    "Presentation",
  ],
};

// TODO: Confirm Day 1 prize breakdown (first place ₹3,000, first runner-up ₹3,000, second runner-up ₹1,000) with organisers before launch.
export const PRIZES_DATA = {
  totalPool: "₹17,000",
  totalLabel: "Total prize pool",
  certificateNote: "Participation certificates for Day 2 participants.",
  day1: [
    { place: "First place", amount: "₹3,000" },
    { place: "First runner-up", amount: "₹3,000" },
    { place: "Second runner-up", amount: "₹1,000" },
  ],
  day2: [
    { place: "First place", amount: "₹5,000" },
    { place: "Second place", amount: "₹3,000" },
    { place: "Third place", amount: "₹2,000" },
  ],
};

export const PASSES_DATA: PassOption[] = [
  {
    id: "day1",
    name: "Day 1 only",
    price: "₹100",
    subtitle: "Management Summit",
    detail: "Monday 21 December 2026",
    buttonLabel: "Register for Day 1",
    urlKey: "day1",
  },
  {
    id: "day2",
    name: "Day 2 only",
    price: "₹150",
    subtitle: "Sprintathon",
    detail: "Tuesday 22 December 2026. Teams register together.",
    buttonLabel: "Register for Day 2",
    urlKey: "day2",
  },
  {
    id: "full",
    name: "Both days",
    price: "₹200",
    subtitle: "Management Summit and Sprintathon",
    detail: "21 and 22 December 2026",
    badge: "Best value, saves ₹50",
    buttonLabel: "Register for both days",
    urlKey: "full",
    featured: true,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is MONOLITH?",
    answer:
      "MONOLITH is a two-day IEEE TEMS festival that brings together technology, management, innovation and collaboration. From industry insights and networking to technical challenges and building solutions, MONOLITH offers an opportunity to learn, connect and showcase your skills.",
  },
  {
    question: "Do I have to attend both days?",
    answer:
      "Not necessarily! You can register for Day 1, Day 2, or choose the Full Festival Pass to experience both days at a discounted price.",
  },
  {
    question: "Who can participate in MONOLITH?",
    answer:
      "MONOLITH is open to college students from different institutions, departments and academic backgrounds. Whether you're from a technical or management background, you're welcome to participate!",
  },
  {
    question: "Can I register without a team?",
    answer:
      "Absolutely! You can register individually for Day 1. During the Find Your Co-Founder networking activity, you'll have the opportunity to connect with other participants and form teams for the Team Pitch Challenge.",
  },
  {
    question: "Do I need coding experience to participate?",
    answer:
      "Not for every activity! Day 1 focuses on management, collaboration, problem-solving and pitching ideas. Day 2 focuses on technology and building solutions. Check the respective event requirements before registering.",
  },
  {
    question: "What happens during the Management Summit?",
    answer:
      "Day 1 features an industry speaker session, an interactive networking activity called Find Your Co-Founder, and a Team Pitch Challenge. Participants will identify real-world problems, develop innovative solution concepts and present their ideas to a judging panel.",
  },
  {
    question: "What are the registration fees?",
    answer:
      "We offer three registration options:\n\nDay 1 – Management Summit: ₹100\nDay 2 – Technology Fest: ₹150\nFull Festival Pass – Both Days: ₹200\n\nChoose the pass that best suits your interests and be part of the experience!",
  },
  {
    question: "Will participants receive certificates and prizes?",
    answer:
      "MONOLITH features a total proposed prize pool of ₹17,000 across both days. Participation certificates will be provided for both Day 1 and Day 2 participants. Winners will receive prizes based on their performance in the respective competitions.",
  },
];
