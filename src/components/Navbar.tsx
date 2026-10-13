import React from 'react';
import { 
  Clock, 
  Sparkles, 
  Search, 
  MessageSquare, 
  Video, 
  Wallet, 
  ShieldCheck, 
  User as UserIcon, 
  BookOpen,
  ArrowRightLeft,
  ChevronDown,
  Layers
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User;
  onOpenArchitectureModal: () => void;
  availableUsers: User[];
  onSwitchUser: (user: User) => void;
  onOpenSwapModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenArchitectureModal,
  availableUsers,
  onSwitchUser,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'explore', label: 'Explore & AI Match', icon: Search },
    { id: 'chat', label: 'Swaps & Chat', icon: MessageSquare, badge: '2' },
    { id: 'live', label: 'Live Session', icon: Video, pulse: true },
    { id: 'wallet', label: 'TimeBank Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner for System Architecture Notice */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 px-4 py-1.5 text-xs text-white flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              TimeBank Protocol
            </span>
            <span>SkillSwap Community Network • Non-Monetary Peer Knowledge Exchange (1 hr = 1 Credit)</span>
          </div>
          <button
            onClick={onOpenArchitectureModal}
            className="flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-slate-100 px-2.5 py-0.5 rounded font-semibold text-[11px] shadow-xs transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>System Architecture & SQL DDL</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">SkillSwap</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  TimeBank
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Community Knowledge Exchange</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>

                  {item.pulse && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}

                  {item.badge && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: TimeBank Balance Pill + User Switcher */}
          <div className="flex items-center gap-3">
            {/* Live Credit Wallet Pill */}
            <div 
              onClick={() => setCurrentTab('wallet')}
              className="group cursor-pointer flex items-center gap-2 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 px-3 py-1.5 rounded-full transition-all shadow-xs"
              title="1 Hour taught = 1 Time Credit. Click to view TimeBank Wallet ledger."
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                <Clock className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-emerald-800 font-medium leading-none">Time Credit</span>
                <span className="text-xs font-extrabold text-emerald-900 leading-tight">
                  {currentUser.timeCreditBalance.toFixed(1)} <span className="text-[10px] font-semibold text-emerald-700">hrs</span>
                </span>
              </div>
            </div>

            {/* Persona Switcher / Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-emerald-500/20"
                />
                <div className="hidden lg:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                    <span>{currentUser.name.split(' ')[0]}</span>
                    <span className="text-[10px] px-1 py-0.2 bg-slate-100 text-slate-600 rounded uppercase font-semibold">
                      {currentUser.role}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate max-w-[90px]">
                    {currentUser.title.split('&')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Demo Persona Switcher
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Switch accounts instantly to explore peer interactions:
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {availableUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          onSwitchUser(user);
                          setUserDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center gap-2.5 hover:bg-slate-50 transition-colors text-left ${
                          user.id === currentUser.id ? 'bg-emerald-50/70 border-l-4 border-emerald-500' : ''
                        }`}
                      >
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{user.title}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] font-extrabold text-emerald-700">
                            {user.timeCreditBalance.toFixed(1)} cr
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 px-3 pt-2 pb-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentTab('auth');
                      }}
                      className="w-full text-center text-xs text-indigo-600 hover:text-indigo-800 font-semibold py-1 hover:bg-indigo-50 rounded"
                    >
                      Sign In / Sign Up as New Member &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav items row */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200 px-2 py-1.5 gap-1 bg-slate-50/70">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs whitespace-nowrap font-semibold ${
                isActive ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-200/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
