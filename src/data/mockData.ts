import { User, SwapRequest, Session, TimeBankTransaction, Review, SystemLog } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-current',
    name: 'Devon Vance',
    email: 'devon.vance@skillswap.org',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    title: 'Senior Frontend Engineer & TypeScript Architect',
    role: 'both',
    bio: 'Passionate about modern web architecture, clean React/Next.js design systems, and state machines. Seeking to exchange React & Tailwind mastery for Python Machine Learning & Prompt Engineering fundamentals.',
    timeCreditBalance: 3.5,
    hoursTaught: 12.0,
    hoursLearned: 8.5,
    averageRating: 4.95,
    reviewCount: 14,
    location: 'London, UK (UTC+1)',
    availability: 'Evenings',
    skillsOffered: ['React.js', 'Tailwind CSS', 'TypeScript', 'Frontend Architecture'],
    skillsWanted: ['Python', 'Machine Learning', 'Docker & DevOps'],
    highlightedStrengths: ['Design Systems', 'Micro-interactions', 'Patient Educator', 'Code Reviewer'],
    verifiedStatus: true,
    joinedDate: 'Jan 2026'
  },
  {
    id: 'user-amina',
    name: 'Amina Al-Mansoor',
    email: 'amina.design@skillswap.org',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    title: 'Lead Product & UX Interaction Designer',
    role: 'mentor',
    bio: 'Senior UX specialist with 7+ years craft experience at design agencies. Love mentoring junior devs on design thinking, Figma auto-layout, and usability auditing in exchange for backend API concepts.',
    timeCreditBalance: 5.0,
    hoursTaught: 18.0,
    hoursLearned: 3.0,
    averageRating: 5.0,
    reviewCount: 21,
    location: 'Dubai, UAE (UTC+4)',
    availability: 'Weekends',
    skillsOffered: ['UI/UX Design', 'Figma Systems', 'Design Thinking', 'Usability Auditing'],
    skillsWanted: ['React.js', 'Web Accessibility (a11y)', 'CSS Animation'],
    highlightedStrengths: ['Figma Pro', 'Design Systems', 'Typography Master', 'Empathy-Driven'],
    verifiedStatus: true,
    joinedDate: 'Nov 2025'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Thorne',
    email: 'marcus.cloud@skillswap.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    title: 'Cloud Solutions Architect & Docker Expert',
    role: 'both',
    bio: 'DevOps engineer working with Kubernetes, Terraform, and AWS/GCP pipelines. Looking to learn creative front-end styling and TypeScript to build developer dashboard tools.',
    timeCreditBalance: 2.0,
    hoursTaught: 9.5,
    hoursLearned: 7.5,
    averageRating: 4.88,
    reviewCount: 11,
    location: 'Berlin, Germany (UTC+2)',
    availability: 'Weekdays',
    skillsOffered: ['Docker & DevOps', 'Linux Systems', 'Cloud Architecture', 'PostgreSQL Tuning'],
    skillsWanted: ['TypeScript', 'Tailwind CSS', 'Mobile UI'],
    highlightedStrengths: ['Containerization', 'CI/CD Pipelines', 'Performance Tuning'],
    verifiedStatus: true,
    joinedDate: 'Dec 2025'
  },
  {
    id: 'user-priya',
    name: 'Dr. Priya Sharma',
    email: 'priya.datasci@skillswap.org',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    title: 'Data Scientist & Python ML Specialist',
    role: 'mentor',
    bio: 'PhD in Computational Linguistics. Offering practical Python, Pandas, Scikit-Learn, and Gemini API fine-tuning mentorship. Seeking conversational French and video editing skills.',
    timeCreditBalance: 4.5,
    hoursTaught: 22.0,
    hoursLearned: 6.0,
    averageRating: 4.96,
    reviewCount: 19,
    location: 'Singapore (UTC+8)',
    availability: 'Flexible',
    skillsOffered: ['Python', 'Machine Learning', 'Data Analysis', 'Prompt Engineering'],
    skillsWanted: ['French Conversation', 'Video Editing', 'Product Strategy'],
    highlightedStrengths: ['Data Storytelling', 'Mathematical Intuition', 'Structured Syllabus'],
    verifiedStatus: true,
    joinedDate: 'Oct 2025'
  },
  {
    id: 'user-kenji',
    name: 'Kenji Takahashi',
    email: 'kenji.music@skillswap.org',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    title: 'Sound Designer & Audio Producer',
    role: 'both',
    bio: 'Film composer and Ableton Live educator. Eager to trade music composition, podcast mixing, and Japanese language conversation for web portfolio development.',
    timeCreditBalance: 1.5,
    hoursTaught: 6.0,
    hoursLearned: 4.5,
    averageRating: 4.91,
    reviewCount: 8,
    location: 'Tokyo, Japan (UTC+9)',
    availability: 'Weekends',
    skillsOffered: ['Audio Production', 'Japanese Conversation', 'Podcast Mixing', 'Sound FX'],
    skillsWanted: ['React.js', 'Website Deployment', 'SEO Basics'],
    highlightedStrengths: ['Audio Engineering', 'Bilingual', 'Creative Workflow'],
    verifiedStatus: true,
    joinedDate: 'Jan 2026'
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    email: 'elena.growth@skillswap.org',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    title: 'Growth Marketer & Brand Strategist',
    role: 'learner',
    bio: 'Product marketing lead curious about hands-on coding. Looking to master HTML/CSS and basic SQL queries to analyze marketing funnels without engineering bottlenecks.',
    timeCreditBalance: 3.0,
    hoursTaught: 4.0,
    hoursLearned: 7.0,
    averageRating: 4.85,
    reviewCount: 6,
    location: 'Toronto, Canada (UTC-4)',
    availability: 'Evenings',
    skillsOffered: ['Digital Marketing', 'SEO Strategies', 'Copywriting', 'Public Speaking'],
    skillsWanted: ['SQL Databases', 'HTML & CSS', 'Data Visualization'],
    highlightedStrengths: ['Narrative Craft', 'Analytical Mindset', 'High Energy'],
    verifiedStatus: true,
    joinedDate: 'Feb 2026'
  }
];

