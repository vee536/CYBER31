import React from 'react';
import { 
  Shield, 
  Smartphone, 
  KeyRound, 
  CreditCard, 
  Share2, 
  Globe, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Crosshair, 
  Radio, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function StoryIntro({ onEnterMissionControl, onStartTodayMission, todayDay = 5 }) {
  const handleCtaClick = () => {
    cyberAudio.playClick();
    onEnterMissionControl();
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      
      {/* =========================================================================
          HERO BANNER & CORE BRANDING
         ========================================================================= */}
      <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 overflow-hidden">
        {/* Glowing background ambient lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[550px] sm:h-[550px] bg-gradient-to-tr from-cyber-cyan/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        {/* HUD Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-900/90 border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan mb-6 shadow-glow-cyan-sm animate-pulse-slow">
          <Radio className="w-3.5 h-3.5 text-cyber-cyan animate-pulse" />
          <span className="font-hud tracking-widest uppercase">OCTOBER AWARENESS CAMPAIGN // PROTOCOL ONLINE</span>
        </div>

        {/* Primary Brand Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-cyber tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyber-cyan mb-3">
          CYBER31
        </h1>

        {/* Primary Subtitle / Tagline */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-hud font-bold tracking-widest text-cyber-cyan uppercase mb-4">
          MISSION: STAY SAFE ONLINE
        </h2>

        {/* Optional Supporting Line */}
        <p className="text-sm sm:text-base md:text-lg font-sans text-slate-300 max-w-xl mb-8 leading-relaxed">
          <strong className="text-white font-semibold">31 Days. 31 Missions.</strong> One Safer Digital Life.
          <br />
          Step into the cyber operations center and fortify your digital world against real-world online hazards.
        </p>

        {/* Hero Interactive CTAs (Mobile First, large tap targets) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <button
            onClick={() => {
              cyberAudio.playClick();
              onStartTodayMission(todayDay);
            }}
            className="w-full sm:flex-1 py-4 px-6 rounded-xl font-cyber font-bold text-sm uppercase tracking-wider bg-cyber-cyan text-cyber-950 shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Zap className="w-5 h-5 text-black group-hover:scale-125 transition-transform" />
            <span>START TODAY'S MISSION</span>
          </button>

          <button
            onClick={handleCtaClick}
            className="w-full sm:flex-1 py-4 px-6 rounded-xl font-hud font-bold text-sm uppercase tracking-wider bg-cyber-900/90 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-800 hover:border-cyber-cyan transition-all flex items-center justify-center gap-2"
          >
            <span>MISSION CONTROL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle scroll cue */}
        <div className="mt-12 flex flex-col items-center gap-1.5 text-[11px] font-mono text-slate-500 animate-bounce">
          <span>DISCOVER THE STORY</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-cyber-cyan to-transparent" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 1 — EVERY DAY, WE LIVE ONLINE
         ========================================================================= */}
      <section className="w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-24 border-t border-slate-900">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-mono text-cyber-cyan tracking-widest uppercase mb-2">
            [ VECTOR ANALYSIS // REAL-WORLD HABITS ]
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold font-cyber text-white uppercase tracking-wide">
            EVERY DAY, WE LIVE ONLINE.
          </h3>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3 font-sans">
            Our daily lives are permanently wired into a global mesh of connections, authentication keys, and shared data.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          {[
            { icon: Smartphone, label: 'Phones & Devices', sub: 'Always-on pocket access' },
            { icon: KeyRound, label: 'Passwords & Vaults', sub: 'Master keys to identity' },
            { icon: Share2, label: 'Social Media', sub: 'Digital connections & public footprint' },
            { icon: CreditCard, label: 'Instant Payments', sub: 'Cards, e-wallets, peer-to-peer' },
            { icon: Globe, label: 'Websites & Portals', sub: 'Everyday campus & cloud tools' },
            { icon: Lock, label: 'Cloud Documents', sub: 'Personal data stored remotely' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="cyber-panel p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center group hover:border-cyber-cyan/50 transition-all hud-corner"
            >
              <div className="w-12 h-12 rounded-xl bg-cyber-900 border border-slate-800 flex items-center justify-center text-cyber-cyan mb-3 group-hover:scale-110 group-hover:border-cyber-cyan shadow-glow-cyan-sm transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-sm sm:text-base font-cyber font-bold text-white mb-1">
                {item.label}
              </h4>
              <p className="text-xs text-slate-400 font-sans">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — THE RISKS (ANIMATED THREAT SIGNALS)
         ========================================================================= */}
      <section className="w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-24 border-t border-slate-900 relative">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-red-dim border border-cyber-red/30 text-xs font-mono text-cyber-red mb-3">
            <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
            <span>ANOMALIES DETECTED ACROSS THE GRID</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-bold font-cyber text-white uppercase tracking-wide">
            THE DIGITAL WORLD HAS THREATS.
          </h3>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mt-3 font-sans">
            Attackers rarely exploit complex system bugs. Instead, they exploit split-second human decisions, urgency, and misplaced trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              title: 'PHISHING MESSAGES',
              type: 'Deceptive Emails & Urgent Warnings',
              desc: 'Fake account locks demanding rapid password submission before you have time to think.',
              tag: 'THREAT: URGENCY BAIT',
            },
            {
              title: 'FAKE WEBSITES',
              type: 'Typosquatting & Mirror Domains',
              desc: 'Lookalike login pages built to harvest student credentials and two-factor codes.',
              tag: 'THREAT: VISUAL DECEPTION',
            },
            {
              title: 'ONLINE SCAMS & OVERPAYMENT',
              type: 'Marketplace & Investment Traps',
              desc: 'High-pressure financial requests, fake refunds, and artificial investment returns.',
              tag: 'THREAT: FINANCIAL EXTORTION',
            },
            {
              title: 'MALICIOUS DOWNLOADS',
              type: 'Trojanized Bundles & Bad Files',
              desc: 'Deceptive "DOWNLOAD" ads and double-extension files executing infostealers.',
              tag: 'THREAT: PAYLOAD DELIVERY',
            },
            {
              title: 'OVERSHARING & OSINT',
              type: 'Unshielded Personal Disclosures',
              desc: 'Boarding pass barcodes and travel schedules turning public profiles into targets.',
              tag: 'THREAT: PRIVACY EXPOSURE',
            },
            {
              title: 'SYNTHETIC DEEPFAKES',
              type: 'Generative AI Voice & Video Fraud',
              desc: 'Cloned audio and video impersonating authority figures for emergency wire transfers.',
              tag: 'THREAT: AI IMPERSONATION',
            },
          ].map((threat, idx) => (
            <div
              key={idx}
              className="cyber-panel-threat p-5 rounded-2xl flex flex-col justify-between border border-cyber-red/30 threat-corner hover:border-cyber-red transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-cyber-red tracking-wider">
                    {threat.tag}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse-slow" />
                </div>
                <h4 className="text-base font-cyber font-bold text-white mb-1">
                  ⚠️ {threat.title}
                </h4>
                <div className="text-xs font-hud font-semibold text-cyber-amber mb-2">
                  {threat.type}
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {threat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 & 4 — THE MISSION & YOUR ROLE AS DIGITAL DEFENDER
         ========================================================================= */}
      <section className="w-full max-w-4xl px-4 sm:px-6 py-16 sm:py-24 border-t border-slate-900 text-center">
        <div className="cyber-panel p-8 sm:p-12 rounded-3xl border border-cyber-cyan/30 relative overflow-hidden hud-corner shadow-2xl">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-cyber-900 border border-cyber-cyan flex items-center justify-center mb-6 shadow-glow-cyan">
              <Crosshair className="w-8 h-8 text-cyber-cyan" />
            </div>

            <span className="text-xs font-mono font-bold text-cyber-cyan tracking-widest uppercase mb-2">
              CALL TO DEFENSE // 31 DAYS OF OCTOBER
            </span>

            <h3 className="text-3xl sm:text-5xl font-black font-cyber text-white mb-4">
              YOUR ROLE: DIGITAL DEFENDER
            </h3>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-sans mb-8 leading-relaxed">
              You are not a hacker running lines of terminal code. You are the guardian of your own digital perimeter.
              Your daily protocol is intuitive and empowering:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10 text-left">
              <div className="bg-cyber-950/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-cyber font-bold text-white mb-1">1. Think Before You Click</h5>
                  <p className="text-xs text-slate-400 font-sans">Pause when a message creates sudden panic or extreme urgency.</p>
                </div>
              </div>
              <div className="bg-cyber-950/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-cyber font-bold text-white mb-1">2. Spot Suspicious Signs</h5>
                  <p className="text-xs text-slate-400 font-sans">Inspect address bars, sender domains, and unexpected attachments.</p>
                </div>
              </div>
              <div className="bg-cyber-950/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-cyber font-bold text-white mb-1">3. Protect Your World</h5>
                  <p className="text-xs text-slate-400 font-sans">Neutralize threats through short, gamified 2-5 minute daily missions.</p>
                </div>
              </div>
            </div>

            {/* Launch Action */}
            <button
              onClick={handleCtaClick}
              className="py-4 px-10 rounded-xl font-cyber font-bold text-sm uppercase tracking-wider bg-cyber-cyan text-cyber-950 shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>ENTER MISSION CONTROL</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
