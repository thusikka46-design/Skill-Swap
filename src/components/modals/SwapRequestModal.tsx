import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  X 
} from 'lucide-react';
import { User, SwapRequest } from '../../types';

interface SwapRequestModalProps {
  currentUser: User;
  targetUser: User;
  onClose: () => void;
  onSubmitSwap: (swap: SwapRequest) => void;
}

export const SwapRequestModal: React.FC<SwapRequestModalProps> = ({
  currentUser,
  targetUser,
  onClose,
  onSubmitSwap,
}) => {
  const [skillWanted, setSkillWanted] = useState(targetUser.skillsOffered[0] || 'Peer Skills');
  const [skillOffered, setSkillOffered] = useState(currentUser.skillsOffered[0] || 'Technical Skills');
  const [proposedHours, setProposedHours] = useState<number>(1.0);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasEnoughCredit = currentUser.timeCreditBalance >= proposedHours;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasEnoughCredit) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newSwap: SwapRequest = {
        id: `swap-${Date.now()}`,
        requesterId: currentUser.id,
        requesterName: currentUser.name,
        requesterAvatar: currentUser.avatar,
        providerId: targetUser.id,
        providerName: targetUser.name,
        providerAvatar: targetUser.avatar,
        skillOffered,
        skillWanted,
        proposedHours,
        status: 'PENDING',
        notes: notes.trim() || `Proposed 1-on-1 swap trading ${skillOffered} for ${skillWanted}.`,
        createdAt: 'Just now',
        compatibilityScore: 92
      };

      onSubmitSwap(newSwap);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-7 text-left relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Propose TimeBank Skill Swap
              </h3>
              <p className="text-xs text-slate-500">Reciprocal 1-on-1 peer exchange</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Peer Snapshot */}
        <div className="my-4 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={targetUser.avatar}
              alt={targetUser.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{targetUser.name}</p>
              <p className="text-[11px] text-slate-500">{targetUser.title}</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {targetUser.availability}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Skill Desired from Partner */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Skill You Want to Learn (from {targetUser.name})
            </label>
            <select
              value={skillWanted}
              onChange={(e) => setSkillWanted(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            >
              {targetUser.skillsOffered.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>

          {/* Skill Offered in Return */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Skill You Will Teach in Return (from your profile)
            </label>
            <select
              value={skillOffered}
              onChange={(e) => setSkillOffered(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            >
              {currentUser.skillsOffered.map((sk) => (
                <option key={sk} value={sk}>
                  {sk}
                </option>
              ))}
            </select>
          </div>

          {/* Proposed Duration */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Session Duration</label>
              <span className="text-slate-500 font-semibold">
                Cost: <strong className="text-emerald-700">{proposedHours.toFixed(1)} Credit</strong>
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0.5, 1.0, 1.5, 2.0].map((hrs) => (
                <button
                  type="button"
                  key={hrs}
                  onClick={() => setProposedHours(hrs)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                    proposedHours === hrs
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {hrs} {hrs === 1 ? 'Hour' : 'Hours'}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Personalized Swap Notes (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={`Hi ${targetUser.name}, I would love to collaborate! I have a working sample to show and would appreciate your guidance...`}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          {/* Balance Check */}
          {!hasEnoughCredit ? (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                Insufficient TimeBank balance ({currentUser.timeCreditBalance.toFixed(1)} cr available). Teach another member to earn more credits first!
              </span>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Wallet Balance: {currentUser.timeCreditBalance.toFixed(1)} hrs</span>
              </span>
              <span className="font-bold text-emerald-700">✓ Balance Verified</span>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!hasEnoughCredit || isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Sending Request...' : 'Submit Swap Proposal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
