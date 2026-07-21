import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Tv, 
  FileText, 
  Presentation, 
  Compass, 
  MessageSquare, 
  Layers, 
  LayoutDashboard, 
  Database,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { PresentationSettings } from '../types';
import DIKWSimulator from './DIKWSimulator';
import BIMViewer from './BIMViewer';
import BIMDashboard from './BIMDashboard';
import DataTypology from './DataTypology';
import DataDynamics from './DataDynamics';
import DataGovernance from './DataGovernance';
import DataInteroperability from './DataInteroperability';
import DataPipeline from './DataPipeline';
import DataDax from './DataDax';
import FieldDataExplorer from './FieldDataExplorer';
import TheoryGeneralExplorer from './TheoryGeneralExplorer';
import DataSpaceTemporal from './DataSpaceTemporal';
import DataEtlParadigms from './DataEtlParadigms';
import DataValidationSimulator from './DataValidationSimulator';
import DataSemanticInteroperability from './DataSemanticInteroperability';
import DataSchemaNormalization from './DataSchemaNormalization';
import DataOriginClassification from './DataOriginClassification';

interface SlidePresenterProps {
  settings: PresentationSettings;
  onUpdateSettings: (settings: PresentationSettings) => void;
  isPresenting?: boolean;
  onTogglePresenting?: (presenting: boolean) => void;
}

