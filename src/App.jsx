import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { MISSIONS } from './data/missionsData';
import { ACHIEVEMENTS } from './data/achievementsData';
import {
  getCompletedMissions,
  saveMissionCompletion,
  getStreak,
  unlockAllMissions,
  resetProgress,
  getSecurityLevel,
  syncFromCloud,
  migrateAnonymousProgressToUser,
} from './utils/storage';
import { getSession, onAuthStateChange } from './utils/authClient';
import { getMaxUnlockedDay, isDayUnlocked, getCampaignStarted } from './utils/dateGate';
import { cyberAudio } from './utils/audio';

import LoadingScreen from './components/LoadingScreen';
import CyberHeader from './components/CyberHeader';
import StoryIntro from './components/StoryIntro';
import Dashboard from './components/Dashboard';
import DigitalUniverse from './components/DigitalUniverse';
import MissionModal from './components/MissionModal';
import AchievementsModal from './components/AchievementsModal';
import AuthPanel from './components/AuthPanel';
import DemoToolbar from './components/DemoToolbar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState([]);
  const [streak, setStreak] = useState(6);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'story', 'universe'
  const [currentMission, setCurrentMission] = useState(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(cyberAudio.isMuted());
  const [user, setUser] = useState(null);

  // Reviewer/demo controls (and the daily-unlock calendar) are only bypassed in
  // local dev or via an explicit ?review=1 flag, so ordinary visitors on the
  // deployed site can't instantly unlock or wipe their progress or skip ahead.
  const showDemoToolbar =
    import.meta.env.DEV ||
    new URLSearchParams(window.location.search).get('review') === '1';

  const maxUnlockedDay = useMemo(() => getMaxUnlockedDay(showDemoToolbar), [showDemoToolbar]);
  const campaignStarted = useMemo(() => getCampaignStarted(showDemoToolbar), [showDemoToolbar]);

  // Initialize storage, auth session, then reconcile with cloud progress (if Supabase is configured)
  useEffect(() => {
    setCompletedDays(getCompletedMissions());
    setStreak(getStreak());

    getSession().then((session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      syncFromCloud(currentUser?.id ?? null).then((merged) => {
        if (merged) {
          setCompletedDays(merged);
          setStreak(getStreak());
        }
      });
    });

    const unsubscribe = onAuthStateChange((session) => {
      setUser(session?.user ?? null);
    });

    return unsubscribe;
  }, []);

  // Today's mission spotlight: the most recently unlocked day on the real-world
  // calendar (Day N unlocks on Oct N). Falls back to Day 1 before the campaign starts.
  const todayDay = maxUnlockedDay > 0 ? maxUnlockedDay : 1;

  const securityLevel = useMemo(() => {
    return Math.round((completedDays.length / 31) * 100);
  }, [completedDays]);

  const unlockedAchievementsCount = useMemo(() => {
    return ACHIEVEMENTS.filter((ach) => completedDays.length >= ach.dayReq).length;
  }, [completedDays]);

  // Audio mute handler
  const handleToggleAudio = () => {
    const nextMuted = !isMuted;
    cyberAudio.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      cyberAudio.playClick();
    }
  };

  // Open a specific mission (blocked if its day hasn't unlocked yet)
  const handleOpenMission = (dayNumber) => {
    if (!isDayUnlocked(dayNumber, showDemoToolbar)) {
      cyberAudio.playClick();
      return;
    }
    const target = MISSIONS.find((m) => m.day === dayNumber);
    if (target) {
      setCurrentMission(target);
    }
  };

  // Mission Completed Callback
  const handleMissionCompleted = (dayNumber) => {
    const updated = saveMissionCompletion(dayNumber, user?.id ?? null);
    setCompletedDays(updated);
    setStreak(getStreak());

    // Check if new milestone unlocked
    const previousCount = completedDays.length;
    const newCount = updated.length;
    const justUnlockedMilestone = ACHIEVEMENTS.some(
      (ach) => previousCount < ach.dayReq && newCount >= ach.dayReq
    );

    if (justUnlockedMilestone) {
      setTimeout(() => {
        cyberAudio.playUnlock();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a3ea2a', '#a855f7', '#3ecf8e'],
          });
        } catch (e) {
          // Confetti fallback
        }
      }, 300);
    }
  };

  // Called by AuthPanel after a successful login/signup/signout
  const handleAuthed = async (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      const merged = await migrateAnonymousProgressToUser(nextUser.id);
      setCompletedDays(merged);
      setStreak(getStreak());
    }
  };

  // Demo actions
  const handleUnlockAll = () => {
    const all = unlockAllMissions(user?.id ?? null);
    setCompletedDays(all);
    setStreak(31);
    cyberAudio.playUnlock();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#a3ea2a', '#3ecf8e', '#ffb020'],
      });
    } catch (e) {}
  };

  const handleResetProgress = () => {
    resetProgress(user?.id ?? null);
    setCompletedDays([]);
    setStreak(1);
    cyberAudio.playClick();
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-cyber-950 text-slate-100 flex flex-col justify-between selection:bg-cyber-cyan selection:text-black overflow-x-hidden">

      {/* Background ambient elements */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 scanlines opacity-30 pointer-events-none" />

      {/* Main Top Header */}
      <CyberHeader
        securityLevel={securityLevel}
        isMuted={isMuted}
        onToggleAudio={handleToggleAudio}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        achievementsCount={unlockedAchievementsCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartTodayMission={handleOpenMission}
        todayDay={todayDay}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        campaignStarted={campaignStarted}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-20 md:pb-12">
        {activeTab === 'story' && (
          <StoryIntro
            onEnterMissionControl={() => setActiveTab('dashboard')}
            onStartTodayMission={handleOpenMission}
            todayDay={todayDay}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            completedDays={completedDays}
            activeDay={todayDay}
            streak={streak}
            onOpenMission={handleOpenMission}
            onOpenAchievements={() => setIsAchievementsOpen(true)}
            maxUnlockedDay={maxUnlockedDay}
            campaignStarted={campaignStarted}
            unlockBypass={showDemoToolbar}
          />
        )}

        {activeTab === 'universe' && (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl sm:text-3xl font-black font-cyber text-white">
                DIGITAL NETWORK UNIVERSE
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                Explore all 31 interconnected mission nodes across the digital universe. Rotate, hover, and tap any node to inspect.
              </p>
            </div>

            <DigitalUniverse
              completedDays={completedDays}
              activeDay={todayDay}
              onSelectMission={handleOpenMission}
              interactive={true}
              maxUnlockedDay={maxUnlockedDay}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-cyber-950/90 border-t border-slate-900 py-6 px-4 text-center text-xs font-mono text-slate-500 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-cyber font-bold text-white tracking-wider">CYBER31</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyber-cyan font-hud tracking-widest uppercase">
              MISSION: STAY SAFE ONLINE
            </span>
          </div>

          <p className="text-[11px] text-slate-500 font-sans">
            31 Days. 31 Missions. One Safer Digital Life. Built for everyone.
          </p>

          <div className="text-[10px] text-slate-600 font-mono">
            CYBER DEFENSE INITIATIVE // OCTOBER 2026
          </div>
        </div>
      </footer>

      {/* Mission Modal Runner */}
      {currentMission && (
        <MissionModal
          mission={currentMission}
          onClose={() => setCurrentMission(null)}
          onMissionCompleted={handleMissionCompleted}
          isAlreadyCompleted={completedDays.includes(currentMission.day)}
        />
      )}

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        completedDays={completedDays}
      />

      {/* Auth Modal */}
      <AuthPanel
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onAuthed={handleAuthed}
      />

      {/* Reviewer / Demo Controls Toolbar (dev & ?review=1 only) */}
      {showDemoToolbar && (
        <DemoToolbar
          onJumpToMission={handleOpenMission}
          onUnlockAll={handleUnlockAll}
          onResetProgress={handleResetProgress}
          activeDay={todayDay}
        />
      )}
    </div>
  );
}
