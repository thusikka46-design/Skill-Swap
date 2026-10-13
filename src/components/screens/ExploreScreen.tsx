import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRightLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  MessageSquare, 
  Zap,
  SlidersHorizontal,
  ChevronRight,
  Layers
} from 'lucide-react';
import { User, AIMatchResult } from '../../types';
import { computeAIMatch } from '../../services/aiService';

interface ExploreScreenProps {
  currentUser: User;
  users: User[];
  onOpenSwapModal: (targetUser: User) => void;
  onOpenChatWithUser: (targetUser: User) => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  currentUser,
  users,
  onOpenSwapModal,
  onOpenChatWithUser,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  
  // State for on-demand Gemini AI Match modal analysis
  const [evaluatingUserId, setEvaluatingUserId] = useState<string | null>(null);
  const [activeAnalysisModal, setActiveAnalysisModal] = useState<{
    user: User;
    result: AIMatchResult;
  } | null>(null);

  // Filter out self
  const candidateUsers = users.filter((u) => u.id !== currentUser.id);

  // Filter logic
  const filteredUsers = candidateUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.skillsOffered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      u.skillsWanted.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      u.skillsOffered.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesAvailability =
      selectedAvailability === 'All' || u.availability === selectedAvailability;

    const matchesRating = u.averageRating >= minRating;

    return matchesSearch && matchesCategory && matchesAvailability && matchesRating;
  });

  // Calculate quick synergy estimate or run live Gemini match
  const handleRunLiveAIMatch = async (targetUser: User) => {
    setEvaluatingUserId(targetUser.id);
    try {
      const matchResult = await computeAIMatch(currentUser, targetUser);
      setActiveAnalysisModal({ user: targetUser, result: matchResult });
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluatingUserId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-emerald-950/10">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Gemini AI Matchmaking Engine (POST /api/ai/match)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Discover Peer Mentors & High-Synergy Skill Swaps
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Our algorithmic engine analyzes your skills wanted against peer mentors' teaching repertoires to calculate bidirectional compatibility, ensuring zero-monetary friction and equal value exchange.
          </p>
        </div>
      </div>

      {/* Search & Dynamic Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill (e.g. React, Python, Docker, Figma), member name, or domain..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-900"
            />
          </div>

          {/* Quick Category Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 bg-white"
            >
              <option value="All">All Disciplines</option>
              <option value="React">React & Frontend</option>
              <option value="Python">Python & Machine Learning</option>
              <option value="Design">UI/UX & Figma</option>
              <option value="Docker">Cloud & DevOps</option>
              <option value="Audio">Audio & Multimedia</option>
              <option value="Marketing">Growth & Marketing</option>
            </select>

            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="px-3 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 bg-white"
            >
              <option value="All">Any Availability</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Filter Badges & Count */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{filteredUsers.length} potential swappers found</span>
            <span>• Matching your profile: <strong className="text-emerald-700">{currentUser.skillsWanted.join(', ')}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span>Min Rating:</span>
            {[0, 4.5, 4.8].map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  minRating === rating
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {rating === 0 ? 'All' : `${rating}+ ★`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Swapper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          // Calculate dynamic compatibility preview
          const complementary = (currentUser.skillsWanted || []).filter((s) =>
            user.skillsOffered.some((o) => o.toLowerCase().includes(s.toLowerCase()))
          );
          const reverseMatches = (user.skillsWanted || []).filter((s) =>
            currentUser.skillsOffered.some((o) => o.toLowerCase().includes(s.toLowerCase()))
          );
          const baseScore = Math.min(97, 72 + complementary.length * 12 + reverseMatches.length * 8);

          return (
            <div
              key={user.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden text-left"
            >
              <div>
                {/* Card Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900">{user.name}</h3>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{user.title}</p>
                      </div>
                    </div>

                    {/* Compatibility Score Pill */}
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-emerald-800 text-[11px] font-extrabold shadow-2xs">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{baseScore}% Match</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{user.availability}</p>
                    </div>
                  </div>

                  {/* Bio snippet */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {user.bio}
                  </p>
                </div>

                {/* Skills Sections */}
                <div className="px-5 py-3 bg-slate-50/70 border-y border-slate-100 space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block mb-1">
                      Can Teach You (Offered):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsOffered.map((sk) => {
                        const isMatch = currentUser.skillsWanted.some((w) =>
                          sk.toLowerCase().includes(w.toLowerCase())
                        );
                        return (
                          <span
                            key={sk}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isMatch
                                ? 'bg-emerald-600 text-white font-bold shadow-2xs'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {isMatch ? '★ ' : ''}{sk}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-800 tracking-wider block mb-1">
                      Wants to Learn (Needed):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsWanted.map((sk) => {
                        const isReciprocal = currentUser.skillsOffered.some((o) =>
                          sk.toLowerCase().includes(o.toLowerCase())
                        );
                        return (
                          <span
                            key={sk}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              isReciprocal
                                ? 'bg-indigo-600 text-white font-bold shadow-2xs'
                                : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                            }`}
                          >
                            {isReciprocal ? '⇄ ' : ''}{sk}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="px-5 py-2.5 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{user.averageRating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({user.reviewCount} swaps)</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 font-medium text-[11px]">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{user.timeCreditBalance.toFixed(1)} cr balance</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-2 border-t border-slate-100 flex items-center gap-2">
                {/* On-demand Gemini AI Compatibility Test */}
                <button
                  type="button"
                  onClick={() => handleRunLiveAIMatch(user)}
                  disabled={evaluatingUserId === user.id}
                  className="flex-1 py-2 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  title="Call Gemini API to calculate precise compatibility rationale"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-indigo-600 ${evaluatingUserId === user.id ? 'animate-spin' : ''}`} />
                  <span>{evaluatingUserId === user.id ? 'Analyzing...' : 'AI Rationale'}</span>
                </button>

                {/* Propose Swap Button */}
                <button
                  type="button"
                  onClick={() => onOpenSwapModal(user)}
                  className="flex-1 py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Propose Swap</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-500 text-sm">No peers found matching your current filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedAvailability('All');
              setMinRating(0);
            }}
            className="mt-3 text-xs font-bold text-emerald-600 hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Live Gemini AI Analysis Modal */}
      {activeAnalysisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 text-left relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Gemini AI Matchmaker Analysis
                  </h3>
                  <p className="text-[11px] text-slate-500">POST /api/ai/match output</p>
                </div>
              </div>
              <button
                onClick={() => setActiveAnalysisModal(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Score Display */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Compatibility Index
                  </span>
                  <p className="text-2xl font-extrabold text-emerald-900">
                    {activeAnalysisModal.result.compatibility_score}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 font-semibold bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                    Optimal TimeBank Exchange
                  </span>
                </div>
              </div>

              {/* Rationale */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  2-Sentence Reasoning
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {activeAnalysisModal.result.reasoning}
                </p>
              </div>

              {/* Complementary Skills */}
              {activeAnalysisModal.result.complementary_skills && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Reciprocal Skill Pairings
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeAnalysisModal.result.complementary_skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Step */}
              {activeAnalysisModal.result.recommended_first_step && (
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <h5 className="text-[11px] font-bold text-slate-700 uppercase">Recommended Next Step:</h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {activeAnalysisModal.result.recommended_first_step}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveAnalysisModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const target = activeAnalysisModal.user;
                  setActiveAnalysisModal(null);
                  onOpenSwapModal(target);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Send Proposal to {activeAnalysisModal.user.name} &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
