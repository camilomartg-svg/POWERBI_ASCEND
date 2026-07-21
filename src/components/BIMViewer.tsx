import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Settings, 
  Layers, 
  Info, 
  Database, 
  Hash, 
  FileSpreadsheet, 
  ChevronRight, 
  Wrench, 
  ShieldAlert,
  HardHat
} from 'lucide-react';

interface BIMElement {
  id: string;
  name: string;
  ifcEntity: string;
  material: string;
  volume: number; // m3
  cost: number; // USD
  carbonFootprint: number; // kgCO2
  status: 'Completado' | 'En Progreso' | 'Retrasado';
  guid: string;
  level: string;
}

const BIM_DATA: BIMElement[] = [
  { id: 'slab-01', name: 'Losa de Fundación L-01', ifcEntity: 'IfcSlab', material: 'Hormigón H-35', volume: 120.5, cost: 18075, carbonFootprint: 26510, status: 'Completado', guid: '2Bv_Fp$8X8Iu7gYm9t_P_q', level: 'Nivel -1.20' },
  { id: 'col-01', name: 'Columnas de Soporte C-01', ifcEntity: 'IfcColumn', material: 'Acero Estructural Q-345', volume: 15.2, cost: 24320, carbonFootprint: 29640, status: 'Completado', guid: '0YpD7p3TX8Iu1hXv9t_L_a', level: 'Nivel 1 (0.00)' },
  { id: 'col-02', name: 'Columnas de Soporte C-02', ifcEntity: 'IfcColumn', material: 'Acero Estructural Q-345', volume: 15.2, cost: 24320, carbonFootprint: 29640, status: 'En Progreso', guid: '0YpD7p3TX8Iu1hXv9t_L_b', level: 'Nivel 2 (+3.60)' },
  { id: 'beam-01', name: 'Vigas de Amarre V-01', ifcEntity: 'IfcBeam', material: 'Hormigón H-28', volume: 45.8, cost: 6870, carbonFootprint: 10076, status: 'Completado', guid: '1HgC8p88X8Iu3fWv9t_M_d', level: 'Nivel 1 (+3.60)' },
  { id: 'beam-02', name: 'Vigas de Corona V-02', ifcEntity: 'IfcBeam', material: 'Hormigón H-28', volume: 42.1, cost: 6315, carbonFootprint: 9262, status: 'Retrasado', guid: '1HgC8p88X8Iu3fWv9t_M_e', level: 'Nivel 2 (+7.20)' },
  { id: 'wall-01', name: 'Muro de Contención M-01', ifcEntity: 'IfcWallStandardCase', material: 'Hormigón H-30', volume: 82.4, cost: 11536, carbonFootprint: 17304, status: 'Completado', guid: '3KpR9p77X8Iu5gZv9t_P_s', level: 'Nivel -1.20' },
  { id: 'wall-02', name: 'Muros Divisorios M-02', ifcEntity: 'IfcWall', material: 'Bloques de Arcilla R-10', volume: 22.0, cost: 4400, carbonFootprint: 2200, status: 'En Progreso', guid: '3KpR9p77X8Iu5gZv9t_P_t', level: 'Nivel 1 (0.00)' },
];

