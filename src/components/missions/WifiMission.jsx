import React, { useState } from 'react';
import { Wifi, Shield, ArrowRight } from 'lucide-react';
import { cyberAudio } from '../../utils/audio';

export default function WifiMission({ onComplete }) {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [vpnEnabled, setVpnEnabled] = useState(false);

  const networks = [
    {
      id: 'evil_twin',
      ssid: 'FREE_AIRPORT_SUPER_HIGH_SPEED_OPEN',
      security: 'Unencrypted / Open',
      isRogue: true,
      hint: 'Rogue Evil Twin hotspot setup by an eavesdropper to sniff passwords and unencrypted session cookies.',
    },
    {
      id: 'official',
      ssid: 'Airport_Official_Secure_5G',
      security: 'WPA3 / Verified Captive Portal',
      isRogue: false,
      hint: 'Legitimate airport network verified by airport information displays.',
    },
  ];

  const handleSelectNetwork = (net) => {
    cyberAudio.playClick();
    setSelectedNetwork(net);
  };

  const handleToggleVpn = () => {
    cyberAudio.playClick();
    setVpnEnabled(!vpnEnabled);
  };

  const isMissionSuccess = selectedNetwork && !selectedNetwork.isRogue && vpnEnabled;

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Instructions */}
      <div className="w-full bg-cyber-900/90 border border-cyber-cyan/30 p-3.5 rounded-xl mb-4 text-left text-xs font-mono">
        <span className="text-slate-300">
          AIRPORT WI-FI PERIMETER: Connect to the verified network and activate encrypted tunneling before transmitting any data.
        </span>
      </div>

      <div className="w-full max-w-md bg-cyber-950 border border-slate-700 rounded-2xl p-5 mb-5 shadow-2xl text-left hud-corner">
        
        {/* VPN Toggle Control */}
        <div className="bg-cyber-900/90 border border-slate-800 p-4 rounded-xl mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                vpnEnabled
                  ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-cyber font-bold text-white">
                ENCRYPTED VPN TUNNEL
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {vpnEnabled ? 'STATUS: ACTIVE (256-bit AES)' : 'STATUS: DISENGAGED'}
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleVpn}
            className={`px-3 py-1.5 rounded-lg text-xs font-hud font-bold uppercase tracking-wider transition-all ${
              vpnEnabled
                ? 'bg-cyber-green text-black shadow-glow-green'
                : 'bg-cyber-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {vpnEnabled ? 'ARMED' : 'ENGAGE VPN'}
          </button>
        </div>

        {/* Available Networks List */}
        <h5 className="text-xs font-hud font-bold text-slate-400 uppercase tracking-wider mb-3">
          DETECTED AIRWAVE HOTSPOTS:
        </h5>

        <div className="space-y-3">
          {networks.map((net) => {
            const isSelected = selectedNetwork?.id === net.id;
            return (
              <div
                key={net.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectNetwork(net)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectNetwork(net);
                  }
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan ${
                  isSelected
                    ? net.isRogue
                      ? 'bg-cyber-red-dim border-cyber-red'
                      : 'bg-cyber-cyan-dim border-cyber-cyan shadow-glow-cyan-sm'
                    : 'bg-cyber-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-cyber-cyan" />
                    {net.ssid}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      net.isRogue ? 'bg-red-900/60 text-red-300' : 'bg-cyber-900/60 text-cyber-cyan'
                    }`}
                  >
                    {net.security}
                  </span>
                </div>

                <p className="text-[11px] font-sans text-slate-300 mt-1">
                  {net.hint}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning on rogue selection */}
      {selectedNetwork?.isRogue && (
        <div className="w-full max-w-md p-3 rounded-xl bg-cyber-red-dim border border-cyber-red text-xs text-left text-slate-200 mb-4">
          <strong className="text-cyber-red block font-mono">⚠️ ROGUE ACCESS POINT ALERT:</strong>
          Connecting to open, unencrypted Wi-Fi hotspots allows attackers to perform Man-in-the-Middle (MitM) attacks. Select the verified official network and activate VPN!
        </div>
      )}

      {/* Success condition */}
      {isMissionSuccess && (
        <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
          <div className="w-full p-3.5 rounded-xl bg-cyber-green-dim border border-cyber-green text-xs text-left text-slate-200 mb-3">
            <strong className="text-cyber-green block font-mono">🛡️ SECURE ENCLAVE ESTABLISHED:</strong>
            You chose the official verified network and armed end-to-end VPN encryption, shielding your browsing traffic from anyone on the local network!
          </div>

          <button
            onClick={() => {
              cyberAudio.playNeutralized();
              onComplete();
            }}
            className="w-full py-3.5 px-6 rounded-xl font-cyber font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyber-green to-cyber-cyan text-black shadow-glow-green hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>CONFIRM TUNNEL & COMPLETE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
