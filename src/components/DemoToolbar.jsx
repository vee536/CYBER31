import React, { useState } from 'react';
import { Settings2, RotateCcw, CheckCheck, ChevronUp, ChevronDown, Volume2 } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function DemoToolbar({
  onJumpToMission,
  onUnlockAll,
  onResetProgress,
  activeDay,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-16 sm:bottom-4 right-4 z-40 select-none">
      <div className="bg-cyber-950/95 border border-cyber-cyan/40 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all">
        
        {/* Toggle Bar */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-3 py-2 text-[11px] font-mono font-bold text-cyber-cyan hover:bg-cyber-900/60 flex items-center justify-between gap-2 border-b border-slate-800"
        >
          <span className="flex items-center gap-1.5">
            <Settings2 className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>COMMAND CONTROLS</span>
          </span>
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>

        {/* Expanded Panel */}
        {expanded && (
          <div className="p-3 space-y-2.5 w-64 text-left">
            {/* Quick Day Selector */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">
                Jump to Mission:
              </label>
              <select
                value={activeDay}
                onChange={(e) => onJumpToMission(Number(e.target.value))}
                className="w-full bg-cyber-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono text-white focus:outline-none focus:border-cyber-cyan"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    Day {String(d).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            {/* Unlock / Reset Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onUnlockAll();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/40 text-[10px] font-hud font-bold text-cyber-cyan hover:bg-cyber-cyan/30 flex items-center justify-center gap-1"
                title="Unlock all 31 missions for evaluation"
              >
                <CheckCheck className="w-3 h-3" />
                Unlock All
              </button>

              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onResetProgress();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/40 text-[10px] font-hud font-bold text-red-400 hover:bg-red-900/30 flex items-center justify-center gap-1"
                title="Reset progress to initial state"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Grid
              </button>
            </div>

            {/* Test Audio Button */}
            <button
              onClick={() => cyberAudio.playNeutralized()}
              className="w-full py-1 text-[10px] font-mono text-slate-400 hover:text-white text-center border-t border-slate-800 pt-2 flex items-center justify-center gap-1"
            >
              <Volume2 className="w-3 h-3" />
              Test Victory Chime
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
