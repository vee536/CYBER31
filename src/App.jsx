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
  getSecurityLevel 
} from './utils/storage';
import { cyberAudio } from './utils/audio';

import LoadingScreen from './components/LoadingScreen';
import CyberHeader from './components/CyberHeader';
import StoryIntro from './components/StoryIntro';
import Dashboard from './components/Dashboard';
import DigitalUniverse from './components/DigitalUniverse';
import MissionModal from './components/MissionModal';
import AchievementsModal from './components/AchievementsModal';
import DemoToolbar from './components/DemoToolbar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState([]);
  const [streak, setStreak] = useState(6);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'story', 'universe'
  const [currentMission, setCurrentMission] = useState(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(cyberAudio.isMuted());

  // Initialize storage
  useEffect(() => {
    setCompletedDays(getCompletedMissions());
    setStreak(getStreak());
  }, []);

  // Today's mission: find first uncompleted day or default to Day 5 (Phishing Sample)
  const todayDay = useMemo(() => {
    // If Day 5 isn't completed, recommend Day 5 for the user showcase
    if (!completedDays.includes(5)) return 5;
    // Otherwise find the lowest uncompleted day
    for (let d = 1; d <= 31; d++) {
      if (!completedDays.includes(d)) return d;
    }
    return 1;
  }, [completedDays]);

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

  // Open a specific mission
  const handleOpenMission = (dayNumber) => {
    const target = MISSIONS.find((m) => m.day === dayNumber);
    if (target) {
      setCurrentMission(target);
    }
  };

  // Mission Completed Callback
  const handleMissionCompleted = (dayNumber) => {
    const updated = saveMissionCompletion(dayNumber);
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
            colors: ['#00f0ff', '#a855f7', '#00ffaa'],
          });
        } catch (e) {
          // Confetti fallback
        }
      }, 300);
    }
  };

  // Demo actions
  const handleUnlockAll = () => {
    const all = unlockAllMissions();
    setCompletedDays(all);
    setStreak(31);
    cyberAudio.playUnlock();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#00f0ff', '#00ffaa', '#ffb020'],
      });
    } catch (e) {}
  };

  const handleResetProgress = () => {
    resetProgress();
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

      {/* Reviewer / Demo Controls Toolbar */}
      <DemoToolbar
        onJumpToMission={handleOpenMission}
        onUnlockAll={handleUnlockAll}
        onResetProgress={handleResetProgress}
        activeDay={todayDay}
      />
    </div>
  );
}
