import { User, AIMatchResult, RoadmapDay } from '../types';

export async function computeAIMatch(userA: Partial<User>, userB: Partial<User>): Promise<AIMatchResult> {
  try {
    const res = await fetch('/api/ai/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userA, userB })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      if (errData.fallback) return errData.fallback;
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn('AI Match fallback triggered:', error);
    // Client-side robust fallback calculation
    const complementary = (userA.skillsWanted || []).filter(s =>
      (userB.skillsOffered || []).some(o => o.toLowerCase().includes(s.toLowerCase()))
    );
    const score = Math.min(96, 75 + complementary.length * 10);
    return {
      compatibility_score: score,
      reasoning: `${userA.name} offers high-demand expertise in ${userA.skillsOffered?.slice(0, 2).join(', ')}, while ${userB.name} provides valuable mentoring in ${userB.skillsOffered?.slice(0, 2).join(', ')}. This creates an ideal, mutually enriching TimeBank partnership.`,
      complementary_skills: complementary.length > 0 ? complementary : [userB.skillsOffered?.[0] || 'Technical Skills'],
      recommended_first_step: 'Send an introductory swap proposal proposing a 45-minute discovery session.'
    };
  }
}

export async function generateLearningRoadmap(skillName: string, duration: string = '5 Days'): Promise<RoadmapDay[]> {
  try {
    const res = await fetch('/api/ai/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ skillName, duration })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      if (errData.fallback) return errData.fallback;
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('AI Roadmap fallback triggered:', error);
    return [
      {
        day: 1,
        topic: `Foundations & Core Primitives of ${skillName}`,
        focus_areas: ['Environment initialization & tools', 'Key mental models & syntax', 'Hello World milestone'],
        hands_on_project: 'Configure workspace and build initial working sample.'
      },
      {
        day: 2,
        topic: 'Architecture & State Management Patterns',
        focus_areas: ['Data flow & reactive patterns', 'Component/module decomposition', 'Error boundaries & logging'],
        hands_on_project: 'Create reusable modular components with interactive state.'
      },
      {
        day: 3,
        topic: 'Real-world Integration & Asynchronous Workflows',
        focus_areas: ['API consumption & payloads', 'Edge case testing & defensive code', 'Performance benchmarks'],
        hands_on_project: 'Connect interface with external data sources.'
      },
      {
        day: 4,
        topic: 'Optimization & Security Hardening',
        focus_areas: ['Bundle size & rendering speed', 'Authentication best practices', 'Linting & static analysis'],
        hands_on_project: 'Audit and optimize previous day codebase for production readiness.'
      },
      {
        day: 5,
        topic: 'Capstone Project Review & Peer Exchange Demo',
        focus_areas: ['Architecture walkthrough preparation', 'Live mentor Q&A review', 'Peer code review feedback'],
        hands_on_project: 'Deploy functional project and conduct 1-hour swap review with mentor.'
      }
    ];
  }
}

export async function generateIcebreakers(
  senderProfile: Partial<User>,
  receiverProfile: Partial<User>,
  skill?: string
): Promise<string[]> {
  try {
    const res = await fetch('/api/ai/icebreaker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderProfile, receiverProfile, skill })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      if (errData.fallback) return errData.fallback;
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('AI Icebreakers fallback triggered:', error);
    return [
      `Hi ${receiverProfile.name || 'there'}! I noticed your mentorship in ${skill || receiverProfile.skillsOffered?.[0] || 'your specialty'}. I have TimeBank credits available and would love to exchange an hour of practical knowledge!`,
      `Hello ${receiverProfile.name || 'friend'}! I am working on expanding my skills in ${skill || 'peer learning'}. In return, I can teach you ${senderProfile.skillsOffered?.slice(0, 2).join(' or ') || 'my domain'}. Would you like to schedule a session?`,
      `Greetings ${receiverProfile.name || 'fellow swapper'}! Our skills have a high synergy score on SkillSwap. How about a 1-hour swap this week where we both walk away with new skills?`
    ];
  }
}

export async function summarizeBioWithAI(
  name: string,
  offeredSkills: string[],
  wantedSkills: string[],
  roughBio: string
): Promise<{ summary: string; highlighted_strengths: string[] }> {
  try {
    const res = await fetch('/api/ai/summarize-bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, offeredSkills, wantedSkills, roughBio })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      if (errData.fallback) return errData.fallback;
      throw new Error(errData.error || `HTTP error ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('AI Bio Summarize fallback triggered:', error);
    return {
      summary: `${name} is an active practitioner with demonstrated strength in ${offeredSkills.slice(0, 3).join(', ')}. Currently expanding capabilities in ${wantedSkills.slice(0, 2).join(', ')} through structured TimeBank peer learning.`,
      highlighted_strengths: [
        'TimeBank Contributor',
        'Peer Mentorship',
        ...(offeredSkills.slice(0, 2))
      ]
    };
  }
}
