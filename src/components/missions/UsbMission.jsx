import React, { useState } from 'react';
import { Usb, AlertTriangle, ShieldCheck, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function UsbMission({ onComplete }) {
  const [decision, setDecision] = useState(null);

  const handleDecision = (choice) => {
    cyberAudio.playClick();
    setDecision(choice);
    if (choice === 'report') {
      cyberAudio.playNeutralized();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3.5 rounded-xl mb-4 text-left text-xs font-mono">
        <span className="text-slate-300">
          PHYSICAL USB DROP: You find a flash drive outside the university computer lab labeled "Confidential - Final Exam & Answer Key".
        </span>
      </div>

      <div className="w-full max-w-md bg-cyber-950 border border-slate-700 rounded-2xl p-6 mb-5 shadow-2xl text-center hud-corner">
        {/* Visual USB Device representation */}
        <div className="w-24 h-24 rounded-2xl bg-cyber-900 border border-cyber-red/50 mx-auto flex items-center justify-center mb-4 shadow-glow-red animate-pulse-slow">
          <Usb className="w-12 h-12 text-cyber-red" />
        </div>

        <div className="inline-block bg-red-950/80 border border-red-500/50 px-3 py-1 rounded-full text-xs font-mono text-red-300 mb-3">
          LABEL: "CONFIDENTIAL_EXAM_2026.KEY"
        </div>

        <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
          Attackers intentionally drop poisoned USB flash drives in parking lots and lobbies, banking on human curiosity to trigger a hardware payload.
        </p>

        {/* Action Choices */}
        <div className="space-y-3 text-left">
          <button
            onClick={() => handleDecision('report')}
            className={`w-full p-4 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
              decision === 'report'
                ? 'bg-cyber-green-dim border-cyber-green text-cyber-green shadow-glow-green'
                : 'bg-cyber-900 border-slate-700 text-white hover:border-cyber-cyan'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyber-green shrink-0" />
              Surrender to IT Security / Disposal Protocol
            </span>
            {decision === 'report' && <CheckCircle2 className="w-4 h-4 text-cyber-green" />}
          </button>

          <button
            onClick={() => handleDecision('plug')}
            className={`w-full p-4 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
              decision === 'plug'
                ? 'bg-cyber-red-dim border-cyber-red text-cyber-red'
                : 'bg-cyber-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <XCircle className="w-4 h-4 text-cyber-red shrink-0" />
              Plug it in "just for a second" to find the owner
            </span>
            {decision === 'plug' && <AlertTriangle className="w-4 h-4 text-cyber-red" />}
          </button>
        </div>
      </div>

      {decision === 'plug' && (
        <div className="w-full max-w-md p-3.5 rounded-xl bg-cyber-red-dim border border-cyber-red text-xs text-left text-slate-200 mb-4">
          <strong className="text-cyber-red block font-mono">⚠️ HARDWARE HIJACK:</strong>
          The drive contained a microcontroller ("Rubber Ducky") that immediately simulated an ultra-fast USB keyboard, typing terminal commands to download a backdoor in under 2 seconds!
        </div>
      )}

      {decision === 'report' && (
        <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-left text-slate-200 mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ AIR-GAP PRESERVED:</strong>
            You neutralized the physical USB drop attack by adhering to zero-trust hardware protocols. Never plug unknown USB devices into your machine.
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-cyber-cyan text-cyber-950 shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>HARDWARE SECURED // CONTINUE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
