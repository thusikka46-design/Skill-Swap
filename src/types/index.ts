export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type UserRole = 'learner' | 'mentor' | 'both' | 'admin';

export interface UserSkill {
  id: string;
  skillName: string;
  category: 'Software & IT' | 'Design & Creative' | 'Data & AI' | 'Languages' | 'Business & Marketing' | 'Music & Arts';
  proficiency: ProficiencyLevel;
  type: 'OFFERED' | 'WANTED';
  yearsExperience?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  title: string;
  role: UserRole;
  bio: string;
  timeCreditBalance: number;
  hoursTaught: number;
  hoursLearned: number;
  averageRating: number;
  reviewCount: number;
  location: string;
  availability: 'Weekdays' | 'Weekends' | 'Flexible' | 'Evenings';
  skillsOffered: string[];
  skillsWanted: string[];
  skillsOfferedDetails?: UserSkill[];
  skillsWantedDetails?: UserSkill[];
  highlightedStrengths?: string[];
  verifiedStatus: boolean;
  joinedDate: string;
}

export type SwapStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED' | 'CANCELLED';

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterAvatar: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  skillOffered: string; // What requester offers
  skillWanted: string; // What requester wants to learn
  proposedHours: number;
  status: SwapStatus;
  notes?: string;
  createdAt: string;
  scheduledDate?: string;
  compatibilityScore?: number;
}

export type SessionStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface Session {
  id: string;
  swapRequestId: string;
  title: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  learnerId: string;
  learnerName: string;
  learnerAvatar: string;
  skillName: string;
  scheduledAt: string;
  durationHours: number;
  status: SessionStatus;
  meetingLink: string;
  agendaNotes?: string;
  creditEscrowStatus: 'ESCROW_HELD' | 'TRANSFERRED' | 'REFUNDED';
}

export type TransactionType = 'SESSION_EARNED' | 'SESSION_SPENT' | 'ESCROW_HOLD' | 'ESCROW_RELEASE' | 'WELCOME_BONUS' | 'SYSTEM_ADJUSTMENT';

export interface TimeBankTransaction {
  id: string;
  senderId?: string;
  senderName?: string;
  receiverId: string;
  receiverName: string;
  creditsTransferred: number;
  transactionType: TransactionType;
  timestamp: string;
  referenceSessionId?: string;
  description: string;
}

export interface Review {
  id: string;
  sessionId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  revieweeId: string;
  revieweeName: string;
  ratingScore: number; // 1-5
  feedbackText: string;
  createdAt: string;
  skillExchanged: string;
}

export interface RoadmapDay {
  day: number;
  topic: string;
  focus_areas: string[];
  hands_on_project: string;
}

export interface AIMatchResult {
  compatibility_score: number;
  reasoning: string;
  complementary_skills?: string[];
  recommended_first_step?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  event: string;
  details: string;
}
