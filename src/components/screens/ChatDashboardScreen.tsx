import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  ArrowRightLeft, 
  Clock, 
  Video, 
  CheckCheck, 
  Check, 
  MoreVertical, 
  User as UserIcon,
  HelpCircle,
  Calendar,
  X
} from 'lucide-react';
import { User, SwapRequest } from '../../types';
import { generateIcebreakers } from '../../services/aiService';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

interface ChatDashboardScreenProps {
  currentUser: User;
  users: User[];
  swapRequests: SwapRequest[];
  setCurrentTab: (tab: string) => void;
  activeChatUserId?: string;
}

export const ChatDashboardScreen: React.FC<ChatDashboardScreenProps> = ({
  currentUser,
  users,
  swapRequests,
  setCurrentTab,
  activeChatUserId,
}) => {
  // Select active conversation
  const peerUsers = users.filter((u) => u.id !== currentUser.id);
  const [selectedUserId, setSelectedUserId] = useState<string>(
    activeChatUserId || (peerUsers[0]?.id || '')
  );
  
  const selectedPeer = users.find((u) => u.id === selectedUserId) || peerUsers[0];

  // Conversation messages state
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    'user-priya': [
      {
        id: 'm1',
        senderId: 'user-priya',
        text: 'Hi Devon! I noticed you are an architect in React & Tailwind CSS. I would love to exchange practical Python data analysis techniques for a walkthrough on modern React hooks!',
        timestamp: 'Yesterday, 14:32',
      },
      {
        id: 'm2',
        senderId: 'user-current',
        text: 'Hello Dr. Priya! That is a fantastic synergy. I have 1.0 TimeBank credit ready, and our AI synergy score is 94%. Shall we schedule a 1-hour session on Python NumPy baselines?',
        timestamp: 'Yesterday, 14:40',
      },
      {
        id: 'm3',
        senderId: 'user-priya',
        text: 'Wonderful! I accepted the proposal and placed the session into the Live Hub. See you there tomorrow at 18:00 UTC!',
        timestamp: 'Yesterday, 14:45',
      }
    ],
    'user-marcus': [
      {
        id: 'm4',
        senderId: 'user-marcus',
        text: 'Hey Devon, our Docker multi-stage build session is active in the Live Room right now. Whenever you are ready, hop into the room!',
        timestamp: 'Today, 10:20',
      }
    ],
    'user-amina': [
      {
        id: 'm5',
        senderId: 'user-amina',
        text: 'Hi Devon! Thank you for the last React components session. 1.0 credit has already transferred to your TimeBank wallet.',
        timestamp: '2 days ago',
      }
    ]
  });

  const [inputMessage, setInputMessage] = useState('');
  
  // AI Icebreaker state
  const [isGeneratingIcebreaker, setIsGeneratingIcebreaker] = useState(false);
  const [icebreakerSuggestions, setIcebreakerSuggestions] = useState<string[]>([]);
  const [showIcebreakerDrawer, setShowIcebreakerDrawer] = useState(false);

  // Active swap request linked to this conversation
  const relatedSwap = swapRequests.find(
    (s) =>
      (s.requesterId === currentUser.id && s.providerId === selectedPeer?.id) ||
      (s.providerId === currentUser.id && s.requesterId === selectedPeer?.id)
  );

  const currentMessages = selectedPeer ? messages[selectedPeer.id] || [] : [];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !selectedPeer) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: inputMessage.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => ({
      ...prev,
      [selectedPeer.id]: [...(prev[selectedPeer.id] || []), newMsg],
    }));

    setInputMessage('');
  };

  const handleGenerateIcebreakers = async () => {
    if (!selectedPeer) return;
    setIsGeneratingIcebreaker(true);
    setShowIcebreakerDrawer(true);
    try {
      const suggestions = await generateIcebreakers(
        currentUser,
        selectedPeer,
        selectedPeer.skillsOffered[0] || 'Technical Skills'
      );
      setIcebreakerSuggestions(suggestions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingIcebreaker(false);
    }
  };

  const handleSelectIcebreaker = (text: string) => {
    setInputMessage(text);
    setShowIcebreakerDrawer(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-left">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[750px] flex flex-col md:flex-row">
        {/* Left Sidebar: Conversations List */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <h2 className="text-sm font-extrabold text-slate-900 flex items-center justify-between">
              <span>Swap Channels</span>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                {peerUsers.length} Active
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">TimeBank Escrow Messaging</p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {peerUsers.map((peer) => {
              const isSelected = selectedPeer?.id === peer.id;
              const lastMsg = (messages[peer.id] || [])[messages[peer.id]?.length - 1];
              return (
                <button
                  key={peer.id}
                  onClick={() => {
                    setSelectedUserId(peer.id);
                    setShowIcebreakerDrawer(false);
                  }}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-50/80 border-l-4 border-emerald-600' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">{peer.name}</p>
                      <span className="text-[10px] text-slate-400">
                        {lastMsg ? lastMsg.timestamp.split(',')[0] : 'Ready'}
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700 font-semibold truncate mt-0.5">
                      Teaches: {peer.skillsOffered[0]}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : 'Tap to start discussion with AI Icebreaker'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-white border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Escrow protects 1.0 hr credit until meeting completion.</span>
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedPeer ? (
            <>
              {/* Chat Header with Partner Details & Proposed Swap Status */}
              <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPeer.avatar}
                    alt={selectedPeer.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{selectedPeer.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                        {selectedPeer.availability}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Teaches <strong className="text-emerald-700">{selectedPeer.skillsOffered.slice(0, 2).join(', ')}</strong> • Wants <strong className="text-indigo-700">{selectedPeer.skillsWanted.slice(0, 2).join(', ')}</strong>
                    </p>
                  </div>
                </div>

                {/* Status Bar / Actions */}
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Swap: 1.0 hr TimeBank Escrow Active</span>
                  </div>

                  <button
                    onClick={() => setCurrentTab('live')}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Live Session</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/40">
                {/* Initial Swap Context Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs max-w-lg mx-auto text-center space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>TimeBank Exchange Channel Initiated</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {currentUser.name} teaches <strong>{currentUser.skillsOffered[0]}</strong> ⇄ {selectedPeer.name} teaches <strong>{selectedPeer.skillsOffered[0]}</strong>.
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Both users hold verified community ratings. Credit transfers occur atomically upon video meeting completion.
                  </p>
                </div>

                {currentMessages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                          isMe
                            ? 'bg-emerald-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* AI Icebreaker Drawer / Suggestions */}
              {showIcebreakerDrawer && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-t border-slate-200 animate-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold text-slate-900">
                        Gemini AI Icebreakers (POST /api/ai/icebreaker)
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowIcebreakerDrawer(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {isGeneratingIcebreaker ? (
                    <div className="py-4 text-center text-xs font-semibold text-emerald-700 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>Synthesizing tailored outreach options with Gemini 3.8 Flash...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {icebreakerSuggestions.map((text, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSelectIcebreaker(text)}
                          className="bg-white hover:bg-emerald-50/50 border border-slate-200/90 hover:border-emerald-300 p-2.5 rounded-xl text-xs text-slate-700 cursor-pointer transition-colors text-left flex items-start justify-between gap-2 shadow-2xs"
                        >
                          <span className="leading-snug">"{text}"</span>
                          <span className="text-[10px] font-bold text-emerald-700 whitespace-nowrap bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Use Option {idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  {/* AI Icebreaker Generator Trigger */}
                  <button
                    type="button"
                    onClick={handleGenerateIcebreakers}
                    disabled={isGeneratingIcebreaker}
                    className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
                    title="Generate 3 custom outreach icebreakers using Gemini AI"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-emerald-600 ${isGeneratingIcebreaker ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">AI Ice-breaker</span>
                  </button>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Message ${selectedPeer.name} regarding your TimeBank swap...`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                  />

                  <button
                    type="submit"
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-slate-400 text-sm">
              Select a peer swapper from the left to start communicating.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
