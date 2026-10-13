import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Sparkles, 
  Plus, 
  X, 
  Check, 
  Clock, 
  Award, 
  Star, 
  ShieldCheck, 
  BookOpen, 
  TrendingUp,
  MapPin,
  Calendar,
  Save
} from 'lucide-react';
import { User, ProficiencyLevel } from '../../types';
import { summarizeBioWithAI } from '../../services/aiService';

interface ProfileScreenProps {
  currentUser: User;
  onUpdateUser: (updatedUser: User) => void;
  setCurrentTab: (tab: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  onUpdateUser,
  setCurrentTab,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [title, setTitle] = useState(currentUser.title);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location);
  const [availability, setAvailability] = useState(currentUser.availability);
  
  const [skillsOffered, setSkillsOffered] = useState<string[]>([...currentUser.skillsOffered]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([...currentUser.skillsWanted]);
  const [highlightedStrengths, setHighlightedStrengths] = useState<string[]>([
    ...(currentUser.highlightedStrengths || ['Peer Mentor', 'Problem Solver'])
  ]);

  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  
  const [isAiSummarizing, setIsAiSummarizing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Add skill to offered
  const handleAddOffered = () => {
    if (newOfferedSkill.trim() && !skillsOffered.includes(newOfferedSkill.trim())) {
      setSkillsOffered([...skillsOffered, newOfferedSkill.trim()]);
      setNewOfferedSkill('');
    }
  };

  // Add skill to wanted
  const handleAddWanted = () => {
    if (newWantedSkill.trim() && !skillsWanted.includes(newWantedSkill.trim())) {
      setSkillsWanted([...skillsWanted, newWantedSkill.trim()]);
      setNewWantedSkill('');
    }
  };

  // Remove skills
  const handleRemoveOffered = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };
  const handleRemoveWanted = (skill: string) => {
    setSkillsWanted(skillsWanted.filter((s) => s !== skill));
  };

  // Trigger Gemini AI Bio Summarization & Strengths Extraction
  const handleAiBioSummarize = async () => {
    setIsAiSummarizing(true);
    try {
      const result = await summarizeBioWithAI(name, skillsOffered, skillsWanted, bio);
      if (result.summary) {
        setBio(result.summary);
      }
      if (result.highlighted_strengths && result.highlighted_strengths.length > 0) {
        setHighlightedStrengths(result.highlighted_strengths);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiSummarizing(false);
    }
  };

  // Save changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...currentUser,
      name,
      title,
      bio,
      location,
      availability: availability as any,
      skillsOffered,
      skillsWanted,
      highlightedStrengths,
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      {/* Top Banner & Stat Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-xs" title="Verified Member">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">{currentUser.title}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {currentUser.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Member since {currentUser.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* TimeBank Metrics Snapshot */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl w-full md:w-auto justify-between md:justify-start">
          <div className="text-center px-3 border-r border-slate-200">
            <p className="text-[10px] uppercase font-bold text-slate-400">Time Balance</p>
            <p className="text-lg font-extrabold text-emerald-700">{currentUser.timeCreditBalance.toFixed(1)} hrs</p>
          </div>
          <div className="text-center px-3 border-r border-slate-200">
            <p className="text-[10px] uppercase font-bold text-slate-400">Taught</p>
            <p className="text-lg font-extrabold text-slate-800">{currentUser.hoursTaught.toFixed(1)} hrs</p>
          </div>
          <div className="text-center px-3 border-r border-slate-200">
            <p className="text-[10px] uppercase font-bold text-slate-400">Learned</p>
            <p className="text-lg font-extrabold text-slate-800">{currentUser.hoursLearned.toFixed(1)} hrs</p>
          </div>
          <div className="text-center px-3">
            <p className="text-[10px] uppercase font-bold text-slate-400">Rating</p>
            <p className="text-lg font-extrabold text-amber-600 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{currentUser.averageRating.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Left Column: Skills Management */}
        <div className="lg:col-span-6 space-y-6">
          {/* Skills I Can Teach */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Skills I Can Teach (Earn Credits)</span>
                </h3>
                <p className="text-[11px] text-slate-500">Every 1 hour taught deposits 1.0 credit to your ledger.</p>
              </div>
            </div>

            {/* Tags display */}
            <div className="flex flex-wrap gap-2 mb-4">
              {skillsOffered.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOffered(skill)}
                    className="hover:text-emerald-950 p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input to add */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddOffered();
                  }
                }}
                placeholder="e.g. Next.js, Cloudflare, Figma, SQL..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              />
              <button
                type="button"
                onClick={handleAddOffered}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Skills I Want to Learn */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Skills I Want to Learn (Spend Credits)</span>
                </h3>
                <p className="text-[11px] text-slate-500">Find compatible peer mentors ready to swap.</p>
              </div>
            </div>

            {/* Tags display */}
            <div className="flex flex-wrap gap-2 mb-4">
              {skillsWanted.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWanted(skill)}
                    className="hover:text-indigo-950 p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Input to add */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newWantedSkill}
                onChange={(e) => setNewWantedSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddWanted();
                  }
                }}
                placeholder="e.g. Machine Learning, Kubernetes, Spanish..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
              />
              <button
                type="button"
                onClick={handleAddWanted}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Highlighted Strengths Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Tagged Strengths</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {highlightedStrengths.map((str, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-[11px] font-medium"
                >
                  ✓ {str}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Bio with Gemini Summarize Action & Details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Member Biography & Context</h3>
                <p className="text-[11px] text-slate-500">Share your background and what excites you about skill exchange.</p>
              </div>

              {/* AI Summarize Bio Action Button */}
              <button
                type="button"
                onClick={handleAiBioSummarize}
                disabled={isAiSummarizing}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isAiSummarizing ? 'animate-spin' : ''}`} />
                <span>{isAiSummarizing ? 'Synthesizing...' : 'AI Summarize Bio'}</span>
              </button>
            </div>

            <div>
              <textarea
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your practical experience, projects you have completed, and what topics you love teaching or exploring..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-900 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Tip: Click <strong>"AI Summarize Bio"</strong> above to let Gemini refine your notes into a crisp, professional summary and extract standout competency tags.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Headline Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location / Timezone</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Swap Availability Window</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              >
                <option value="Flexible">Flexible (Anytime by appointment)</option>
                <option value="Evenings">Evenings (18:00 - 22:00 local)</option>
                <option value="Weekends">Weekends Only</option>
                <option value="Weekdays">Weekdays</option>
              </select>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              {savedSuccess ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Profile updated in state!</span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">All fields saved to memory store</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('explore')}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  View in Directory &rarr;
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
