import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DataValidationSimulator() {
  const [volumeInput, setVolumeInput] = useState<string>('150');
  const designLimit = 40; // max design volume in m³ from the user's image

  // Apply the exact presets from the user's image
  const setPreset = (type: 'syntax_error' | 'semantic_error' | 'valid') => {
    if (type === 'syntax_error') {
      setVolumeInput('Diez metros');
    } else if (type === 'semantic_error') {
      setVolumeInput('150');
    } else {
      setVolumeInput('10');
    }
  };

  // 1. Syntactic Validation check
  const checkSyntax = () => {
    const trimmed = volumeInput.trim();
    if (trimmed === '') return false;
    const parsed = Number(trimmed);
    return !isNaN(parsed) && parsed >= 0;
  };

  // 2. Semantic Validation check
  const checkSemantic = () => {
    if (!checkSyntax()) return false;
    const value = parseFloat(volumeInput);
    return value <= designLimit;
  };

  const isSyntaxOk = checkSyntax();
  const isSemanticOk = checkSemantic();

  return (
    <div className="w-full space-y-6">
      
      {/* Front introduction from user's text */}
      <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Frente 2: Conceptos Teóricos de Limpieza y Calidad del Dato
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 font-sans leading-normal">
          La limpieza de datos no es solo "corregir errores de ortografía"; es un proceso metodológico para garantizar la confianza en el análisis. Se fundamenta en tres conceptos teóricos, siendo el primero la distinción de validaciones:
        </p>
      </div>

      {/* Main Grid: Exact content from user's image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Validación Sintáctica */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/40 border border-blue-900/50 text-blue-400">
                PARTE A
              </span>
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                Validación Sintáctica (La Forma)
              </h4>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Evalúa si el dato cumple con el formato técnico estructurado que requiere la base de datos.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 text-[10.5px] leading-relaxed">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Concepto</span>
                <p className="text-slate-300 italic">¿El dato es del tipo correcto? ¿Tiene caracteres prohibidos?</p>
              </div>

              <div className="bg-red-950/20 p-2.5 rounded-lg border border-red-900/30 text-[10.5px] leading-relaxed">
                <span className="text-[9px] font-mono text-red-400 uppercase block font-bold">Falla Sintáctica</span>
                <p className="text-slate-300">
                  Que un campo de cantidad numérica contenga texto (ej. escribir <code className="bg-slate-950 px-1 py-0.5 rounded text-red-300 font-mono">"Diez metros"</code> en lugar de <code className="bg-slate-950 px-1 py-0.5 rounded text-emerald-300 font-mono">10</code>).
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-900 mt-2 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>Control de Estructura</span>
            <span>Capa Base</span>
          </div>
        </div>

        {/* Card 2: Validación Semántica */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 border-b border-slate-900 pb-3">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-900/50 text-indigo-400">
                PARTE B
              </span>
              <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wide">
                Validación Semántica (El Significado y Contexto)
              </h4>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Evalúa si el dato es coherente con las leyes del negocio y del mundo físico, incluso si su sintaxis es perfecta.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-900 text-[10.5px] leading-relaxed">
                <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Concepto</span>
                <p className="text-slate-300 italic">¿Tiene sentido este dato en la realidad del proyecto?</p>
              </div>

              <div className="bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30 text-[10.5px] leading-relaxed">
                <span className="text-[9px] font-mono text-amber-400 uppercase block font-bold">Falla Semántica</span>
                <p className="text-slate-300">
                  Registrar que se fundieron <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-300 font-mono">150 m³</code> de concreto en un pilote cuyo volumen geométrico de diseño es de máximo <code className="bg-slate-950 px-1 py-0.5 rounded text-emerald-300 font-mono">40 m³</code>. La sintaxis es correcta (es un número), pero la semántica es físicamente imposible.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 mt-2 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <span>Control de Coherencia</span>
            <span>Capa de Negocio</span>
          </div>
        </div>

      </div>

      {/* Interactive Sandbox purely matching the user's image content */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 space-y-4">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-3">
          <div>
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Simulación de Casos</span>
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase">
              Interactuar con los Ejemplos de la Imagen
            </h4>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPreset('syntax_error')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
                volumeInput === 'Diez metros' 
                  ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Falla Sintáctica ("Diez metros")
            </button>
            <button
              onClick={() => setPreset('semantic_error')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
                volumeInput === '150' 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Falla Semántica ("150 m³")
            </button>
            <button
              onClick={() => setPreset('valid')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border cursor-pointer ${
                volumeInput === '10' 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Registro Válido ("10 m³")
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* User Input controls */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-slate-900/30 p-3 rounded-xl border border-slate-900 space-y-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Datos del Pilote</span>
              <div className="text-[10.5px] text-slate-400">
                Volumen Geométrico Máximo: <strong className="text-slate-200 font-mono">40 m³</strong>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-mono text-slate-400 uppercase block font-bold">
                Volumen Registrado Real (m³):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={volumeInput}
                  onChange={(e) => setVolumeInput(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-amber-400 focus:outline-none focus:border-slate-700"
                  placeholder="Ej. 10 o Diez metros"
                />
              </div>
            </div>
          </div>

          {/* Validation Engine Outputs */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Syntax Validation Result */}
            <div className={`p-3 rounded-xl border transition-all ${
              isSyntaxOk 
                ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                : 'bg-red-500/5 border-red-500/10 text-red-400'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase font-bold">1. Validación Sintáctica</span>
                {isSyntaxOk ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
              <p className="text-[10.5px] text-slate-300 leading-normal font-sans">
                {isSyntaxOk ? (
                  <span>El valor es de tipo numérico. La sintaxis es correcta.</span>
                ) : (
                  <span>Falla Sintáctica: El campo requiere un formato numérico pero recibió texto ("{volumeInput}").</span>
                )}
              </p>
            </div>

            {/* Semantic Validation Result */}
            <div className={`p-3 rounded-xl border transition-all ${
              !isSyntaxOk 
                ? 'bg-slate-900/30 border-slate-900 text-slate-500' 
                : isSemanticOk 
                  ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                  : 'bg-amber-500/5 border-amber-500/10 text-amber-400'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase font-bold">2. Validación Semántica</span>
                {!isSyntaxOk ? (
                  <HelpCircle className="w-4 h-4 text-slate-600" />
                ) : isSemanticOk ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <p className="text-[10.5px] text-slate-300 leading-normal font-sans">
                {!isSyntaxOk ? (
                  <span className="italic text-slate-500">Esperando formato sintáctico correcto.</span>
                ) : isSemanticOk ? (
                  <span>Coherencia física correcta: {parseFloat(volumeInput)} m³ es viable para un diseño de 40 m³.</span>
                ) : (
                  <span>Falla Semántica: Registrar {parseFloat(volumeInput)} m³ en un pilote de máximo 40 m³ es físicamente imposible.</span>
                )}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
