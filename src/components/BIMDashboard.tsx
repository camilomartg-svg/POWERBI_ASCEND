import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  AlertOctagon, 
  CheckCircle, 
  Activity, 
  Filter, 
  Users, 
  Wrench,
  DollarSign
} from 'lucide-react';

interface BIMIssue {
  id: string;
  discipline: 'MEP' | 'Estructuras' | 'Arquitectura';
  description: string;
  severity: 'Crítica' | 'Media' | 'Baja';
  assignedTo: string;
  status: 'Abierto' | 'Solucionado';
  costImpact: number; // USD
}

const INITIAL_ISSUES: BIMIssue[] = [
  { id: 'I-101', discipline: 'MEP', description: 'Colisión: Tubería de climatización atraviesa viga de carga principal', severity: 'Crítica', assignedTo: 'C. Pérez (MEP)', status: 'Abierto', costImpact: 4500 },
  { id: 'I-102', discipline: 'Estructuras', description: 'Inconsistencia de armadura en columna C-04 con plano de Revit', severity: 'Crítica', assignedTo: 'M. Gómez (EST)', status: 'Solucionado', costImpact: 0 },
  { id: 'I-103', discipline: 'MEP', description: 'Interferencia entre tuberías de incendio y bandejas eléctricas', severity: 'Media', assignedTo: 'C. Pérez (MEP)', status: 'Abierto', costImpact: 1200 },
  { id: 'I-104', discipline: 'Arquitectura', description: 'Falta de espacio libre para puerta cortafuegos en caja de escalera', severity: 'Media', assignedTo: 'J. Rivas (ARQ)', status: 'Abierto', costImpact: 1800 },
  { id: 'I-105', discipline: 'Estructuras', description: 'Falta de pasatubos especificado en muro de contención del sótano', severity: 'Media', assignedTo: 'M. Gómez (EST)', status: 'Solucionado', costImpact: 0 },
  { id: 'I-106', discipline: 'Arquitectura', description: 'Desviación de espesor en paneles de fachada del bloque central', severity: 'Baja', assignedTo: 'J. Rivas (ARQ)', status: 'Abierto', costImpact: 800 },
];