export const INITIAL_SWAP_REQUESTS: SwapRequest[] = [
  {
    id: 'swap-1',
    requesterId: 'user-current',
    requesterName: 'Devon Vance',
    requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    providerId: 'user-priya',
    providerName: 'Dr. Priya Sharma',
    providerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    skillOffered: 'React.js',
    skillWanted: 'Python',
    proposedHours: 1.0,
    status: 'ACCEPTED',
    notes: 'Excited to begin Python data structures while Devon provides modern React hook patterns.',
    createdAt: 'Yesterday, 14:20',
    scheduledDate: 'Tomorrow at 18:00 UTC',
    compatibilityScore: 94
  },
  {
    id: 'swap-2',
    requesterId: 'user-marcus',
    requesterName: 'Marcus Thorne',
    requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    providerId: 'user-current',
    providerName: 'Devon Vance',
    providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    skillOffered: 'Docker & DevOps',
    skillWanted: 'Tailwind CSS',
    proposedHours: 1.5,
    status: 'IN_PROGRESS',
    notes: 'Marcus needs help styling a container management UI. Devon is learning multi-stage Docker builds.',
    createdAt: '3 days ago',
    scheduledDate: 'Today at 20:00 UTC',
    compatibilityScore: 91
  },
  {
    id: 'swap-3',
    requesterId: 'user-elena',
    requesterName: 'Elena Rostova',
    requesterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    providerId: 'user-current',
    providerName: 'Devon Vance',
    providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    skillOffered: 'Digital Marketing',
    skillWanted: 'Frontend Architecture',
    proposedHours: 1.0,
    status: 'PENDING',
    notes: 'Would love an introduction to how modern SPAs are structured and deployed.',
    createdAt: '2 hours ago',
    compatibilityScore: 82
  }
];

export const INITIAL_SESSIONS: Session[] = [
  {
    id: 'session-live-demo',
    swapRequestId: 'swap-2',
    title: 'Dockerizing Next.js & Tailwind CSS Architecture',
    mentorId: 'user-marcus',
    mentorName: 'Marcus Thorne',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    learnerId: 'user-current',
    learnerName: 'Devon Vance',
    learnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    skillName: 'Docker & DevOps',
    scheduledAt: 'Active Now (Live Room)',
    durationHours: 1.0,
    status: 'LIVE',
    meetingLink: 'https://skillswap.network/room/live-7729',
    agendaNotes: 'Step 1: Multi-stage Dockerfile setup. Step 2: Caching node_modules. Step 3: Production Alpine image.',
    creditEscrowStatus: 'ESCROW_HELD'
  },
  {
    id: 'session-upcoming-1',
    swapRequestId: 'swap-1',
    title: 'Python NumPy & Data Exploration Diagnostics',
    mentorId: 'user-priya',
    mentorName: 'Dr. Priya Sharma',
    mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    learnerId: 'user-current',
    learnerName: 'Devon Vance',
    learnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    skillName: 'Python',
    scheduledAt: 'Tomorrow, 18:00 UTC',
    durationHours: 1.0,
    status: 'SCHEDULED',
    meetingLink: 'https://skillswap.network/room/py-diagnostics',
    agendaNotes: 'Setting up Jupyter Notebook and analyzing structured CSV data with Pandas vectors.',
    creditEscrowStatus: 'ESCROW_HELD'
  }
];

