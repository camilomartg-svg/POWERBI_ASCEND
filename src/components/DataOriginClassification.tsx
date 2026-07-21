import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Cpu, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ClipboardList,
  Scan,
  Radio,
  Mic,
  Lightbulb,
  User,
  Sparkles
} from 'lucide-react';

export default function DataOriginClassification() {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('manual');

  const originTypes = [
    {
      id: 'manual',
      title: '1. Manual / Analógica',
      badge: 'Físico / Papel',
      icon: ClipboardList,
      borderClass: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
      activeBorder: 'border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      principle: 'Un humano observa y escribe físicamente (hoja, bitácora).',
      characteristics: [
        'Registro físico en papel o libreta de campo',
        'Requiere re-digitación posterior para su análisis analítico',
        'Alta latencia entre la captura en obra y su disponibilidad en el tablero',
        'Riesgo elevado de errores de transcripción, ilegibilidad o extravío'
      ],
      examples: 'Libretas de campo, planillas físicas de inspección, bitácoras en libreta, formatos impresos de toma de muestras de concreto.'
    },
    {
      id: 'digital',
      title: '2. Digital Directa',
      badge: 'Formulario App',
      icon: Smartphone,
      borderClass: 'border-sky-500/30 bg-sky-500/5 text-sky-400',
      activeBorder: 'border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(14,165,233,0.15)]',
      principle: 'Un humano observa y digita directamente en un medio digital (app, formulario).',
      characteristics: [
        'Ingreso directo en tablets o dispositivos móviles en sitio de obra',
        'Validación inmediata de formato, rangos y campos obligatorios',
        'Sincronización directa o por lote a bases de datos en la nube',
        'Elimina el proceso de digitación secundaria'
      ],
      examples: 'Apps de inspección SST, formularios en KoboToolbox / Power Apps, registro de avance diario en aplicación móvil.'
    },
    {
      id: 'instrumental',
      title: '3. Instrumental Directa',
      badge: 'Sensor / Telemetría',
      icon: Cpu,
      borderClass: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
      activeBorder: 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      principle: 'Un equipo o herramienta mide una variable física y entrega la cifra directamente.',
      characteristics: [
        'Sin intermediación humana en el cálculo o lectura de la cifra',
        'Alta precisión física y trazabilidad metrológica',
        'Apta para ingesta continua de alta frecuencia (IoT / Telemetría)',
        'Cero riesgo de alteración o error de transcripción'
      ],
      examples: 'Multímetros digitales, sensores de madurez de concreto, cintas métricas Bluetooth, piezómetros automáticos, estaciones totales.'
    },
    {
      id: 'indirecta',
      title: '4. Indirecta por Derivación',
      badge: 'Visión / Escaneo 3D',
      icon: Scan,
      borderClass: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
      activeBorder: 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]',
      principle: 'No se captura el dato puntual directamente, sino que se captura el entorno completo en masa (píxeles, puntos 3D) y un algoritmo o software deriva el dato específico a posteriori.',
      characteristics: [
        'Captura masiva espacial o fotográfica del entorno físico',
        'Cálculo derivado mediante fotogrametría, nubes de puntos o Inteligencia Artificial',
        'Permite auditoría retrospectiva de geometrías, áreas y volúmenes',
        'Independencia de la toma de muestras manuales individuales'
      ],
      examples: 'Escaneo Láser LiDAR 3D, fotogrametría con Drones para cálculo de volumen en ZODME, imágenes para deducción de medida, área o volumen de muro.'
    },
    {
      id: 'eventual',
      title: '5. Eventual / Transaccional',
      badge: 'Inferencia por Evento',
      icon: Radio,
      borderClass: 'border-rose-500/30 bg-rose-500/5 text-rose-400',
      activeBorder: 'border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]',
      principle: 'El dato no se mide ni se escribe; se deduce porque ocurrió un evento operativo o de control.',
      characteristics: [
        'Inferencia automática basada en reglas de negocio y eventos físicos',
        'Generación de datos sin carga operativa adicional para el personal',
        'Integración con sistemas de control de acceso, básculas y portales RFID',
        'Trazabilidad precisa de logística y tiempos de ciclo de insumos'
      ],
      examples: 'Pasar un tag RFID por un lector en portería o el pesaje automático de un camión. El dato "Llegaron 10t de acero a la Zona A" se deduce automáticamente al cumplirse la transacción.'
    },
    {
      id: 'conversacional',
      title: '6. Conversacional / Natural',
      badge: 'Voice-to-Data / Hands-Free',
      icon: Mic,
      borderClass: 'border-teal-500/30 bg-teal-500/5 text-teal-400',
      activeBorder: 'border-teal-500 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.15)]',
      principle: 'Un humano genera la información mediante lenguaje natural (voz) y un sistema procesa el flujo continuo para estructurarlo en datos discretos.',
      characteristics: [
        'Operación totalmente manos libres (Hands-Free) idónea para inspecciones en marcha',
        'Procesamiento por Inteligencia Artificial (Speech-to-Text + extracción de entidades)',
        'Estructuración en tiempo real a partir de narrativa libre del especialista',
        'Mayor riqueza contextual y rapidez de reporte'
      ],
      examples: 'El inspector habla mientras camina ("Muro del eje 4 presenta fisura vertical") y el sistema LLM/NLP crea automáticamente el registro estructurado de la hallazgo sin pantalla ni papel.'
    }
  ];

  const currentData = originTypes.find(o => o.id === selectedOrigin)!;

  return (
    <div className="w-full space-y-6">
      
      {/* 1. Header */}
      <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Tipología Universal de Captura de Datos en Obra
          </h3>
        </div>
        
        <h2 className="text-base font-sans font-medium text-slate-100 tracking-tight">
          Clasificación Completa de los Orígenes de Datos
        </h2>
        
        <p className="text-[11.5px] text-slate-400 leading-relaxed font-sans">
          La naturaleza del origen determina la confiabilidad, la latencia de ingestión y la necesidad de procesos de limpieza antes de incorporar la información al modelo analítico de Power BI.
        </p>
      </div>

      {/* 2. Six Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {originTypes.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedOrigin === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedOrigin(item.id)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected 
                  ? item.activeBorder 
                  : 'border-slate-900 bg-slate-950/60 hover:bg-slate-900/40 hover:border-slate-800'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg border ${item.borderClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded-full border ${item.borderClass}`}>
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-100">{item.title}</h3>
                  <p className="text-[10.5px] text-slate-400 font-sans mt-1 leading-snug line-clamp-2">
                    {item.principle}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-900/80 flex items-center justify-between text-[9.5px] font-mono text-slate-500">
                <span>{isSelected ? 'Seleccionado ✓' : 'Examinar'}</span>
                <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-1 text-slate-200' : 'text-slate-600'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Detailed Breakdown View for Selected Category */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedOrigin}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-950 border border-slate-900 rounded-2xl p-5 relative overflow-hidden space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg border ${currentData.borderClass}`}>
                <currentData.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">Principio Funcional</span>
                <h4 className="text-xs font-mono font-bold text-slate-100">{currentData.title}</h4>
              </div>
            </div>
            
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              Categoría: <strong className="text-slate-200">{currentData.badge}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Principle & Characteristics */}
            <div className="space-y-2.5">
              <h5 className="text-[9.5px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                El Principio
              </h5>
              
              <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl text-xs text-slate-200 font-sans leading-relaxed">
                "{currentData.principle}"
              </div>

              <h5 className="text-[9.5px] font-mono uppercase font-bold text-slate-400 tracking-wider pt-1">
                Características Clave
              </h5>

              <div className="space-y-1.5">
                {currentData.characteristics.map((char, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{char}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Examples & Integration */}
            <div className="space-y-2.5">
              <h5 className="text-[9.5px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                Ejemplo Ilustrativo en Obra
              </h5>

              <div className="p-3 bg-slate-900/30 border border-slate-900 rounded-xl space-y-2">
                <div className="text-[11px] text-slate-300 font-mono leading-relaxed">
                  {currentData.examples}
                </div>
              </div>

              <div className="p-3 bg-blue-950/20 border border-blue-900/30 rounded-xl flex items-start gap-2.5 text-[10.5px] text-slate-300 font-sans leading-normal">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Integración Analítica:</strong> Identificar con precisión el tipo de captura permite diseñar la canalización de ingesta adecuada (ETL, API, IoT o procesamiento NLP) en el modelo de datos.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. Tip a Recordar Card */}
      <div className="bg-gradient-to-r from-amber-950/30 via-slate-950 to-blue-950/30 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
            💡 Tip a Recordar
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11.5px] font-sans leading-relaxed">
          <div className="p-3.5 bg-slate-900/70 border border-amber-500/20 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold text-xs">
              <User className="w-3.5 h-3.5" />
              <span>Si lo genera un humano:</span>
            </div>
            <p className="text-slate-300">
              Siempre hay un <strong>sesgo de percepción</strong>, <strong>fricción operativa</strong> (quitarse los guantes, detener la tarea) y <strong>riesgo de falsificación o error de digitación</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-900/70 border border-blue-500/20 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-blue-400 font-mono font-bold text-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>Si lo capta un sistema:</span>
            </div>
            <p className="text-slate-300">
              La <strong>fricción en campo es cero</strong>, pero el reto se desplaza a la <strong>infraestructura</strong>, <strong>calibración de hardware</strong> y <strong>costo inicial</strong>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
