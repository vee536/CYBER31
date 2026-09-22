import React, { useRef, useEffect, useState, useMemo } from 'react';
import { MISSIONS } from '../data/missionsData';
import { Shield, AlertTriangle, Lock, Eye, Filter } from 'lucide-react';
import { cyberAudio } from '../utils/audio';
import { getUnlockDateLabel } from '../utils/dateGate';

export default function DigitalUniverse({
  completedDays = [],
  activeDay = 5,
  onSelectMission,
  interactive = true,
  selectedCategory = 'all',
  maxUnlockedDay = 31,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState('all');
  // Kept in refs so hover changes (which re-render the component) don't force the
  // render-loop effect to tear down and reset the camera's drag rotation mid-interaction.
  const hoveredNodeRef = useRef(null);
  const rotRef = useRef({ rotX: 0.3, rotY: 0.4 });
  const packetsRef = useRef(null);

  useEffect(() => {
    hoveredNodeRef.current = hoveredNode;
  }, [hoveredNode]);

  // Categorize 31 missions into spatial coordinates in a spherical / cluster layout
  const nodes = useMemo(() => {
    return MISSIONS.map((mission, idx) => {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(-1 + (2 * idx) / MISSIONS.length);
      const theta = Math.sqrt(MISSIONS.length * Math.PI) * phi;
      const radius = 220; // 3D radius

      const x0 = radius * Math.cos(theta) * Math.sin(phi);
      const y0 = radius * Math.sin(theta) * Math.sin(phi);
      const z0 = radius * Math.cos(phi);

      return {
        ...mission,
        x0,
        y0,
        z0,
        // projected screen coordinates updated each frame
        x: 0,
        y: 0,
        z: 0,
        radius: 7,
      };
    });
  }, []);

  // Filter nodes if user chooses a cluster
  const filteredNodes = useMemo(() => {
    if (selectedCluster === 'all') return nodes;
    return nodes.filter((n) => n.category === selectedCluster);
  }, [nodes, selectedCluster]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = containerRef.current ? containerRef.current.clientWidth : 600);
    let height = (canvas.height = containerRef.current ? containerRef.current.clientHeight : 450);

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Rotation angles (seeded from the persisted ref so a re-run of this effect
    // continues from where the camera was, instead of snapping back to the default)
    let angleX = 0.002;
    let angleY = 0.003;
    let rotX = rotRef.current.rotX;
    let rotY = rotRef.current.rotY;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Moving data packets along connections (persisted across effect re-runs)
    if (!packetsRef.current) {
      packetsRef.current = Array.from({ length: 18 }, () => ({
        fromIdx: Math.floor(Math.random() * nodes.length),
        toIdx: Math.floor(Math.random() * nodes.length),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      }));
    }
    const packets = packetsRef.current;

    // Mouse / Touch handlers for rotation
    const onMouseDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      lastMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      lastMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMouseMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      if (isDragging && interactive) {
        const deltaX = clientX - lastMouseX;
        const deltaY = clientY - lastMouseY;
        rotY += deltaX * 0.005;
        rotX += deltaY * 0.005;
        lastMouseX = clientX;
        lastMouseY = clientY;
      }

      // Check node hover
      if (interactive && !isDragging && canvas) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        let found = null;
        for (let i = 0; i < filteredNodes.length; i++) {
          const n = filteredNodes[i];
          const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
          if (dist < 20) {
            found = n;
            break;
          }
        }
        setHoveredNode(found);
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const canvasElem = canvas;
    canvasElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile phones
    canvasElem.addEventListener('touchstart', onMouseDown, { passive: true });
    window.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Main 60fps render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Idle auto-rotation when not dragging
      if (!isDragging) {
        rotY += angleY;
        rotX += angleX * 0.5;
      }

      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) / 520;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Project 3D nodes
      nodes.forEach((node) => {
        // Rotate around Y axis
        let x1 = node.x0 * cosY - node.z0 * sinY;
        let z1 = node.z0 * cosY + node.x0 * sinY;

        // Rotate around X axis
        let y1 = node.y0 * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y0 * sinX;

        // Perspective projection
        const fov = 450;
        const pScale = (fov / (fov + z2)) * scale;

        node.x = cx + x1 * pScale;
        node.y = cy + y1 * pScale;
        node.z = z2;
        node.projectedScale = pScale;
      });

      // Draw background ambient concentric cyber rings
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 180 * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(198, 255, 77, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 260 * scale, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
      ctx.stroke();
      ctx.restore();

      // Draw connection lines between related nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        // Connect to nearest 2 neighbors
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist3D = Math.hypot(n1.x0 - n2.x0, n1.y0 - n2.y0, n1.z0 - n2.z0);
          if (dist3D < 140) {
            const isN1Secured = completedDays.includes(n1.day);
            const isN2Secured = completedDays.includes(n2.day);

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            if (isN1Secured && isN2Secured) {
              ctx.strokeStyle = 'rgba(62, 207, 142, 0.25)';
            } else if (n1.day === activeDay || n2.day === activeDay) {
              ctx.strokeStyle = 'rgba(255, 51, 102, 0.28)';
            } else {
              ctx.strokeStyle = 'rgba(198, 255, 77, 0.12)';
            }
            ctx.stroke();
          }
        }
      }

      // Draw traveling data packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.fromIdx = Math.floor(Math.random() * nodes.length);
          p.toIdx = Math.floor(Math.random() * nodes.length);
        }
        const nFrom = nodes[p.fromIdx];
        const nTo = nodes[p.toIdx];
        if (nFrom && nTo) {
          const px = nFrom.x + (nTo.x - nFrom.x) * p.progress;
          const py = nFrom.y + (nTo.y - nFrom.y) * p.progress;
          ctx.beginPath();
          ctx.arc(px, py, 2.2 * scale, 0, Math.PI * 2);
          ctx.fillStyle = '#c6ff4d';
          ctx.shadowColor = '#c6ff4d';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Sort nodes by Z-depth for correct occlusion
      const sortedNodes = [...filteredNodes].sort((a, b) => a.z - b.z);

      // Render nodes
      sortedNodes.forEach((node) => {
        const isCompleted = completedDays.includes(node.day);
        const isDateLocked = node.day > maxUnlockedDay;
        const isActiveThreat = node.day === activeDay && !isDateLocked;
        const isHovered = hoveredNodeRef.current && hoveredNodeRef.current.day === node.day;

        const baseRadius = (isHovered ? 12 : isActiveThreat ? 9 : 6.5) * node.projectedScale;
        const alpha = isDateLocked ? 0.35 : Math.max(0.2, (node.z + 280) / 560);

        ctx.save();
        ctx.globalAlpha = Math.min(1, alpha);

        // Pulsing threat ring for active day
        if (isActiveThreat) {
          const pulse = (Date.now() / 400) % 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, baseRadius + pulse * 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 51, 102, ${0.8 - pulse * 0.35})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node fill & glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, baseRadius, 0, Math.PI * 2);

        if (isDateLocked) {
          // Not yet unlocked on the calendar: dim inert grey, no glow
          ctx.fillStyle = '#3a4256';
          ctx.shadowBlur = 0;
        } else if (isCompleted) {
          // Secured Node: mint green
          ctx.fillStyle = '#3ecf8e';
          ctx.shadowColor = '#3ecf8e';
          ctx.shadowBlur = 12;
        } else if (isActiveThreat) {
          // Active Threat Signal: Pulsing Neon Red
          ctx.fillStyle = '#ff3366';
          ctx.shadowColor = '#ff3366';
          ctx.shadowBlur = 16;
        } else {
          // Open / Pending Node: dimmed lime
          ctx.fillStyle = '#8fbf4d';
          ctx.shadowColor = '#8fbf4d';
          ctx.shadowBlur = 6;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw day number inside or next to node
        if (node.projectedScale > 0.85 || isHovered || isActiveThreat) {
          ctx.font = `${Math.round(8 * node.projectedScale)}px Orbitron, sans-serif`;
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(String(node.day).padStart(2, '0'), node.x, node.y - baseRadius - 8);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      rotRef.current = { rotX, rotY };
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvasElem.removeEventListener('touchstart', onMouseDown);
      window.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [nodes, filteredNodes, completedDays, activeDay, interactive]);

  const handleNodeClick = () => {
    if (hoveredNode) {
      cyberAudio.playClick();
      onSelectMission(hoveredNode.day);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl bg-cyber-950/80 border border-cyber-cyan/25 overflow-hidden flex items-center justify-center hud-corner"
    >
      {/* Background cyber grid & scanlines */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-cyber-900/90 border border-slate-700/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-cyber-cyan">
          <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse-slow" />
          <span className="font-hud uppercase tracking-wider font-semibold">
            DIGITAL UNIVERSE // 31 NODES ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Cluster filter selector */}
          <div className="flex items-center gap-1 bg-cyber-900/90 border border-slate-700/80 backdrop-blur-md p-1 rounded-lg text-[11px] font-mono text-slate-300">
            <Filter className="w-3 h-3 text-cyber-cyan ml-1" />
            <select
              value={selectedCluster}
              onChange={(e) => setSelectedCluster(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none pr-2 py-0.5 cursor-pointer text-xs"
            >
              <option value="all" className="bg-cyber-900">All 7 Clusters</option>
              <option value="identity" className="bg-cyber-900">🔐 Digital Identity</option>
              <option value="communication" className="bg-cyber-900">📧 Communication</option>
              <option value="browsing" className="bg-cyber-900">🌐 Browsing</option>
              <option value="digital_life" className="bg-cyber-900">📱 Digital Life</option>
              <option value="transactions" className="bg-cyber-900">💳 Transactions</option>
              <option value="threats" className="bg-cyber-900">🦠 Digital Threats</option>
              <option value="privacy" className="bg-cyber-900">☁️ Data & Privacy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleNodeClick}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Interactive Tooltip Card when hovering a node */}
      {hoveredNode && (() => {
        const isDateLocked = hoveredNode.day > maxUnlockedDay;
        const isCompleted = completedDays.includes(hoveredNode.day);
        return (
          <div
            onClick={handleNodeClick}
            className={`absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-20 cyber-panel p-3.5 rounded-xl border shadow-glow-cyan transition-all animate-float ${
              isDateLocked ? 'border-slate-700 cursor-default' : 'border-cyber-cyan/50 cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-cyber-cyan">
                DAY {String(hoveredNode.day).padStart(2, '0')} // {isDateLocked ? 'CLASSIFIED' : hoveredNode.alertSource}
              </span>
              <span
                className={`text-[10px] font-hud uppercase px-2 py-0.5 rounded font-bold ${
                  isDateLocked
                    ? 'bg-slate-800 text-slate-400'
                    : isCompleted
                    ? 'bg-cyber-green-dim text-cyber-green border border-cyber-green/40'
                    : hoveredNode.day === activeDay
                    ? 'bg-cyber-red-dim text-cyber-red border border-cyber-red/40 animate-pulse'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isDateLocked
                  ? `UNLOCKS ${getUnlockDateLabel(hoveredNode.day).toUpperCase()}`
                  : isCompleted
                  ? '✓ SECURED'
                  : hoveredNode.day === activeDay
                  ? '⚠️ THREAT ACTIVE'
                  : 'OPEN'}
              </span>
            </div>

            <h4 className="text-sm font-cyber font-bold text-white mb-1 leading-snug">
              {isDateLocked ? '??? Classified Until Unlock ???' : hoveredNode.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 mb-2 font-sans">
              {isDateLocked ? `This mission unlocks ${getUnlockDateLabel(hoveredNode.day)}.` : hoveredNode.topic}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[11px] font-mono text-cyber-cyan">
              <span>{isDateLocked ? 'RETURN ON UNLOCK DATE' : 'TAP TO LAUNCH MISSION'}</span>
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      })()}

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-500 pointer-events-none hidden sm:block">
        [ Drag to orbit digital universe • Tap node to inspect ]
      </div>
    </div>
  );
}
