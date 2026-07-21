import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Layers, 
  Database, 
  RefreshCw, 
  ArrowRight,
  Info,
  ChevronRight,
  Table,
  Columns
} from 'lucide-react';

interface WideRow {
  elemento: string;
  lunes: string;
  martes: string;
  miercoles: string;
}

interface NarrowRow {
  elemento: string;
  dia: string;
  rendimiento: number;
}

export default function DataSchemaNormalization() {
  const [isNormalized, setIsNormalized] = useState<boolean>(false);

  // Sample data: Wide desnormalized matrix (Human-readable)
  const wideData: WideRow[] = [
    { elemento: 'Frente 1 (Túnel)', lunes: '12 m', martes: '15 m', miercoles: '10 m' },
    { elemento: 'Frente 2 (Viaducto)', lunes: '40 m³', martes: '45 m³', miercoles: '38 m³' },
  ];

  // Sample data: Tall, narrow normalized table (1NF / Machine-readable)
  const narrowData: NarrowRow[] = [
    { elemento: 'Frente 1 (Túnel)', dia: 'Lunes', rendimiento: 12 },
    { elemento: 'Frente 1 (Túnel)', dia: 'Martes', rendimiento: 15 },
    { elemento: 'Frente 1 (Túnel)', dia: 'Miércoles', rendimiento: 10 },
    { elemento: 'Frente 2 (Viaducto)', dia: 'Lunes', rendimiento: 40 },
    { elemento: 'Frente 2 (Viaducto)', dia: 'Martes', rendimiento: 45 },
    { elemento: 'Frente 2 (Viaducto)', dia: 'Miércoles', rendimiento: 38 },
  ];

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
          3. Normalización de Esquemas: De Matrices a Tablas Relacionales
        </h2>
        
        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
          Los profesionales suelen registrar información en formato de "matriz" (diseñada para facilitar la lectura humana). 
          La teoría de bases de datos exige que para poder analizar la información en Power BI, esta debe ser <strong>normalizada</strong>.
        </p>
      </div>

      {/* 2. Visual Pivot/Normalization Transformer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Desnormalized Matrix */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Esquema Desnormalizado (Lectura Humana)
              </span>
              <span className="text-[8px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 font-bold uppercase">
                Matriz Ancha
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Columnas anchas que mezclan dimensiones y hechos (ej. una columna para cada día de la semana mostrando los rendimientos). Esto dificulta el filtrado y el cálculo dinámico.
            </p>

            {/* Wide table display */}
            <div className="overflow-x-auto rounded-lg border border-slate-900 bg-slate-900/20">
              <table className="w-full text-left border-collapse text-[11px] font-mono">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-900 text-slate-400 text-[10px]">
                    <th className="p-2.5">Elemento</th>
                    <th className="p-2.5 text-amber-400">Lunes</th>
                    <th className="p-2.5 text-amber-400">Martes</th>
                    <th className="p-2.5 text-amber-400">Miércoles</th>
                  </tr>
                </thead>
                <tbody>
                  {wideData.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-900/60 last:border-0 hover:bg-slate-900/40">
                      <td className="p-2.5 text-slate-300 font-bold">{row.elemento}</td>
                      <td className="p-2.5 text-slate-400">{row.lunes}</td>
                      <td className="p-2.5 text-slate-400">{row.martes}</td>
                      <td className="p-2.5 text-slate-400">{row.miercoles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-red-950/10 rounded-xl border border-red-900/20 text-[10.5px] leading-relaxed text-slate-400">
              <strong className="text-red-400 block mb-0.5 font-mono text-[9px] uppercase">Problema Técnico:</strong>
              Para calcular el promedio de rendimiento, Power BI tendría que sumar columnas distintas dinámicamente, lo cual inhabilita el comportamiento estándar del motor de inteligencia de negocios.
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>Formato típico de Excel / Registro manual</span>
            <span className="text-red-400">No Analizable</span>
          </div>
        </div>

        {/* Right Side: Normalized Table */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Primera Forma Normal (1NF - Lectura de Máquina)
              </span>
              <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold uppercase">
                Tabla Alta y Delgada
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Cada columna contiene un único tipo de dato, no hay grupos repetitivos, y cada fila representa una transacción o evento único y atómico. El tiempo se convierte en una sola dimensión vertical.
            </p>

            {/* Interactive transform interface */}
            <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">Proceso de Limpieza (Unpivot)</span>
                <button
                  onClick={() => setIsNormalized(!isNormalized)}
                  className="px-3 py-1 rounded-lg bg-blue-950 border border-blue-900 hover:bg-blue-900 text-blue-400 hover:text-blue-200 text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isNormalized ? 'rotate-180' : ''} transition-transform duration-500`} />
                  {isNormalized ? 'Revertir a Matriz' : 'Normalizar Estructura (1NF)'}
                </button>
              </div>

              {/* Dynamic visualization */}
              <AnimatePresence mode="wait">
                {isNormalized ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 text-[10.5px] font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Estructura optimizada exitosamente para BI</span>
                    </div>

                    <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-900 bg-slate-950">
                      <table className="w-full text-left border-collapse text-[10.5px] font-mono">
                        <thead>
                          <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 text-[9px] sticky top-0">
                            <th className="p-2">Elemento</th>
                            <th className="p-2 text-emerald-400">Día (Dimensión)</th>
                            <th className="p-2 text-blue-400">Rendimiento (Hecho)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {narrowData.map((row, idx) => (
                            <tr key={idx} className="border-b border-slate-900/60 last:border-0 hover:bg-slate-900/40">
                              <td className="p-2 text-slate-300">{row.elemento}</td>
                              <td className="p-2 text-emerald-400 font-semibold">{row.dia}</td>
                              <td className="p-2 text-blue-400 font-bold">{row.rendimiento}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-xl border border-dashed border-slate-800 bg-slate-950 flex flex-col items-center justify-center text-center space-y-2"
                  >
                    <Table className="w-8 h-8 text-slate-700 animate-pulse" />
                    <span className="text-xs text-slate-400 font-medium">Esquema Desnormalizado Detectado</span>
                    <p className="text-[10px] text-slate-600 max-w-sm">
                      Haga clic en el botón superior para simular la transformación del esquema desnormalizado de Excel a una tabla normalizada compatible con relaciones de bases de datos.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Gobernanza del Dato:</strong> Al transformar estructuras "anchas" a "altas y delgadas", el motor analítico puede cruzar de forma instantánea y eficiente el rendimiento físico del día con cualquier otra tabla transaccional del proyecto.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
