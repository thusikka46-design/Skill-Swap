import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { ChatDashboardScreen } from './components/screens/ChatDashboardScreen';
import { LiveSessionScreen } from './components/screens/LiveSessionScreen';
import { WalletScreen } from './components/screens/WalletScreen';
import { AdminScreen } from './components/screens/AdminScreen';
import { SwapRequestModal } from './components/modals/SwapRequestModal';
import { ArchitectureModal } from './components/modals/ArchitectureModal';

import {
  INITIAL_USERS,
  INITIAL_SWAP_REQUESTS,
  INITIAL_SESSIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_REVIEWS,
  INITIAL_SYSTEM_LOGS
} from './data/mockData';
import { User, SwapRequest, Session, TimeBankTransaction, Review, SystemLog } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>(INITIAL_SWAP_REQUESTS);
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);
  const [transactions, setTransactions] = useState<TimeBankTransaction[]>(INITIAL_TRANSACTIONS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(INITIAL_SYSTEM_LOGS);

  // Modals & Navigation state
  const [activeSwapTarget, setActiveSwapTarget] = useState<User | null>(null);
  const [architectureModalOpen, setArchitectureModalOpen] = useState<boolean>(false);
  const [activeChatUserId, setActiveChatUserId] = useState<string | undefined>(undefined);

  // Switch demo persona
  const handleSwitchUser = (selectedUser: User) => {
    setCurrentUser(selectedUser);
  };

  // Update profile
  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    
    // Log profile update event
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      level: 'INFO',
      event: 'PROFILE_UPDATED',
      details: `${updatedUser.name} updated teaching competencies and Gemini bio summary.`
    };
    setSystemLogs((prev) => [newLog, ...prev]);
  };

  // Propose a swap
  const handleSubmitSwap = (newSwap: SwapRequest) => {
    setSwapRequests((prev) => [newSwap, ...prev]);

    // Place escrow transaction
    const escrowTx: TimeBankTransaction = {
      id: `tx-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: newSwap.providerId,
      receiverName: newSwap.providerName,
      creditsTransferred: newSwap.proposedHours,
      transactionType: 'ESCROW_HOLD',
      timestamp: 'Just now',
      description: `Time credit escrow placed for proposed swap with ${newSwap.providerName} (${newSwap.skillWanted})`
    };
    setTransactions((prev) => [escrowTx, ...prev]);

    // Update user balance in state
    const updatedSelf = {
      ...currentUser,
      timeCreditBalance: Math.max(0, currentUser.timeCreditBalance - newSwap.proposedHours)
    };
    handleUpdateUser(updatedSelf);

    // Add log
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      level: 'INFO',
      event: 'SWAP_PROPOSED',
      details: `${currentUser.name} requested ${newSwap.proposedHours} hr swap with ${newSwap.providerName}.`
    };
    setSystemLogs((prev) => [newLog, ...prev]);

    // Switch to Chat tab to continue communication
    setActiveChatUserId(newSwap.providerId);
    setCurrentTab('chat');
  };

  // Complete a session in the live classroom
  const handleCompleteSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'COMPLETED' } : s))
    );

    const activeSess = sessions.find((s) => s.id === sessionId) || sessions[0];

    // Double-entry credit transfer:
    // If current user is learner, transfer 1.0 credit to mentor
    const earnedTx: TimeBankTransaction = {
      id: `tx-${Date.now()}`,
      senderId: activeSess.learnerId,
      senderName: activeSess.learnerName,
      receiverId: activeSess.mentorId,
      receiverName: activeSess.mentorName,
      creditsTransferred: 1.0,
      transactionType: 'SESSION_EARNED',
      timestamp: 'Just now',
      referenceSessionId: sessionId,
      description: `Automated escrow settlement: 1.0 TimeBank credit earned by ${activeSess.mentorName} for ${activeSess.skillName}`
    };
    setTransactions((prev) => [earnedTx, ...prev]);

    // Update mentor and learner hours in state
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === activeSess.mentorId) {
          return {
            ...u,
            timeCreditBalance: u.timeCreditBalance + 1.0,
            hoursTaught: u.hoursTaught + 1.0
          };
        }
        if (u.id === activeSess.learnerId) {
          return {
            ...u,
            hoursLearned: u.hoursLearned + 1.0
          };
        }
        return u;
      })
    );

    // Refresh current user if involved
    if (currentUser.id === activeSess.mentorId) {
      setCurrentUser((prev) => ({
        ...prev,
        timeCreditBalance: prev.timeCreditBalance + 1.0,
        hoursTaught: prev.hoursTaught + 1.0
      }));
    } else if (currentUser.id === activeSess.learnerId) {
      setCurrentUser((prev) => ({
        ...prev,
        hoursLearned: prev.hoursLearned + 1.0
      }));
    }

    // System log
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      level: 'SUCCESS',
      event: 'SESSION_COMPLETED_ESCROW_RELEASE',
      details: `Session #${sessionId} settled via PostgreSQL trigger simulation. 1.0 credit credited to ${activeSess.mentorName}.`
    };
    setSystemLogs((prev) => [newLog, ...prev]);
  };

  // Add review
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);

    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      level: 'SUCCESS',
      event: 'REVIEW_REGISTERED',
      details: `${newReview.reviewerName} rated ${newReview.revieweeName} ${newReview.ratingScore}★ for ${newReview.skillExchanged}.`
    };
    setSystemLogs((prev) => [newLog, ...prev]);
  };

  // Audit trigger from Admin
  const handleSimulateLedgerAudit = () => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString() + ' UTC',
      level: 'SUCCESS',
      event: 'LEDGER_INTEGRITY_VERIFIED',
      details: `Full ledger balance check passed across ${users.length} accounts.`
    };
    setSystemLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
        availableUsers={users}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeScreen
            setCurrentTab={setCurrentTab}
            onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
            currentUser={currentUser}
          />
        )}

        {currentTab === 'auth' && (
          <AuthScreen
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              if (!users.some((u) => u.id === user.id)) {
                setUsers((prev) => [user, ...prev]);
              }
            }}
            availableUsers={users}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreScreen
            currentUser={currentUser}
            users={users}
            onOpenSwapModal={(target) => setActiveSwapTarget(target)}
            onOpenChatWithUser={(target) => {
              setActiveChatUserId(target.id);
              setCurrentTab('chat');
            }}
          />
        )}

        {currentTab === 'chat' && (
          <ChatDashboardScreen
            currentUser={currentUser}
            users={users}
            swapRequests={swapRequests}
            setCurrentTab={setCurrentTab}
            activeChatUserId={activeChatUserId}
          />
        )}

        {currentTab === 'live' && (
          <LiveSessionScreen
            currentUser={currentUser}
            session={sessions[0]}
            onCompleteSession={handleCompleteSession}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'wallet' && (
          <WalletScreen
            currentUser={currentUser}
            transactions={transactions}
            reviews={reviews}
            onAddReview={handleAddReview}
            onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminScreen
            users={users}
            swapRequests={swapRequests}
            sessions={sessions}
            transactions={transactions}
            systemLogs={systemLogs}
            onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
            onSimulateLedgerAudit={handleSimulateLedgerAudit}
          />
        )}
      </main>

      {/* Modals */}
      {activeSwapTarget && (
        <SwapRequestModal
          currentUser={currentUser}
          targetUser={activeSwapTarget}
          onClose={() => setActiveSwapTarget(null)}
          onSubmitSwap={handleSubmitSwap}
        />
      )}

      {architectureModalOpen && (
        <ArchitectureModal onClose={() => setArchitectureModalOpen(false)} />
      )}

      {/* Global Footer */}
      <Footer
        onOpenArchitectureModal={() => setArchitectureModalOpen(true)}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
}
