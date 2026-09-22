import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, ShieldCheck, XCircle, ArrowRight, Radio } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function DeepfakeMission({ onComplete }) {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [artifactsFound, setArtifactsFound] = useState(new Set());

  const artifacts = [
    {
      id: 'glitch',
      label: 'Uncanny Lip-Sync & Face Boundary Glitch',
      detail: 'Notice how the mouth movements have subtle latency and the neckline shows edge blurring when turning.',
    },
    {
      id: 'urgency',
      label: 'Panic-Induced Financial Demand',
      detail: 'The caller demands an emergency gift card or direct wire transfer outside of normal institutional channels.',
    },
  ];

  const handleArtifactClick = (id) => {
    cyberAudio.playClick();
    const updated = new Set(artifactsFound);
    updated.add(id);
    setArtifactsFound(updated);
  };

  const handleResponse = (resp) => {
    cyberAudio.playClick();
    setSelectedResponse(resp);
    if (resp === 'verify') {
      cyberAudio.playNeutralized();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3 rounded-xl mb-4 text-left text-xs font-mono">
        <span className="text-slate-300">
          GRAND FINALE // DAY 31: A high-priority video call appears on your screen from the University Dean requesting an urgent confidential financial transfer.
        </span>
      </div>

      <div className="w-full max-w-md bg-cyber-950 border border-slate-700 rounded-2xl overflow-hidden mb-5 shadow-2xl text-left hud-corner">
        
        {/* Video Call Simulation Frame */}
        <div className="bg-cyber-900 p-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-white">
            <Radio className="w-3.5 h-3.5 text-cyber-red animate-ping" />
            <span>INCOMING VIDEO FEED: DEAN_OFFICE_SECURE</span>
          </div>
          <span className="text-[10px] text-slate-400">720p HD AI Stream</span>
        </div>

        {/* Video feed avatar area */}
        <div className="relative w-full h-56 bg-slate-900 flex items-center justify-center overflow-hidden">
          {/* Simulated Video Hologram */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-900/80 to-transparent z-10" />
          
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-cyber-800 border-2 border-cyan-400/60 flex items-center justify-center text-3xl shadow-glow-cyan-sm">
              👨‍🏫
            </div>
            <span className="text-xs font-bold text-white mt-2">Dr. Vance (University Dean)</span>
            <span className="text-[10px] font-mono text-cyan-400">Audio Synthesis Confidence: 99.4%</span>
          </div>

          {/* Clickable AI Glitch Hotspot */}
          <button
            onClick={() => handleArtifactClick('glitch')}
            className={`absolute top-4 right-4 z-30 p-2 rounded-xl text-[10px] font-mono border transition-all ${
              artifactsFound.has('glitch')
                ? 'bg-cyber-green-dim border-cyber-green text-cyber-green'
                : 'bg-red-950/80 border-red-500/80 text-red-300 animate-pulse'
            }`}
          >
            {artifactsFound.has('glitch') ? '✓ AI SYNTHESIS DETECTED' : '⚠️ SPOT LIP-SYNC GLITCH'}
          </button>
        </div>

        {/* Dialogue Box */}
        <div className="p-4 bg-cyber-900/60 space-y-2 text-xs font-sans text-slate-200">
          <p className="font-mono text-cyan-300 text-[11px]">
            [SYNTHETIC VOICE]: "Hello, I am in an emergency meeting and my mobile banking is locked. I need you to purchase three $200 Apple gift cards for a guest speaker immediately and text me the back codes. I will reimburse you tomorrow."
          </p>
        </div>

        {/* Decision Buttons */}
        <div className="p-4 space-y-2.5">
          <button
            onClick={() => handleResponse('verify')}
            className={`w-full p-3.5 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
              selectedResponse === 'verify'
                ? 'bg-cyber-green-dim border-cyber-green text-cyber-green shadow-glow-green'
                : 'bg-cyber-900 border-slate-700 text-white hover:border-cyber-cyan'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-green" />
              End call & verify via official office landline / pre-agreed code
            </span>
            {selectedResponse === 'verify' && <CheckCircle2 className="w-4 h-4 text-cyber-green" />}
          </button>

          <button
            onClick={() => handleResponse('pay')}
            className={`w-full p-3.5 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
              selectedResponse === 'pay'
                ? 'bg-cyber-red-dim border-cyber-red text-cyber-red'
                : 'bg-cyber-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-cyber-red" />
              Follow instructions quickly to help the Dean
            </span>
            {selectedResponse === 'pay' && <ShieldAlert className="w-4 h-4 text-cyber-red" />}
          </button>
        </div>
      </div>

      {selectedResponse === 'pay' && (
        <div className="w-full max-w-md p-3.5 rounded-xl bg-cyber-red-dim border border-cyber-red text-xs text-left text-slate-200 mb-4">
          <strong className="text-cyber-red block font-mono">⚠️ DEEPFAKE EXTORTION TRAP:</strong>
          The video and voice were generated using off-the-shelf AI cloning tools trained on the Dean's public YouTube lectures. Never send gift cards or money based on video calls without independent out-of-band verification!
        </div>
      )}

      {selectedResponse === 'verify' && (
        <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-left text-slate-200 mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ OUT-OF-BAND PROTOCOL SUCCESS:</strong>
            You refused to be swayed by synthesized authority and verified through an independent known channel. You have completed the ultimate defense challenge!
          </div>

          <button
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>🏆 ACHIEVE DIGITAL DEFENDER STATUS</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