export default function BIMDashboard() {
  const [activeDiscipline, setActiveDiscipline] = useState<'All' | 'MEP' | 'Estructuras' | 'Arquitectura'>('All');
  const [issues, setIssues] = useState<BIMIssue[]>(INITIAL_ISSUES);

  // Filter issues list
  const filteredIssues = issues.filter(issue => {
    if (activeDiscipline === 'All') return true;
    return issue.discipline === activeDiscipline;
  });

  // Calculate stats
  const totalClashes = filteredIssues.length;
  const openClashes = filteredIssues.filter(i => i.status === 'Abierto').length;
  const solvedClashes = filteredIssues.filter(i => i.status === 'Solucionado').length;
  const totalCostImpact = filteredIssues.reduce((sum, i) => sum + (i.status === 'Abierto' ? i.costImpact : 0), 0);

  // Toggle status for interactive demonstration
  const handleToggleStatus = (id: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === id) {
        return {
          ...issue,
          status: issue.status === 'Abierto' ? 'Solucionado' : 'Abierto'
        };
      }
      return issue;
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch w-full">
      {/* LEFT COLUMN: FILTERS & KPIs */}
      <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-900 text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-3">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filtros Cruzados Activos</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 tracking-tight font-sans">
            Control de Colisiones e Incidencias
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-normal font-sans">
            Interactúe con los filtros de disciplina para observar cómo Power BI segmenta automáticamente los costos de corrección y estados en tiempo real.
          </p>
        </div>

        {/* MOCK POWER BI SLICER PANEL */}
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3 space-y-1.5">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1 font-bold">
            Segmentador de Disciplina
          </span>
          {(['All', 'MEP', 'Estructuras', 'Arquitectura'] as const).map(disc => {
            const isActive = activeDiscipline === disc;
            return (
              <button
                key={disc}
                onClick={() => setActiveDiscipline(disc)}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-mono transition-all flex items-center justify-between ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                    : 'bg-slate-900/10 text-slate-400 border border-transparent hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <span>{disc === 'All' ? 'Todas las Disciplinas' : disc}</span>
                {isActive && <span className="text-[8px] font-mono px-1 rounded bg-slate-950 text-cyan-400 border border-cyan-500/30">FILTRADO</span>}
              </button>
            );
          })}
        </div>

        {/* KPI COUNTER SHIELDS */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-900 flex flex-col justify-between shadow-lg">
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider block">Clashes Abiertos</span>
            <span className="text-xl font-bold text-rose-400 mt-1 font-mono">{openClashes}</span>
            <span className="text-[8px] text-slate-500 font-mono">Requieren acción</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-900 flex flex-col justify-between shadow-lg">
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider block">Solucionados</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 font-mono">{solvedClashes}</span>
            <span className="text-[8px] text-slate-500 font-mono">Cerrados en modelo</span>
          </div>
        </div>
      </div>

      {/* CENTER COLUMN: LIVE INTERACTIVE CHARTS */}
      <div className="lg:col-span-5 flex flex-col bg-slate-950 rounded-2xl border border-slate-900 p-4 space-y-4 shadow-2xl justify-between">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-bold text-slate-200 uppercase font-mono tracking-wider">
              Análisis de Costos de Corrección (BIM-QA)
            </span>
          </div>
          <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider">
            Impacto Acumulado
          </span>
        </div>

        {/* DYNAMIC COST IMPACT CARD */}
        <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(244,63,94,0.02)]">
          <div>
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider block">Impacto Financiero de Clashes Activos</span>
            <span className="text-xl font-extrabold text-rose-400 font-mono tracking-tight mt-0.5 block">
              ${totalCostImpact.toLocaleString()} USD
            </span>
          </div>
          <div className="p-2 rounded-lg bg-rose-950/20 text-rose-400 border border-rose-500/10">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        {/* PROGRESS CHART S-CURVE (SVG GRAPH) */}
        <div className="space-y-2">
          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
            Curva S de Avance Físico (Línea Base vs Real)
          </span>
          <div className="h-32 bg-slate-950 bg-tech-dots rounded-xl border border-slate-900 p-3 relative flex items-center justify-center">
            {/* Legend inside chart */}
            <div className="absolute top-2 right-2 flex items-center gap-3 text-[8px] font-mono uppercase font-bold tracking-wider">
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-slate-600" />
                <span className="text-slate-500">Planificado</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-cyan-400" />
                <span className="text-cyan-400">Real</span>
              </div>
            </div>

            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
              {/* Grid lines */}
              <line x1="0" y1="90" x2="400" y2="90" stroke="#0f172a" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#090d16" strokeWidth="0.8" strokeDasharray="2,2" />
              <line x1="0" y1="10" x2="400" y2="10" stroke="#090d16" strokeWidth="0.8" strokeDasharray="2,2" />

              {/* Baseline Path (Planned) */}
              <path 
                d="M 0,90 Q 100,85 200,45 T 400,10" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="1.5" 
                strokeDasharray="3,3"
              />

              {/* Actual progress curve (dynamic) */}
              <path 
                d="M 0,90 Q 100,88 200,55 T 320,38" 
                fill="none" 
                stroke="#06b6d4" 
                strokeWidth="2.5" 
                className="transition-all duration-1000"
              />

              {/* Marker node */}
              <circle cx="320" cy="38" r="3.5" fill="#06b6d4" />
              <circle cx="320" cy="38" r="8" fill="#06b6d4" opacity="0.3" className="animate-ping" />

              {/* Text annotation */}
              <text x="310" y="24" fill="#06b6d4" className="font-mono text-[8px] font-bold">82.4% Avance (Fase 2)</text>
            </svg>
          </div>
          <div className="flex justify-between text-[8px] font-mono text-slate-500">
            <span>Enero</span>
            <span>Marzo</span>
            <span>Mayo</span>
            <span>Julio (Hoy)</span>
            <span>Septiembre</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: FILTERED ISSUES LOG (Interactivity) */}
      <div className="lg:col-span-4 flex flex-col bg-slate-950/40 border border-slate-900 rounded-2xl p-4 shadow-2xl justify-between">
        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <h4 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
              <span>Registro de Colisiones IFC</span>
            </h4>
            <span className="text-[9px] text-slate-500 font-mono">
              Filtrados: {filteredIssues.length}
            </span>
          </div>

          {/* TABLE OF CLASHES */}
          <div className="space-y-1.5 overflow-y-auto max-h-[220px] flex-1 pr-1">
            <AnimatePresence mode="popLayout">
              {filteredIssues.map((issue) => {
                const isAbierto = issue.status === 'Abierto';
                return (
                  <motion.div
                    key={issue.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-2.5 rounded-lg border transition-all ${
                      isAbierto 
                        ? 'bg-slate-950/60 border-slate-900/60 hover:border-slate-800' 
                        : 'bg-slate-950/10 border-slate-950/80 opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[8px] px-1.5 py-0.5 rounded font-mono ${
                          issue.discipline === 'MEP' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                          issue.discipline === 'Estructuras' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {issue.discipline}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500">ID: {issue.id}</span>
                      </div>

                      <button
                        onClick={() => handleToggleStatus(issue.id)}
                        className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                          isAbierto 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 shadow-sm' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {isAbierto ? 'Resolver en Obra' : 'Cerrado ✔'}
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-300 font-sans mt-1 leading-normal font-medium">
                      {issue.description}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-900/60 text-[8px] font-mono text-slate-500 font-bold">
                      <span>Asignado: {issue.assignedTo}</span>
                      {isAbierto && (
                        <span className="text-rose-400 font-bold">
                          Impacto: +${issue.costImpact} USD
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Small educational footnote */}
        <div className="p-2.5 bg-cyan-500/5 border border-cyan-500/10 rounded-lg text-[9.5px] text-slate-400 leading-normal mt-3 flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 animate-pulse" />
          <p className="font-sans">
            <strong>Tip Metodológico:</strong> La automatización en la detección de colisiones de Navisworks importadas a Power BI reduce los tiempos de reunión de diseño (VDC) hasta en un 40%.
          </p>
        </div>
      </div>
    </div>
  );
}
