import React from 'react';
import { motion } from 'motion/react';
import { Globe, Sparkles, Link2 } from 'lucide-react';

export default function DataInteroperability() {
  return (
    <div className="flex items-center justify-center min-h-[350px] w-full px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-2xl bg-slate-950/55 border border-slate-900 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-sm"
      >
        {/* Subtle decorative background light */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />

        {/* Header Category Tag */}
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase font-bold tracking-widest inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>Estándares y Conectividad</span>
          </span>
        </div>

        {/* Title */}
        <div className="text-center space-y-1.5">
          <h2 className="text-xl md:text-2xl font-black uppercase font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-200 to-slate-400">
            Interoperabilidad y Metadatos
          </h2>
          <div className="h-[2px] w-12 bg-blue-500/30 mx-auto rounded-full" />
        </div>

        {/* Main Definition Text */}
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans text-center max-w-xl mx-auto">
          Para que la teoría se traduzca en sistemas eficientes, los datos deben hablar el mismo idioma. Aquí entran los <strong className="text-blue-400 font-semibold font-mono">metadatos</strong> (los "datos sobre los datos", que describen su origen, propiedad y formato) y los <strong className="text-indigo-400 font-semibold font-mono">estándares de interoperabilidad</strong>, que garantizan que diferentes plataformas puedan intercambiar y entender la información sin pérdida de significado.
        </p>

        {/* Fundamental Principle Box */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="p-4 md:p-5 bg-gradient-to-br from-slate-950 to-slate-900/90 border border-slate-900/80 rounded-2xl relative overflow-hidden group shadow-inner"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-500" />
          <div className="flex gap-3 items-start">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-0.5 shrink-0">
              <Link2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-extrabold text-blue-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
                <span>Principio Fundamental de la Teoría</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium italic">
                "El valor latente de un dato no reside en su almacenamiento aislado, sino en su capacidad para ser conectado, interpretado y transformado en una acción precisa en el momento oportuno."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Evaluation/Pedagogic Footer */}
        <div className="text-center text-[9px] font-mono text-slate-500 uppercase tracking-wider pt-2 border-t border-slate-950">
          Fundamento Académico del Ecosistema de Información
        </div>
      </motion.div>
    </div>
  );
}
