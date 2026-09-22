import React, { useState } from 'react';
import { Shield, Volume2, VolumeX, Award, Radio, Menu, X, Compass, Target, Globe, UserCircle2 } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function CyberHeader({
  securityLevel = 0,
  isMuted,
  onToggleAudio,
  onOpenAchievements,
  achievementsCount = 0,
  activeTab = 'dashboard',
  setActiveTab,
  onStartTodayMission,
  todayDay = 5,
  user = null,
  onOpenAuth,
  campaignStarted = true,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    cyberAudio.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cyber-950/85 backdrop-blur-md border-b border-cyan-500/20 px-4 sm:px-6 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">

          {/* Logo & Brand Identity */}
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-cyber-900 border border-cyber-cyan/50 flex items-center justify-center shadow-glow-cyan-sm group-hover:border-cyber-cyan transition-all">
              <Shield className="w-5 h-5 text-cyber-cyan group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyber-green animate-ping" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl font-black font-cyber tracking-wider text-white group-hover:text-cyber-cyan transition-colors leading-none truncate">
                CYBER31
              </span>
              <span className="hidden xs:block text-[10px] sm:text-xs font-hud font-bold text-cyber-cyan tracking-widest uppercase truncate">
                MISSION: STAY SAFE ONLINE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-cyber-900/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleNavClick('story')}
              className={`px-3 py-1.5 rounded-lg text-xs font-hud font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'story'
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Story Brief
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-hud font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Mission Control
            </button>
            <button
              onClick={() => handleNavClick('universe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-hud font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'universe'
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 shadow-glow-cyan-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Digital Universe
            </button>
          </nav>

          {/* Actions: Security Gauge, Audio & Achievements */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

            {/* Security Level Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-cyber-900/80 border border-cyan-500/30 px-2 sm:px-3 py-1.5 rounded-xl shadow-inner">
              <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    securityLevel >= 100
                      ? 'bg-cyber-green shadow-glow-green animate-pulse'
                      : 'bg-cyber-cyan shadow-glow-cyan-sm'
                  }`}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="hidden sm:block text-[9px] font-mono text-slate-400 leading-none uppercase">Defense Level</span>
                <span className="text-xs sm:text-sm font-bold font-mono text-white leading-tight whitespace-nowrap">
                  {securityLevel}% <span className="text-cyber-cyan hidden sm:inline">SECURED</span>
                </span>
              </div>
            </div>

            {/* Achievements Modal Trigger */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenAchievements();
              }}
              title="Milestone Achievements"
              className="relative p-2 rounded-xl bg-cyber-900 border border-slate-700 hover:border-purple-400/60 text-slate-300 hover:text-purple-400 transition-all shrink-0"
            >
              <Award className="w-4 h-4" />
              {achievementsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-mono font-bold flex items-center justify-center shadow-glow-purple">
                  {achievementsCount}
                </span>
              )}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleAudio();
              }}
              title={isMuted ? 'Unmute Cyber Audio' : 'Mute Cyber Audio'}
              className={`p-2 rounded-xl border transition-all shrink-0 ${
                isMuted
                  ? 'bg-cyber-900 border-slate-700 text-slate-500 hover:text-slate-300'
                  : 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-glow-cyan-sm'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Account / Sign In */}
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenAuth();
              }}
              title={user ? user.email : 'Sign In'}
              className={`relative p-2 rounded-xl border transition-all shrink-0 ${
                user
                  ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-glow-cyan-sm'
                  : 'bg-cyber-900 border-slate-700 text-slate-300 hover:border-cyber-cyan/60 hover:text-cyber-cyan'
              }`}
            >
              <UserCircle2 className="w-4 h-4" />
              {user && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyber-green border border-cyber-950" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-cyber-900 border border-slate-700 text-slate-300 hover:text-cyber-cyan shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2 pb-2">
            <button
              onClick={() => handleNavClick('story')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-hud uppercase tracking-wider flex items-center justify-between ${
                activeTab === 'story' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Story & Mission Call
              </span>
              <span className="text-xs text-slate-500 font-mono">01</span>
            </button>
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-hud uppercase tracking-wider flex items-center justify-between ${
                activeTab === 'dashboard' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Mission Control Hub
              </span>
              <span className="text-xs text-slate-500 font-mono">02</span>
            </button>
            <button
              onClick={() => handleNavClick('universe')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-hud uppercase tracking-wider flex items-center justify-between ${
                activeTab === 'universe' ? 'bg-cyber-cyan/20 text-cyber-cyan' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Digital Network Universe
              </span>
              <span className="text-xs text-slate-500 font-mono">03</span>
            </button>
          </div>
        )}
      </header>

      {/* Floating Mobile Bottom Action Bar (Mobile-first ergonomics) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cyber-950/95 backdrop-blur-lg border-t border-cyan-500/25 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <button
          onClick={() => handleNavClick('dashboard')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-hud font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
            activeTab === 'dashboard'
              ? 'bg-cyber-800 text-cyber-cyan border border-cyber-cyan/50 shadow-glow-cyan-sm'
              : 'bg-cyber-900 text-slate-300 border border-slate-800'
          }`}
        >
          <Target className="w-4 h-4 text-cyber-cyan" />
          Dashboard
        </button>

        <button
          onClick={() => {
            cyberAudio.playClick();
            if (campaignStarted) onStartTodayMission(todayDay);
          }}
          disabled={!campaignStarted}
          title={campaignStarted ? undefined : 'Campaign starts October 1'}
          className={`flex-[1.4] py-2.5 px-3 rounded-xl text-xs font-cyber font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-95 ${
            campaignStarted
              ? 'bg-gradient-to-r from-cyber-cyan to-blue-500 text-black shadow-glow-cyan'
              : 'bg-cyber-900 text-slate-500 border border-slate-800 cursor-not-allowed'
          }`}
        >
          <Radio className={`w-4 h-4 ${campaignStarted ? 'text-black animate-pulse' : 'text-slate-500'}`} />
          {campaignStarted ? "Today's Mission" : 'Starts Oct 1'}
        </button>
      </div>
    </>
  );
}
