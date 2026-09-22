import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, ShieldCheck, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function OtpMission({ onComplete }) {
  const [userChoice, setUserChoice] = useState(null);

  const handleChoice = (c) => {
    cyberAudio.playClick();
    setUserChoice(c);
    if (c === 'refuse') {
      cyberAudio.playNeutralized();
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3 rounded-xl mb-4 text-left text-xs font-mono">
        <span className="text-slate-300">
          VISHING SOCIAL ENGINEERING INTERCEPT: An urgent phone call claims to be Campus IT Support investigating account compromise.
        </span>
      </div>

      <div className="w-full max-w-md bg-cyber-950 border border-slate-700 rounded-2xl p-5 mb-5 shadow-2xl text-left hud-corner">
        
        {/* Incoming Call Header */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyber-950 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan animate-pulse">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white">
                CALLER ID: "CAMPUS IT HELPDESK"
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Call Duration: 01:14 • Line Active
              </div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 text-[10px] font-mono animate-pulse">
            SPOOFED ID
          </span>
        </div>

        {/* Live Audio Dialogue Transcript */}
        <div className="bg-cyber-900/50 border border-slate-800 rounded-xl p-3.5 mb-4 text-xs font-sans text-slate-200 space-y-2">
          <p className="text-cyber-cyan font-mono text-[11px]">
            [CALLER]: "Hello, this is Marcus from Campus Security Operations. We're actively blocking an unauthorized IP from logging into your account."
          </p>
          <p className="text-cyber-cyan font-mono text-[11px]">
            [CALLER]: "I just sent a 6-digit emergency verification code to your phone. Read it back to me immediately so I can lock down the intruder's connection!"
          </p>
          <div className="p-2.5 rounded-lg bg-cyber-950 border border-slate-800 text-[11px] font-mono text-slate-300">
            📲 <span className="text-slate-400">SMS RECEIVED:</span> "Your Portal code is <strong className="text-white">839-102</strong>. Do NOT share this code with anyone. Staff will NEVER ask for it."
          </div>
        </div>

        {/* Action Choices */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleChoice('refuse')}
            className={`w-full p-3.5 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
              userChoice === 'refuse'
                ? 'bg-cyber-green-dim border-cyber-green text-cyber-green shadow-glow-green'
                : 'bg-cyber-900 border-slate-700 text-white hover:border-cyber-cyan'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-green" />
              Hang up immediately and call official IT desk directly
            </span>
            {userChoice === 'refuse' && <CheckCircle2 className="w-4 h-4 text-cyber-green" />}
          </button>

          <button
            onClick={() => handleChoice('give')}
            className={`w-full p-3.5 rounded-xl border text-xs font-hud font-bold uppercase tracking-wider transition-all flex items-center justify-between ${
              userChoice === 'give'
                ? 'bg-cyber-red-dim border-cyber-red text-cyber-red'
                : 'bg-cyber-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-cyber-red" />
              Read the 6-digit code to help the caller block the attack
            </span>
            {userChoice === 'give' && <ShieldAlert className="w-4 h-4 text-cyber-red" />}
          </button>
        </div>
      </div>

      {userChoice === 'give' && (
        <div className="w-full max-w-md p-3.5 rounded-xl bg-cyber-red-dim border border-cyber-red text-xs text-left text-slate-200 mb-4">
          <strong className="text-cyber-red block font-mono">⚠️ 2FA BYPASS COMPLETED:</strong>
          The caller was the attacker attempting to log into your account! Relaying the OTP was the final barrier they needed to take over your account and lock you out.
        </div>
      )}

      {userChoice === 'refuse' && (
        <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-left text-slate-200 mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ VISHING EXPOSED & BLOCKED:</strong>
            You remembered the golden rule: Authentic companies, banks, and IT staff NEVER ask for one-time passcodes over the phone.
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>DISMISS THREAT & SECURE IDENTITY</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
