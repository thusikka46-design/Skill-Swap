import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Search, 
  Zap, 
  Cpu, 
  GraduationCap, 
  Award,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/mockData';
import { User } from '../../types';

interface HomeScreenProps {
  setCurrentTab: (tab: string) => void;
  onOpenArchitectureModal: () => void;
  currentUser: User;
  onSelectCategory?: (category: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setCurrentTab,
  onOpenArchitectureModal,
  currentUser,
}) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 border-b border-slate-200/80 rounded-b-3xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-emerald-800 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Powered by TimeBank Economic Model & Google Gemini AI</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Trade Skills Fairly. <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                  1 Hour Taught = 1 Time Credit Earned.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                SkillSwap is a non-monetary peer knowledge exchange network. Teach what you know, earn guaranteed time credits, and redeem them with expert peers—assisted by Gemini AI for smart matchmaking and customized syllabi.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCurrentTab('explore')}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:scale-102 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Explore Skills & AI Matches</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => setCurrentTab('live')}
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-3.5 rounded-xl border border-slate-300 shadow-xs transition-all hover:border-slate-400"
                >
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>Join Live Demo Room</span>
                </button>

                <button
                  onClick={onOpenArchitectureModal}
                  className="flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3.5 py-3 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>System Architecture & SQL Schema</span>
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero Currency Exchange</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Strict TimeBank Escrow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Double-Entry Audit Proof</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive TimeBank Simulation Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Live Reciprocal Swap Preview
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Gemini AI Match: 94%
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  {/* Swapper A */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser.avatar}
                        alt="Devon"
                        className="w-10 h-10 rounded-lg object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">{currentUser.name} (You)</p>
                        <p className="text-[11px] text-emerald-600 font-semibold">Teaches: React.js & TypeScript</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-800">+1.0 Credit</span>
                      <p className="text-[10px] text-slate-400">upon session end</p>
                    </div>
                  </div>

                  {/* Swap Indicator */}
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                      <ArrowRightLeft className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Swapper B */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
                        alt="Dr. Priya"
                        className="w-10 h-10 rounded-lg object-cover ring-2 ring-indigo-500/20"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Dr. Priya Sharma</p>
                        <p className="text-[11px] text-indigo-600 font-semibold">Teaches: Python & Data Science</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-800">-1.0 Credit</span>
                      <p className="text-[10px] text-slate-400">escrow released</p>
                    </div>
                  </div>
                </div>

                {/* Gemini Rationale Quote */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Gemini AI Synergy Analysis:</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 italic">
                    "Both peers have mutual high-demand skill offerings with complementary 1.0 hour availability. Balanced trade detected."
                  </p>
                </div>

                {/* Action button inside card */}
                <button
                  onClick={() => setCurrentTab('chat')}
                  className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Active Swap Channel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Exchanged Hours</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">2,480+</div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>+18.4% this week</span>
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Swappers</span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">620+</div>
            <p className="text-[11px] text-indigo-600 font-semibold mt-1">
              Verified community members
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Skills Catalog</span>
              <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">180+</div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Tech, design, data & languages
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Student Tuition Saved</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-emerald-700">$98,400</div>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Non-monetary TimeBank equity
            </p>
          </div>
        </div>
      </section>

      {/* "How TimeBank Works" Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Fair Economic Model
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How The TimeBank System Operates
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Every hour of human time is valued equally. No monetary barrier, no paywalls, just reciprocal community value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm mb-4 group-hover:scale-105 transition-transform">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">List Your Skills</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Define the skills you can teach and skills you desire to learn. Gemini AI automatically organizes and tags your competencies.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-extrabold flex items-center justify-center text-sm mb-4 group-hover:scale-105 transition-transform">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">AI Compatibility Match</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Gemini calculates a bidirectional synergy percentage (0-100%) and drafts personalized outreach icebreakers to initiate swaps.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-extrabold flex items-center justify-center text-sm mb-4 group-hover:scale-105 transition-transform">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Live 1-on-1 Session</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Connect in the live video room with built-in syllabus roadmap, interactive notes, and session timer with escrow protection.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm mb-4 group-hover:scale-105 transition-transform">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">Automatic Credit Release</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Upon session completion, the PostgreSQL stored procedure automatically credits 1.0 hour to the mentor's TimeBank wallet.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Skill Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Skill Categories
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Explore hundreds of verified peers offering mentorship across diverse domains.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('explore')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Directory Skills</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setCurrentTab('explore')}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer text-left group"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs mb-3 border ${cat.color}`}>
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {cat.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{cat.count} mentors active</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white text-left relative overflow-hidden shadow-xl shadow-emerald-900/10">
          <div className="max-w-2xl space-y-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Free 3.0 Welcome Credits For All New Members
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready To Exchange Knowledge Without Spending A Penny?
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Join Devon, Amina, Dr. Priya, and 600+ professionals. Share your skills, earn TimeBank credits, and unlock masterclasses on-demand.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentTab('explore')}
                className="bg-white text-emerald-900 hover:bg-slate-100 font-bold px-6 py-3 rounded-xl shadow-md text-xs sm:text-sm transition-all"
              >
                Find A Skill Match Now
              </button>
              <button
                onClick={() => setCurrentTab('profile')}
                className="bg-emerald-900/40 hover:bg-emerald-900/60 border border-white/20 text-white font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all"
              >
                Setup Your Skills Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