export default function BIMViewer() {
  const [selectedId, setSelectedId] = useState<string>('slab-01');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const selectedElement = BIM_DATA.find(e => e.id === selectedId) || BIM_DATA[0];

  // Calculated totals based on active filters
  const totalVolume = BIM_DATA.reduce((sum, e) => sum + e.volume, 0);
  const totalCost = BIM_DATA.reduce((sum, e) => sum + e.cost, 0);

  // Status colors helper
  const getStatusClass = (status: BIMElement['status']) => {
    switch (status) {
      case 'Completado': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'En Progreso': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Retrasado': return 'bg-red-500/10 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch w-full">
      {/* LEFT: Explanatory Column / BIM Slicers */}
      <div className="xl:col-span-3 flex flex-col justify-between space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-900 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-3">
            <Building className="w-3 h-3 text-cyan-400" />
            <span>Power BI Visual Personalizado</span>
          </div>
          <h3 className="text-lg font-bold font-sans text-slate-100 tracking-tight mb-2 uppercase tracking-wide">
            Análisis 3D y Selección Bidireccional
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            Haga clic en cualquier componente del modelo 3D para extraer su metadata IFC. Power BI permite filtrar todo el informe interactivo a partir de selecciones geométricas en el modelo.
          </p>
        </div>

        {/* BIM ELEMENT SELECTOR SLICER (Power BI Slicer Mockup) */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 flex-1 flex flex-col justify-start space-y-2">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-900 pb-1.5 font-bold">
            <span>Segmentador IFC Entity</span>
            <span className="text-cyan-400">Filtrado Activo</span>
          </div>
          <div className="space-y-1 overflow-y-auto max-h-[180px] pr-1 scrollbar-thin">
            {BIM_DATA.map((elem) => {
              const isSelected = elem.id === selectedId;
              const isHovered = elem.id === hoveredId;
              return (
                <button
                  key={elem.id}
                  onClick={() => setSelectedId(elem.id)}
                  onMouseEnter={() => setHoveredId(elem.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-lg text-[10.5px] font-mono transition-all flex items-center justify-between border ${
                    isSelected 
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-md shadow-cyan-500/5' 
                      : isHovered
                        ? 'bg-slate-950/80 text-slate-200 border-slate-900'
                        : 'text-slate-400 border-transparent hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      elem.status === 'Completado' ? 'bg-emerald-500' :
                      elem.status === 'En Progreso' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <span className="truncate">{elem.name}</span>
                  </div>
                  <span className="text-[9px] opacity-60 ml-2 font-sans font-semibold text-slate-500">{elem.ifcEntity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Card */}
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-900 flex items-start gap-2.5">
          <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-400 leading-normal font-sans">
            <strong>¿Por qué 3D en Power BI?</strong> Conectar la geometría IFC con la base de datos de planificación permite auditar avances físicos de obra, costos y colisiones visualmente en segundos.
          </p>
        </div>
      </div>

      {/* CENTER: Simulated 3D Model Canvas */}
      <div className="xl:col-span-5 flex flex-col bg-slate-950/40 rounded-2xl border border-slate-900 overflow-hidden shadow-2xl relative min-h-[380px]">
        {/* Viewer Toolbar */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
              BIM 3D ENGINE (IFC COMPATIBLE)
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">
            {hoveredId ? `Hovering: ${BIM_DATA.find(e => e.id === hoveredId)?.ifcEntity}` : 'Seleccione elemento'}
          </span>
        </div>

        {/* 3D Model Area using SVG */}
        <div className="flex-1 relative flex items-center justify-center p-6 bg-tech-dots bg-slate-950">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Isometric Multi-Story Structure SVG */}
          <svg className="w-full h-72 max-w-[320px] drop-shadow-3xl overflow-visible" viewBox="0 0 500 380">
            {/* Standard styles & gradients */}
            <defs>
              <linearGradient id="wallHighlight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient id="slabHighlight" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* ISOMETRIC DRAWINGS OF STRUCTURAL STACKS */}
            {/* We will draw the elements using overlapping polygons in isometric coordinate system */}

            {/* LEVEL 1: FOUNDATION SLAB & CONT. WALL */}
            {/* Slab Foundation (slab-01) */}
            <g 
              onClick={() => setSelectedId('slab-01')}
              onMouseEnter={() => setHoveredId('slab-01')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
            >
              {/* Top slab surface */}
              <polygon 
                points="100,280 250,330 400,280 250,230" 
                fill={selectedId === 'slab-01' ? 'url(#slabHighlight)' : hoveredId === 'slab-01' ? '#334155' : '#1e293b'}
                stroke={selectedId === 'slab-01' ? '#eab308' : hoveredId === 'slab-01' ? '#64748b' : '#475569'}
                strokeWidth={selectedId === 'slab-01' ? '2.5' : '1.5'}
                className="transition-all duration-300"
              />
              {/* Front slab faces */}
              <polygon 
                points="100,280 250,330 250,345 100,295" 
                fill={selectedId === 'slab-01' ? '#a16207' : '#0f172a'}
                stroke={selectedId === 'slab-01' ? '#eab308' : '#334155'}
                className="transition-all duration-300"
              />
              <polygon 
                points="250,330 400,280 400,295 250,345" 
                fill={selectedId === 'slab-01' ? '#854d0e' : '#090d16'}
                stroke={selectedId === 'slab-01' ? '#eab308' : '#334155'}
                className="transition-all duration-300"
              />
            </g>

            {/* Retaining Wall (wall-01) */}
            <g 
              onClick={() => setSelectedId('wall-01')}
              onMouseEnter={() => setHoveredId('wall-01')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
            >
              {/* Isometric blocks along the back edge */}
              {/* Back right wall */}
              <polygon 
                points="250,230 400,280 400,240 250,190" 
                fill={selectedId === 'wall-01' ? '#ca8a04' : hoveredId === 'wall-01' ? '#475569' : '#334155'}
                stroke={selectedId === 'wall-01' ? '#eab308' : '#1e293b'}
                strokeWidth={selectedId === 'wall-01' ? '2' : '1'}
                opacity="0.8"
                className="transition-all duration-300"
              />
              {/* Back left wall */}
              <polygon 
                points="100,280 250,230 250,190 100,240" 
                fill={selectedId === 'wall-01' ? '#ca8a04' : hoveredId === 'wall-01' ? '#3f4f6e' : '#2d3748'}
                stroke={selectedId === 'wall-01' ? '#eab308' : '#1e293b'}
                strokeWidth={selectedId === 'wall-01' ? '2' : '1'}
                opacity="0.8"
                className="transition-all duration-300"
              />
            </g>

            {/* LEVEL 2: COLUMNS C-01 & BEAMS V-01 (Nivel 1) */}
            {/* Columns C-01 (col-01) */}
            <g 
              onClick={() => setSelectedId('col-01')}
              onMouseEnter={() => setHoveredId('col-01')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
            >
              {/* Column 1 (Left corner) */}
              <polygon points="120,270 130,274 130,190 120,186" fill={selectedId === 'col-01' ? '#ca8a04' : '#1e3a8a'} opacity="0.9" />
              <polygon points="130,274 140,270 140,186 130,190" fill={selectedId === 'col-01' ? '#a16207' : '#1d4ed8'} opacity="0.9" />
              <polygon points="120,186 130,190 140,186 130,182" fill={selectedId === 'col-01' ? '#f59e0b' : '#3b82f6'} opacity="0.9" />

              {/* Column 2 (Center corner) */}
              <polygon points="245,310 255,314 255,230 245,226" fill={selectedId === 'col-01' ? '#ca8a04' : '#1e3a8a'} opacity="0.9" />
              <polygon points="255,314 265,310 265,226 255,230" fill={selectedId === 'col-01' ? '#a16207' : '#1d4ed8'} opacity="0.9" />
              <polygon points="245,226 255,230 265,226 255,222" fill={selectedId === 'col-01' ? '#f59e0b' : '#3b82f6'} opacity="0.9" />

              {/* Column 3 (Right corner) */}
              <polygon points="370,270 380,274 380,190 370,186" fill={selectedId === 'col-01' ? '#ca8a04' : '#1e3a8a'} opacity="0.9" />
              <polygon points="380,274 390,270 390,186 380,190" fill={selectedId === 'col-01' ? '#a16207' : '#1d4ed8'} opacity="0.9" />
              <polygon points="370,186 380,190 390,186 380,182" fill={selectedId === 'col-01' ? '#f59e0b' : '#3b82f6'} opacity="0.9" />
            </g>

            {/* Tie Beams V-01 (beam-01) */}
            <g 
              onClick={() => setSelectedId('beam-01')}
              onMouseEnter={() => setHoveredId('beam-01')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
            >
              {/* Beam left to center */}
              <polygon 
                points="130,182 255,222 255,230 130,190" 
                fill={selectedId === 'beam-01' ? '#eab308' : hoveredId === 'beam-01' ? '#475569' : '#334155'}
                stroke={selectedId === 'beam-01' ? '#ca8a04' : '#475569'}
                strokeWidth={selectedId === 'beam-01' ? '2' : '1'}
                className="transition-all duration-300"
              />
              {/* Beam center to right */}
              <polygon 
                points="255,222 380,182 380,190 255,230" 
                fill={selectedId === 'beam-01' ? '#ca8a04' : hoveredId === 'beam-01' ? '#334155' : '#1e293b'}
                stroke={selectedId === 'beam-01' ? '#ca8a04' : '#475569'}
                strokeWidth={selectedId === 'beam-01' ? '2' : '1'}
                className="transition-all duration-300"
              />
            </g>

            {/* LEVEL 3: COLUMNS C-02 & BEAMS V-02 (Nivel 2) */}
            {/* Columns C-02 (col-02) */}
            <g 
              onClick={() => setSelectedId('col-02')}
              onMouseEnter={() => setHoveredId('col-02')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
            >
              {/* Column 1 (Left corner) */}
              <polygon points="120,180 130,184 130,100 120,96" fill={selectedId === 'col-02' ? '#ca8a04' : '#0d9488'} opacity="0.8" />
              <polygon points="130,184 140,180 140,96 130,100" fill={selectedId === 'col-02' ? '#a16207' : '#0f766e'} opacity="0.8" />
              <polygon points="120,96 130,100 140,96 130,92" fill={selectedId === 'col-02' ? '#f59e0b' : '#14b8a6'} opacity="0.8" />

              {/* Column 2 (Center corner) */}
              <polygon points="245,220 255,224 255,140 245,136" fill={selectedId === 'col-02' ? '#ca8a04' : '#0d9488'} opacity="0.8" />
              <polygon points="255,224 265,220 265,136 255,140" fill={selectedId === 'col-02' ? '#a16207' : '#0f766e'} opacity="0.8" />
              <polygon points="245,136 255,140 265,136 255,132" fill={selectedId === 'col-02' ? '#f59e0b' : '#14b8a6'} opacity="0.8" />

              {/* Column 3 (Right corner) */}
              <polygon points="370,180 380,184 380,100 370,96" fill={selectedId === 'col-02' ? '#ca8a04' : '#0d9488'} opacity="0.8" />
              <polygon points="380,184 390,180 390,96 380,100" fill={selectedId === 'col-02' ? '#a16207' : '#0f766e'} opacity="0.8" />
              <polygon points="370,96 380,100 390,96 380,92" fill={selectedId === 'col-02' ? '#f59e0b' : '#14b8a6'} opacity="0.8" />
            </g>

            {/* Corona Beams V-02 (beam-02) */}
            <g 
              onClick={() => setSelectedId('beam-02')}
              onMouseEnter={() => setHoveredId('beam-02')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
              opacity="0.85"
            >
              {/* Beam left to center */}
              <polygon 
                points="130,92 255,132 255,140 130,100" 
                fill={selectedId === 'beam-02' ? '#eab308' : hoveredId === 'beam-02' ? '#475569' : '#334155'}
                stroke={selectedId === 'beam-02' ? '#ca8a04' : '#475569'}
                strokeWidth={selectedId === 'beam-02' ? '2' : '1'}
                className="transition-all duration-300"
              />
              {/* Beam center to right */}
              <polygon 
                points="255,132 380,92 380,100 255,140" 
                fill={selectedId === 'beam-02' ? '#ca8a04' : hoveredId === 'beam-02' ? '#334155' : '#1e293b'}
                stroke={selectedId === 'beam-02' ? '#ca8a04' : '#475569'}
                strokeWidth={selectedId === 'beam-02' ? '2' : '1'}
                className="transition-all duration-300"
              />
            </g>

            {/* Divider Walls M-02 (wall-02) */}
            <g 
              onClick={() => setSelectedId('wall-02')}
              onMouseEnter={() => setHoveredId('wall-02')}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer group"
              opacity="0.8"
            >
              {/* Divider wall on level 1, back-left area */}
              <polygon 
                points="140,186 210,208 210,138 140,116" 
                fill={selectedId === 'wall-02' ? '#eab308' : hoveredId === 'wall-02' ? '#64748b' : '#334155'}
                stroke={selectedId === 'wall-02' ? '#ca8a04' : '#1e293b'}
                strokeWidth={selectedId === 'wall-02' ? '1.5' : '0.5'}
                className="transition-all duration-300"
              />
            </g>

            {/* LIGHTWEIGHT ANNOTATION MARKERS OVER THE 3D MODEL */}
            <g transform={`translate(255, 135)`} className="pointer-events-none">
              <circle cx="0" cy="0" r="14" fill="#06b6d4" opacity="0.15" className="animate-ping" />
              <circle cx="0" cy="0" r="4" fill="#06b6d4" />
            </g>
          </svg>
        </div>

        {/* 3D Properties Legend */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-900 flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wider">
          <span>Vista: Isométrica Estructural</span>
          <span>Eje: Global Revit-Link</span>
        </div>
      </div>

      {/* RIGHT: Power BI Live Cross-Filtered Visuals */}
      <div className="xl:col-span-4 flex flex-col justify-between space-y-4">
        {/* ELEMENT PROPERTY BOX (The BIM DB) */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex-1 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
              <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Atributos IFC (Propiedades)</span>
              </h4>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusClass(selectedElement.status)}`}>
                {selectedElement.status}
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between items-center bg-slate-950 border border-slate-900 p-1.5 rounded">
                <span className="text-slate-500 font-mono text-[9px] font-bold uppercase tracking-wider">IFC Global ID (GUID)</span>
                <span className="text-slate-300 font-mono text-[9px] tracking-tight font-bold">{selectedElement.guid}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-900/80">
                  <span className="text-[9px] text-slate-500 block mb-0.5 font-mono font-bold uppercase tracking-wider">Nombre Elemento</span>
                  <span className="font-semibold text-slate-200 block truncate font-mono text-[10.5px]">{selectedElement.name}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-900/80">
                  <span className="text-[9px] text-slate-500 block mb-0.5 font-mono font-bold uppercase tracking-wider">Entidad IFC</span>
                  <span className="font-bold text-cyan-400 font-mono text-[11px] block">{selectedElement.ifcEntity}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-900/80">
                  <span className="text-[9px] text-slate-500 block mb-0.5 font-mono font-bold uppercase tracking-wider">Material de Diseño</span>
                  <span className="font-semibold text-slate-200 block truncate font-mono text-[10.5px]">{selectedElement.material}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-900/80">
                  <span className="text-[9px] text-slate-500 block mb-0.5 font-mono font-bold uppercase tracking-wider">Nivel Referencia</span>
                  <span className="font-semibold text-slate-200 block font-mono text-[10.5px]">{selectedElement.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC CALCULATIONS (Filtered card outputs) */}
          <div className="pt-4 border-t border-slate-900 mt-4 space-y-3">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resultados Filtrados (Power BI)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-900/60">
                <span className="text-[8px] text-slate-500 block uppercase font-mono font-bold tracking-wider">Costo Estructural</span>
                <span className="text-base font-bold text-slate-100 font-mono">
                  ${selectedElement.cost.toLocaleString()} USD
                </span>
                <span className="text-[8px] text-slate-500 block mt-0.5">
                  {( (selectedElement.cost / totalCost) * 100 ).toFixed(1)}% del total
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-900/60">
                <span className="text-[8px] text-slate-500 block uppercase font-mono font-bold tracking-wider">Carga de Carbono</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {selectedElement.carbonFootprint.toLocaleString()} kg
                </span>
                <span className="text-[8px] text-emerald-600 block mt-0.5 font-mono font-bold">
                  Equivalente CO2
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-[9.5px] text-slate-400 leading-normal flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 animate-pulse" />
              <p className="font-sans">
                La relación volumétrica de este elemento es de <strong>{selectedElement.volume} m³</strong>, correspondiente al {((selectedElement.volume / totalVolume) * 100).toFixed(1)}% de la losa general del proyecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
