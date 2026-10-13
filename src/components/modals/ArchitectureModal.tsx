import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Database, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Terminal,
  Code,
  Layers,
  Award
} from 'lucide-react';
import { POSTGRESQL_DDL_SCHEMA, ARCHITECTURE_EXPLANATION } from '../../data/sqlSchema';

interface ArchitectureModalProps {
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'sql' | 'backend' | 'system_prompt' | 'architecture'>('sql');
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const SYSTEM_INSTRUCTION_TEXT = `You are the SkillSwap Community Network AI Orchestrator, an intelligent matchmaking and pedagogical agent for a non-monetary peer-to-peer skill exchange platform.
Your objective is to foster equitable, high-value skill trades governed by a TimeBank economy (1 hour taught = 1 time credit earned).

GUIDELINES & BEHAVIOR:
1. Bidirectional Synergy Calculation:
   - When evaluating two member profiles (User A & User B), compute a reciprocal compatibility percentage between 0% and 100%.
   - Award high compatibility when User A's offered skills directly satisfy User B's learning desires AND User B's offerings satisfy User A's learning desires.
   - Formulate precisely a 2-sentence rationale outlining the symbiotic learning trade.

2. Syllabus & Roadmap Synthesis:
   - Generate pedagogical day-by-day syllabi tailored to peer sessions (1 hour daily units).
   - Ensure each day pairs theoretical foundations with a concrete hands-on milestone project.

3. Outreach Icebreakers:
   - Draft 3 respectful, highly encouraging opening messages.
   - Emphasize the non-monetary TimeBank credit model (no money changes hands; fair human time banking).

4. Strict JSON Output:
   - Always return pure JSON conforming to the requested schema. Never wrap in markdown commentary or unsolicited conversational filler.`;

  const BACKEND_EXPRESS_CONTROLLER_CODE = `// ====================================================================
// SKILLSWAP EXPRESS CONTROLLER - GEMINI 3.8 FLASH INTEGRATION
// File: server.ts / controllers/aiController.ts
// SDK: @google/genai
// ====================================================================

import { GoogleGenAI, Type } from '@google/genai';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
});

// -------------------------------------------------------------
// 1. POST /api/ai/match -> Calculates compatibility & rationale
// -------------------------------------------------------------
app.post('/api/ai/match', async (req: Request, res: Response) => {
  const { userA, userB } = req.body;

  const prompt = \`Compare these two SkillSwap members:
Member A: \${userA.name}, Teaches: \${JSON.stringify(userA.skillsOffered)}, Wants: \${JSON.stringify(userA.skillsWanted)}
Member B: \${userB.name}, Teaches: \${JSON.stringify(userB.skillsOffered)}, Wants: \${JSON.stringify(userB.skillsWanted)}
Calculate Compatibility (0-100) and provide a 2-sentence rationale in strict JSON.\`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          compatibility_score: { type: Type.INTEGER },
          reasoning: { type: Type.STRING },
          complementary_skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommended_first_step: { type: Type.STRING }
        },
        required: ['compatibility_score', 'reasoning']
      }
    }
  });

  return res.json(JSON.parse(response.text || '{}'));
});

// -------------------------------------------------------------
// 2. POST /api/ai/roadmap -> Daily structured learning syllabus
// -------------------------------------------------------------
app.post('/api/ai/roadmap', async (req: Request, res: Response) => {
  const { skillName, duration = '7 Days' } = req.body;

  const prompt = \`Create a peer learning roadmap for "\${skillName}" over "\${duration}".
Include day index, topic, 3 focus areas, and a hands-on project.\`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.INTEGER },
            topic: { type: Type.STRING },
            focus_areas: { type: Type.ARRAY, items: { type: Type.STRING } },
            hands_on_project: { type: Type.STRING }
          },
          required: ['day', 'topic', 'focus_areas', 'hands_on_project']
        }
      }
    }
  });

  return res.json(JSON.parse(response.text || '[]'));
});

// -------------------------------------------------------------
// 3. POST /api/ai/icebreaker -> 3 Tailored Outreach Messages
// -------------------------------------------------------------
app.post('/api/ai/icebreaker', async (req: Request, res: Response) => {
  const { senderProfile, receiverProfile, skill } = req.body;

  const prompt = \`Generate 3 distinct initial outreach messages for SkillSwap TimeBank proposal.
Sender: \${senderProfile.name} (offers: \${JSON.stringify(senderProfile.skillsOffered)})
Receiver: \${receiverProfile.name} (teaches: \${JSON.stringify(receiverProfile.skillsOffered)})\`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  return res.json(JSON.parse(response.text || '[]'));
});`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[85vh] text-left">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  System Architecture & Technical Blueprint
                </h2>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Production Grade
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                SkillSwap Community Network • PostgreSQL 15+ Schema & Gemini AI Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'sql'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>1. PostgreSQL DDL Schema (7 Tables + Triggers)</span>
          </button>

