import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function SmishingMission({ onComplete }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [revealedClues, setRevealedClues] = useState(new Set());

  const clues = [
    {
      id: 'sender',
      label: 'Unknown Overseas Number',
      detail: 'Official postal services send alerts via shortcodes (e.g. 28777), not random 12-digit international mobile numbers.',
    },
    {
      id: 'tax',
      label: 'Fake Urgent Fee Demand',
      detail: 'Scammers ask for small amounts ($1.50) so victims lower their guard and eagerly enter credit card credentials.',
    },
    {
      id: 'url',
      label: 'Deceptive Domain Extension (.cc)',
      detail: 'The link points to "usps-parcel-verify.cc" rather than the authentic "usps.com". Anyone can register lookalike domains.',
    },
  ];

  const handleClueClick = (id) => {
    cyberAudio.playClick();
    const updated = new Set(revealedClues);
    updated.add(id);
    setRevealedClues(updated);
  };

  const handleActionChoose = (action) => {
    cyberAudio.playClick();
    setSelectedAction(action);
    if (action === 'block') {
      cyberAudio.playNeutralized();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Smartphone Mockup Frame */}
      <div className="w-full max-w-sm bg-black border-4 border-slate-800 rounded-[36px] p-3 shadow-2xl relative mb-4">
        {/* Dynamic Island / Speaker */}
        <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 mr-2" />
          <div className="w-8 h-1.5 rounded-full bg-slate-800" />
        </div>

        {/* Screen Content */}
        <div className="bg-cyber-950 rounded-[28px] p-4 text-left border border-slate-800/80 min-h-[360px] flex flex-col justify-between">
          
          {/* SMS Header */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2 mb-3">
              <span className="font-semibold text-white">MESSAGES</span>
              <span>10:24 AM</span>
            </div>

            {/* Sender bubble */}
            <div className="text-center mb-3">
              <button
                onClick={() => handleClueClick('sender')}
                className={`inline-block px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  revealedClues.has('sender')
                    ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green'
                    : 'bg-cyber-900 text-slate-300 border border-slate-700 hover:border-cyber-red animate-pulse'
                }`}
              >
                +44 7911 123456 (Unknown)
              </button>
            </div>

            {/* SMS Message Bubble */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl rounded-tl-none p-3.5 space-y-2 text-xs font-sans text-slate-200 shadow-md">
              <p>
                [USPS/Parcel Express]: Package #US-8849 cannot be delivered due to an incomplete address.
              </p>

              {/* Fee Clue Button */}
              <button
                onClick={() => handleClueClick('tax')}
                className={`w-full p-2 rounded-lg text-left transition-all ${
                  revealedClues.has('tax')
                    ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green'
                    : 'bg-amber-950/40 text-amber-200 border border-amber-500/50 hover:bg-amber-900/30'
                }`}
              >
                ⚠️ A small redelivery charge of $1.50 is required immediately or the parcel will be discarded.
              </button>

              {/* URL Clue Button */}
              <button
                onClick={() => handleClueClick('url')}
                className={`w-full p-2 rounded-lg text-left text-xs font-mono transition-all ${
                  revealedClues.has('url')
                    ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green'
                    : 'bg-cyber-950/60 text-cyber-cyan border border-cyber-cyan/80 hover:bg-cyber-900/40'
                }`}
              >
                👉 Update address & pay fee: http://usps-parcel-verify.cc/track
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-[10px] font-mono text-slate-500">
            [ Tap message parts to inspect clues ]
          </div>
        </div>
      </div>

      {/* Decision Choices */}
      <div className="w-full max-w-sm space-y-2.5">
        <h5 className="text-xs font-hud font-bold text-slate-400 uppercase tracking-wider text-left">
          CHOOSE YOUR DEFENSIVE ACTION:
        </h5>

        <button
          onClick={() => handleActionChoose('block')}
          className={`w-full p-3.5 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
            selectedAction === 'block'
              ? 'bg-cyber-green-dim border-cyber-green text-cyber-green shadow-glow-green'
              : 'bg-cyber-900 border-slate-700 text-white hover:border-cyber-cyan'
          }`}
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyber-green" />
            Block Number, Report as Spam & Ignore
          </span>
          {selectedAction === 'block' && <CheckCircle2 className="w-4 h-4 text-cyber-green" />}
        </button>

        <button
          onClick={() => handleActionChoose('click')}
          className={`w-full p-3.5 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
            selectedAction === 'click'
              ? 'bg-cyber-red-dim border-cyber-red text-cyber-red'
              : 'bg-cyber-900 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-cyber-red" />
            Click link to pay $1.50 and check tracking
          </span>
          {selectedAction === 'click' && <AlertTriangle className="w-4 h-4 text-cyber-red" />}
        </button>
      </div>

      {/* Outcome Feedback */}
      {selectedAction === 'click' && (
        <div className="w-full max-w-sm mt-3 p-3 rounded-xl bg-cyber-red-dim border border-cyber-red text-xs text-slate-200 text-left">
          <strong className="text-cyber-red block font-mono">⚠️ COMPROMISE DETECTED:</strong>
          Clicking opens a cloned phishing page designed to steal your credit card details and mobile identity!
        </div>
      )}

      {selectedAction === 'block' && (
        <div className="w-full max-w-sm mt-4 flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-slate-200 text-left mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ DEFENSIVE SHIELD ACTIVE:</strong>
            You safely identified the fake courier scam without exposing payment info or validating your number to spammers!
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-cyber-cyan text-cyber-950 shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>PROCEED TO NEUTRALIZATION</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
