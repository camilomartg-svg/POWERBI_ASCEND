import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Compass, 
  Cpu, 
  Calculator, 
  TrendingUp, 
  Clock, 
  Zap, 
  Database,
  Info,
  ChevronRight
} from 'lucide-react';

interface TheoryGeneralExplorerProps {
  slideId: string;
}

export default function TheoryGeneralExplorer({ slideId }: TheoryGeneralExplorerProps) {
  // Slide 1: Stevens Scales State
  const [selectedScale, setSelectedScale] = useState<'nominal' | 'ordinal' | 'interval' | 'ratio'>('nominal');

  // Slide 2: Additivity Aggregation State
  const [selectedAdditivity, setSelectedAdditivity] = useState<'additive' | 'non-additive' | 'rates'>('additive');

  // Slide 3: Ingestion Latency State
  const [selectedLatency, setSelectedLatency] = useState<'realtime' | 'eventual' | 'batch'>('realtime');

  // Stevens scale details
  const scaleDetails = {
    nominal: {
      title: 'Escala Nominal (Identificación)',
      subtitle: 'Clasificación cualitativa pura sin jerarquía numérica',
      desc: 'Clasifica los datos en categorías mutuamente excluyentes sin ningún orden numérico o de valor. Sirven únicamente para agrupar o filtrar en tableros analíticos.',
      math: 'Frecuencias (Moda), Conteos (COUNT/DISTINCTCOUNT). Operaciones aritméticas (SUM, AVERAGE) están prohibidas.',
      obra: [
        { label: 'Tipos de material', desc: 'Concreto, acero de refuerzo, suelo de descapote.' },
        { label: 'Roles en obra', desc: 'Ingeniero SST, Especialista Biótico, Residente.' },
        { label: 'Frentes activos', desc: 'Frente de Avance Túnel, Viaducto Pilar 3, ZODME.' }
      ],
      dax: 'COUNTROWS(VALUES(\'Materiales\'[TipoMaterial]))',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    ordinal: {
      title: 'Escala Ordinal (Orden Jerárquico)',
      subtitle: 'Clasificación con secuencia de valor pero distancias desiguales',
      desc: 'Los datos tienen un orden natural implícito que indica progresión, pero la diferencia matemática entre los valores no es constante ni medible en unidades físicas.',
      math: 'Mediana, Percentiles, Clasificación jerárquica. No es correcto promediarlos aritméticamente (ej: el promedio entre RMR I y RMR V no es RMR III).',
      obra: [
        { label: 'Severidad de Riesgo SST', desc: 'Bajo (1), Medio (2), Alto (3). El riesgo Alto es más grave, pero no "tres veces" más que el Bajo.' },
        { label: 'Clasificación del Macizo (RMR)', desc: 'Clase I (Muy Buena) a Clase V (Muy Mala). Representa la calidad geotécnica del frente.' },
        { label: 'Fases constructivas', desc: 'Excavación, Sostenimiento, Impermeabilización, Revestimiento.' }
      ],
      dax: 'CALCULATE(SELECTEDVALUE(\'Riesgos\'[Severidad]), \'Riesgos\'[Nivel] = "Alto")',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    interval: {
      title: 'Escala de Intervalo (Cero Arbitrario)',
      subtitle: 'Distancia constante entre valores con escala de referencia externa',
      desc: 'Existe un orden lógico y una distancia medible y constante entre los valores de la escala. Sin embargo, no posee un cero absoluto; el punto cero se define de forma arbitraria.',
      math: 'Sumas y restas de valores, Desviación Estándar, Promedios. No se pueden calcular razones directas (ej: 40°C no representa "el doble de energía térmica" que 20°C).',
      obra: [
        { label: 'Temperatura del Concreto', desc: 'Medido en °C (el cero es el punto de congelación del agua, no ausencia de calor energético).' },
        { label: 'Tiempo Calendario', desc: 'Fechas del proyecto (el día cero es una fecha seleccionada para el inicio del contrato).' },
        { label: 'Cotas de Nivel topográfico', desc: 'Alturas referidas al nivel del mar (el cero es un geoide arbitrario, no el centro de la tierra).' }
      ],
      dax: 'AVERAGEX(\'Vaciados\', \'Vaciados\'[TemperaturaMedida])',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    },
    ratio: {
      title: 'Escala de Razón (Cero Absoluto)',
      subtitle: 'Propiedades completas de magnitud con ausencia real de la variable',
      desc: 'Posee todas las características de la escala de intervalo y cuenta con un cero absoluto real (origen natural). El valor cero indica la ausencia total de la variable medida.',
      math: 'Cualquier operación algebraica válida: Sumas, promedios, porcentajes, razones, tasas y productos.',
      obra: [
        { label: 'Volumen de excavación', desc: 'Metros cúbicos (m³) retirados. 0 m³ significa que no se ha excavado absolutamente nada.' },
        { label: 'Presión de agua (Geotecnia)', desc: 'Kilopascales (kPa) de presión hidrostática en el macizo rocoso.' },
        { label: 'Costo contractual devengado', desc: 'Inversión acumulada en pesos o dólares. Permite cálculo de variaciones relativas.' }
      ],
      dax: 'DIVIDE(SUM(\'Costos\'[Real]), SUM(\'Costos\'[Presupuesto]))',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    }
  };

  // Additivity details
  const additivityDetails = {
    additive: {
      title: 'Variables Totalmente Aditivas (SUM)',
      concept: 'Se pueden sumar libremente a través de cualquier dimensión (tiempo, frentes, cuadrillas o materiales). Representan flujos físicos acumulables.',
      mathRule: 'Suma simple sobre el contexto de filtro.',
      examples: [
        { label: 'Metros cúbicos de concreto (m³)', val: '1,240 m³ colocados en dovelas de puente.' },
        { label: 'Toneladas de acero figurado', val: '45.8 Ton ensambladas en el pilar principal.' },
        { label: 'Horas de motor activo', val: '185 horas de excavadora consumidas esta semana.' }
      ],
      daxPattern: 'TotalAcero = SUM(\'Logistica\'[PesoAceroTon])',
      icon: Calculator,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
    },
    'non-additive': {
      title: 'Variables No Aditivas (PROMEDIOS / LÚT)',
      concept: 'Sumar estas variables carece de sentido físico. En Power BI, se deben promediar (frecuentemente de forma ponderada) o reportar como el último estado conocido.',
      mathRule: 'Promedios ponderados por volumen, o LASTDATE para ver el estado actual del activo.',
      examples: [
        { label: 'Temperatura de mezcla (°C)', val: 'Si dos camiones llegan a 32°C y 34°C, el total no es 66°C (se promedian).' },
        { label: 'Nivel de pH en PTAR', val: 'El pH del agua de lavado es logarítmico; no se puede sumar linealmente.' },
        { label: 'Índice RMR de roca', val: 'Se asume el último valor del frente para estimar el tipo de soporte activo.' }
      ],
      daxPattern: 'UltimoRMR = \nCALCULATE(\n    SELECTEDVALUE(\'Geotecnia\'[RMR_Score]),\n    LASTDATE(\'Geotecnia\'[FechaRegistro])\n)',
      icon: Scale,
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/5'
    },
    rates: {
      title: 'Variables de Tasa y Rendimiento (DIVIDE)',
      concept: 'Representan relaciones entre dos variables de razón. No se pueden promediar directamente de forma simple ya que se caería en la falacia del promedio aritmético.',
      mathRule: 'Dividir siempre la suma de los numeradores entre la suma de los denominadores para cada nivel del reporte.',
      examples: [
        { label: 'Rendimiento de Excavación (m/día)', val: 'Total metros perforados dividido por el total de jornadas reales.' },
        { label: 'Consumo específico de combustible', val: 'Galones de ACPM consumidos dividido por las horas de operación.' },
        { label: 'Frecuencia de incidentes SST', val: 'Número de accidentes reportados por cada 1,000,000 de horas hombre.' }
      ],
      daxPattern: 'RendimientoPromedio = \nDIVIDE(\n    SUM(\'Avance\'[MetrosPerforados]),\n    SUM(\'Avance\'[DiasJornada])\n)',
      icon: TrendingUp,
      color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5'
    }
  };

  // Latency details
  const latencyDetails = {
    realtime: {
      title: 'Ingesta en Tiempo Real (Latencia de Segundos)',
      method: 'Dataloggers automáticos transmitiendo ráfagas de telemetría mediante redes locales de obra (LoRaWAN / 4G).',
      useCase: 'Sensores de convergencia estructural dentro de túneles o piezómetros de taludes. Vital para evacuación preventiva.',
      impact: 'Alimentación de sistemas de alerta temprana activa en el portal de obra.',
      latency: '1 - 5 segundos',
      icon: Zap,
      border: 'border-blue-500/30 text-blue-400 bg-blue-500/5'
    },
    eventual: {
      title: 'Ingesta Transaccional (Latencia de Minutos / Horas)',
      method: 'Eventos generados por actividades logísticas discretas e integrados a bases de datos en cuanto ocurre la acción.',
      useCase: 'Tiquetes de pesaje de volquetas en báscula del ZODME, telemetría de maquinaria y recibos de mixers de concreto.',
      impact: 'Control financiero instantáneo de acarreos y colocación real de materiales frente a presupuestos.',
      latency: '5 - 30 minutos',
      icon: Database,
      border: 'border-amber-500/30 text-amber-400 bg-amber-500/5'
    },
    batch: {
      title: 'Ingesta por Lote o Diaria (Latencia de 12 - 24 Horas)',
      method: 'Carga manual de planillas, digitalización de bitácoras de campo y reportes de laboratorios externos.',
      useCase: 'Bitácora del residente de obra, censos de fauna forestal, ensayos a compresión uniaxial de concreto a 28 días.',
      impact: 'Análisis de tendencias semanales, reconciliaciones contractuales e informes gerenciales.',
      latency: '12 - 24 horas',
      icon: Clock,
      border: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
    }
  };

  return (
    <div className="w-full">
      
      {/* ---------------- SLIDE 1: ESCALAS DE MEDICIÓN (STEVENS) ---------------- */}
      {slideId === 'theory-stevens-scales' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* STEVENS INTERACTIVE SELECTOR */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    TEORÍA DE STEVENS EN ANALÍTICA BIM
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono font-bold uppercase">
                  FRENTE 1: TEORÍA DE DATOS
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                La naturaleza científica del dato condiciona el modelado en Power BI. Seleccione una de las <strong>cuatro escalas de Stevens</strong> para analizar sus propiedades matemáticas, tratamiento analítico y ejemplos en una obra vial.
              </p>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {(['nominal', 'ordinal', 'interval', 'ratio'] as const).map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setSelectedScale(scale)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedScale === scale
                        ? 'bg-blue-500/10 border-blue-500/30 shadow-lg text-slate-100'
                        : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-[8px] font-mono uppercase block font-semibold text-slate-500 mb-0.5">Escala</span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-tight block">
                      {scale === 'nominal' ? 'Nominal' :
                       scale === 'ordinal' ? 'Ordinal' :
                       scale === 'interval' ? 'Intervalo' : 'Razón'}
                    </span>
                  </button>
                ))}
              </div>

              {/* Dynamic Information Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScale}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  <div className={`p-3 rounded-xl border ${scaleDetails[selectedScale].badgeColor}`}>
                    <h3 className="text-xs font-mono font-bold uppercase">{scaleDetails[selectedScale].title}</h3>
                    <p className="text-[9px] font-mono text-slate-400 mt-0.5">{scaleDetails[selectedScale].subtitle}</p>
                    <p className="text-[11px] leading-relaxed text-slate-300 font-sans mt-2">{scaleDetails[selectedScale].desc}</p>
                  </div>

                  <div>
                    <h4 className="text-[9px] font-mono text-slate-500 uppercase font-bold mb-1.5">EJEMPLOS PRÁCTICOS EN OBRA</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {scaleDetails[selectedScale].obra.map((item, idx) => (
                        <div key={idx} className="bg-slate-950 p-2 border border-slate-900 rounded-xl text-[10px]">
                          <span className="font-mono text-slate-200 font-bold block">{item.label}</span>
                          <span className="text-slate-400 mt-0.5 block leading-normal font-sans">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Regla de Oro Stevens:</strong> De la escala depende la operación estadística básica permisible. Power BI no impide sumar el RMR o sacar el promedio de placas de volquetas, pero cometerías un grave error conceptual científico.
            </div>
          </div>

          {/* RIGHT SIDE DETAILS: DAX CONSTRAINTS & OPERATIONS */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <Calculator className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Tratamiento en Power BI (DAX)
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
                Cómo se modela y opera cada variable según su escala de medición para evitar reportes falsos.
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedScale}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-[11px]"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Operaciones Permitidas</span>
                    <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl font-mono text-slate-300 leading-relaxed text-[10px]">
                      {scaleDetails[selectedScale].math}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Ejemplo de Medida DAX Recomendada</span>
                    <pre className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl text-blue-400 font-mono text-[9px] overflow-x-auto whitespace-pre">
                      {scaleDetails[selectedScale].dax}
                    </pre>
                  </div>

                  <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 text-[10px] font-sans leading-relaxed text-slate-400 flex gap-2">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Cuidado con los promedios:</strong> El promedio de una variable {selectedScale === 'nominal' || selectedScale === 'ordinal' ? 'no numérica o de orden no es representativo' : 'requiere validar físicamente si representa una magnitud lineal constante'}.
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              Estructura tu modelo relacional de forma limpia para que los filtros fluyan correctamente entre dimensiones y hechos.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SLIDE 2: LEYES DE ADITIVIDAD EN TABLEROS DE OBRA ---------------- */}
      {slideId === 'theory-additivity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ADDITIVITY RULES */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Comportamiento Aditivo en Ingeniería
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-mono font-bold uppercase">
                  FRENTE 1: TEORÍA DE DATOS
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                No todas las mediciones de obra se agregan igual en Power BI. El comportamiento físico de las variables define qué funciones de agregación empleamos. Seleccione una categoría:
              </p>

              {/* Row Selectors */}
              <div className="space-y-2 mb-4">
                {(['additive', 'non-additive', 'rates'] as const).map((type) => {
                  const IconComp = additivityDetails[type].icon;
                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedAdditivity(type)}
                      className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        selectedAdditivity === type
                          ? 'bg-amber-500/10 border-amber-500/30 text-slate-100 shadow-md'
                          : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:bg-slate-900/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-mono font-bold uppercase tracking-tight">{additivityDetails[type].title}</p>
                          <p className="text-[9px] font-mono text-slate-400 mt-0.5 leading-none">{additivityDetails[type].mathRule}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </button>
                  );
                })}
              </div>

              {/* Details Pane */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedAdditivity}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-2 text-[11px] font-sans"
                >
                  <p className="font-semibold text-slate-300">Resumen Teórico:</p>
                  <p className="text-slate-400 leading-relaxed text-[10px]">{additivityDetails[selectedAdditivity].concept}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Sugerencia de Diseño:</strong> Cree tablas de medidas segregadas en Power BI para que el usuario distinga de inmediato las sumatorias directas de los promedios técnicos calculados.
            </div>
          </div>

          {/* EJEMPLOS CONCRETOS EN INFRAESTRUCTURA */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Ejemplos Reales & DAX
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
                Instanciación de la variable elegida y su fórmula DAX correspondiente para evitar cálculos erróneos.
              </p>

              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block mb-1.5">Variables de Obra</span>
                  <div className="space-y-2">
                    {additivityDetails[selectedAdditivity].examples.map((ex, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl text-[10px] font-sans">
                        <span className="font-mono text-slate-200 font-bold block">{ex.label}</span>
                        <span className="text-slate-400 mt-0.5 block leading-normal">{ex.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Fórmula de Medida DAX</span>
                  <pre className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl text-amber-400 font-mono text-[9px] overflow-x-auto whitespace-pre">
                    {additivityDetails[selectedAdditivity].daxPattern}
                  </pre>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              La correcta aplicación de estos comportamientos garantiza que el tablero sea matemáticamente consistente a cualquier nivel de jerarquía.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SLIDE 3: MECANISMOS DE INGESTA Y LATENCIA ---------------- */}
      {slideId === 'theory-latency-mechanisms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* INGESTION & LATENCY */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Mecanismos de Extracción y Latencia
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold uppercase">
                  FRENTE 1: TEORÍA DE DATOS
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                La frecuencia de actualización del tablero de control (latencia) debe coincidir con la velocidad de toma de decisiones físicas. Diseñar un reporte de tiempo real para datos semanales es costoso e ineficiente. Seleccione un tipo:
              </p>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {(['realtime', 'eventual', 'batch'] as const).map((latency) => {
                  const IconComp = latencyDetails[latency].icon;
                  return (
                    <button
                      key={latency}
                      onClick={() => setSelectedLatency(latency)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        selectedLatency === latency
                          ? 'bg-emerald-500/10 border-emerald-500/30 shadow-lg text-slate-100'
                          : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <IconComp className="w-4 h-4 text-emerald-400" />
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-900">
                          {latencyDetails[latency].latency}
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-tight block">
                          {latency === 'realtime' ? 'Tiempo Real' :
                           latency === 'eventual' ? 'Transaccional' : 'Por Lote / Diaria'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Information Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLatency}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className={`p-3 rounded-xl border ${latencyDetails[selectedLatency].border}`}>
                    <h3 className="text-xs font-mono font-bold uppercase">{latencyDetails[selectedLatency].title}</h3>
                    <p className="text-[10px] leading-relaxed text-slate-300 font-sans mt-2">{latencyDetails[selectedLatency].method}</p>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block mb-1">Impacto en Obra</span>
                    <p className="text-[10px] leading-normal text-slate-400 font-sans">{latencyDetails[selectedLatency].impact}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Regla del Negocio:</strong> Elija la latencia mínima que satisfaga el proceso. Las decisiones de programación de obra ocurren cada 24 horas; los reportes ambientales pueden procesarse semanalmente.
            </div>
          </div>

          {/* EJEMPLOS Y ARQUITECTURA DE DATOS */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Casos de Uso en Ingeniería
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
                Ejemplo específico de aplicación del mecanismo de extracción seleccionado.
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLatency}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 text-[11px]"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Aplicación Concreta</span>
                    <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl text-slate-300 leading-relaxed text-[10px] font-sans">
                      {latencyDetails[selectedLatency].useCase}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-[10px] font-sans leading-relaxed text-slate-400 flex gap-2">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Gobernanza del CDE:</strong> Los datos de {selectedLatency === 'realtime' ? 'los sensores se vierten como series temporales crudas directas' : selectedLatency === 'eventual' ? 'báscula y logística viajan automáticamente al servidor SQL de obra' : 'bitácoras manuales requieren aprobación del interventor para asegurar veracidad'}.
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              Entiende los cuellos de botella de tu canalización (pipeline) para proponer soluciones de visualización correctas y ágiles.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
