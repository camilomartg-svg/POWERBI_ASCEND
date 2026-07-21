import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, 
  Settings, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  Sliders, 
  Database, 
  FileText, 
  Share2, 
  Download,
  Flame,
  Layers,
  Award,
  ChevronDown,
  Info
} from 'lucide-react';
import { PresentationSettings } from './types';
import SlidePresenter from './components/SlidePresenter';

const DEFAULT_SETTINGS: PresentationSettings = {
  courseName: "Power BI aplicado a Metodología BIM",
  instructorName: "Ing. de Datos BIM",
  institution: "Imagina3D Design & Engineering School",
  dikwData: {
    data: {
      label: "Dato (Crudo)",
      value: "39",
      desc: "Hechos crudos, objetivos, símbolos discretos o registros de eventos sin contexto ni interpretación (por ejemplo: el número 39)."
    },
    information: {
      label: "Información (Estructurada)",
      value: "Sensor S-104 = 39.0 °C",
      desc: "Datos procesados, organizados o estructurados que adquieren un propósito. Responden al ¿qué?, ¿quién? o ¿cuándo? (por ejemplo: \"La temperatura de la losa es de 39°C\")."
    },
    knowledge: {
      label: "Conocimiento (Análisis)",
      value: "Curado térmico crítico (>38°C)",
      desc: "Aplicación de la información combinada con la experiencia, el contexto y la reflexión. Responde al ¿cómo? (por ejemplo: \"A los 39°C, el proceso de curado del concreto se está acelerando demasiado y puede fisurarse\")."
    },
    wisdom: {
      label: "Sabiduría (Decisión)",
      value: "Vaciado Nocturno + Aditivos",
      desc: "Nivel superior; implica evaluar el conocimiento para tomar decisiones estratégicas basadas en el juicio ético o sistémico (por ejemplo: \"Debemos modificar la mezcla o el horario de vaciado en los próximos proyectos para evitar fallas estructurales\")."
    }
  }
};

export default function App() {
  const [settings, setSettings] = useState<PresentationSettings>(DEFAULT_SETTINGS);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isPresenting, setIsPresenting] = useState<boolean>(false);

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col justify-between relative overflow-x-hidden bg-tech-dots">
      
      {/* GLOWING AMBIENT TECH BACKGROUNDS */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* GLOBAL NAVBAR */}
      {!isPresenting && (
        <header className="px-6 py-4 border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <img 
                  src="https://i.postimg.cc/dVHkY36j/logo-ascend-dark.png" 
                  alt="Ascend" 
                  className="h-8 w-auto object-contain" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase font-mono tracking-[0.2em] font-extrabold text-blue-400">
                    Guía de Consulta
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h1 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Visualización de Datos & Modelado 3D
                </h1>
              </div>
            </div>

            {/* Slicers & Settings Toggles */}
            <div className="flex items-center gap-2">
              <button
                id="share-class-btn"
                onClick={handleCopyShare}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase flex items-center gap-2 border border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{copiedLink ? '¡Enlace Copiado!' : 'Compartir Recurso'}</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MAIN LAYOUT CANVAS CONTAINER */}
      <main className={`flex-1 flex flex-col justify-center relative ${isPresenting ? 'z-50 p-0 m-0 w-full max-w-none' : 'max-w-7xl w-full mx-auto px-6 py-6 z-10'}`}>
        <SlidePresenter 
          settings={settings} 
          onUpdateSettings={setSettings} 
          isPresenting={isPresenting}
          onTogglePresenting={setIsPresenting}
        />
      </main>

      {/* FOOTER METADATA */}
      {!isPresenting && (
        <footer className="px-6 py-4 border-t border-slate-900 bg-slate-950 text-center text-slate-600 text-xs font-mono relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] tracking-wider text-slate-500">
              <span className="text-slate-400">METODOLOGÍA VDC</span>
              <span className="text-slate-800">•</span>
              <span className="text-slate-400">INTEROPERABILIDAD IFC</span>
              <span className="text-slate-800">•</span>
              <span className="text-slate-400">POWER BI ENGINE</span>
            </div>
            <div className="text-[10px] text-slate-500 tracking-wide uppercase">
              © 2026 {settings.courseName} — {settings.institution}
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
