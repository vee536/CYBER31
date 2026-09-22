import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Terminal, Radio } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('INITIALISING CYBER31 DEFENSE CORE...');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('CALIBRATING NEURAL PERIMETER & SENSORS...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(80);
      setStatusText('CONNECTING TO GLOBAL THREAT INTELLIGENCE...');
    }, 900);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('NETWORK SECURE // DIGITAL DEFENDER ONLINE');
    }, 1300);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-cyber-950 flex flex-col items-center justify-center p-6 select-none cyber-grid">
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">
        {/* Glowing Shield Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-cyber-cyan/20 blur-xl animate-pulse-slow" />
          <div className="relative w-20 h-20 rounded-2xl bg-cyber-900 border border-cyber-cyan/40 flex items-center justify-center shadow-glow-cyan">
            <Shield className="w-10 h-10 text-cyber-cyan animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-cyber-800 border border-cyber-green flex items-center justify-center">
            <Radio className="w-3 h-3 text-cyber-green animate-ping" />
          </div>
        </div>

        {/* Title & Brand */}
        <h1 className="text-3xl sm:text-4xl font-black font-cyber tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyber-cyan to-cyber-purple mb-2">
          CYBER31
        </h1>
        <p className="text-xs sm:text-sm font-hud text-cyber-cyan tracking-widest uppercase mb-8">
          MISSION: STAY SAFE ONLINE
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 rounded-lg p-1.5 mb-4 shadow-cyber-card hud-corner">
          <div className="relative h-3 w-full bg-cyber-950 rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-cyan to-purple-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-glow-cyan" />
            </div>
          </div>
        </div>

        {/* Status Telemetry */}
        <div className="flex items-center justify-between w-full text-xs font-mono text-slate-400 px-1 mb-8">
          <span className="flex items-center gap-1.5 text-cyber-cyan">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span className="truncate max-w-[260px] sm:max-w-xs">{statusText}</span>
          </span>
          <span className="text-white font-bold">{progress}%</span>
        </div>

        {/* Skip button for fast mobile users */}
        <button
          onClick={onComplete}
          className="text-xs font-mono text-slate-500 hover:text-cyber-cyan transition-colors px-4 py-2 border border-slate-800 hover:border-cyber-cyan/40 rounded uppercase tracking-wider"
        >
          [ Skip Boot Sequence ]
        </button>
      </div>
    </div>
  );
}
