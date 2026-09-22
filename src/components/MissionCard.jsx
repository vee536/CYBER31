import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, ArrowRight, Eye, Radio } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function MissionCard({
  mission,
  isCompleted,
  isActiveThreat,
  onClick,
}) {
  const handleClick = () => {
    cyberAudio.playClick();
    onClick(mission.day);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`group relative p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
        isCompleted
          ? 'bg-cyber-900/60 border-cyber-green/40 hover:border-cyber-green hover:shadow-glow-green/30'
          : isActiveThreat
          ? 'bg-cyber-950 border-cyber-red/60 hover:border-cyber-red shadow-glow-red/40 threat-corner'
          : 'bg-cyber-950/70 border-slate-800/80 hover:border-cyan-500/40 hover:bg-cyber-900/50'
      }`}
    >
      {/* Top Meta Line */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyber-900 border border-slate-800 text-white">
              DAY {String(mission.day).padStart(2, '0')}
            </span>

            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate max-w-[120px]">
              {mission.category.replace('_', ' ')}
            </span>
          </div>

          {/* Status Badge */}
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyber-green bg-cyber-green-dim px-2 py-0.5 rounded border border-cyber-green/40">
              <ShieldCheck className="w-3 h-3" />
              SECURED
            </span>
          ) : isActiveThreat ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyber-red bg-cyber-red-dim px-2 py-0.5 rounded border border-cyber-red/50 animate-pulse">
              <Radio className="w-3 h-3 text-cyber-red" />
              ACTIVE THREAT
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
              <Lock className="w-2.5 h-2.5" />
              OPEN
            </span>
          )}
        </div>

        {/* Title & Topic */}
        <h4 className="text-sm sm:text-base font-cyber font-bold text-white mb-1 group-hover:text-cyber-cyan transition-colors leading-snug">
          {mission.title}
        </h4>
        <p className="text-xs font-sans text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {mission.topic}
        </p>
      </div>

      {/* Footer Indicator */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500 group-hover:text-slate-300">
          Source: {mission.alertSource}
        </span>
        <span className="flex items-center gap-1 font-bold text-cyber-cyan group-hover:translate-x-1 transition-transform">
          LAUNCH <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}