export const INITIAL_TRANSACTIONS: TimeBankTransaction[] = [
  {
    id: 'tx-101',
    senderId: 'user-amina',
    senderName: 'Amina Al-Mansoor',
    receiverId: 'user-current',
    receiverName: 'Devon Vance',
    creditsTransferred: 1.0,
    transactionType: 'SESSION_EARNED',
    timestamp: 'Yesterday at 16:45',
    description: '1 hr taught: React Component Reusability & Props typing'
  },
  {
    id: 'tx-102',
    senderId: 'user-current',
    senderName: 'Devon Vance',
    receiverId: 'user-marcus',
    receiverName: 'Marcus Thorne',
    creditsTransferred: 1.0,
    transactionType: 'ESCROW_HOLD',
    timestamp: 'Today at 10:15',
    description: 'Time credit placed in escrow for Live Session #7729'
  },
  {
    id: 'tx-103',
    senderId: 'user-kenji',
    senderName: 'Kenji Takahashi',
    receiverId: 'user-current',
    receiverName: 'Devon Vance',
    creditsTransferred: 1.5,
    transactionType: 'SESSION_EARNED',
    timestamp: '3 days ago',
    description: '1.5 hrs taught: Modern CSS Grid & Webpack Migration'
  },
  {
    id: 'tx-104',
    senderId: 'user-current',
    senderName: 'Devon Vance',
    receiverId: 'user-priya',
    receiverName: 'Dr. Priya Sharma',
    creditsTransferred: 1.0,
    transactionType: 'SESSION_SPENT',
    timestamp: '5 days ago',
    description: '1 hr learned: Introduction to Python syntax & virtual environments'
  },
  {
    id: 'tx-100',
    receiverId: 'user-current',
    receiverName: 'Devon Vance',
    creditsTransferred: 3.0,
    transactionType: 'WELCOME_BONUS',
    timestamp: 'Registration Date',
    description: 'Initial community seed credit for new verified member'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    sessionId: 'session-old-1',
    reviewerId: 'user-amina',
    reviewerName: 'Amina Al-Mansoor',
    reviewerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    revieweeId: 'user-current',
    revieweeName: 'Devon Vance',
    ratingScore: 5,
    feedbackText: 'Devon is an exceptional mentor! He explained React state lifting with interactive visual diagrams that finally made sense to me. Highly recommend his sessions!',
    createdAt: '2 days ago',
    skillExchanged: 'React.js'
  },
  {
    id: 'rev-2',
    sessionId: 'session-old-2',
    reviewerId: 'user-kenji',
    reviewerName: 'Kenji Takahashi',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    revieweeId: 'user-current',
    revieweeName: 'Devon Vance',
    ratingScore: 5,
    feedbackText: 'Very structured and patient. We built a live audio player layout together using Tailwind. Best 1.5 hours of exchange time!',
    createdAt: '4 days ago',
    skillExchanged: 'Tailwind CSS'
  }
];

export const INITIAL_SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-1',
    timestamp: '10:42:01 UTC',
    level: 'SUCCESS',
    event: 'TIMEBANK_LEDGER_AUDIT',
    details: 'Zero checksum delta across 1,842 user credit accounts. Double-entry balance validated.'
  },
  {
    id: 'log-2',
    timestamp: '10:39:15 UTC',
    level: 'INFO',
    event: 'GEMINI_MATCH_EXECUTION',
    details: 'Processed bidirectional match for User #devon and #priya (score: 94%, duration: 312ms).'
  },
  {
    id: 'log-3',
    timestamp: '10:30:00 UTC',
    level: 'INFO',
    event: 'SESSION_ESCROW_INITIATED',
    details: 'Hold placed on 1.0 credit for Session #7729 (Devon -> Marcus).'
  },
  {
    id: 'log-4',
    timestamp: '10:12:44 UTC',
    level: 'SUCCESS',
    event: 'POSTGRESQL_TRIGGER_FIRED',
    details: 'trg_after_session_completed settled 1.5 credits automatically upon meeting end.'
  }
];

export const SKILL_CATEGORIES = [
  { name: 'Software & IT', count: 142, icon: 'Code', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { name: 'Design & Creative', count: 98, icon: 'Palette', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { name: 'Data & AI', count: 76, icon: 'Brain', color: 'text-teal-600 bg-teal-50 border-teal-200' },
  { name: 'Languages', count: 64, icon: 'Languages', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { name: 'Business & Marketing', count: 52, icon: 'TrendingUp', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { name: 'Music & Arts', count: 39, icon: 'Music', color: 'text-purple-600 bg-purple-50 border-purple-200' }
];