export default function SlidePresenter({ 
  settings, 
  onUpdateSettings,
  isPresenting: propIsPresenting,
  onTogglePresenting
}: SlidePresenterProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [localIsPresenting, setLocalIsPresenting] = useState<boolean>(false);
  const [showPresenterNotes, setShowPresenterNotes] = useState<boolean>(true);

  const isPresenting = propIsPresenting !== undefined ? propIsPresenting : localIsPresenting;

  const setIsPresenting = (value: boolean) => {
    if (onTogglePresenting) {
      onTogglePresenting(value);
    } else {
      setLocalIsPresenting(value);
    }
  };

  const slides = [
    {
      id: 'slide-dikw',
      title: 'El Continuo DIKW aplicado a BIM',
      subtitle: 'La metamorfosis del dato en la ingeniería y construcción digital',
      category: 'Fundamento Teórico',
      notes: [
        'Análisis del Dato: Los hechos aislados y objetivos (ej: "39") carecen de valor o utilidad práctica si no cuentan con un marco contextualizado.',
        'Extracción de Información: Se obtiene cuando vinculamos ese dato a un sensor identificado ("S-104"), un elemento constructivo y propiedades dentro de Revit.',
        'Asimilación del Conocimiento: Conecta la información con reglas de ingeniería y normas técnicas (ej: el concreto entra en riesgo de agrietamiento a más de 38°C debido al calor de hidratación).',
        'Aplicación de la Sabiduría: Toma de decisiones estratégicas críticas fundamentadas, como reprogramar el vaciado de losas a horario nocturno para mitigar fisuras en el activo.'
      ]
    },
    {
      id: 'slide-typology',
      title: 'Tipología y Estructura de los Datos',
      subtitle: 'Clasificación analítica de la información en ingeniería y sistemas',
      category: 'Fundamento Teórico',
      notes: [
        'Estructuración del Proyecto: Los datos de un proyecto se clasifican en tres niveles organizativos para determinar la facilidad de su ingesta en Power BI.',
        'Datos Estructurados: Tablas relacionales limpias (filas y columnas bien definidas) directamente legibles mediante sentencias SQL o vistas tabulares.',
        'Datos Semiestructurados: Archivos con etiquetas de relación anidadas (como JSON, XML o el estándar IFC), que requieren mapeo o parseo pero garantizan consistencia.',
        'Datos No Estructurados: Planos PDF escaneados, grabaciones de video de obra o minutas de audio. Representan más del 80% de la información del proyecto y exigen procesamiento (OCR/IA).'
      ]
    },
    {
      id: 'slide-dynamics',
      title: 'Las Características Dinámicas (Las "V" del Dato)',
      subtitle: 'Dimensiones teóricas aplicadas a los ecosistemas de datos modernos',
      category: 'Fundamento Teórico',
      notes: [
        'Volumen: La escala o cantidad de datos generados en un activo digital (ej. nubes de puntos de millones de coordenadas espaciales).',
        'Velocidad: El ritmo al que se crean, procesan y analizan (pasando de informes manuales en PDF a flujos diarios o telemetría IoT en tiempo real).',
        'Variedad: La diversidad de formatos integrados en VDC: estructurados (bases de datos), semiestructurados (IFC, JSON) y no estructurados (videos, PDF).',
        'Veracidad: Confianza, limpieza y calidad de la información para evitar el principio GIGO ("Garbage In, Garbage Out") mediante auditorías en Power Query.',
        'Valor: La utilidad práctica y el impacto estratégico que aporta al negocio o a la investigación, mitigando sobrecostos críticos en obra física.'
      ]
    },
    {
      id: 'slide-governance',
      title: 'Arquitectura, Ciclo de Vida y Gobernanza del Dato',
      subtitle: 'El comportamiento dinámico y controlado del dato en sistemas técnicos',
      category: 'Fundamento Teórico',
      notes: [
        'Captura/Generación: Origen del dato mediante sensores en sitio, modelado 3D o integraciones automáticas.',
        'Almacenamiento y Procesamiento: Consolidación y ETL para limpiar metadatos anidados en el Entorno Común de Datos.',
        'Análisis/Consumo: Explotación y democratización mediante reportes e indicadores clave en Power BI.',
        'Preservación o Destrucción: Resguardo final bajo norma ISO 19650 para Facility Management o eliminación definitiva.'
      ]
    },
    {
      id: 'slide-interoperability',
      title: 'Interoperabilidad y Metadatos',
      subtitle: 'La clave para que diferentes plataformas intercambien información sin pérdida de significado',
      category: 'Fundamento Teórico',
      notes: [
        'Metadatos: Son los "datos sobre los datos", que describen detalladamente el origen, la propiedad, el formato y el significado semántico de la información.',
        'Estándares de Interoperabilidad: Formatos abiertos y comunes como IFC que garantizan el flujo de datos libre de barreras propietarias entre plataformas.',
        'Principio Fundamental de la Teoría: El valor latente de un dato no reside en su almacenamiento aislado, sino en su capacidad para ser conectado, interpretado y transformado en una acción precisa.'
      ]
    },
    {
      id: 'theory-stevens-scales',
      title: 'Las Escalas de Medición (Teoría de Stevens)',
      subtitle: 'La naturaleza matemática de las variables medidas en obra',
      category: 'Teoría General',
      notes: [
        'Escala Nominal (Identificación): Clasifica los datos en categorías mutuamente excluyentes sin ningún orden numérico. Sirven únicamente para agrupar o filtrar en tableros relacionales.',
        'Escala Ordinal (Orden jerárquico): Datos con orden natural, pero distancias matemáticas no constantes o no medibles. Útiles para prioridades o secuencias (ej. severidad de riesgo SST, calidad de macizo RMR).',
        'Escala de Intervalo (Distancia medible sin cero absoluto): Existe un orden y distancia constante entre valores, pero el cero es de referencia arbitraria (ej. temperatura de mezcla del concreto, tiempo calendario).',
        'Escala de Razón (Cero absoluto real): Poseen un cero verdadero de origen natural que indica ausencia total de la variable física. Permite sumas, promedios, porcentajes y tasas (ej. metros cúbicos de excavación, presión de agua, costo real).'
      ]
    },
    {
      id: 'theory-space-temporal',
      title: 'Dimensionalidad Espacio-Temporal: El Dato Vectorial',
      subtitle: 'La indexación bivariada de la información en proyectos de infraestructura lineal',
      category: 'Teoría General',
      notes: [
        'Dimensión Espacio-Temporal: En infraestructura, los datos están indexados por dos variables continuas fundamentales: Espacio (S) y Tiempo (T).',
        'La Variable Espacio (S): En edificación, el espacio es discreto (Piso 1, Piso 2). En vías, el espacio es continuo e indexado por un alineamiento (X, Y, Z → Abscisa).',
        'La Variable Tiempo (T): Representa el momento de la captura (timestamp/fecha) en el que se registra un evento.',
        'El Concepto de Coexistencia Espacio-Temporal: Para cruzar datos de SST, geología y rendimiento, el sistema mapea cada registro a un vector [S, T].',
        'Si dos datos ocurren en la misma ventana de tiempo (T) y rango de abscisa (S), conceptualmente están vinculados, aunque provengan de disciplinas totalmente diferentes.'
      ]
    },
    {
      id: 'theory-etl-paradigms',
      title: '3. Paradigmas de Flujos de Extracción (ETL)',
      subtitle: 'Push (Empuje) vs Pull (Extracción bajo demanda) de la información',
      category: 'Teoría General',
      notes: [
        'Concepto de Extracción: Conceptualmente, extraer no es "copiar". Es el proceso de mover datos desde sistemas operativos (orígenes) hacia sistemas analíticos (destinos).',
        'Paradigma Push (Empuje): El sistema de origen envía el dato activamente cuando ocurre un evento (ej. un sensor de gas en el túnel envía una alerta de inmediato). Es ideal para datos críticos en tiempo real.',
        'Paradigma Pull (Extracción bajo demanda): El sistema analítico consulta y "jala" los datos acumulados en intervalos programados (ej. Power BI lee los reportes de excavación acumulados al final del día).'
      ]
    },
    {
      id: 'theory-validation-quality',
      title: 'Validación Sintáctica vs. Validación Semántica',
      subtitle: 'Calidad del Dato: La forma física frente al significado lógico de negocio',
      category: 'Teoría General',
      notes: [
        'Validación Sintáctica (La Forma): Evalúa si el dato cumple con el formato técnico estructurado que requiere la base de datos (ej. ¿El dato es del tipo correcto? ¿Tiene caracteres prohibidos?). Falla sintáctica: Que un campo de cantidad numérica contenga texto (ej. escribir "Diez metros" en lugar de 10).',
        'Validación Semántica (El Significado y Contexto): Evalúa si el dato es coherente con las leyes del negocio y del mundo físico, incluso si su sintaxis es perfecta (ej. ¿Tiene sentido este dato en la realidad del proyecto?). Falla semántica: Registrar que se fundieron 150 m³ de concreto en un pilote cuyo volumen geométrico de diseño es de máximo 40 m³. La sintaxis es correcta (es un número), pero la semántica es físicamente imposible.'
      ]
    },
    {
      id: 'theory-semantic-interoperability',
      title: '2. El Concepto de Interoperabilidad Semántica (Gobernanza)',
      subtitle: 'La solución ontológica contra la desconexión lingüística entre disciplinas',
      category: 'Teoría General',
      notes: [
        'El Silo de Datos: Ocurre cuando el geólogo llama a un tramo "Zona de Falla KM 4", el de presupuesto lo llama "Actividad de Excavación Subterránea Sector A", y el modelo BIM lo etiqueta como "Túnel 1 Cuerpo Central".',
        'La Solución Conceptual (Mapeo Ontológico): Consiste en establecer un diccionario maestro de entidades (o taxonomía). El proceso de limpieza teórica consiste en mapear los términos locales de cada profesional a este estándar unificado antes de cargarlos al modelo de datos.'
      ]
    },
    {
      id: 'theory-schema-normalization',
      title: '3. Normalización de Esquemas: De Matrices a Tablas Relacionales',
      subtitle: 'La transformación conceptual de datos de lectura humana a lectura de máquina',
      category: 'Teoría General',
      notes: [
        'Esquema Desnormalizado (Lectura Humana): Columnas anchas que mezclan dimensiones y hechos (ej. una columna para cada día de la semana mostrando los rendimientos). Esto dificulta el filtrado y el cálculo dinámico.',
        'Primera Forma Normal (1NF - Lectura de Máquina): Cada columna contiene un único tipo de dato, no hay grupos repetitivos, y cada fila representa una transacción o evento único y atómico. El proceso conceptual de limpieza transforma las estructuras anchas en estructuras "altas y delgadas" donde el tiempo se convierte en una sola dimensión vertical.'
      ]
    },
    {
      id: 'theory-origin-classification',
      title: 'Clasificación de los Orígenes de Datos',
      subtitle: 'Captura y registro del dato en origen según la intervención humana e instrumental',
      category: 'Teoría General',
      notes: [
        'Manual / Analógica: Un humano observa y escribe físicamente (hoja, bitácora).',
        'Digital Directa: Un humano observa y digita directamente en un medio digital (app, formulario).',
        'Instrumental Directa: Un equipo o herramienta mide una variable física y entrega la cifra (un multímetro, un sensor de concreto, una cinta métrica digital).',
        'Tip a recordar (Humano): Siempre hay un sesgo de percepción, fricción operativa (quitarse los guantes, detener la tarea) y riesgo de falsificación o error de digitación.',
        'Tip a recordar (Sistema): La fricción en campo es cero, pero el reto se desplaza a la infraestructura, calibración de hardware y costo inicial.'
      ]
    },
    {
      id: 'slide-dax',
      title: 'Manual Práctico de Expresiones DAX',
      subtitle: 'Sintaxis correcta, mejores prácticas de modelado y errores comunes',
      category: 'Modelado Analítico',
      notes: [
        'Estructura Básica: Se recomienda desglosar los argumentos de funciones multilínea y escribir siempre el nombre de las funciones en mayúsculas (IF, CALCULATE, etc.) para mejorar la lectura.',
        'Referencias de Elementos: Al referenciar columnas, especifique siempre la tabla (\'Tabla\'[Columna]); al referenciar medidas, use únicamente corchetes ([Medida]) sin el nombre de la tabla.',
        'Medidas vs Columnas: Las columnas se calculan estáticamente al actualizar los datos; las medidas se evalúan en tiempo real según los filtros interactivos seleccionados.'
      ]
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const activeSlideData = slides[currentSlide];

  return (
    <div className={`w-full flex flex-col ${isPresenting ? 'fixed inset-0 z-50 bg-slate-950 p-6 h-screen overflow-hidden bg-tech-dots gap-6' : 'space-y-6'}`}>
      
      {/* PRESENTATION CONTROL BAR */}
      <div className={`flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-900/80 shadow-2xl relative overflow-hidden shrink-0 ${
        isPresenting ? 'z-30 border-blue-500/10' : ''
      }`}>
        <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-blue-500/30 to-transparent" />
        <div className="flex items-center gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-[0.2em] bg-blue-500/10 px-2 py-0.5 rounded">
                Guía de Consulta
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {settings.institution}
              </span>
            </div>
            <h1 className="text-xs font-bold text-slate-300 font-mono tracking-wide mt-0.5">
              {settings.courseName}
            </h1>
          </div>
        </div>

        {/* Presenter Utilities: Notes Toggle, Fullscreen */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Speaker notes toggle */}
          <button
            id="toggle-presenter-notes"
            onClick={() => setShowPresenterNotes(!showPresenterNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              showPresenterNotes 
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' 
                : 'bg-slate-900/30 border-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Conceptos Clave</span>
          </button>

          {/* Fullscreen Mode Toggle */}
          <button
            id="toggle-fullscreen"
            onClick={() => setIsPresenting(!isPresenting)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              isPresenting 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400/20 font-bold shadow-lg shadow-blue-500/15' 
                : 'bg-slate-900/30 border-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>{isPresenting ? 'Salir' : 'Presentar'}</span>
          </button>
        </div>
      </div>

      {/* CORE PRESENTATION BODY GRID */}
      <div className={`grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch relative z-10 ${
        isPresenting ? 'flex-1 overflow-y-auto min-h-0 pr-1' : ''
      }`}>
        
        {/* LEFT/CENTER: Active Slide Canvas */}
        <div className={`flex flex-col bg-slate-950/60 border border-slate-900 rounded-3xl p-6 shadow-2xl relative min-h-[460px] ${
          showPresenterNotes ? 'xl:col-span-9' : 'xl:col-span-12'
        } transition-all duration-300`}>
          
          {/* Top subtle highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          
          {/* Slide Header Metatag */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-3.5 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase bg-slate-900 text-slate-400 px-2.5 py-0.5 rounded border border-slate-800">
                MÓDULO {currentSlide + 1}
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wide">
                {activeSlideData.category}
              </span>
            </div>
            {/* Quick slide progress indicators */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-gradient-to-r from-blue-400 to-indigo-400 w-10' : 'bg-slate-800 hover:bg-slate-700 w-3'}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Title */}
          <div className="mb-6 relative">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 tracking-tight font-sans">
              {activeSlideData.title}
            </h2>
            <p className="text-sm text-slate-400 font-sans mt-1">
              {activeSlideData.subtitle}
            </p>
          </div>

          {/* Render Active Component based on slide index */}
          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {currentSlide === 0 && (
                  <DIKWSimulator settings={settings} />
                )}
                {currentSlide === 1 && (
                  <DataTypology />
                )}
                {currentSlide === 2 && (
                  <DataDynamics />
                )}
                {currentSlide === 3 && (
                  <DataGovernance />
                )}
                {currentSlide === 4 && (
                  <DataInteroperability />
                )}
                {currentSlide === 5 && (
                  <TheoryGeneralExplorer slideId="theory-stevens-scales" />
                )}
                {currentSlide === 6 && (
                  <DataSpaceTemporal />
                )}
                {currentSlide === 7 && (
                  <DataEtlParadigms />
                )}
                {currentSlide === 8 && (
                  <DataValidationSimulator />
                )}
                {currentSlide === 9 && (
                  <DataSemanticInteroperability />
                )}
                {currentSlide === 10 && (
                  <DataSchemaNormalization />
                )}
                {currentSlide === 11 && (
                  <DataOriginClassification />
                )}
                {currentSlide === 12 && (
                  <DataDax />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Presenter Navigation Toolbar */}
          <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between">
            <div className="text-[11px] text-slate-500 font-mono">
              MATERIA: <span className="text-slate-300 font-semibold">{settings.courseName}</span>
            </div>
            
            {/* Nav Arrows */}
            <div className="flex gap-2">
              <button
                id="prev-slide-btn"
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="p-2.5 rounded-lg border border-slate-900 bg-slate-950/60 hover:bg-slate-900/60 hover:border-slate-800 disabled:opacity-20 disabled:hover:bg-slate-950/60 text-slate-300 cursor-pointer transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="px-4 py-2 bg-slate-950 border border-slate-900 rounded-lg text-xs font-mono font-bold text-slate-400 flex items-center justify-center">
                {currentSlide + 1} / {slides.length}
              </span>

              <button
                id="next-slide-btn"
                onClick={handleNext}
                disabled={currentSlide === slides.length - 1}
                className="p-2.5 rounded-lg border border-slate-900 bg-slate-950/60 hover:bg-slate-900/60 hover:border-slate-800 disabled:opacity-20 disabled:hover:bg-slate-950/60 text-slate-300 cursor-pointer transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[10px] text-slate-600 font-mono hidden md:block tracking-wider">
              Navegar con <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px]">←</kbd> o <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[9px]">→</kbd>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Study Guide Panel */}
        {showPresenterNotes && (
          <div className="xl:col-span-3 flex flex-col bg-slate-950/50 border border-slate-900 rounded-3xl p-4 shadow-2xl justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Conceptos y Repaso
                </h3>
              </div>
              
              <div className="space-y-3.5 relative z-10">
                <div className="p-2.5 bg-blue-500/5 rounded-lg border border-blue-500/10 text-[10px] text-blue-400 leading-normal font-sans">
                  💡 <strong>Insumo Académico:</strong> Puntos clave y análisis conceptuales recomendados para el autoaprendizaje y repaso autónomo.
                </div>

                <div className="space-y-3">
                  {activeSlideData.notes.map((note, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-xs text-slate-400 leading-relaxed font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      <p>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-900 mt-4 space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Pregunta de Reflexión</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal font-sans">
                Análisis: ¿Cómo impacta la calidad de los metadatos de un modelo en la precisión de un tablero en Power BI? Recuerde que el principio GIGO (Garbage In, Garbage Out) aplica con especial rigor en la analítica de datos de construcción.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