          <button
            onClick={() => setActiveTab('backend')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'backend'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-indigo-600" />
            <span>2. Express Controller & Gemini Endpoints</span>
          </button>

          <button
            onClick={() => setActiveTab('system_prompt')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'system_prompt'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>3. Gemini Agent System Instructions</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'architecture'
                ? 'bg-white text-emerald-800 border-t-2 border-emerald-600 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>4. TimeBank Economic Theorem & 3NF ER</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Production Relational PostgreSQL DDL Script
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete with Primary Keys, Foreign Keys, CHECK Constraints, B-Tree Indexes, and Atomic Settlement Trigger.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(POSTGRESQL_DDL_SCHEMA, 'sql')}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {copied === 'sql' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'sql' ? 'Copied to Clipboard!' : 'Copy SQL DDL'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-emerald-300 font-mono text-xs p-4 rounded-2xl overflow-x-auto shadow-inner border border-slate-800 max-h-[500px]">
                <pre>{POSTGRESQL_DDL_SCHEMA}</pre>
              </div>
            </div>
          )}

          {activeTab === 'backend' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Modular Node.js / Express Controllers (`@google/genai` SDK)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct integration with model `gemini-3.8-flash` returning strict typed JSON schemas.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(BACKEND_EXPRESS_CONTROLLER_CODE, 'backend')}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {copied === 'backend' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'backend' ? 'Copied Code!' : 'Copy Express Code'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-indigo-200 font-mono text-xs p-4 rounded-2xl overflow-x-auto shadow-inner border border-slate-800 max-h-[500px]">
                <pre>{BACKEND_EXPRESS_CONTROLLER_CODE}</pre>
              </div>
            </div>
          )}

          {activeTab === 'system_prompt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    System Instructions for Gemini Model in Google AI Studio
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configured inside Google AI Studio system instructions tab for profile matching, roadmaps, and icebreaker generation.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(SYSTEM_INSTRUCTION_TEXT, 'prompt')}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {copied === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'prompt' ? 'Copied Prompt!' : 'Copy System Prompt'}</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-2xl text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap shadow-xs">
                {SYSTEM_INSTRUCTION_TEXT}
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>TimeBank Economic Proof & Solvency Theorem</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In a conventional fiat economy, educational exchanges suffer from pricing friction, paywalls, and unequal access.
                  Under the <strong>SkillSwap TimeBank Protocol</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <strong className="text-emerald-900 block mb-1">Conservation of Time</strong>
                    <p className="text-slate-600 text-[11px]">
                      Credits can only be created via registered welcome seeding (+3.0) or by delivering verified teaching time (+1.0 hr). No credit creation out of thin air.
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                    <strong className="text-indigo-900 block mb-1">Double-Entry Balance</strong>
                    <p className="text-slate-600 text-[11px]">
                      When a session completes, exactly 1.0 credit is deducted from learner and credited to mentor. Total circulating supply delta = 0.
                    </p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                    <strong className="text-teal-900 block mb-1">Audit Guarantee</strong>
                    <p className="text-slate-600 text-[11px]">
                      Every credit transfer produces an immutable record in `timebank_transactions`, ensuring zero balance falsification and full cryptographic consistency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Relational Entity Relationship (ER) Mapping
                </h3>
                <div className="text-xs text-slate-600 space-y-2">
                  <p>• <strong>Users</strong> 1 ── ∞ <strong>UserSkills</strong> ∞ ── 1 <strong>Skills</strong> (Third Normal Form junction)</p>
                  <p>• <strong>Users</strong> 1 ── ∞ <strong>SwapRequests</strong> (Requester & Provider foreign keys)</p>
                  <p>• <strong>SwapRequests</strong> 1 ── 1 <strong>Sessions</strong> (Enforces unique meeting room link)</p>
                  <p>• <strong>Sessions</strong> 1 ── ∞ <strong>TimeBankTransactions</strong> (Automated ledger trigger linking)</p>
                  <p>• <strong>Sessions</strong> 1 ── ∞ <strong>Reviews</strong> (Reciprocal 5-star feedback verification)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>SkillSwap Community Network • Technical System Specifications</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
