import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share2, 
  PhoneOff, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Users, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar
} from 'lucide-react';
import { User, Session, RoadmapDay } from '../../types';
import { generateLearningRoadmap } from '../../services/aiService';

interface LiveSessionScreenProps {
  currentUser: User;
  session: Session;
  onCompleteSession: (sessionId: string) => void;
  setCurrentTab: (tab: string) => void;
}

export const LiveSessionScreen: React.FC<LiveSessionScreenProps> = ({
  currentUser,
  session,
  onCompleteSession,
  setCurrentTab,
}) => {
  // Video controls
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'notes' | 'agenda'>('roadmap');

  // Simulated 60 min session countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600); // 60 minutes
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(session.status === 'COMPLETED');

  // Interactive collaborative notes
  const [sharedNotes, setSharedNotes] = useState<string>(
    `# SkillSwap Peer Learning Session Notes
Mentor: Marcus Thorne (Cloud Solutions Architect)
Learner: Devon Vance (Senior Frontend Engineer)
Skill Target: Docker & Multi-Stage Containers for React/Next.js SPAs

## Key Takeaways:
1. Use Node-Alpine base image to reduce artifact footprint from 1.2GB to 140MB.
2. Separate dependency installation step to maximize layer caching.
3. Configure non-root user for production security hardening.`
  );

  // AI Roadmap State
  const [roadmapSkill, setRoadmapSkill] = useState<string>(session.skillName || 'Docker & DevOps');
  const [roadmapDuration, setRoadmapDuration] = useState<string>('5 Days');
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);
  const [roadmapDays, setRoadmapDays] = useState<RoadmapDay[]>([
    {
      day: 1,
      topic: 'Container Fundamentals & Engine Architecture',
      focus_areas: ['Images vs Containers vs Volumes', 'Dockerfile primitives: FROM, WORKDIR, COPY', 'Layer caching optimization'],
      hands_on_project: 'Build basic single-stage container for Node.js app'
    },
    {
      day: 2,
      topic: 'Multi-Stage Production Builds',
      focus_areas: ['Builder pattern to discard build tools', 'Alpine Linux & distroless base images', 'Port forwarding & environment variables'],
      hands_on_project: 'Refactor Dockerfile to cut bundle size by 85%'
    },
    {
      day: 3,
      topic: 'Networking & Docker Compose Orchestration',
      focus_areas: ['Bridge networks & service discovery', 'Local PostgreSQL database integration', 'Persistent volume mounting for live dev'],
      hands_on_project: 'Compose file running web frontend + Express API + DB'
    },
    {
      day: 4,
      topic: 'Security Auditing & Non-Root Containers',
      focus_areas: ['Vulnerability scanning with Docker Scout', 'Running as unprivileged UID', 'Read-only root filesystems'],
      hands_on_project: 'Perform vulnerability audit and patch identified CVEs'
    },
    {
      day: 5,
      topic: 'CI/CD Automated Deployment & Production Walkthrough',
      focus_areas: ['GitHub Actions automated docker build', 'Cloud Run / Kubernetes container deployment', 'Architecture Q&A review'],
      hands_on_project: 'End-to-end automated deployment pipeline demonstration'
    }
  ]);

  // Timer tick
  useEffect(() => {
    if (sessionCompleted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionCompleted]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate new roadmap via Gemini API
  const handleGenerateRoadmap = async () => {
    setIsGeneratingRoadmap(true);
    try {
      const generated = await generateLearningRoadmap(roadmapSkill, roadmapDuration);
      if (generated && generated.length > 0) {
        setRoadmapDays(generated);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // Handle session completion & trigger TimeBank credit settlement
  const handleFinishSession = () => {
    setSessionCompleted(true);
    onCompleteSession(session.id);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6 text-left">
      {/* Session Header with TimeBank Escrow Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase">
              {sessionCompleted ? 'Session Finished' : 'Live Classroom Active'}
            </span>
            <span className="text-xs text-slate-400">• Meeting ID: #SS-7729</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {session.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Mentor: <strong className="text-slate-800">{session.mentorName}</strong> ⇄ Learner: <strong className="text-slate-800">{session.learnerName}</strong>
          </p>
        </div>

        {/* Timer & Credit Escrow Release Action */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3 rounded-2xl">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>TimeBank Timer</span>
            </div>
            <p className="text-xl font-mono font-extrabold text-slate-900">
              {formatTimer(secondsRemaining)}
            </p>
          </div>

          <div className="h-8 border-r border-slate-300" />

          {sessionCompleted ? (
            <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>1.0 Credit Transferred!</span>
            </div>
          ) : (
            <button
              onClick={handleFinishSession}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Session & Settle Credit</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Video Feeds on Left, Learning Hub / AI Syllabus on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Simulated Video Room */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 relative aspect-video flex flex-col justify-between p-4">
            {/* Top Overlay */}
            <div className="flex items-center justify-between text-white/90 text-xs z-10">
              <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">{session.skillName} Exchange</span>
              </div>
              <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono">
                1080p WebRTC
              </span>
            </div>

            {/* Simulated Main Video Feed (Mentor: Marcus) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
                alt="Marcus"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-bold flex items-center gap-2">
                <span>Marcus Thorne (Teaching Docker)</span>
                <span className="text-[10px] bg-emerald-600 px-1.5 py-0.2 rounded font-semibold">Mentor</span>
              </div>
            </div>

            {/* Picture-in-Picture: Learner Video Feed (Devon) */}
            <div className="absolute top-4 right-4 w-32 sm:w-40 aspect-video rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl z-20 bg-slate-800">
              {isVideoOn ? (
                <img
                  src={currentUser.avatar}
                  alt="Devon"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white text-xs font-bold">
                  Camera Off
                </div>
              )}
              <div className="absolute bottom-1 left-1.5 text-[10px] text-white font-bold bg-black/60 px-1.5 rounded">
                You (Learner)
              </div>
            </div>

            {/* Video Controls Toolbar */}
            <div className="relative z-10 mx-auto bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10 shadow-2xl">
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-2.5 rounded-xl text-white transition-all ${
                  isMicOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
                title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-2.5 rounded-xl text-white transition-all ${
                  isVideoOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
                title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-2.5 rounded-xl text-white transition-all ${
                  isScreenSharing ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title="Simulate Screen Sharing"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleFinishSession}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="End Meeting"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            </div>
          </div>

          {/* Meeting Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted WebRTC Audio & Video Session</span>
            </div>
            <span className="font-semibold text-slate-800">
              Escrow Status: <strong>{sessionCompleted ? 'Settled (1.0 Cr Transferred)' : '1.0 Credit In Hold'}</strong>
            </span>
          </div>
        </div>

        {/* Right Column: Learning Hub, Gemini Roadmap, and Whiteboard Notes */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[540px] overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'notes'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Live Notes</span>
            </button>

            <button
              onClick={() => setActiveTab('agenda')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'agenda'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Session Agenda</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'roadmap' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Gemini Syllabus Generator (POST /api/ai/roadmap)
                    </h3>
                    <p className="text-[11px] text-slate-400">Structured daily learning progression</p>
                  </div>
                  <button
                    onClick={handleGenerateRoadmap}
                    disabled={isGeneratingRoadmap}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Sparkles className={`w-3 h-3 ${isGeneratingRoadmap ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingRoadmap ? 'Generating...' : 'Regenerate'}</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={roadmapSkill}
                    onChange={(e) => setRoadmapSkill(e.target.value)}
                    placeholder="Skill (e.g. Docker, Python, React)..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <select
                    value={roadmapDuration}
                    onChange={(e) => setRoadmapDuration(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white"
                  >
                    <option value="3 Days">3 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="7 Days">7 Days</option>
                  </select>
                </div>

                {/* Day-by-day Syllabus */}
                <div className="space-y-3">
                  {roadmapDays.map((item) => (
                    <div
                      key={item.day}
                      className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded">
                          Day {item.day}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">1 hr swap quota</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{item.topic}</h4>
                      <ul className="text-[11px] text-slate-600 space-y-0.5 list-disc list-inside">
                        {item.focus_areas.map((fa, i) => (
                          <li key={i}>{fa}</li>
                        ))}
                      </ul>
                      <div className="bg-white border border-slate-200 p-2 rounded-lg text-[11px] text-emerald-800 font-semibold mt-1">
                        🎯 Hands-on Project: {item.hands_on_project}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="h-full flex flex-col space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Collaborative Session Notes (Shared with Partner)</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">● Live Sync</span>
                </div>
                <textarea
                  value={sharedNotes}
                  onChange={(e) => setSharedNotes(e.target.value)}
                  className="flex-1 w-full p-3 border border-slate-300 rounded-xl font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                />
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="space-y-4 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900">Structured Meeting Milestones:</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="font-bold text-emerald-900">00:00 - 00:10 • Diagnostic Calibration</p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">Review learner baseline, goals, and setup terminal/IDE.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">00:10 - 00:40 • Practical Hands-on Walkthrough</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Live screen share implementing container multi-stage steps.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">00:40 - 00:55 • Learner Solo Trial & Code Review</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Learner writes code while mentor provides real-time feedback.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">00:55 - 01:00 • Session Close & TimeBank Settlement</p>
                    <p className="text-[11px] text-slate-600 mt-0.5">Automated 1.0 credit escrow release and mutual review submission.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
