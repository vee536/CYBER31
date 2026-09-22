import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Eye, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function PhishingMission({ onComplete }) {
  // 4 suspicious hotspots in the email
  const [foundHotspots, setFoundHotspots] = useState(new Set());
  const [activeTooltip, setActiveTooltip] = useState(null);

  const hotspots = [
    {
      id: 'sender',
      label: 'Spoofed Sender Address',
      hint: 'Notice the domain: @paypa1-security-desk.com instead of the legitimate @paypal.com (a "1" replaces the "l").',
    },
    {
      id: 'urgency',
      label: 'Artificial Urgency & Fear',
      hint: 'Scammers create synthetic panic ("Permanent Termination in 01:59:00") to rush you into acting without thinking.',
    },
    {
      id: 'link',
      label: 'Deceptive Hyperlink Mismatch',
      hint: 'The link text displays "paypal.com/verify" but the actual target URL points to a malicious credential-harvesting server.',
    },
    {
      id: 'attachment',
      label: 'Double-Extension Executable',
      hint: 'The attachment is disguised as "SecurityForm.pdf.exe". Opening an executable will install malware on your system.',
    },
  ];

  const handleSpotClick = (id) => {
    cyberAudio.playClick();
    const updated = new Set(foundHotspots);
    updated.add(id);
    setFoundHotspots(updated);
    setActiveTooltip(hotspots.find((h) => h.id === id));

    if (updated.size === hotspots.length) {
      setTimeout(() => {
        cyberAudio.playNeutralized();
      }, 500);
    }
  };

  const isAllFound = foundHotspots.size === hotspots.length;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Task Instruction Banner */}
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/40 p-3 sm:p-4 rounded-xl mb-4 flex items-center justify-between gap-3 hud-corner">
        <div className="flex items-center gap-2.5">
          <Eye className="w-5 h-5 text-cyber-cyan shrink-0 animate-pulse" />
          <div className="text-left">
            <h4 className="text-xs sm:text-sm font-cyber font-bold text-white">
              TASK: IDENTIFY ALL 4 SUSPICIOUS WARNING SIGNS
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-300 font-sans">
              Tap the suspicious elements inside this incoming payment email.
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="shrink-0 px-3 py-1 rounded-lg bg-cyber-950 border border-cyber-cyan/40 text-xs font-mono font-bold text-cyber-cyan shadow-glow-cyan-sm">
          {foundHotspots.size} / {hotspots.length} SPOTTED
        </div>
      </div>

      {/* Simulated Email Client Interface */}
      <div className="w-full bg-cyber-950 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Email Header Controls */}
        <div className="bg-cyber-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-slate-300 font-bold">MAIL CLIENT // INCOMING DISPATCH</span>
          </div>
          <span className="text-[10px] text-cyber-amber">EXTERNAL SENDER</span>
        </div>

        {/* Email Metadata */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-cyber-900/40 space-y-2 text-left">
          
          {/* Sender Row (Hotspot 1) */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-slate-300">
              <span className="text-slate-500">FROM:</span>
              <span>PayPal Security Center</span>
              
              {/* Clickable Sender Hotspot */}
              <button
                onClick={() => handleSpotClick('sender')}
                className={`px-2 py-0.5 rounded text-xs font-mono transition-all flex items-center gap-1 ${
                  foundHotspots.has('sender')
                    ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50 font-bold'
                    : 'bg-cyber-red-dim text-cyber-red border border-cyber-red/50 hover:bg-cyber-red/30 cursor-pointer animate-pulse'
                }`}
              >
                &lt;security-alert@paypa1-security-desk.com&gt;
                {foundHotspots.has('sender') && <CheckCircle2 className="w-3.5 h-3.5" />}
              </button>
            </div>
            <span className="text-[10px] font-mono text-slate-500">TODAY, 10:42 AM</span>
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span className="text-slate-500">TO:</span> defender@secure-net.edu
          </div>

          <div className="text-sm font-sans font-bold text-white pt-1">
            SUBJECT: [URGENT NOTICE] YOUR ACCOUNT WILL BE PERMANENTLY SUSPENDED IN 2 HOURS
          </div>
        </div>

        {/* Email Body Content */}
        <div className="p-5 sm:p-6 text-left space-y-4 font-sans text-sm text-slate-300 bg-cyber-950/70">
          
          {/* Urgency Alert Banner (Hotspot 2) */}
          <button
            onClick={() => handleSpotClick('urgency')}
            className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 ${
              foundHotspots.has('urgency')
                ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50'
                : 'bg-red-950/60 text-red-300 border border-red-500/50 hover:bg-red-900/40 cursor-pointer animate-pulse'
            }`}
          >
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-cyber-red" />
            <div>
              <div className="font-bold text-xs uppercase tracking-wider font-mono">
                ⚠️ SUSPENSION COUNTDOWN: 01:59:00 REMAINING
              </div>
              <p className="text-xs mt-0.5">
                Immediate verification required. Failure to comply will lead to permanent forfeiture of your balance.
              </p>
            </div>
            {foundHotspots.has('urgency') && <CheckCircle2 className="w-4 h-4 ml-auto text-cyber-green shrink-0" />}
          </button>

          <p>Dear Valued Customer,</p>

          <p>
            We detected abnormal activity originating from an unauthorized device. To maintain system integrity, we require you to immediately re-authenticate your identity and billing information.
          </p>

          {/* Fake Hyperlink (Hotspot 3) */}
          <div className="py-2">
            <button
              onClick={() => handleSpotClick('link')}
              className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all inline-flex items-center gap-2 ${
                foundHotspots.has('link')
                  ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50'
                  : 'bg-cyber-950/80 text-cyber-cyan border border-cyber-cyan hover:bg-cyber-900/60 cursor-pointer shadow-glow-cyan-sm'
              }`}
            >
              <span>🔗 Verify Account Security Portal: https://paypal.com/verify</span>
              {foundHotspots.has('link') && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
            <div className="text-[10px] font-mono text-slate-500 mt-1 pl-1">
              [ Hover/Tap analysis: Real link destination = <span className="text-cyber-red">http://bit.ly/steal-my-session-882</span> ]
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Alternatively, fill out the attached security verification form and return it immediately.
          </p>

          {/* Dangerous Attachment (Hotspot 4) */}
          <div className="pt-2">
            <button
              onClick={() => handleSpotClick('attachment')}
              className={`p-2.5 rounded-xl border text-xs font-mono transition-all inline-flex items-center gap-3 ${
                foundHotspots.has('attachment')
                  ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/50'
                  : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-cyber-red cursor-pointer'
              }`}
            >
              <span className="px-1.5 py-0.5 bg-red-900/60 text-red-300 rounded font-bold text-[10px]">
                .EXE
              </span>
              <span className="font-semibold">VerificationForm_Urgent.pdf.exe</span>
              <span className="text-[10px] text-slate-400">(412 KB)</span>
              {foundHotspots.has('attachment') && <CheckCircle2 className="w-4 h-4 text-cyber-green ml-2" />}
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Inspector Feedback Box */}
      {activeTooltip && (
        <div className="w-full mt-4 p-3.5 rounded-xl bg-cyber-900/90 border border-cyber-green/50 text-left shadow-glow-green">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-green mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>INDICATOR REVEALED: {activeTooltip.label.toUpperCase()}</span>
          </div>
          <p className="text-xs text-slate-200 font-sans leading-relaxed">
            {activeTooltip.hint}
          </p>
        </div>
      )}

      {/* All Hotspots Found Complete Action */}
      {isAllFound && (
        <div className="w-full mt-6 flex flex-col items-center animate-fade-in">
          <div className="w-full p-4 rounded-xl bg-cyber-green-dim border border-cyber-green text-cyber-green mb-4 text-center">
            <div className="text-sm font-cyber font-bold mb-1">
              ✓ ALL 4 PHISHING SIGNALS IDENTIFIED
            </div>
            <p className="text-xs font-sans text-slate-200">
              You recognized the spoofed domain, fake urgency timer, mismatched link destination, and malicious executable attachment!
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-cyber font-bold text-sm uppercase tracking-wider bg-cyber-cyan text-cyber-950 shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>NEUTRALIZE THREAT & CONTINUE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
