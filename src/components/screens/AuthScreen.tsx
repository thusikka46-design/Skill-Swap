import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';
import { User, UserRole } from '../../types';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
  availableUsers: User[];
  setCurrentTab: (tab: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  availableUsers,
  setCurrentTab,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('both');
  const [statusMsg, setStatusMsg] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatusMsg('Authenticating...');
    setTimeout(() => {
      // Create new user or find existing
      const existing = availableUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        onLoginSuccess(existing);
      } else {
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: name || email.split('@')[0],
          email,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
          title: role === 'mentor' ? 'Community Mentor' : role === 'learner' ? 'Enthusiastic Learner' : 'Reciprocal Peer Swapper',
          role,
          bio: 'Newly joined member ready to participate in reciprocal peer learning through the TimeBank network.',
          timeCreditBalance: 3.0, // 3.0 Welcome credit
          hoursTaught: 0,
          hoursLearned: 0,
          averageRating: 5.0,
          reviewCount: 0,
          location: 'Remote Global',
          availability: 'Flexible',
          skillsOffered: ['General Problem Solving', 'Digital Literacy'],
          skillsWanted: ['Web Development', 'UI/UX Design'],
          highlightedStrengths: ['Motivated Learner', 'Active Collaborator'],
          verifiedStatus: true,
          joinedDate: 'Just now'
        };
        onLoginSuccess(newUser);
      }
      setCurrentTab('profile');
    }, 600);
  };

  const handleGoogleMock = () => {
    setStatusMsg('Connecting with Google Workspace OAuth...');
    setTimeout(() => {
      const demoUser = availableUsers[0];
      onLoginSuccess(demoUser);
      setCurrentTab('explore');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 mb-3">
          <ArrowRightLeft className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {isSignUp ? 'Join the SkillSwap TimeBank' : 'Welcome Back to SkillSwap'}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {isSignUp 
            ? 'Sign up to receive 3.0 Welcome Time Credits and start trading knowledge.'
            : 'Access your TimeBank wallet, active swap requests, and live sessions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main Auth Form */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-left">
          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleMock}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-xl font-semibold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs mb-6 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Or with email
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>

            {/* Role Selection (Learner, Mentor, Both) */}
            {isSignUp && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Select Your TimeBank Community Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('learner')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      role === 'learner'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                    <span>Learner</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('mentor')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      role === 'mentor'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Award className="w-4 h-4 mx-auto mb-1 text-slate-500" />
                    <span>Mentor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('both')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      role === 'both'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ArrowRightLeft className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>Both (Dual)</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 italic">
                  *Dual swappers can both teach to earn credits and learn by spending credits.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-emerald-600/20 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSignUp ? 'Create TimeBank Account (+3 Credits)' : 'Sign In To Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {statusMsg && (
            <p className="text-center text-xs font-semibold text-emerald-600 mt-3 animate-pulse">
              {statusMsg}
            </p>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setStatusMsg('');
              }}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account yet? Register for free"}
            </button>
          </div>
        </div>

        {/* Right Column: Demo Accounts & Quick-Login */}
        <div className="md:col-span-5 space-y-4 text-left">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Demo Accounts Quick-Login
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Select any pre-configured seed persona to immediately test user interactions, peer swaps, and TimeBank balance transfers:
            </p>

            <div className="space-y-2">
              {availableUsers.slice(0, 4).map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    onLoginSuccess(u);
                    setCurrentTab('explore');
                  }}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl flex items-center justify-between text-left transition-all hover:border-emerald-300 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">{u.name}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[150px]">{u.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700">{u.timeCreditBalance} cr</span>
                    <p className="text-[10px] text-slate-400 capitalize">{u.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>TimeBank Welcome Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every newly registered member receives <strong>3.0 complimentary TimeBank credits</strong> to ensure immediate participation without initial waiting friction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
