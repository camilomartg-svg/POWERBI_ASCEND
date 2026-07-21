import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Database, 
  RefreshCw, 
  Combine, 
  ArrowRight,
  Info,
  ShieldCheck,
  Building,
  HardHat
} from 'lucide-react';

export default function DataSemanticInteroperability() {
  const [isMapped, setIsMapped] = useState<boolean>(false);

  // Raw data from the image representing the Silo de Datos
  const disciplines = [
    {
      id: 'geology',
      role: 'Geólogo',
      term: 'Zona de Falla KM 4',
      icon: HardHat,
      color: 'border-amber-500/20 text-amber-400 bg-amber-500/5',
      mappedColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
    },
    {
      id: 'budget',
      role: 'Presupuesto',
      term: 'Actividad de Excavación Subterránea Sector A',
      icon: Database,
      color: 'border-indigo-500/20 text-indigo-400 bg-indigo-500/5',
      mappedColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
    },
    {
      id: 'bim',
      role: 'Modelo BIM',
      term: 'Túnel 1 Cuerpo Central',
      icon: Building,
      color: 'border-sky-500/20 text-sky-400 bg-sky-500/5',
      mappedColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
    }
  ];

  const masterEntity = {
    standardId: 'TUNEL-01-SEC-A-F4',
    name: 'Túnel 1 - Sector A (Zona de Falla KM 4)',
    description: 'Entidad unificada en el Diccionario Maestro de Entidades'
  };

  return (
    <div className="w-full space-y-6">
      
      {/* 1. Header with exact user text */}
      <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Frente 2: Conceptos Teóricos de Limpieza y Calidad del Dato
          </h3>
        </div>
        
        <h2 className="text-base font-sans font-medium text-slate-100 tracking-tight">
          2. El Concepto de Interoperabilidad Semántica (Gobernanza)
        </h2>
        
        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
          En un megaproyecto, el mayor enemigo de los tableros es la <strong>desconexión lingüística</strong> entre disciplinas. 
          Cada área técnica captura la realidad física desde su propia perspectiva y con su propia terminología.
        </p>
      </div>

      {/* 2. SILO DE DATOS vs MAPEO ONTOLÓGICO VISUALIZER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Current state of Silos */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                El Silo de Datos (Desconexión)
              </span>
              <span className="text-[8px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 font-bold uppercase">
                Incoherencia
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Ocurre cuando múltiples disciplinas se refieren al mismo objeto físico con nombres completamente distintos, impidiendo cruces analíticos directos:
            </p>

            {/* Simulated disconnected inputs */}
            <div className="space-y-3">
              {disciplines.map((d) => {
                const Icon = d.icon;
                return (
                  <div 
                    key={d.id}
                    className={`p-3 rounded-xl border transition-all duration-300 ${isMapped ? d.mappedColor : d.color}`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider">
                        <Icon className="w-3.5 h-3.5" />
                        <strong>{d.role}</strong>
                      </div>
                      <span className="text-[8px] font-mono text-slate-500">Término Local</span>
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-100 bg-slate-900/60 px-2 py-1 rounded border border-slate-900 flex justify-between items-center">
                      <span>"{d.term}"</span>
                      {isMapped && (
                        <span className="text-[9px] text-emerald-400 font-bold">Mapeado ✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>Origen: Sistemas de Campo independientes</span>
            <span className="text-amber-500">Sin Estándar</span>
          </div>
        </div>

        {/* Right column: Interactive Master Entity Dictionary */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                La Solución Conceptual (Mapeo Ontológico)
              </span>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                Gobernanza
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Consiste en establecer un <strong>diccionario maestro de entidades</strong> (o taxonomía). El proceso de limpieza teórica consiste en mapear los términos locales de cada profesional a este estándar unificado antes de cargarlos al modelo de datos.
            </p>

            {/* Interactive ETL step illustration */}
            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">Diccionario Maestro de Entidades</span>
                <button
                  onClick={() => setIsMapped(!isMapped)}
                  className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-900 hover:bg-blue-900 text-blue-400 hover:text-blue-200 text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isMapped ? 'rotate-180' : ''} transition-transform duration-500`} />
                  {isMapped ? 'Restablecer Silos' : 'Ejecutar Mapeo Ontológico'}
                </button>
              </div>

              {/* Master Entity visual slot */}
              <AnimatePresence mode="wait">
                {isMapped ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/40 uppercase">
                          CÓDIGO UNIFICADO: {masterEntity.standardId}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono text-emerald-400">Consistente ✓</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-bold text-slate-100">{masterEntity.name}</h4>
                      <p className="text-[10.5px] text-slate-400 font-sans">{masterEntity.description}</p>
                    </div>

                    <div className="pt-2 border-t border-emerald-500/10 text-[10px] text-emerald-400/80 font-mono space-y-1">
                      <div>• Mapeado Geólogo ➔ <span className="bg-slate-900 px-1 rounded text-slate-300">"{disciplines[0].term}"</span></div>
                      <div>• Mapeado Presupuesto ➔ <span className="bg-slate-900 px-1 rounded text-slate-300">"{disciplines[1].term}"</span></div>
                      <div>• Mapeado BIM ➔ <span className="bg-slate-900 px-1 rounded text-slate-300">"{disciplines[2].term}"</span></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950 flex flex-col items-center justify-center text-center py-8 space-y-2"
                  >
                    <Combine className="w-8 h-8 text-slate-700 animate-pulse" />
                    <span className="text-xs text-slate-400 font-medium">Esperando Ejecución del Mapeo</span>
                    <p className="text-[10px] text-slate-600 max-w-sm">
                      Haga clic en el botón superior para simular cómo el motor ETL limpia y vincula las variables lingüísticas inconexas a una clave única estándar.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Gobernanza del Dato:</strong> Al estructurar esta capa intermedia (Mapeo Ontológico), Power BI puede unificar las métricas financieras con las geológicas de manera instantánea, evitando reportes duplicados o datos huérfanos.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
