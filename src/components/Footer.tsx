import React from 'react';
import { ArrowRightLeft, Shield, Clock, Heart, Award, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenArchitectureModal: () => void;
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchitectureModal, setCurrentTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Manifesto */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">SkillSwap</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A decentralized, non-monetary community knowledge exchange where 1 hour of teaching equals 1 time credit.
              Democratizing education with equality, trust, and Google Gemini AI assistance.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit">
              <Clock className="w-3.5 h-3.5" />
              <span>TimeBank Ratio: 1 hr = 1.0 Credit</span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Community Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('explore')} className="hover:text-emerald-600 transition-colors">
                  AI Skill Matching Engine
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('chat')} className="hover:text-emerald-600 transition-colors">
                  Swap Proposals & Icebreaker AI
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('live')} className="hover:text-emerald-600 transition-colors">
                  Live Classroom & AI Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('wallet')} className="hover:text-emerald-600 transition-colors">
                  Double-Entry TimeBank Ledger
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin')} className="hover:text-emerald-600 transition-colors">
                  Admin Audit & Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Technical Reference */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">System Specifications</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenArchitectureModal} className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  <Sparkles className="w-3 h-3" />
                  <span>PostgreSQL 3NF DDL Scripts</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenArchitectureModal} className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  <Sparkles className="w-3 h-3" />
                  <span>Gemini 3.8 Flash System Prompt</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenArchitectureModal} className="text-indigo-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer">
                  <Sparkles className="w-3 h-3" />
                  <span>Express API AI Endpoints</span>
                </button>
              </li>
              <li>
                <span className="text-slate-400">TimeBank Economic Integrity Theorem</span>
              </li>
            </ul>
          </div>

          {/* Platform Standards Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Open Community Architecture</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                TimeBank protocol ensuring fair peer-to-peer knowledge exchange powered by Gemini AI and PostgreSQL.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Protocol: Active</span>
              <span className="text-emerald-600 font-bold">1:1 Hour Valuation</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 SkillSwap Community Network. Non-profit open knowledge architecture.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified Escrow Security
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> Zero Monetary Friction
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
