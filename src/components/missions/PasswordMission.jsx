import React, { useState } from 'react';
import { CheckCircle2, XCircle, Shield, KeyRound, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function PasswordMission({ onComplete }) {
  const [password, setPassword] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // Dynamic Validation Checks
  const checks = [
    {
      id: 'length',
      label: 'Minimum 12 characters long',
      passed: password.length >= 12,
    },
    {
      id: 'upper',
      label: 'Contains uppercase letter (A-Z)',
      passed: /[A-Z]/.test(password),
    },
    {
      id: 'lower',
      label: 'Contains lowercase letter (a-z)',
      passed: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'Contains at least one number (0-9)',
      passed: /[0-9]/.test(password),
    },
    {
      id: 'special',
      label: 'Contains special symbol (!@#$%^&*...)',
      passed: /[^A-Za-z0-9]/.test(password),
    },
    {
      id: 'no_obvious',
      label: 'Avoids common patterns (password, 12345, qwerty)',
      passed:
        password.length > 0 &&
        !/password|12345|qwerty|admin|welcome/i.test(password),
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const isFortress = passedCount === checks.length;

  const handleInputChange = (e) => {
    cyberAudio.playClick();
    setPassword(e.target.value);
  };

  const insertSamplePassphrase = () => {
    cyberAudio.playClick();
    setPassword('Solar#Falcon89!Horizon');
  };

  const getStrengthMeta = () => {
    if (passedCount <= 2) {
      return { label: 'VULNERABLE', color: 'bg-red-500', width: '25%', text: 'text-red-400' };
    }
    if (passedCount <= 4) {
      return { label: 'MODERATE', color: 'bg-amber-500', width: '60%', text: 'text-amber-400' };
    }
    if (passedCount < checks.length) {
      return { label: 'STRONG', color: 'bg-cyber-cyan', width: '85%', text: 'text-cyber-cyan' };
    }
    return { label: 'FORTRESS GRADE', color: 'bg-cyber-green', width: '100%', text: 'text-cyber-green' };
  };

  const meta = getStrengthMeta();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Privacy Notice Banner */}
      <div className="w-full bg-cyber-950/40 border border-cyber-cyan/30 p-3 rounded-xl mb-4 flex items-center gap-2.5 text-xs font-mono text-cyber-cyan">
        <AlertCircle className="w-4 h-4 text-cyber-cyan shrink-0" />
        <span>
          <strong>Zero Transmission Sandbox:</strong> This is a local simulator. No keystrokes are ever stored or sent across any network.
        </span>
      </div>

      {/* Password Builder Box */}
      <div className="w-full bg-cyber-950 border border-slate-700 rounded-2xl p-5 sm:p-6 mb-5 shadow-2xl hud-corner">
        <label className="block text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Construct Defense Passphrase / Key:
        </label>

        <div className="relative mb-3">
          <input
            type="text"
            value={password}
            onChange={handleInputChange}
            placeholder="Type a strong custom password..."
            className="w-full bg-cyber-900 border border-cyber-cyan/40 focus:border-cyber-cyan focus:outline-none focus:ring-2 focus:ring-cyber-cyan/20 text-white font-mono text-base sm:text-lg px-4 py-3 rounded-xl transition-all"
            autoComplete="off"
            spellCheck="false"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <KeyRound className="w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Strength Meter */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Entropy Level:</span>
            <span className={`font-bold ${meta.text}`}>{meta.label}</span>
          </div>
          <div className="w-full h-2 bg-cyber-900 rounded-full overflow-hidden">
            <div
              className={`h-full ${meta.color} transition-all duration-300 shadow-glow-cyan-sm`}
              style={{ width: meta.width }}
            />
          </div>
        </div>

        {/* Helper quick suggestion for non-technical users */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">Need inspiration?</span>
          <button
            onClick={insertSamplePassphrase}
            className="text-xs font-mono text-cyber-cyan hover:text-white flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try Fortress Sample</span>
          </button>
        </div>
      </div>

      {/* Requirements Live Checklist */}
      <div className="w-full bg-cyber-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 text-left">
        <h5 className="text-xs font-hud font-bold text-slate-300 uppercase tracking-widest mb-3">
          SECURITY PROTOCOL REQUIREMENTS ({passedCount}/{checks.length})
        </h5>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checks.map((c) => (
            <div
              key={c.id}
              className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-mono transition-all ${
                c.passed
                  ? 'bg-cyber-green-dim border-cyber-green/40 text-cyber-green'
                  : 'bg-cyber-950/60 border-slate-800 text-slate-400'
              }`}
            >
              {c.passed ? (
                <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
              )}
              <span className={c.passed ? 'font-semibold text-white' : ''}>
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Trigger */}
      {isFortress && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <div className="w-full p-4 rounded-xl bg-cyber-green-dim border border-cyber-green text-cyber-green mb-4 text-center">
            <div className="text-sm font-cyber font-bold mb-1">
              🛡️ FORTRESS CRITERIA ACHIEVED
            </div>
            <p className="text-xs font-sans text-slate-200">
              Your defense key resists automated brute-force dictionaries and hash cracking matrices!
            </p>
          </div>

          <button
            onClick={() => {
              cyberAudio.playNeutralized();
              onComplete();
            }}
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-cyber font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>LOCK PERIMETER & COMPLETE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
