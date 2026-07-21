import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  FileJson, 
  Brain, 
  CheckCircle, 
  Thermometer, 
  AlertTriangle, 
  Cpu, 
  TrendingUp, 
  Sparkles,
  Info,
  Layers,
  Wrench,
  DollarSign
} from 'lucide-react';
import { PresentationSettings } from '../types';

interface DIKWSimulatorProps {
  settings: PresentationSettings;
  onUpdateSettings?: (settings: PresentationSettings) => void;
}

export default function DIKWSimulator({ settings }: DIKWSimulatorProps) {
  const [activeTab, setActiveTab] = useState<'data' | 'information' | 'knowledge' | 'wisdom'>('data');
  const [rotation, setRotation] = useState<number>(30); // Interactive rotation slider

  const d = settings.dikwData;

  const tabs = [
    {
      id: 'data' as const,
      icon: Database,
      title: 'Datos',
      englishTitle: 'Data',
      color: 'from-zinc-500 to-zinc-700',
      textColor: 'text-zinc-400',
      borderColor: 'border-zinc-800',
      glowColor: 'shadow-zinc-500/10',
      label: d.data.label,
      value: d.data.value,
      desc: d.data.desc,
      summary: 'Hechos objetivos y símbolos discretos, sin procesar ni contextualizar.'
    },
    {
      id: 'information' as const,
      icon: FileJson,
      title: 'Información',
      englishTitle: 'Information',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-900/50',
      glowColor: 'shadow-cyan-500/10',
      label: d.information.label,
      value: d.information.value,
      desc: d.information.desc,
      summary: 'Datos procesados y estructurados que adquieren un propósito y responden a preguntas básicas.'
    },
    {
      id: 'knowledge' as const,
      icon: Brain,
      title: 'Conocimiento',
      englishTitle: 'Knowledge',
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-orange-400',
      borderColor: 'border-orange-900/50',
      glowColor: 'shadow-orange-500/10',
      label: d.knowledge.label,
      value: d.knowledge.value,
      desc: d.knowledge.desc,
      summary: 'Aplicación de la información combinada con la experiencia y el análisis técnico de causa-efecto.'
    },
    {
      id: 'wisdom' as const,
      icon: CheckCircle,
      title: 'Sabiduría',
      englishTitle: 'Wisdom',
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-900/50',
      glowColor: 'shadow-emerald-500/10',
      label: d.wisdom.label,
      value: d.wisdom.value,
      desc: d.wisdom.desc,
      summary: 'Evaluación y juicio estratégico para la toma de decisiones sistémicas y preventivas.'
    }
  ];

  const activeInfo = tabs.find(t => t.id === activeTab)!;

  // Isometric projection coordinates calculation
  // Let's create an elegant visual representing a concrete slab in BIM
  const getIsoPoint = (x: number, y: number, z: number) => {
    // Basic isometric projection formulas with rotation
    const rad = (rotation * Math.PI) / 180;
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);

    // Rotate X and Y
    const rx = x * cosVal - y * sinVal;
    const ry = x * sinVal + y * cosVal;

    // Isometric projection
    const isoX = 250 + (rx - ry) * 0.8;
    const isoY = 160 + (rx + ry) * 0.4 - z * 0.7;
    return { x: isoX, y: isoY };
  };

  // Coordinates of slab corners (length: 140, width: 140, height: 35)
  const c0 = getIsoPoint(-70, -70, 0); // bottom back
  const c1 = getIsoPoint(70, -70, 0);  // bottom left
  const c2 = getIsoPoint(70, 70, 0);   // bottom front
  const c3 = getIsoPoint(-70, 70, 0);  // bottom right

  const c4 = getIsoPoint(-70, -70, 35); // top back
  const c5 = getIsoPoint(70, -70, 35);  // top left
  const c6 = getIsoPoint(70, 70, 35);   // top front
  const c7 = getIsoPoint(-70, 70, 35);  // top right

  // Sensor point coordinates
  const sensorBim = getIsoPoint(15, 10, 35);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full relative z-10">
      {/* LEFT: DIKW Pyramidal Continuum Navigation */}
      <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-900 text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-3">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Modelo Teórico de Gestión</span>
          </div>
          <h3 className="text-lg font-bold text-slate-200 tracking-tight mb-2 uppercase font-mono">
            Metamorfosis del Dato en BIM
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Explora cómo un simple número aislado se transforma en una decisión inteligente de ingeniería civil y control de calidad.
          </p>
        </div>

        {/* The Stepper UI */}
        <div className="space-y-3 flex-1 flex flex-col justify-center">
          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`dikw-step-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left transition-all duration-300 rounded-xl p-3 border flex items-start gap-3 relative overflow-hidden cursor-pointer ${
                  isActive 
                    ? `bg-slate-950/60 ${tab.borderColor} shadow-lg ${tab.glowColor}` 
                    : 'bg-slate-900/10 border-slate-900/50 hover:bg-slate-900/30 hover:border-slate-800'
                }`}
              >
                {/* Pyramid indicator ribbon */}
                <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${tab.color} ${isActive ? 'opacity-100' : 'opacity-20'}`} />

                <div className={`p-2 rounded-lg ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-950/40 text-slate-500'} transition-colors`}>
                  <Icon className={`w-5 h-5 ${isActive ? tab.textColor : ''}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                      Nivel {4 - idx}
                    </span>
                    {isActive && (
                      <motion.span 
                        layoutId="active-badge"
                        className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-wider font-mono"
                      >
                        Activo
                      </motion.span>
                    )}
                  </div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                    {tab.title} <span className="text-[10px] text-slate-500 font-normal lowercase font-sans">({tab.englishTitle})</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 font-sans">
                    {tab.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Concept Card Detail */}
        <div className="p-3.5 rounded-xl bg-slate-950/30 border border-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1 relative z-10 font-mono uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            <span>Definición Académica</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans relative z-10">
            {activeInfo.summary}
          </p>
        </div>
      </div>

      {/* CENTER: 3D BIM Model View (Isometric Wireframe & Thermal Maps) */}
      <div className="lg:col-span-5 flex flex-col bg-slate-950/40 rounded-2xl border border-slate-900 overflow-hidden shadow-2xl relative min-h-[380px]">
        {/* View Header */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/50" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <span className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase ml-1">
              Visor 3D de Estructura (IFC)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
            <span className="text-[9px] font-mono text-slate-500 tracking-wider font-bold">ROTA 3D:</span>
            <input 
              type="range" 
              min="-30" 
              max="90" 
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* 3D Render Area */}
        <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-slate-950 to-slate-950">
          {/* Isometric grid background */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Canvas or SVG Isometric representation */}
          <svg className="w-full h-64 max-w-[340px] drop-shadow-2xl overflow-visible" viewBox="0 0 500 320">
            {/* Ambient Lighting & Gradients for Slab */}
            <defs>
              <linearGradient id="slabGradTopData" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="slabGradTopInfo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.6" />
              </linearGradient>
              {/* Thermal Heatmap for Concrete curing */}
              <radialGradient id="slabGradTopKnowledge" cx="65%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#f97316" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.7" />
              </radialGradient>
              <linearGradient id="slabGradTopWisdom" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#0f172a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#115e59" stopOpacity="0.5" />
              </linearGradient>

              {/* Side gradients */}
              <linearGradient id="sideLeftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="sideLeftWisdom" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* DRAW SLAB SIDE LEFT */}
            <polygon 
              points={`${c1.x},${c1.y} ${c2.x},${c2.y} ${c6.x},${c6.y} ${c5.x},${c5.y}`}
              fill={activeTab === 'wisdom' ? 'url(#sideLeftWisdom)' : 'url(#sideLeftGrad)'}
              stroke={activeTab === 'data' ? '#475569' : activeTab === 'wisdom' ? '#0d9488' : '#334155'}
              strokeWidth="1.5"
            />

            {/* DRAW SLAB SIDE RIGHT */}
            <polygon 
              points={`${c2.x},${c2.y} ${c3.x},${c3.y} ${c7.x},${c7.y} ${c6.x},${c6.y}`}
              fill="url(#sideLeftGrad)"
              stroke={activeTab === 'data' ? '#475569' : activeTab === 'wisdom' ? '#115e59' : '#334155'}
              strokeWidth="1.5"
              opacity="0.8"
            />

            {/* DRAW SLAB TOP FLOOR */}
            <polygon 
              points={`${c4.x},${c4.y} ${c5.x},${c5.y} ${c6.x},${c6.y} ${c7.x},${c7.y}`}
              fill={
                activeTab === 'data' ? 'url(#slabGradTopData)' :
                activeTab === 'information' ? 'url(#slabGradTopInfo)' :
                activeTab === 'knowledge' ? 'url(#slabGradTopKnowledge)' :
                'url(#slabGradTopWisdom)'
              }
              stroke={
                activeTab === 'data' ? '#64748b' : 
                activeTab === 'information' ? '#06b6d4' : 
                activeTab === 'knowledge' ? '#f97316' : 
                '#14b8a6'
              }
              strokeWidth="2"
              className="transition-all duration-700"
            />

            {/* WIREFRAME MESH LINES FOR "DATA" MODE */}
            {activeTab === 'data' && (
              <g opacity="0.4" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2,2">
                {/* Grid on top slab */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                  const pA = { x: c4.x + (c5.x - c4.x) * ratio, y: c4.y + (c5.y - c4.y) * ratio };
                  const pB = { x: c7.x + (c6.x - c7.x) * ratio, y: c7.y + (c6.y - c7.y) * ratio };
                  const pC = { x: c4.x + (c7.x - c4.x) * ratio, y: c4.y + (c7.y - c4.y) * ratio };
                  const pD = { x: c5.x + (c6.x - c5.x) * ratio, y: c5.y + (c6.y - c5.y) * ratio };
                  return (
                    <g key={ratio}>
                      <line x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} />
                      <line x1={pC.x} y1={pC.y} x2={pD.x} y2={pD.y} />
                    </g>
                  );
                })}
              </g>
            )}

            {/* REINFORCING STEEL BARS IN WISDOM MODE (SHOWING EXPLICIT DESIGN ENHANCEMENT) */}
            {activeTab === 'wisdom' && (
              <g opacity="0.8" stroke="#14b8a6" strokeWidth="1.2">
                {[0.25, 0.5, 0.75].map((ratio) => {
                  const pA = { x: c4.x + (c5.x - c4.x) * ratio, y: c4.y + (c5.y - c4.y) * ratio };
                  const pB = { x: c7.x + (c6.x - c7.x) * ratio, y: c7.y + (c6.y - c7.y) * ratio };
                  return <line key={ratio} x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y} />;
                })}
                {/* Concrete cooling blanket overlay pattern */}
                <polygon 
                  points={`${c4.x},${c4.y} ${c5.x},${c5.y} ${c6.x},${c6.y} ${c7.x},${c7.y}`}
                  fill="url(#sideLeftWisdom)"
                  opacity="0.1"
                />
              </g>
            )}

            {/* RAW DATA FLOAT LABELS - DATOS LEVEL */}
            {activeTab === 'data' && (
              <g className="font-mono text-[9px] fill-zinc-500">
                <text x={c4.x + 30} y={c4.y + 40}>39</text>
                <text x={c5.x - 40} y={c5.y + 30}>38.9</text>
                <text x={c6.x - 50} y={c6.y - 20}>39.2</text>
                <text x={c7.x + 40} y={c7.y - 40}>39</text>
                {/* Floating nodes */}
                <circle cx={c4.x + 35} cy={c4.y + 35} r="2" fill="#71717a" />
                <circle cx={c5.x - 35} cy={c5.y + 25} r="2" fill="#71717a" />
                <circle cx={c6.x - 45} cy={c6.y - 25} r="2" fill="#71717a" />
              </g>
            )}

            {/* METADATA TAGS & SENSOR DOT - INFORMACION LEVEL */}
            {(activeTab === 'information' || activeTab === 'knowledge' || activeTab === 'wisdom') && (
              <g>
                {/* Animated Sensor Node */}
                <circle cx={sensorBim.x} cy={sensorBim.y} r="6" fill="#06b6d4" className="animate-ping" opacity="0.4" />
                <circle cx={sensorBim.x} cy={sensorBim.y} r="4" fill={activeTab === 'knowledge' ? '#ef4444' : activeTab === 'wisdom' ? '#10b981' : '#06b6d4'} />

                {/* Laser scan animation line on Info */}
                {activeTab === 'information' && (
                  <line 
                    x1={c4.x} y1={c4.y + 10} x2={c6.x} y2={c6.y - 15} 
                    stroke="#22d3ee" strokeWidth="2.5" opacity="0.7"
                    className="animate-pulse"
                  />
                )}

                {/* Annotation Pointer */}
                <path 
                  d={`M ${sensorBim.x} ${sensorBim.y} L ${sensorBim.x - 50} ${sensorBim.y - 60} L ${sensorBim.x - 110} ${sensorBim.y - 60}`} 
                  fill="none" 
                  stroke={activeTab === 'knowledge' ? '#ef4444' : activeTab === 'wisdom' ? '#10b981' : '#06b6d4'} 
                  strokeWidth="1.2" 
                />

                {/* Annotation Bubble */}
                <foreignObject x={sensorBim.x - 210} y={sensorBim.y - 105} width="165" height="42">
                  <div className={`p-1.5 rounded bg-slate-950 border text-[9px] leading-tight font-mono text-left shadow-2xl ${
                    activeTab === 'knowledge' ? 'border-red-500/50 text-red-300' : 
                    activeTab === 'wisdom' ? 'border-emerald-500/50 text-emerald-300' : 
                    'border-cyan-500/50 text-cyan-300'
                  }`}>
                    <div className="font-bold text-[8px] opacity-80 uppercase tracking-wider text-slate-400">
                      Sensor S-CONC-104 (BIM)
                    </div>
                    <div>Parámetro: Temp. Curado</div>
                    <div className="font-bold flex items-center justify-between mt-0.5">
                      <span>Valor: {activeTab === 'wisdom' ? '28.5' : '39.0'} °C</span>
                      <span className="text-[7px] opacity-60">Losa Fund.</span>
                    </div>
                  </div>
                </foreignObject>
              </g>
            )}

            {/* ANNOTATIONS & CRACKS FOR KNOWLEDGE LEVEL */}
            {activeTab === 'knowledge' && (
              <g>
                {/* Crack warning labels */}
                <path d={`M ${c6.x - 50} ${c6.y - 30} Q ${c6.x - 40} ${c6.y - 45} ${c6.x - 10} ${c6.y - 50}`} fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" />
                <text x={c6.x - 85} y={c6.y - 55} fill="#fdba74" className="font-sans text-[8px] font-bold">¡Riesgo de Fisuras Térmicas!</text>
                <text x={c6.x - 85} y={c6.y - 46} fill="#f97316" className="font-mono text-[7px]">&gt;38°C Límite Crítico</text>

                {/* Animated Warning Icon */}
                <g transform={`translate(${sensorBim.x + 35}, ${sensorBim.y - 30})`} className="animate-bounce">
                  <circle cx="8" cy="8" r="8" fill="#ef4444" />
                  <text x="8" y="11" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">!</text>
                </g>

                {/* Internal heat indicator arrows */}
                <path d={`M ${sensorBim.x - 20} ${sensorBim.y} L ${sensorBim.x - 40} ${sensorBim.y - 5}`} fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d={`M ${sensorBim.x + 20} ${sensorBim.y} L ${sensorBim.x + 40} ${sensorBim.y + 5}`} fill="none" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
              </g>
            )}

            {/* COOLING SYSTEM - WISDOM LEVEL */}
            {activeTab === 'wisdom' && (
              <g>
                {/* Protective shading blankets line */}
                <path d={`M ${c4.x} ${c4.y} L ${c4.x + 10} ${c4.y - 15} L ${c5.x + 10} ${c5.y - 15} L ${c5.x} ${c5.y}`} fill="none" stroke="#14b8a6" strokeWidth="1" strokeDasharray="3,3" />
                
                {/* Sparkles / Water curing sprays animation representation */}
                {[0.2, 0.5, 0.8].map((r, i) => {
                  const px = c7.x + (c6.x - c7.x) * r;
                  const py = c7.y + (c6.y - c7.y) * r;
                  return (
                    <g key={i} transform={`translate(${px - 10}, ${py - 30})`} opacity="0.8">
                      <circle cx="8" cy="8" r="1.5" fill="#22d3ee" className="animate-ping" />
                      <path d="M8 3 L8 13 M3 8 L13 8" stroke="#22d3ee" strokeWidth="0.8" />
                    </g>
                  );
                })}

                <foreignObject x={c6.x - 130} y={c6.y + 10} width="160" height="30">
                  <div className="bg-emerald-950 border border-emerald-500/30 rounded px-1.5 py-0.5 text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    ✔ Mitigación Aplicada: Vaciado Nocturno + Aditivos Retardantes
                  </div>
                </foreignObject>
              </g>
            )}
          </svg>
        </div>

        {/* BIM Details Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-900/60 font-mono text-[11px] text-slate-400 flex flex-col gap-1">
          <div className="flex justify-between items-center border-b border-slate-900/50 pb-1.5 mb-1">
            <span className="text-slate-500 text-[9px] font-bold">PARÁMETROS ASOCIADOS:</span>
            <span className="text-slate-300 font-bold text-[10px]">Losa de Fundación BIM-S-01</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-slate-500">Volumen:</span> <span className="text-slate-300">120.5 m³</span>
            </div>
            <div>
              <span className="text-slate-500">FC Especificado:</span> <span className="text-slate-300">35 MPa</span>
            </div>
            <div>
              <span className="text-slate-500">Localización:</span> <span className="text-slate-300">Eje B-12 / Nivel -1.20</span>
            </div>
            <div>
              <span className="text-slate-500">Clasif. IFC:</span> <span className="text-slate-300">IfcSlab / Foundation</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Power BI Dashboard Panel */}
      <div className="lg:col-span-3 flex flex-col bg-slate-950/40 rounded-2xl border border-slate-900 overflow-hidden shadow-2xl relative min-h-[380px]">
        {/* Power BI Header */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-amber-500 tracking-wider uppercase">
              Dashboard Power BI
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">
            Live Link
          </span>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-3.5 flex flex-col justify-between space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 flex-1 flex flex-col justify-between"
            >
              {/* STATUS LOG MESSAGE */}
              {activeTab === 'data' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-900 rounded-xl bg-slate-950/40">
                  <AlertTriangle className="w-8 h-8 text-zinc-600 mb-2" />
                  <h4 className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">
                    Dashboard Incompleto
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[180px] leading-relaxed font-sans">
                    Un número crudo (39) no tiene identificadores ni relaciones. No se pueden poblar visuales de Power BI sin estructuración.
                  </p>
                </div>
              )}

              {activeTab !== 'data' && (
                <div className="space-y-3 flex-1">
                  {/* KPI CARD */}
                  <div className={`p-2.5 rounded-xl border ${
                    activeTab === 'knowledge' ? 'bg-red-950/20 border-red-500/30 animate-pulse' : 
                    activeTab === 'wisdom' ? 'bg-emerald-950/20 border-emerald-500/30' : 
                    'bg-slate-950/60 border-slate-900'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                        TEMP. SENSORES DE CURADO
                      </span>
                      <Thermometer className={`w-3.5 h-3.5 ${
                        activeTab === 'knowledge' ? 'text-red-400 animate-pulse' : 
                        activeTab === 'wisdom' ? 'text-emerald-400' : 
                        'text-cyan-400'
                      }`} />
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className={`text-xl font-bold tracking-tight font-mono ${
                        activeTab === 'knowledge' ? 'text-red-400' : 
                        activeTab === 'wisdom' ? 'text-emerald-400' : 
                        'text-cyan-400'
                      }`}>
                        {activeTab === 'wisdom' ? '28.5 °C' : '39.0 °C'}
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">
                        {activeTab === 'knowledge' ? '▲ Límite Crítico' : activeTab === 'wisdom' ? '▼ Normal' : 'S-CONC-104'}
                      </span>
                    </div>
                  </div>

                  {/* VISUALIZATION: CRACK PROBABILITY GAUGE (KNOWLEDGE/WISDOM) */}
                  {(activeTab === 'knowledge' || activeTab === 'wisdom') && (
                    <div className="p-2.5 rounded-xl border bg-slate-950/40 border-slate-900">
                      <span className="text-[8px] font-mono text-slate-400 uppercase block mb-1 font-bold">
                        RIESGO DE FISURA (FÓRMULA PREDICTIVA)
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 flex items-center justify-center">
                          {/* Circle progress gauge */}
                          <svg className="w-10 h-10 transform -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="#1e293b" strokeWidth="3" fill="transparent" />
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="16" 
                              stroke={activeTab === 'knowledge' ? '#ef4444' : '#10b981'} 
                              strokeWidth="3" 
                              fill="transparent" 
                              strokeDasharray="100.4"
                              strokeDashoffset={activeTab === 'knowledge' ? "8" : "88"} 
                              className="transition-all duration-1000"
                            />
                          </svg>
                          <span className="absolute text-[9px] font-bold font-mono text-slate-200">
                            {activeTab === 'knowledge' ? '92%' : '8%'}
                          </span>
                        </div>
                        <div className="flex-1 text-[10px] leading-tight font-sans">
                          <span className={`font-semibold uppercase font-mono text-[9px] ${activeTab === 'knowledge' ? 'text-red-400' : 'text-emerald-400'}`}>
                            {activeTab === 'knowledge' ? 'Alerta Crítica' : 'Nivel Seguro'}
                          </span>
                          <p className="text-slate-500 text-[9px] mt-0.5 leading-tight">
                            {activeTab === 'knowledge' 
                              ? 'Modelado de hidratación estima agrietamiento.'
                              : 'Controles térmicos mitigaron el gradiente.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MINI HISTORIC LINE CHART */}
                  <div className="p-2.5 rounded-xl border border-slate-900 bg-slate-950/40">
                    <span className="text-[8px] font-mono text-slate-400 uppercase block mb-2 font-bold">
                      CURVA DE EVOLUCIÓN TÉRMICA (Hr)
                    </span>
                    <div className="h-16 flex items-end justify-between gap-1">
                      {/* Generates a simple column representation */}
                      {[15, 22, 28, 34, 39, activeTab === 'wisdom' ? 28 : 39, activeTab === 'wisdom' ? 24 : 39].map((val, idx) => {
                        const heightPct = (val / 45) * 100;
                        const isMax = val >= 39;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-t-sm transition-all duration-1000 ${
                                isMax && activeTab === 'knowledge' ? 'bg-red-500 shadow-md shadow-red-500/20' :
                                activeTab === 'wisdom' ? 'bg-teal-500 shadow-md shadow-teal-500/20' : 'bg-cyan-600'
                              }`}
                            />
                            <span className="text-[7px] font-mono text-slate-600 font-bold">{idx * 4}h</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION COMPONENT & STRATEGIC KPI - WISDOM LEVEL */}
              {activeTab === 'wisdom' && (
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-emerald-400 uppercase font-mono tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    <span>Retorno Estratégico (ROI)</span>
                  </div>
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Pérdida Evitada:</span>
                    <span className="text-xs font-bold text-slate-100">$14,500 USD</span>
                  </div>
                </div>
              )}

              {activeTab === 'knowledge' && (
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-red-400 uppercase font-mono tracking-wider animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Costo de Falla Estimado</span>
                  </div>
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Demolición & Recreación:</span>
                    <span className="text-xs font-bold text-slate-200">$14,500 USD</span>
                  </div>
                </div>
              )}

              {activeTab === 'information' && (
                <div className="p-2 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[8px] font-bold text-cyan-400 uppercase font-mono tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    <span>Progreso de Captura</span>
                  </div>
                  <div className="flex justify-between items-baseline font-mono">
                    <span className="text-[8px] text-slate-500 font-bold uppercase">Registros:</span>
                    <span className="text-xs font-bold text-slate-200">142 Logs / Activo</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Core Metamorphosis message detail */}
          <div className="pt-2 border-t border-slate-900 flex flex-col gap-1 text-[10px]">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span className="capitalize font-mono text-[9px] uppercase tracking-wider text-slate-400">{activeInfo.title}:</span>
              <span className="font-mono text-[9px] font-bold text-blue-400">
                {activeInfo.id === 'data' ? '39' : 
                 activeInfo.id === 'information' ? '39.0°C + Sensor S-104' :
                 activeInfo.id === 'knowledge' ? '39.0°C -> Riesgo de Agrietamiento' :
                 'Vaciado Nocturno programado'}
              </span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight">
              {activeInfo.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
