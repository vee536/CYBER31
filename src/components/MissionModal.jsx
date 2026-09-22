import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Shield, 
  Quote, 
  Radio, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';
import { cyberAudio } from '../utils/audio';

// Import specialized interactive mission simulators
import PhishingMission from './missions/PhishingMission';
import PasswordMission from './missions/PasswordMission';
import SmishingMission from './missions/SmishingMission';
import UrlInspectorMission from './missions/UrlInspectorMission';
import OversharingMission from './missions/OversharingMission';
import WifiMission from './missions/WifiMission';
import QuishingMission from './missions/QuishingMission';
import UsbMission from './missions/UsbMission';
import DownloadMission from './missions/DownloadMission';
import OtpMission from './missions/OtpMission';
import DeepfakeMission from './missions/DeepfakeMission';
import ScenarioMission from './missions/ScenarioMission';

export default function MissionModal({
  mission,
  onClose,
  onMissionCompleted,
  isAlreadyCompleted = false,
}) {
  // Step 1: Alert -> Step 2: Briefing -> Step 3: Interactive Task -> Step 4: Neutralizing Animation -> Step 5: Takeaway -> Step 6: Complete
  const [currentStep, setCurrentStep] = useState(1);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Play threat alert sound on modal open
    cyberAudio.playThreatAlert();
  }, [mission]);

  // Handle Step 4 Neutralizing Scan animation
  useEffect(() => {
    if (currentStep === 4) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setScanProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStep(5); // Proceed to Takeaway
          }, 400);
        }
      }, 250);
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  if (!mission) return null;

  const handleStepTransition = (nextStep) => {
    cyberAudio.playClick();
    setCurrentStep(nextStep);
  };

  const handleTaskFinished = () => {
    cyberAudio.playNeutralized();
    setCurrentStep(4); // Trigger Neutralization scan
  };

  const handleFinalComplete = () => {
    cyberAudio.playNeutralized();
    onMissionCompleted(mission.day);
    onClose();
  };

  // Render the interactive challenge module for Step 3
  const renderInteractiveTask = () => {
    switch (mission.missionType) {
      case 'phishing':
        return <PhishingMission onComplete={handleTaskFinished} />;
      case 'password':
        return <PasswordMission onComplete={handleTaskFinished} />;
      case 'smishing':
        return <SmishingMission onComplete={handleTaskFinished} />;
      case 'fake_url':
        return <UrlInspectorMission onComplete={handleTaskFinished} />;
      case 'oversharing':
        return <OversharingMission onComplete={handleTaskFinished} />;
      case 'wifi':
        return <WifiMission onComplete={handleTaskFinished} />;
      case 'quishing':
        return <QuishingMission onComplete={handleTaskFinished} />;
      case 'usb':
        return <UsbMission onComplete={handleTaskFinished} />;
      case 'download':
        return <DownloadMission onComplete={handleTaskFinished} />;
      case 'otp':
        return <OtpMission onComplete={handleTaskFinished} />;
      case 'deepfake':
        return <DeepfakeMission onComplete={handleTaskFinished} />;
      default:
        return <ScenarioMission mission={mission} onComplete={handleTaskFinished} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-cyber-950 border border-cyber-cyan/30 rounded-3xl overflow-hidden shadow-2xl my-auto hud-corner">
        
        {/* Top Header HUD Bar */}
        <div className="bg-cyber-900/90 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-red animate-pulse-slow" />
            <span className="text-white font-bold font-cyber">
              DAY {String(mission.day).padStart(2, '0')} // {mission.alertSource}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden sm:inline">
              STEP {currentStep} OF 6
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-cyber-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body with Step Flow */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto text-center">
          
          {/* ===================================================================
              STEP 1: THREAT DETECTED ALERT
             =================================================================== */}
          {currentStep === 1 && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="w-20 h-20 rounded-2xl bg-red-950/80 border-2 border-cyber-red flex items-center justify-center mb-6 shadow-glow-red animate-pulse">
                <AlertTriangle className="w-10 h-10 text-cyber-red" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 border border-red-500/50 text-xs font-mono text-red-300 mb-3 animate-pulse">
                <Radio className="w-3.5 h-3.5" />
                <span>INCOMING SECURITY SIGNAL // PRIORITY THREAT</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-cyber text-white mb-2">
                🚨 {mission.threatType.toUpperCase()}
              </h3>

              <p className="text-xs sm:text-sm font-hud text-cyber-red tracking-wider uppercase mb-6">
                SEVERITY: {mission.threatSeverity} • SOURCE: {mission.alertSource}
              </p>

              <div className="w-full bg-cyber-900/60 border border-slate-800 p-4 rounded-xl text-left text-xs font-mono text-slate-300 mb-8 space-y-1">
                <div>&gt; VECTOR TARGET: Personal Digital Perimeter</div>
                <div>&gt; STATUS: Unmitigated Anomaly Active</div>
                <div>&gt; DEFENDER ACTION REQUIRED: Tactical Inspection</div>
              </div>

              <button
                onClick={() => handleStepTransition(2)}
                className="w-full sm:w-auto py-3.5 px-10 rounded-xl font-cyber font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-cyber-red to-orange-500 text-white shadow-glow-red hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>OPEN MISSION BRIEFING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ===================================================================
              STEP 2: TOPIC QUOTE & MISSION BRIEFING
             =================================================================== */}
          {currentStep === 2 && (
            <div className="flex flex-col items-center text-left animate-fade-in">
              
              {/* Awareness Quote Callout */}
              <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyber-900 via-cyber-850 to-cyber-900 border border-cyber-cyan/40 mb-6 relative hud-corner shadow-cyber-card">
                <Quote className="w-8 h-8 text-cyber-cyan/30 absolute top-3 right-3" />
                <span className="text-[10px] font-mono text-cyber-cyan font-bold tracking-widest uppercase block mb-1">
                  TACTICAL AWARENESS PRINCIPLE
                </span>
                <p className="text-base sm:text-lg font-cyber font-bold text-white italic leading-snug">
                  "{mission.quote}"
                </p>
              </div>

              {/* Mission Scenario Briefing */}
              <div className="w-full space-y-3 mb-8">
                <div className="text-xs font-hud font-bold text-slate-400 tracking-wider uppercase">
                  SITUATION BRIEFING:
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-cyber text-white">
                  {mission.title}
                </h4>
                <div className="text-xs font-hud font-semibold text-cyber-cyan">
                  TOPIC: {mission.topic}
                </div>
                <p className="text-sm font-sans text-slate-300 leading-relaxed bg-cyber-900/40 p-4 rounded-xl border border-slate-800">
                  {mission.briefing}
                </p>
              </div>

              <div className="w-full flex justify-end">
                <button
                  onClick={() => handleStepTransition(3)}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-cyan to-cyber-green text-black shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>COMMENCE TASK INTERACTION</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 3: INTERACTIVE TASK
             =================================================================== */}
          {currentStep === 3 && (
            <div className="flex flex-col items-center animate-fade-in">
              {renderInteractiveTask()}
            </div>
          )}

          {/* ===================================================================
              STEP 4: NEUTRALIZATION SCAN ANIMATION (Red -> Neon Green/Cyan)
             =================================================================== */}
          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-cyber-green-dim border-2 border-cyber-green flex items-center justify-center shadow-glow-green animate-pulse">
                  <ShieldCheck className="w-12 h-12 text-cyber-green" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-cyber-green/40 animate-ping pointer-events-none" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-cyber text-white mb-2 tracking-wider">
                THREAT NEUTRALIZATION IN PROGRESS
              </h3>
              <p className="text-xs font-mono text-cyber-cyan mb-6">
                PURGING MALICIOUS ARTIFACTS // SECURING NODE
              </p>

              {/* Progress bar */}
              <div className="w-full max-w-sm bg-cyber-900 border border-cyber-green/40 rounded-full h-3 p-0.5 overflow-hidden shadow-glow-green">
                <div
                  className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 mt-2">{scanProgress}%</span>
            </div>
          )}

          {/* ===================================================================
              STEP 5: AWARENESS TAKEAWAY
             =================================================================== */}
          {currentStep === 5 && (
            <div className="flex flex-col items-center text-left animate-fade-in">
              <div className="w-full p-4 rounded-xl bg-cyber-green-dim border border-cyber-green text-cyber-green mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 shrink-0 text-cyber-green" />
                <div>
                  <h4 className="text-sm font-cyber font-bold">
                    🛡️ THREAT OFFICIALLY NEUTRALIZED
                  </h4>
                  <p className="text-xs font-sans text-slate-200">
                    Your digital world node has transitioned from High Threat to Secured!
                  </p>
                </div>
              </div>

              <div className="w-full bg-cyber-900/80 border border-slate-700 p-5 sm:p-6 rounded-2xl mb-8 hud-corner">
                <span className="text-[10px] font-mono text-cyber-cyan font-bold uppercase tracking-widest block mb-1">
                  REMEMBER THIS EVERYDAY DEFENSE RULE:
                </span>
                <p className="text-sm sm:text-base font-sans font-semibold text-white leading-relaxed">
                  {mission.takeaway}
                </p>
              </div>

              <div className="w-full flex justify-end">
                <button
                  onClick={() => handleStepTransition(6)}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>UPDATE DEFENSE GRID</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* ===================================================================
              STEP 6: MISSION COMPLETE & RETURN
             =================================================================== */}
          {currentStep === 6 && (
            <div className="flex flex-col items-center text-center animate-fade-in py-4">
              <div className="w-16 h-16 rounded-2xl bg-cyber-900 border border-cyber-green flex items-center justify-center text-cyber-green mb-4 shadow-glow-green">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono text-cyber-green tracking-widest uppercase mb-1">
                DAY {String(mission.day).padStart(2, '0')} // STATUS: SECURED
              </span>

              <h3 className="text-2xl sm:text-4xl font-black font-cyber text-white mb-2">
                MISSION ACCOMPLISHED!
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-md mb-8">
                Your Digital Security Level has increased. The node in your Digital Universe now radiates a protective cyber shield.
              </p>

              <button
                onClick={handleFinalComplete}
                className="w-full sm:w-auto py-4 px-10 rounded-xl font-cyber font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-cyber-cyan via-cyber-green to-cyber-green text-black shadow-glow-cyan hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>RETURN TO COMMAND CENTER</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
