import React, { useState } from 'react';
import { QrCode, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function QuishingMission({ onComplete }) {
  const [tamperingInspected, setTamperingInspected] = useState(false);
  const [urlAnalyzed, setUrlAnalyzed] = useState(false);

  const handleInspectTampering = () => {
    cyberAudio.playClick();
    setTamperingInspected(true);
  };

  const handleInspectUrl = () => {
    cyberAudio.playClick();
    setUrlAnalyzed(true);
  };

  const isComplete = tamperingInspected && urlAnalyzed;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3.5 rounded-xl mb-4 text-left text-xs font-mono">
        <span className="text-slate-300">
          PHYSICAL QUISHING SCENARIO: A glossy QR sticker was pasted over the city parking meter instructions. Inspect the physical and digital warning signs.
        </span>
      </div>

      <div className="w-full max-w-md bg-cyber-950 border border-slate-700 rounded-2xl p-5 mb-5 shadow-2xl text-left hud-corner">
        
        {/* Parking Meter Graphic */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-4 text-center">
          <span className="text-xs font-mono text-slate-400 block mb-2">
            METRO CITY PARKING METER #418
          </span>

          {/* QR Code with peeled sticker visual */}
          <div className="relative inline-block p-4 bg-white rounded-xl shadow-lg my-2">
            <QrCode className="w-28 h-28 text-slate-900" />

            {/* Clickable Tampered Sticker Overlay */}
            <button
              onClick={handleInspectTampering}
              className={`absolute inset-0 rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 text-center ${
                tamperingInspected
                  ? 'bg-cyber-green/20 border-cyber-green text-black font-bold'
                  : 'bg-cyber-red/25 border-cyber-red hover:bg-cyber-red/35 cursor-pointer animate-pulse'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-red-950 bg-red-100 px-1 rounded shadow">
                {tamperingInspected ? '✓ STICKER OVERLAY DETECTED' : '⚠️ TAP TO INSPECT STICKER EDGES'}
              </span>
            </button>
          </div>

          <p className="text-[11px] font-sans text-slate-400 mt-2">
            Notice how the glossy vinyl sticker is peeling slightly, concealing the original embossed metal instructions beneath it.
          </p>
        </div>

        {/* Destination URL Scanner Preview */}
        <div className="space-y-2">
          <h5 className="text-xs font-hud font-bold text-slate-400 uppercase tracking-wider">
            QR SCANNER DESTINATION RESOLVER:
          </h5>

          <button
            onClick={handleInspectUrl}
            className={`w-full p-3 rounded-xl border text-left text-xs font-mono transition-all ${
              urlAnalyzed
                ? 'bg-cyber-green-dim border-cyber-green text-cyber-green'
                : 'bg-cyber-900 border-slate-700 text-slate-300 hover:border-cyber-cyan'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold">TARGET: http://city-park-pay-fast.top/meter</span>
              {urlAnalyzed && <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />}
            </div>
            <span className="text-[11px] text-slate-400 font-sans block">
              {urlAnalyzed
                ? 'Resolved to an unverified .top domain hosted in Eastern Europe—NOT the official city gov portal (.gov).'
                : 'Tap to resolve destination IP & certificate'}
            </span>
          </button>
        </div>
      </div>

      {isComplete && (
        <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-left text-slate-200 mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ QUISHING ATTEMPT NEUTRALIZED:</strong>
            You spotted the fraudulent physical sticker overlay and caught the spoofed payment domain before entering your credit card!
          </div>

          <button
            onClick={() => {
              cyberAudio.playNeutralized();
              onComplete();
            }}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>REPORT TAMPERING & SECURE NODE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
