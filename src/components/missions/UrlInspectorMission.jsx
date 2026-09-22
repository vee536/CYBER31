import React, { useState } from 'react';
import { Globe, Lock, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function UrlInspectorMission({ onComplete }) {
  const [analyzedParts, setAnalyzedParts] = useState(new Set());

  const parts = [
    {
      id: 'subdomain',
      name: 'Subdomain / Typosquatting',
      value: 'micros0ft-support-login.',
      type: 'threat',
      detail: 'Notice the zero ("0") instead of the letter "o" in "micros0ft". Scammers use lookalike characters to trick human eyes.',
    },
    {
      id: 'rootdomain',
      name: 'Actual Core Domain',
      value: 'security-portal.net',
      type: 'threat',
      detail: 'The real owner of this website is "security-portal.net", NOT Microsoft. Subdomains can say anything the attacker chooses!',
    },
    {
      id: 'padlock',
      name: 'SSL Padlock Fallacy',
      value: 'https:// [Padlock]',
      type: 'info',
      detail: 'A padlock ONLY means data in transit is encrypted; it does NOT verify that the site operator is legitimate. Criminals get free SSL certificates in seconds.',
    },
  ];

  const handleInspect = (id) => {
    cyberAudio.playClick();
    const updated = new Set(analyzedParts);
    updated.add(id);
    setAnalyzedParts(updated);

    if (updated.size === parts.length) {
      setTimeout(() => {
        cyberAudio.playNeutralized();
      }, 400);
    }
  };

  const isAllInspected = analyzedParts.size === parts.length;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Instructions */}
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3 rounded-xl mb-4 flex items-center justify-between text-left text-xs font-mono">
        <span className="text-slate-300">
          INSPECT THE BROWSER URL ANATOMY: Tap each highlighted section of the address bar.
        </span>
        <span className="px-2 py-0.5 rounded bg-cyber-950 text-cyber-cyan font-bold">
          {analyzedParts.size}/{parts.length} INSPECTED
        </span>
      </div>

      {/* Browser Mockup */}
      <div className="w-full bg-cyber-950 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl mb-5">
        
        {/* Browser Top Tab Bar */}
        <div className="bg-cyber-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="bg-cyber-950 px-3 py-1 rounded-t-lg border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Account Verification Center</span>
          </div>
        </div>

        {/* Address Bar */}
        <div className="p-3 bg-cyber-900/60 border-b border-slate-800">
          <div className="w-full bg-cyber-950 border border-slate-700 rounded-xl p-2.5 flex flex-wrap items-center gap-1 text-xs font-mono">
            
            {/* Padlock button */}
            <button
              onClick={() => handleInspect('padlock')}
              className={`px-2 py-1 rounded flex items-center gap-1.5 transition-all ${
                analyzedParts.has('padlock')
                  ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700 animate-pulse'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-green-400" />
              <span>https://</span>
            </button>

            {/* Subdomain typosquatting button */}
            <button
              onClick={() => handleInspect('subdomain')}
              className={`px-2 py-1 rounded transition-all ${
                analyzedParts.has('subdomain')
                  ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50 font-bold'
                  : 'bg-cyber-red-dim text-cyber-red border border-cyber-red/50 hover:bg-cyber-red/30 animate-pulse'
              }`}
            >
              micros0ft-support-login.
            </button>

            {/* Core domain button */}
            <button
              onClick={() => handleInspect('rootdomain')}
              className={`px-2 py-1 rounded transition-all ${
                analyzedParts.has('rootdomain')
                  ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50 font-bold'
                  : 'bg-amber-950/60 text-amber-300 border border-amber-500/50 hover:bg-amber-900/40 animate-pulse'
              }`}
            >
              security-portal.net
            </button>

            <span className="text-slate-500 hidden sm:inline">/account/verify</span>
          </div>
        </div>

        {/* Webpage Content Simulation */}
        <div className="p-6 text-center space-y-3 bg-cyber-950/80">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-blue-400">
            <Globe className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white font-sans">
            Sign In to Verify Your University Account
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto font-sans">
            Enter your student ID and password below to prevent system deactivation.
          </p>
          <div className="w-48 h-8 bg-slate-800 rounded-lg mx-auto opacity-50" />
          <div className="w-48 h-8 bg-blue-600 rounded-lg mx-auto opacity-50" />
        </div>
      </div>

      {/* Inspection Explanation Cards */}
      <div className="w-full space-y-2 mb-6">
        {parts.map((p) => (
          <div
            key={p.id}
            className={`p-3 rounded-xl border text-left transition-all ${
              analyzedParts.has(p.id)
                ? 'bg-cyber-900/80 border-cyan-500/40'
                : 'bg-cyber-950/40 border-slate-800/60 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                {analyzedParts.has(p.id) ? (
                  <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                ) : (
                  <Eye className="w-4 h-4 text-slate-500" />
                )}
                {p.name}: <code className="text-cyber-cyan font-mono">{p.value}</code>
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {analyzedParts.has(p.id) ? 'ANALYZED' : 'TAP URL TO INSPECT'}
              </span>
            </div>
            {analyzedParts.has(p.id) && (
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {p.detail}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Completion */}
      {isAllInspected && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <button
            onClick={onComplete}
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>CONFIRM SPOOFED DOMAIN & NEUTRALIZE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
