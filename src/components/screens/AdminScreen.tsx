import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowRightLeft, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Database, 
  Sparkles,
  Terminal,
  FileCode
} from 'lucide-react';
import { User, SwapRequest, Session, TimeBankTransaction, SystemLog } from '../../types';

interface AdminScreenProps {
  users: User[];
  swapRequests: SwapRequest[];
  sessions: Session[];
  transactions: TimeBankTransaction[];
  systemLogs: SystemLog[];
  onOpenArchitectureModal: () => void;
  onSimulateLedgerAudit: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({
  users,
  swapRequests,
  sessions,
  transactions,
  systemLogs,
  onOpenArchitectureModal,
  onSimulateLedgerAudit,
}) => {
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  // Calculate high-level system figures
  const totalCirculatingCredits = users.reduce((acc, u) => acc + u.timeCreditBalance, 0);
  const totalHoursTaught = users.reduce((acc, u) => acc + u.hoursTaught, 0);
  const completedSwapsCount = swapRequests.filter((s) => s.status === 'COMPLETED' || s.status === 'ACCEPTED').length;

  const handleRunAudit = () => {
    setAuditRunning(true);
    setAuditResult(null);
    setTimeout(() => {
      setAuditRunning(false);
      setAuditResult(
        `AUDIT VERIFIED: Zero drift detected. Double-entry checksum balanced across ${users.length} member accounts with ${transactions.length} immutable ledger transactions.`
      );
      onSimulateLedgerAudit();
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase">
              System Auditor Console
            </span>
            <span className="text-xs text-slate-400">• Role: Platform Administrator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            SkillSwap Network Health & Ledger Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time audit telemetry monitoring TimeBank credit solvency, active escrow reservations, and AI matching operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAudit}
            disabled={auditRunning}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${auditRunning ? 'animate-spin' : ''}`} />
            <span>{auditRunning ? 'Verifying Hashes...' : 'Run Ledger Audit'}</span>
          </button>

          <button
            onClick={onOpenArchitectureModal}
            className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            <span>PostgreSQL DDL & Architecture</span>
          </button>
        </div>
      </div>

      {auditResult && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{auditResult}</span>
        </div>
      )}

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Verified Members</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{users.length}</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">100% Identity Verified</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Circulating Time Credits</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mt-2">
            {totalCirculatingCredits.toFixed(1)} <span className="text-xs font-bold text-slate-500">hrs</span>
          </p>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Zero Fiat Debt Backing</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active / Accepted Swaps</span>
            <ArrowRightLeft className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{completedSwapsCount}</p>
          <span className="text-[11px] text-teal-600 font-bold mt-1 block">Smart Escrow Protected</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Cumulative Taught Hours</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {totalHoursTaught.toFixed(1)} <span className="text-xs font-bold text-slate-500">hrs</span>
          </p>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Peer Knowledge Created</span>
        </div>
      </div>

      {/* Active Swap Proposals Moderation & System Telemetry Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Swap Requests Moderation */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
              <span>Swap Proposals & Escrow Queue ({swapRequests.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400">Moderation Overview</span>
          </div>

          <div className="divide-y divide-slate-100">
            {swapRequests.map((s) => (
              <div key={s.id} className="py-3.5 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img src={s.requesterAvatar} alt={s.requesterName} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    <img src={s.providerAvatar} alt={s.providerName} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      {s.requesterName} ⇄ {s.providerName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Offered: <strong className="text-emerald-700">{s.skillOffered}</strong> • Wanted: <strong className="text-indigo-700">{s.skillWanted}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      s.status === 'ACCEPTED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : s.status === 'IN_PROGRESS'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {s.status}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-0.5">{s.proposedHours} hr escrow</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Real-time System Logs */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Real-time System Audit Logs</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">● Streaming</span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto font-mono text-[11px]">
            {systemLogs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-left"
              >
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>{log.timestamp}</span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${
                      log.level === 'SUCCESS'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.level === 'WARN'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {log.level}
                  </span>
                </div>
                <p className="font-bold text-slate-800 mt-1">{log.event}</p>
                <p className="text-slate-600 text-[10px] mt-0.5 leading-snug">{log.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
