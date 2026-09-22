import React, { useState } from 'react';
import { Download, AlertTriangle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function DownloadMission({ onComplete }) {
  const [clickedTarget, setClickedTarget] = useState(null);

  const handleTargetClick = (type) => {
    cyberAudio.playClick();
    setClickedTarget(type);
    if (type === 'authentic') {
      cyberAudio.playNeutralized();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3 rounded-xl mb-4 text-left text-xs font-mono">
        <span className="text-slate-300">
          MALVERTISING TRAP: The software repository is infested with deceptive "DOWNLOAD NOW" advertisement banners. Identify the authentic installer package.
        </span>
      </div>

      <div className="w-full max-w-lg bg-cyber-950 border border-slate-700 rounded-2xl p-5 mb-5 shadow-2xl text-left hud-corner">
        
        {/* Mock Software Info */}
        <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">AudioStudio Open Source v3.4</h4>
            <span className="text-[11px] font-mono text-slate-400">License: GPLv3 • Size: 48.2 MB</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyber-cyan">
            OFFICIAL BUILD
          </span>
        </div>

        {/* Deceptive Ad Button 1 (Giant Green) */}
        <div className="border border-red-900/40 bg-red-950/10 p-3 rounded-xl mb-3 relative">
          <span className="absolute top-1 right-2 text-[9px] font-mono text-slate-500">Ad Choices ⓘ</span>
          <button
            onClick={() => handleTargetClick('fake1')}
            className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-black font-black text-sm font-sans rounded-xl shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide animate-pulse"
          >
            <Download className="w-5 h-5" />
            <span>DOWNLOAD NOW (FAST INSTALLER)</span>
          </button>
          <span className="text-[10px] text-center block text-slate-500 mt-1 font-mono">
            sponsored by SuperSpeedInstaller.net
          </span>
        </div>

        {/* Deceptive Ad Button 2 (Flashing Blue Banner) */}
        <div className="border border-red-900/40 bg-red-950/10 p-3 rounded-xl mb-4 relative">
          <span className="absolute top-1 right-2 text-[9px] font-mono text-slate-500">Advertisement ⓘ</span>
          <button
            onClick={() => handleTargetClick('fake2')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>START DOWNLOAD HERE - CLICK TO BEGIN</span>
          </button>
        </div>

        {/* Real Authentic Clean Link */}
        <div className="p-3 rounded-xl bg-cyber-900 border border-slate-700 hover:border-cyber-cyan transition-all">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleTargetClick('authentic')}
              className="text-xs font-mono text-cyber-cyan hover:underline flex items-center gap-2 font-bold"
            >
              <Download className="w-4 h-4 text-cyber-green" />
              <span>audiostudio-v3.4.0-win64.zip (SHA-256 Verified)</span>
            </button>
            <span className="text-[10px] font-mono text-slate-400">Direct GitHub Release</span>
          </div>
        </div>
      </div>

      {/* Outcome Feedback */}
      {(clickedTarget === 'fake1' || clickedTarget === 'fake2') && (
        <div className="w-full max-w-lg p-3.5 rounded-xl bg-cyber-red-dim border border-cyber-red text-xs text-left text-slate-200 mb-4">
          <strong className="text-cyber-red block font-mono">⚠️ ADWARE BUNDLER CAUGHT:</strong>
          That big colorful button was a commercial advertisement delivering bundled PUPs (Potentially Unwanted Programs) and browser hijackers. Look for the authentic direct package file link!
        </div>
      )}

      {clickedTarget === 'authentic' && (
        <div className="w-full max-w-lg flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-left text-slate-200 mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ AUTHENTIC REPOSITORY LOCATED:</strong>
            You bypassed the deceptive malvertising banners and selected the verified direct hash-checked file release!
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-cyber-cyan text-cyber-950 shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>CONFIRM SECURE DOWNLOAD & COMPLETE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
