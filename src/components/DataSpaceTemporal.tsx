import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Clock, 
  MapPin, 
  Layers, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  Cpu, 
  Building2, 
  Milestone,
  HelpCircle,
  TrendingDown
} from 'lucide-react';

export default function DataSpaceTemporal() {
  // Spatial Indexing Type: Continuous (Vías/Infraestructura) vs Discrete (Edificación)
  const [spatialType, setSpatialType] = useState<'vias' | 'edificacion'>('vias');

  // Sliders for Space and Time in Continuous mode
  const [selectedSpace, setSelectedSpace] = useState<number>(2300); // meters (abscisa)
  const [selectedTime, setSelectedTime] = useState<number>(18); // day

  // Selected floor in Discrete mode
  const [selectedFloor, setSelectedFloor] = useState<number>(3);
  const [selectedZone, setSelectedZone] = useState<'A' | 'B' | 'C'>('B');
  const [selectedTimeDiscrete, setSelectedTimeDiscrete] = useState<number>(18);

  // Active layers toggles
  const [layers, setLayers] = useState({
    geotecnia: true,
    rendimiento: true,
    sst: true
  });

  const toggleLayer = (layer: 'geotecnia' | 'rendimiento' | 'sst') => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Helper to format continuous Abscisa (meters) to K0+000 notation
  const formatAbscisa = (m: number) => {
    const km = Math.floor(m / 1000);
    const rest = m % 1000;
    const padding = rest < 10 ? '00' : rest < 100 ? '0' : '';
    return `K${km}+${padding}${rest}`;
  };

  // Define theoretical entities in the continuous Space-Time plane
  // Geotecnia Layer: Geological fault / unstable rock at K2+000 to K2+600, active always
  const hasGeotecniaContinuous = selectedSpace >= 2000 && selectedSpace <= 2600;

  // Rendimiento Layer: Excavation taking place from Day 10 to Day 25, moving from K1+800 to K2+800
  // Line: Day 10 (K1+800) to Day 25 (K2+800)
  // Let's check if active at current Day:
  const isRendimientoTimeActive = selectedTime >= 10 && selectedTime <= 25;
  // Calculate expected excavation position at current Day:
  // Interpolation: position = 1800 + (Day - 10) * (2800 - 1800) / (25 - 10)
  const rPosition = 1800 + ((selectedTime - 10) * 1000) / 15;
  const hasRendimientoContinuous = isRendimientoTimeActive && Math.abs(selectedSpace - rPosition) <= 250; // tolerance range

  // SST Layer: Accident or risk incident on Day 18 at K2+300
  const hasSstContinuous = selectedTime === 18 && Math.abs(selectedSpace - 2300) <= 100;

  // Determine coexistence and correlation explanation
  const getContinuousCorrelation = () => {
    const activeDisciplines = [];
    if (layers.geotecnia && hasGeotecniaContinuous) activeDisciplines.push('Geotecnia (Roca inestable Tipo IV)');
    if (layers.rendimiento && hasRendimientoContinuous) activeDisciplines.push('Rendimiento (Excavación activa)');
    if (layers.sst && hasSstContinuous) activeDisciplines.push('SST (Incidente por caída de bloque)');

    if (activeDisciplines.length >= 3) {
      return {
        coexist: true,
        level: 'high',
        title: 'Coexistencia Crítica Detectada',
        desc: 'El vector [S, T] = [' + formatAbscisa(selectedSpace) + ', Día ' + selectedTime + '] une tres disciplinas. Análisis: La excavación activa (Rendimiento) en un sector con fracturación geotécnica alta sin soporte inmediato (Geotecnia) provocó un desprendimiento de roca (SST).',
        badge: 'bg-red-500/10 text-red-400 border-red-500/20'
      };
    } else if (activeDisciplines.length === 2) {
      let desc = '';
      if (hasGeotecniaContinuous && hasRendimientoContinuous) {
        desc = 'La excavación está cruzando la zona de falla geotécnica. Esto explica la reducción en la velocidad de avance lineal (Rendimiento afectado por geología).';
      } else if (hasGeotecniaContinuous && hasSstContinuous) {
        desc = 'Se registró un incidente de seguridad en la zona de falla geológica. El riesgo de desprendimiento estaba latente en esta abscisa.';
      } else {
        desc = 'La excavación activa coincide temporal y espacialmente con la alerta de seguridad. Posible congestión de cuadrillas o falta de ventilación en el frente.';
      }
      return {
        coexist: true,
        level: 'medium',
        title: 'Coexistencia Parcial (Correlación)',
        desc: `Mapeo bivariado exitoso entre: ${activeDisciplines.join(' y ')}. ${desc}`,
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      };
    } else if (activeDisciplines.length === 1) {
      return {
        coexist: false,
        level: 'low',
        title: 'Registro Aislado',
        desc: `Únicamente se registra actividad de ${activeDisciplines[0]} en este vector. No existe cruce interdisciplinario inmediato en esta ventana de espacio-tiempo.`,
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      };
    } else {
      return {
        coexist: false,
        level: 'none',
        title: 'Sin Registros en Vector',
        desc: 'No hay eventos reportados para las capas activas en esta coordenada. Ecosistema despejado.',
        badge: 'bg-slate-900 border-slate-800 text-slate-500'
      };
    }
  };

  const correlation = getContinuousCorrelation();

  return (
    <div className="w-full space-y-6">
      
      {/* HEADER SECTION & TYPE TOGGLE */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950/60 p-4 border border-slate-900 rounded-2xl">
        <div className="md:col-span-8 space-y-1">
          <div className="flex items-center gap-2">
            <Milestone className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
              Dimensionalidad Espacio-Temporal en Infraestructura
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal font-sans">
            En proyectos lineales (vías, túneles, ductos), los datos no son registros aislados; están indexados por dos variables continuas fundamentales: <strong>Espacio (Abscisado)</strong> y <strong>Tiempo (Timestamp)</strong>. Contrasta este modelo con el de edificación tradicional.
          </p>
        </div>
        
        {/* Toggle between Vías and Edificación */}
        <div className="md:col-span-4 flex bg-slate-900 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setSpatialType('vias')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-all ${
              spatialType === 'vias'
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Milestone className="w-3.5 h-3.5 inline mr-1.5 align-middle" />
            Vías (Continuo)
          </button>
          <button
            onClick={() => setSpatialType('edificacion')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-all ${
              spatialType === 'edificacion'
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 inline mr-1.5 align-middle" />
            Edificios (Discreto)
          </button>
        </div>
      </div>

      {/* CORE INTERACTIVE CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COMPONENT: The Interactive 2D Coordinate Grid / Map */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {spatialType === 'vias' ? 'PLANO DE COEXISTENCIA ESPACIO-TEMPORAL [S, T]' : 'MODELO ESPACIAL DISCRETO [Nivel, Zona, T]'}
              </span>
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-slate-500 uppercase">Simulador Activo</span>
              </div>
            </div>

            {spatialType === 'vias' ? (
              /* CONTINUOUS INFRASTRUCTURE ROADWAY SYSTEM */
              <div className="space-y-4">
                {/* 2D Space-Time Visualizer (SVG Grid Plot) */}
                <div className="relative bg-slate-950 border border-slate-900/80 rounded-xl p-3 h-48 flex flex-col justify-between overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_16px] opacity-40" />

                  {/* SVG Rendering Layer Planes */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none p-3 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    
                    {/* Geotecnia Area (K2+000 to K2+600, all days) -> space 40% to 52%, time 0% to 100% */}
                    {layers.geotecnia && (
                      <rect 
                        x="40" y="0" width="12" height="100" 
                        fill="rgba(59, 130, 246, 0.05)" 
                        stroke="rgba(59, 130, 246, 0.2)" 
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                    )}

                    {/* Rendimiento (Excavation path) -> linear route from Day 10 to 25, space K1+800 (36%) to K2+800 (56%) */}
                    {layers.rendimiento && (
                      <line 
                        x1="36" y1="33" x2="56" y2="83" 
                        stroke="rgba(245, 158, 11, 0.4)" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                    )}

                    {/* SST Incident Point -> Day 18 (60%), Space K2+300 (46%) */}
                    {layers.sst && (
                      <circle 
                        cx="46" cy="60" r="3" 
                        fill="rgba(239, 68, 68, 0.6)" 
                        className="animate-ping"
                      />
                    )}
                    {layers.sst && (
                      <circle 
                        cx="46" cy="60" r="1.5" 
                        fill="#ef4444" 
                      />
                    )}

                    {/* Active User Vector Crosshair Intersection [S, T] */}
                    {/* Convert Selected Space (1000 - 5000) to percentage (20% to 90%) */}
                    {/* Convert Selected Time (1 - 30) to percentage (5% to 95%) */}
                    {(() => {
                      const pctX = 20 + ((selectedSpace - 1000) * 70) / 4000;
                      const pctY = 5 + ((selectedTime - 1) * 90) / 29;
                      return (
                        <>
                          {/* Crosshair lines */}
                          <line x1={pctX} y1="0" x2={pctX} y2="100" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.6" />
                          <line x1="0" y1={pctY} x2="100" y2={pctY} stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1,1" opacity="0.6" />
                          
                          {/* Pulsing Intersection Dot */}
                          <circle cx={pctX} cy={pctY} r="2" fill="#f59e0b" />
                          <circle cx={pctX} cy={pctY} r="4" fill="none" stroke="#f59e0b" strokeWidth="0.5" className="animate-pulse" />
                        </>
                      );
                    })()}

                  </svg>

                  {/* Labels for Axis */}
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 z-10 select-none">
                    <span>TIEMPO: Día 1</span>
                    <span>Día 15</span>
                    <span>Día 30</span>
                  </div>

                  {/* Middle representation mapping */}
                  <div className="flex items-center justify-between pointer-events-none z-10 px-2 select-none">
                    <span className="text-[9px] font-mono text-blue-400/40 bg-blue-950/20 px-1 border border-blue-900/10 rounded">
                      {layers.geotecnia && 'Falla Geológica (S: K2+000 a K2+600)'}
                    </span>
                    <span className="text-[9px] font-mono text-amber-400/40 bg-amber-950/20 px-1 border border-amber-900/10 rounded">
                      {layers.rendimiento && 'Ruta Excavación Túnel (S: K1+800 → K2+800)'}
                    </span>
                  </div>

                  <div className="flex justify-between text-[8px] font-mono text-slate-500 border-t border-slate-900/80 pt-1 z-10 select-none">
                    <span>ESPACIO: K1+000</span>
                    <span>K2+000</span>
                    <span>K3+000</span>
                    <span>K4+000</span>
                    <span>K5+000</span>
                  </div>
                </div>

                {/* Sliders Controllers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/30 p-3 rounded-xl border border-slate-900">
                  {/* Space (S) Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" /> Variable Espacio (S)
                      </span>
                      <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                        {formatAbscisa(selectedSpace)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="5000"
                      step="50"
                      value={selectedSpace}
                      onChange={(e) => setSelectedSpace(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-[8px] font-mono text-slate-500 block">Alineamiento de vía continuo (K1+000 a K5+000)</span>
                  </div>

                  {/* Time (T) Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Variable Tiempo (T)
                      </span>
                      <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                        Día {selectedTime}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="text-[8px] font-mono text-slate-500 block">Línea de tiempo del proyecto (Días 1 a 30)</span>
                  </div>
                </div>
              </div>
            ) : (
              /* DISCRETE EDIFICACIÓN SYSTEM */
              <div className="space-y-4">
                {/* 3D Wireframe Representation for Floor Levels */}
                <div className="bg-slate-950 border border-slate-900/80 rounded-xl p-3 h-48 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-tech-dots opacity-10" />
                  
                  {/* Render 5 Floors stacked */}
                  <div className="flex-1 flex flex-col justify-end gap-1.5 p-2 relative z-10">
                    {[5, 4, 3, 2, 1].map((floor) => (
                      <div 
                        key={floor} 
                        className={`border rounded-lg p-1.5 transition-all flex items-center justify-between ${
                          selectedFloor === floor 
                            ? 'bg-blue-500/10 border-blue-500/40 text-slate-100 shadow-md shadow-blue-500/5' 
                            : 'bg-slate-950/80 border-slate-900 text-slate-500 hover:border-slate-800 hover:text-slate-400 cursor-pointer'
                        }`}
                        onClick={() => setSelectedFloor(floor)}
                      >
                        <span className="text-[10px] font-mono font-bold">PISO {floor} (Cota Discreta)</span>
                        
                        {/* Zones inside this floor */}
                        <div className="flex gap-1.5">
                          {(['A', 'B', 'C'] as const).map((zone) => (
                            <span 
                              key={zone}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedFloor(floor);
                                setSelectedZone(zone);
                              }}
                              className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold border transition-all ${
                                selectedFloor === floor && selectedZone === zone
                                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              Zona {zone}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[8px] font-mono text-slate-500 text-right border-t border-slate-900/80 pt-1 select-none">
                    Métrica: Piso (Losa de Concreto Discreta) • Espacio No Continuo
                  </div>
                </div>

                {/* Controller parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/30 p-3 rounded-xl border border-slate-900">
                  {/* Discrete parameters information */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">Indexación del Elemento</span>
                    <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl text-[10px] leading-relaxed text-slate-300 font-sans">
                      En edificaciones, el espacio se modela con llaves compuestas: <span className="font-mono text-amber-400">Piso {selectedFloor} - Zona {selectedZone}</span>. No hay abscisas continuas sino identidades de ubicación física espacial (salas, columnas, vigas numeradas).
                    </div>
                  </div>

                  {/* Discrete Time Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Tiempo (T)
                      </span>
                      <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                        Día {selectedTimeDiscrete}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={selectedTimeDiscrete}
                      onChange={(e) => setSelectedTimeDiscrete(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <span className="text-[8px] font-mono text-slate-500 block">Día de fundición de losa o mampostería.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACTIVE DISCIPLINE LAYER CONTROL */}
          <div className="pt-3 border-t border-slate-900 mt-4">
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block mb-2">Capas de Datos y Disciplinas Coexistentes</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => toggleLayer('geotecnia')}
                className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  layers.geotecnia 
                    ? 'bg-blue-500/5 border-blue-500/20 text-blue-400' 
                    : 'bg-slate-950 border-slate-900/60 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-tight">Geotecnia</span>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full ${layers.geotecnia ? 'bg-blue-400' : 'bg-slate-800'}`} />
              </button>

              <button
                onClick={() => toggleLayer('rendimiento')}
                className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  layers.rendimiento 
                    ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' 
                    : 'bg-slate-950 border-slate-900/60 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-tight">Rendimiento</span>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full ${layers.rendimiento ? 'bg-amber-400' : 'bg-slate-800'}`} />
              </button>

              <button
                onClick={() => toggleLayer('sst')}
                className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                  layers.sst 
                    ? 'bg-red-500/5 border-red-500/20 text-red-400' 
                    : 'bg-slate-950 border-slate-900/60 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-tight">SST / Seguridad</span>
                </div>
                <span className={`w-1.5 h-1.5 rounded-full ${layers.sst ? 'bg-red-400' : 'bg-slate-800'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COMPONENT: The Vector [S,T] Theoretical Breakdown & Analysis */}
        <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                Análisis del Vector [S, T]
              </h4>
            </div>

            {/* Display active math representation */}
            <div className="bg-slate-950 p-4 border border-slate-900 rounded-xl text-center">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Vector de Coexistencia</span>
              <div className="text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 font-extrabold tracking-widest">
                {spatialType === 'vias' ? (
                  `[ ${formatAbscisa(selectedSpace)}, Día ${selectedTime} ]`
                ) : (
                  `[ Piso ${selectedFloor}, Zona ${selectedZone}, Día ${selectedTimeDiscrete} ]`
                )}
              </div>
              <p className="text-[9px] font-mono text-slate-500 mt-1 leading-normal">
                {spatialType === 'vias' 
                  ? 'Representación espacial lineal continua indexada por un alineamiento (X,Y,Z → Abscisa).'
                  : 'Mapeo espacial de llaves discretas en base a estructura por niveles constructivos.'
                }
              </p>
            </div>

            {/* Ingestion & cross-disciplinary correlation alert box */}
            {spatialType === 'vias' ? (
              <div className={`p-3.5 rounded-xl border space-y-2 transition-all duration-300 ${correlation.badge}`}>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <h5 className="text-[11px] font-mono font-bold uppercase tracking-tight">{correlation.title}</h5>
                </div>
                <p className="text-[11px] leading-relaxed font-sans text-slate-300">
                  {correlation.desc}
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl border border-blue-500/10 bg-blue-500/5 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <h5 className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-tight">Indexación Discreta BIM</h5>
                </div>
                <p className="text-[11px] leading-relaxed font-sans text-slate-300">
                  En edificación, la relación se realiza mediante enlaces lógicos directos con GUIDs de elementos IFC (ej. Losa de piso 3, viga 305). Si el hormigón de la Zona B en el Piso {selectedFloor} falló a la resistencia a compresión (Calidad) el Día {selectedTimeDiscrete}, afectará la ruta crítica del Piso {selectedFloor + 1} de forma lógica, no a través de coordenadas de abscisa lineal.
                </p>
              </div>
            )}

            {/* Core Scientific Bullet Points */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Fundamento Técnico</span>
              
              <div className="flex gap-2 items-start text-[11px] leading-relaxed text-slate-400 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <p>
                  <strong>Variables continuas:</strong> En proyectos viales, los datos no ocurren en puntos rígidos; la abscisa es un número flotante real. Cruzar disciplinas requiere tolerancia métrica para agrupar registros.
                </p>
              </div>

              <div className="flex gap-2 items-start text-[11px] leading-relaxed text-slate-400 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <p>
                  <strong>Relación de vecindad:</strong> Si dos datos ocurren en la misma ventana de tiempo (<span className="font-mono text-amber-400">T</span>) y rango de abscisa (<span className="font-mono text-blue-400">S</span>), están vinculados conceptualmente aunque provengan de orígenes y contratistas diferentes.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal flex items-start gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Análisis en Power BI:</strong> La correlación espacio-temporal en vías se logra en el ETL (Power Query) o mediante relaciones DAX de vecindad aproximada en el modelo semántico.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
