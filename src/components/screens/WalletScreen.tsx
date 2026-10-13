import React, { useState } from 'react';
import { 
  Wallet, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  FileText, 
  History, 
  Layers, 
  Sparkles,
  MessageSquare,
  Lock,
  Plus
} from 'lucide-react';
import { User, TimeBankTransaction, Review } from '../../types';

interface WalletScreenProps {
  currentUser: User;
  transactions: TimeBankTransaction[];
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onOpenArchitectureModal: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  currentUser,
  transactions,
  reviews,
  onAddReview,
  onOpenArchitectureModal,
}) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'reviews'>('transactions');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Review form state
  const [reviewerScore, setReviewerScore] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedPartnerName, setSelectedPartnerName] = useState('Marcus Thorne');
  const [selectedSkillExchanged, setSelectedSkillExchanged] = useState('Docker & DevOps');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      sessionId: `sess-${Date.now()}`,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      reviewerAvatar: currentUser.avatar,
      revieweeId: 'user-marcus',
      revieweeName: selectedPartnerName,
      ratingScore: reviewerScore,
      feedbackText: feedbackText.trim(),
      createdAt: 'Just now',
      skillExchanged: selectedSkillExchanged
    };

    onAddReview(newRev);
    setFeedbackText('');
    setShowReviewModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      {/* Wallet Top Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Credit Balance Card */}
        <div className="lg:col-span-7 bg-gradient-to-br from-emerald-700 via-teal-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-emerald-950/15 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                TimeBank Personal Balance
              </span>
            </div>
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
              Verified Ledger Node
            </span>
          </div>

          <div className="my-6">
            <span className="text-xs text-emerald-200 block mb-1">Available Exchange Credits</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {currentUser.timeCreditBalance.toFixed(1)}
              </span>
              <span className="text-lg font-bold text-emerald-200">Hours</span>
            </div>
            <p className="text-xs text-emerald-100 mt-2">
              Entitles you to {currentUser.timeCreditBalance.toFixed(1)} hours of 1-on-1 expert mentorship from any community peer.
            </p>
          </div>

          <div className="pt-4 border-t border-white/20 grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-emerald-200 block text-[11px]">Lifetime Taught</span>
              <strong className="text-sm sm:text-base font-bold">{currentUser.hoursTaught.toFixed(1)} hrs</strong>
            </div>
            <div>
              <span className="text-emerald-200 block text-[11px]">Lifetime Learned</span>
              <strong className="text-sm sm:text-base font-bold">{currentUser.hoursLearned.toFixed(1)} hrs</strong>
            </div>
            <div>
              <span className="text-emerald-200 block text-[11px]">Reputation Score</span>
              <strong className="text-sm sm:text-base font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{currentUser.averageRating.toFixed(2)}</span>
              </strong>
            </div>
          </div>
        </div>

        {/* TimeBank Economic Guarantees Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>TimeBank Economic Rules</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                1:1 Equal Valuation
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-800">1 Hour Taught = 1 Time Credit Earned</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Whether you teach basic HTML or advanced Quantum Computing, every human hour is valued equally.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-800">Automated Smart Escrow</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    When a session is accepted, 1 credit is locked in escrow and only settles upon verified video meeting completion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-slate-800">Non-Monetary Immunity</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Credits cannot be purchased or liquidated into fiat currency, preserving pure collaborative meritocracy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenArchitectureModal}
              className="w-full text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inspect PostgreSQL Double-Entry SQL Schema</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Activity Ledger vs Member Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'transactions'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
              <span>Immutable Ledger ({transactions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
              <span>Community Reviews ({reviews.length})</span>
            </button>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Leave Peer Feedback</span>
          </button>
        </div>

        {/* Tab 1: Transaction Ledger */}
        {activeTab === 'transactions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Type & Status</th>
                  <th className="px-6 py-3 font-semibold">Details & Description</th>
                  <th className="px-6 py-3 font-semibold">Counterparty</th>
                  <th className="px-6 py-3 font-semibold">Timestamp</th>
                  <th className="px-6 py-3 font-semibold text-right">Credit Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((tx) => {
                  const isEarned = tx.transactionType === 'SESSION_EARNED' || tx.transactionType === 'WELCOME_BONUS';
                  const isHold = tx.transactionType === 'ESCROW_HOLD';

                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            isEarned
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isHold
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isEarned ? (
                            <ArrowDownLeft className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 text-slate-500" />
                          )}
                          <span>{tx.transactionType.replace('_', ' ')}</span>
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-800 font-medium">
                        {tx.description}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {tx.senderName || tx.receiverName || 'System Mint'}
                      </td>

                      <td className="px-6 py-4 text-slate-400 text-[11px]">
                        {tx.timestamp}
                      </td>

                      <td className="px-6 py-4 text-right font-extrabold whitespace-nowrap">
                        <span
                          className={
                            isEarned
                              ? 'text-emerald-700'
                              : isHold
                              ? 'text-amber-700'
                              : 'text-slate-700'
                          }
                        >
                          {isEarned ? '+' : '-'}{tx.creditsTransferred.toFixed(1)} hrs
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Reviews Log */}
        {activeTab === 'reviews' && (
          <div className="p-6 divide-y divide-slate-100 space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 flex items-start gap-4">
                <img
                  src={rev.reviewerAvatar}
                  alt={rev.reviewerName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{rev.reviewerName}</h4>
                      <p className="text-[11px] text-emerald-700 font-semibold">
                        Skill Exchanged: {rev.skillExchanged}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      {Array.from({ length: rev.ratingScore }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-slate-400 text-[10px] ml-1">{rev.createdAt}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    "{rev.feedbackText}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Leave Feedback Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Submit Reciprocal Review</span>
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Peer Partner</label>
                <select
                  value={selectedPartnerName}
                  onChange={(e) => setSelectedPartnerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Marcus Thorne">Marcus Thorne (Docker & DevOps)</option>
                  <option value="Dr. Priya Sharma">Dr. Priya Sharma (Python Data Science)</option>
                  <option value="Amina Al-Mansoor">Amina Al-Mansoor (UI/UX Figma)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rating Score</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      type="button"
                      key={score}
                      onClick={() => setReviewerScore(score)}
                      className={`p-2 rounded-lg border text-xs font-bold transition-all ${
                        reviewerScore >= score
                          ? 'bg-amber-50 text-amber-700 border-amber-300'
                          : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      ★ {score}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Feedback & Praise</label>
                <textarea
                  rows={4}
                  required
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="How was the teaching clarity, patience, and practical application of the session?..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
