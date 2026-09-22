import React, { useState } from 'react';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function OversharingMission({ onComplete }) {
  const [redacted, setRedacted] = useState(new Set());

  const risks = [
    {
      id: 'barcode',
      label: 'Boarding Pass Barcode',
      detail: 'Barcodes on airline tickets contain your Passenger Name Record (PNR), frequent flyer ID, and passport details. Attackers can cancel your flight or steal your identity.',
    },
    {
      id: 'empty_home',
      label: 'Home Empty for 3 Weeks',
      detail: 'Broadcasting exact vacation dates announces to burglars and stalkers that your residence is completely unattended.',
    },
    {
      id: 'geotag',
      label: 'Exact Real-Time Geotag',
      detail: 'Tagging your exact physical airport gate in real-time verifies you are far from home and confirms your current coordinates.',
    },
    {
      id: 'birthday',
      label: 'Birthday Date Celebration',
      detail: 'Dates of birth are widely used as verification questions for banks, medical portals, and email password resets.',
    },
  ];

  const handleToggleRedact = (id) => {
    cyberAudio.playClick();
    const updated = new Set(redacted);
    updated.add(id);
    setRedacted(updated);

    if (updated.size === risks.length) {
      setTimeout(() => {
        cyberAudio.playNeutralized();
      }, 400);
    }
  };

  const isAllSecured = redacted.size === risks.length;

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Header Banner */}
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3 rounded-xl mb-4 flex items-center justify-between text-left text-xs font-mono">
        <span className="text-slate-300">
          PRIVACY AUDIT: Tap the 4 oversharing vulnerabilities in this travel post to redact them.
        </span>
        <span className="px-2 py-0.5 rounded bg-cyber-950 text-cyber-cyan font-bold">
          {redacted.size}/{risks.length} REDACTED
        </span>
      </div>

      {/* Social Post Mockup Card */}
      <div className="w-full max-w-md bg-cyber-950 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl mb-5 text-left">
        {/* User profile row */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyber-cyan flex items-center justify-center font-bold text-white text-sm">
              AL
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1">
                Alex_Travels
              </div>
              
              {/* Geotag Vulnerability */}
              <button
                onClick={() => handleToggleRedact('geotag')}
                className={`text-[11px] font-mono flex items-center gap-1 transition-all ${
                  redacted.has('geotag')
                    ? 'text-cyber-green bg-cyber-green-dim px-2 py-0.5 rounded font-bold'
                    : 'text-cyber-red bg-cyber-red-dim px-2 py-0.5 rounded hover:bg-cyber-red/30 animate-pulse'
                }`}
              >
                <MapPin className="w-3 h-3" />
                {redacted.has('geotag') ? '[GEOTAG REDACTED]' : 'Terminal 4, Gate B18 - JFK Airport'}
              </button>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500">24m ago</span>
        </div>

        {/* Post Image Container: Boarding Pass Barcode */}
        <div className="p-4 bg-cyber-900/40">
          <div className="w-full h-48 bg-slate-900 rounded-xl border border-slate-700 p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start text-xs font-mono text-slate-400">
              <div>
                <span className="text-white font-bold block text-sm">GLOBAL AIRWAYS</span>
                <span>BOARDING PASS // FLIGHT GA-928</span>
              </div>
              <span className="text-cyber-cyan font-bold">SEAT 14A</span>
            </div>

            {/* Clickable Barcode Area */}
            <button
              onClick={() => handleToggleRedact('barcode')}
              className={`w-full p-2.5 rounded-lg border text-center transition-all ${
                redacted.has('barcode')
                  ? 'bg-cyber-green-dim border-cyber-green text-cyber-green font-mono text-xs font-bold'
                  : 'bg-cyber-red-dim border-cyber-red text-cyber-red hover:bg-cyber-red/30 animate-pulse'
              }`}
            >
              {redacted.has('barcode') ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>[BARCODE & PNR ENCRYPTED]</span>
                </div>
              ) : (
                <div>
                  <div className="font-mono tracking-widest text-xs font-black">||| | |||| | ||| |||| | |||</div>
                  <span className="text-[10px] font-bold block mt-1">⚠️ TAP TO REDACT PASSENGER BARCODE</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Post Text Caption */}
        <div className="p-4 space-y-2.5 text-xs font-sans text-slate-300">
          <p>
            Finally heading out for my dream solo trip! ✈️
          </p>

          {/* Empty Home Risk */}
          <button
            onClick={() => handleToggleRedact('empty_home')}
            className={`w-full p-2 rounded-lg text-left transition-all ${
              redacted.has('empty_home')
                ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green'
                : 'bg-cyber-red-dim text-cyber-red border border-cyber-red/50 hover:bg-cyber-red/30 animate-pulse'
            }`}
          >
            {redacted.has('empty_home')
              ? '✓ [VACATION DATES & UNATTENDED RESIDENCE HIDDEN]'
              : '⚠️ "House is completely empty for the next 3 weeks until Nov 2nd! Catch you all next month!"'}
          </button>

          {/* Birthday Risk */}
          <button
            onClick={() => handleToggleRedact('birthday')}
            className={`w-full p-2 rounded-lg text-left transition-all ${
              redacted.has('birthday')
                ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green'
                : 'bg-cyber-red-dim text-cyber-red border border-cyber-red/50 hover:bg-cyber-red/30 animate-pulse'
            }`}
          >
            {redacted.has('birthday')
              ? '✓ [EXACT DATE OF BIRTH SECURITY VALUE PROTECTED]'
              : '⚠️ "Best way to celebrate turning 22 today on October 12th! 🎉"'}
          </button>
        </div>
      </div>

      {/* Completion */}
      {isAllSecured && (
        <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-slate-200 text-left mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ DIGITAL FOOTPRINT FORTIFIED:</strong>
            You eliminated the physical burglary hazard, barcode credential leak, real-time tracking, and birthday password verification clue!
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>SECURE PROFILE & FINISH MISSION</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
