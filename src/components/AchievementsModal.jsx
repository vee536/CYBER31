import React from 'react';
import { X, Award, CheckCircle2, Lock, Sparkles, Shield } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { cyberAudio } from '../utils/audio';

export default function AchievementsModal({
  isOpen,
  onClose,
  completedDays = [],
}) {
  if (!isOpen) return null;

  const completedCount = completedDays.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-fade-in">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-cyber-950 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl hud-corner">
        
        {/* Header */}
        <div className="bg-cyber-900/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-cyber font-bold text-white tracking-wider">
              DEFENSE MILESTONES & HONORS
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-cyber-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
          
          <div className="text-left text-xs font-mono text-slate-400 mb-2">
            Progress: <span className="text-white font-bold">{completedCount}</span> / 31 Missions Neutralized
          </div>

          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = completedCount >= ach.dayReq;
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border text-left flex items-start gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-purple-950/30 border-purple-500/50 shadow-glow-purple/20'
                    : 'bg-cyber-900/40 border-slate-800/80 opacity-60'
                }`}
              >
                {/* Badge Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                    isUnlocked
                      ? 'bg-purple-900/60 border-purple-400 text-white shadow-glow-purple'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}
                >
                  {isUnlocked ? ach.badge : <Lock className="w-6 h-6 text-slate-600" />}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-cyber font-bold text-white">
                      {ach.title}
                    </h4>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isUnlocked
                          ? 'bg-purple-900/80 text-purple-300 border border-purple-400/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isUnlocked ? 'UNLOCKED' : `REQ: ${ach.dayReq} DAYS`}
                    </span>
                  </div>

                  <div className="text-[11px] font-hud font-bold text-cyber-cyan mb-1">
                    {ach.tagline}
                  </div>

                  <p className="text-xs font-sans text-slate-300 mb-2 leading-relaxed">
                    {ach.desc}
                  </p>

                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span>Reward: {ach.rewardText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
