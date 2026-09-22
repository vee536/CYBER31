import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Flame, 
  Target, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Search, 
  SlidersHorizontal,
  Globe,
  Sparkles,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { MISSIONS, CATEGORIES } from '../data/missionsData';
import MissionCard from './MissionCard';
import DigitalUniverse from './DigitalUniverse';
import { cyberAudio } from '../utils/audio';
import { isDayUnlocked, getUnlockDateLabel, getCampaignStartLabel } from '../utils/dateGate';

export default function Dashboard({
  completedDays = [],
  activeDay = 5,
  streak = 6,
  onOpenMission,
  onOpenAchievements,
  maxUnlockedDay = 31,
  campaignStarted = true,
  unlockBypass = false,
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // all, threat, secured
  const [searchQuery, setSearchQuery] = useState('');
  const [showUniverseInline, setShowUniverseInline] = useState(true);

  const securityPercentage = Math.round((completedDays.length / 31) * 100);

  // Identify Today's active mission object
  const todayMission = useMemo(() => {
    return MISSIONS.find((m) => m.day === activeDay) || MISSIONS[4]; // default Day 5
  }, [activeDay]);

  const isTodayCompleted = completedDays.includes(todayMission.day);

  // Filtered list of missions for the grid
  const filteredMissions = useMemo(() => {
    return MISSIONS.filter((m) => {
      // Category match
      if (selectedCategory !== 'all' && m.category !== selectedCategory) {
        return false;
      }
      // Status match
      const isComp = completedDays.includes(m.day);
      if (filterStatus === 'threat' && isComp) return false;
      if (filterStatus === 'secured' && !isComp) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          m.title.toLowerCase().includes(q) ||
          m.topic.toLowerCase().includes(q) ||
          String(m.day).includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, filterStatus, searchQuery, completedDays]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8 select-none">
      
      {/* =========================================================================
          TOP COMMAND CENTER TELEMETRY & TODAY'S MISSION HERO
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Security Level & Defense Metrics (5 cols) */}
        <div className="lg:col-span-5 cyber-panel p-5 sm:p-6 rounded-3xl flex flex-col justify-between hud-corner shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                SYSTEM STATUS: ONLINE
              </span>
              <span className="text-cyber-cyan font-bold">GRID MONITOR ACTIVE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-cyber text-white mb-1">
              DIGITAL SECURITY LEVEL
            </h3>
            <p className="text-xs text-slate-400 font-sans mb-6">
              Measure of neutralized threat vectors across your 31-day personal perimeter.
            </p>

            {/* Circular / Large Gauge Progress */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                {/* SVG Radial Meter */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-slate-800"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-cyber-cyan transition-all duration-700 ease-out"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * securityPercentage) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black font-mono text-white leading-none">
                    {securityPercentage}%
                  </span>
                  <span className="text-[9px] font-mono text-cyber-cyan uppercase mt-0.5">
                    SECURED
                  </span>
                </div>
              </div>

              {/* Progress stats */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Threats Neutralized:</span>
                  <span className="text-white font-bold">{completedDays.length} / 31</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Remaining Vectors:</span>
                  <span className="text-cyber-red font-bold">{31 - completedDays.length} Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Campaign Phase:</span>
                  <span className="text-cyber-cyan font-bold">
                    {securityPercentage === 100 ? 'Full Resilience' : 'October Sprint'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Streak Banner */}
          <div className="bg-cyber-900/90 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-hud font-bold text-white uppercase tracking-wider">
                  DEFENSE STREAK
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {streak} Days Consecutive Readiness
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAchievements}
              className="text-xs font-hud font-bold text-purple-400 hover:text-purple-300 underline uppercase tracking-wider"
            >
              View Honors →
            </button>
          </div>
        </div>

        {/* Right Column: TODAY'S MISSION SPOTLIGHT (7 cols) */}
        {campaignStarted ? (
          <div className="lg:col-span-7 cyber-panel-threat p-6 sm:p-7 rounded-3xl flex flex-col justify-between border-cyber-red/50 threat-corner shadow-2xl relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950 border border-red-500/60 text-xs font-mono font-bold text-cyber-red animate-pulse">
                  <Radio className="w-3.5 h-3.5" />
                  <span>DAY {String(todayMission.day).padStart(2, '0')} / 31 // ACTIVE SIGNAL DETECTED</span>
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-slate-300 bg-cyber-900/80 px-2.5 py-1 rounded border border-slate-700">
                  SEVERITY: {todayMission.threatSeverity}
                </span>
              </div>

              {/* Mission Type & Title */}
              <div className="text-xs font-hud font-bold text-amber-400 uppercase tracking-widest mb-1">
                MISSION TYPE: {todayMission.threatType.toUpperCase()}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-cyber text-white mb-2">
                {todayMission.title}
              </h3>

              <p className="text-xs font-hud text-cyber-cyan font-bold mb-3">
                TOPIC: {todayMission.topic}
              </p>

              <p className="text-xs sm:text-sm font-sans text-slate-200 mb-6 leading-relaxed bg-black/40 p-3.5 rounded-xl border border-red-900/40">
                {todayMission.briefing}
              </p>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-red-900/40">
              <button
                onClick={() => onOpenMission(todayMission.day)}
                className="w-full sm:flex-1 py-4 px-6 rounded-xl font-cyber font-bold text-xs sm:text-sm uppercase tracking-wider bg-cyber-red text-white shadow-glow-red hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <Zap className="w-4 h-4" />
                <span>{isTodayCompleted ? 'REPLAY MISSION' : 'BEGIN MISSION'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {isTodayCompleted && (
                <span className="text-xs font-mono text-cyber-green flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Node Currently Secured</span>
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 cyber-panel p-6 sm:p-7 rounded-3xl flex flex-col items-center justify-center text-center hud-corner shadow-2xl relative overflow-hidden gap-3">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="w-14 h-14 rounded-2xl bg-cyber-900 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
              <Radio className="w-7 h-7" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-cyber text-white">
              CAMPAIGN NOT YET LIVE
            </h3>
            <p className="text-xs sm:text-sm font-sans text-slate-400 max-w-sm">
              Mission Day 01 activates on <span className="text-cyber-cyan font-bold">{getCampaignStartLabel()}</span>.
              A new mission unlocks every day of October — check back then, or explore the roadmap below.
            </p>
          </div>
        )}
      </section>

      {/* =========================================================================
          DIGITAL UNIVERSE VISUALIZER PANEL
         ========================================================================= */}
      <section className="cyber-panel p-4 sm:p-6 rounded-3xl hud-corner">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-base sm:text-lg font-cyber font-bold text-white tracking-wide">
              LIVING DIGITAL NETWORK UNIVERSE
            </h3>
          </div>

          <button
            onClick={() => setShowUniverseInline(!showUniverseInline)}
            className="text-xs font-mono text-slate-400 hover:text-white border border-slate-800 px-3 py-1 rounded-lg"
          >
            {showUniverseInline ? 'Collapse Network' : 'Expand Network'}
          </button>
        </div>

        {showUniverseInline && (
          <DigitalUniverse
            completedDays={completedDays}
            activeDay={activeDay}
            onSelectMission={onOpenMission}
            interactive={true}
          />
        )}
      </section>

      {/* =========================================================================
          31-DAY MISSION ROADMAP & GRID
         ========================================================================= */}
      <section className="space-y-5">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black font-cyber text-white tracking-wide flex items-center gap-2">
              <Target className="w-6 h-6 text-cyber-cyan" />
              THE 31-DAY DEFENSE ROADMAP
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              31 security situations across identity, communication, browsing, and everyday digital life.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search day or topic..."
              className="w-full bg-cyber-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan transition-all"
            />
          </div>
        </div>

        {/* Category Cluster Tabs (Filter by Domain) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                cyberAudio.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-hud font-bold tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-cyber-cyan text-black shadow-glow-cyan font-black'
                  : 'bg-cyber-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Filter Status:</span>
          {['all', 'threat', 'secured'].map((st) => (
            <button
              key={st}
              onClick={() => {
                cyberAudio.playClick();
                setFilterStatus(st);
              }}
              className={`px-2.5 py-1 rounded-lg uppercase tracking-wider font-semibold transition-all ${
                filterStatus === st
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {st === 'all' ? 'All (31)' : st === 'threat' ? 'Active Threats' : 'Secured'}
            </button>
          ))}
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredMissions.map((mission) => {
            const isCompleted = completedDays.includes(mission.day);
            const isActiveThreat = mission.day === activeDay;
            const isLocked = !isDayUnlocked(mission.day, unlockBypass);

            return (
              <MissionCard
                key={mission.day}
                mission={mission}
                isCompleted={isCompleted}
                isActiveThreat={isActiveThreat}
                isLocked={isLocked}
                unlockDateLabel={getUnlockDateLabel(mission.day)}
                onClick={onOpenMission}
              />
            );
          })}
        </div>

        {filteredMissions.length === 0 && (
          <div className="w-full p-8 text-center bg-cyber-900/40 rounded-2xl border border-slate-800 text-slate-400 font-mono text-xs">
            No missions matched your search criteria.
          </div>
        )}
      </section>

    </div>
  );
}
