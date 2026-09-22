import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function ScenarioMission({ mission, onComplete }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const scenario = mission.scenario;

  if (!scenario) {
    return (
      <div className="text-center p-6">
        <p className="text-slate-400 text-sm mb-4">Tactical scenario briefing is active.</p>
        <button
          onClick={onComplete}
          className="px-6 py-2.5 rounded-xl bg-cyber-cyan text-black font-cyber font-bold text-xs"
        >
          COMPLETE MISSION
        </button>
      </div>
    );
  }

  const handleSelectOption = (option) => {
    cyberAudio.playClick();
    setSelectedOptionId(option.id);
    if (option.isCorrect) {
      cyberAudio.playNeutralized();
    }
  };

  const selectedOption = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="w-full flex flex-col items-center text-left">
      {/* Question / Scenario prompt card */}
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/40 p-4 sm:p-5 rounded-2xl mb-4 shadow-xl hud-corner">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-cyan mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>DECISION POINT // EVALUATE THE VECTOR</span>
        </div>
        <h4 className="text-sm sm:text-base font-sans font-bold text-white leading-relaxed">
          {scenario.question}
        </h4>
      </div>

      {/* Options List */}
      <div className="w-full space-y-3 mb-5">
        {scenario.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          return (
            <div
              key={option.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectOption(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectOption(option);
                }
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
                isSelected
                  ? option.isCorrect
                    ? 'bg-cyber-green-dim border-cyber-green text-white shadow-glow-green'
                    : 'bg-cyber-red-dim border-cyber-red text-white'
                  : 'bg-cyber-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-[10px] font-mono text-slate-400 shrink-0 mt-0.5">
                  {option.id.replace('opt', '')}
                </span>
                <span className="text-xs sm:text-sm font-sans leading-snug">
                  {option.text}
                </span>
              </div>

              {isSelected && (
                <div className="shrink-0 mt-0.5">
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-cyber-green" />
                  ) : (
                    <XCircle className="w-5 h-5 text-cyber-red" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {selectedOption && (
        <div
          className={`w-full p-4 rounded-xl border mb-5 text-xs font-sans leading-relaxed ${
            selectedOption.isCorrect
              ? 'bg-cyber-green-dim border-cyber-green text-slate-100'
              : 'bg-cyber-red-dim border-cyber-red text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 font-mono font-bold text-xs mb-1">
            {selectedOption.isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                <span className="text-cyber-green uppercase tracking-wider">
                  DEFENSIVE INTEL CONFIRMED
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-cyber-red" />
                <span className="text-cyber-red uppercase tracking-wider">
                  TACTICAL MISSTEP — TRY AGAIN
                </span>
              </>
            )}
          </div>
          <p>{selectedOption.feedback}</p>
        </div>
      )}

      {/* Completion Button when correct */}
      {selectedOption && selectedOption.isCorrect && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <button
            onClick={onComplete}
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>NEUTRALIZE THREAT & CONTINUE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
