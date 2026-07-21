import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  ArrowRight, 
  Cloud, 
  FileCode, 
  Radio, 
  Settings, 
  Layers, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  BookOpen, 
  Info,
  Database,
  Layers3,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

type FlowType = 'modelo' | 'incidencias';
type IncidenciasMethod = 'forma' | 'bcf';

export default function DataPipeline() {
  const [activeFlow, setActiveFlow] = useState<FlowType>('modelo');
  const [method, setMethod] = useState<IncidenciasMethod>('forma');

  // Steps customization based on the selected method for incidencias
  const steps = {
    forma: [
      {
        step: '1',
        title: 'Preparación de Incidencias',
        desc: 'Los ingenieros registran y marcan incidencias colaborativas de diseño directamente en Autodesk Forma (el CDE).',
        icon: '🏗️',
        badge: 'CDE Cloud',
        detail: 'Registro en Autodesk Forma'
      },
      {
        step: '2',
        title: 'Extracción Directa (API)',
        desc: 'Consumo directo y seguro mediante llamadas REST GET en tiempo real de la API de Autodesk Forma usando OAuth 2.0.',
        icon: '☁️',
        badge: 'GET REST API',
        detail: 'Extracción en la nube'
      },
      {
        step: '3',
        title: 'Power Query',
        desc: 'Conexión a la API web JSON, desanidación automatizada de campos, tipado de datos y limpieza de registros nulos.',
        icon: '⚙️',
        badge: 'Transformación',
        detail: 'Normalización de Datos'
      },
      {
        step: '4',
        title: 'Dashboard de Control',
        desc: 'Generación de gráficos de barras, métricas de severidad y KPIs de resolución en tiempo real en Power BI.',
        icon: '📊',
        badge: 'Visualización',
        detail: 'Reporte Power BI'
      }
    ],
    bcf: [
      {
        step: '1',
        title: 'Preparación de Incidencias',
        desc: 'Se identifican colisiones tridimensionales en el software de autoría local y se documentan como marcas visuales.',
        icon: '🔍',
        badge: 'Modelo Local',
        detail: 'Marcadores de Cámara'
      },
      {
        step: '2',
        title: 'Extracción con BCF',
        desc: 'Se exporta manualmente un archivo contenedor estandarizado .bcfzip que empaqueta coordenadas XML y vistas (.png).',
        icon: '📦',
        badge: 'Estándar BCF',
        detail: 'Intercambio Abierto'
      },
      {
        step: '3',
        title: 'Power Query / Parser',
        desc: 'Importación del archivo .bcfzip local, deserializando la estructura XML y mapeando los atributos a columnas limpias.',
        icon: '⚙️',
        badge: 'Transformación XML',
        detail: 'Estructuración de datos'
      },
      {
        step: '4',
        title: 'Dashboard de Control',
        desc: 'Visualización interactiva de incidencias por disciplina y estado de resolución leídas desde el archivo BCF en Power BI.',
        icon: '📊',
        badge: 'Visualización',
        detail: 'Reporte Power BI'
      }
    ]
  };

  const currentSteps = steps[method];
  
  // Simulation states
  const [isSimulatingModel, setIsSimulatingModel] = useState(false);
  const [modelStep, setModelStep] = useState(0);
  const [modelLogs, setModelLogs] = useState<string[]>([
    'Ecosistema del Modelo listo para iniciar.',
    'Presione "Simular Flujo del Modelo" para iniciar la transmisión.'
  ]);

  const [isSimulatingIssues, setIsSimulatingIssues] = useState(false);
  const [issuesStep, setIssuesStep] = useState(0);
  const [issuesLogs, setIssuesLogs] = useState<string[]>([
    'Ecosistema de Incidencias listo.',
    'Seleccione un método de extracción y presione "Simular Ingesta de Incidencias".'
  ]);

  const runModelSimulation = () => {
    if (isSimulatingModel) return;
    setIsSimulatingModel(true);
    setModelStep(1);
    setModelLogs([
      '⚡ [Paso 1: PLAN IFC / REVIT] Ingeniero modela y valida GUIDs, categorías y materiales estructurados.',
      '📦 Preparando elementos constructivos IFC listos para exportación al CDE.'
    ]);

    setTimeout(() => {
      setModelStep(2);
      setModelLogs(prev => [
        ...prev,
        '☁️ [Paso 2: EXTRACCIÓN CDE] Cargando y centralizando el modelo en Autodesk Forma (el CDE oficial).',
        '🔗 Se elimina la dependencia de Dynamo local; el dato ahora reside y se extrae desde un entorno en la nube.'
      ]);
    }, 1500);

    setTimeout(() => {
      setModelStep(3);
      setModelLogs(prev => [
        ...prev,
        '⚙️ [Paso 3: POWER QUERY] Ingesta directa de los parámetros unificados del CDE.',
        '🔄 Limpiando campos vacíos, eliminando nulos y estructurando relaciones de tablas.'
      ]);
    }, 3000);

    setTimeout(() => {
      setModelStep(4);
      setModelLogs(prev => [
        ...prev,
        '📊 [Paso 4: DASHBOARD] Renderizando elementos 3D y calculando indicadores DAX en Power BI.',
        '✅ ¡Éxito! El modelo geométrico y sus parámetros relacionales están sincronizados de manera óptima.'
      ]);
      setIsSimulatingModel(false);
    }, 4500);
  };

  const runIssuesSimulation = () => {
    if (isSimulatingIssues) return;
    setIsSimulatingIssues(true);
    setIssuesStep(1);

    if (method === 'forma') {
      setIssuesLogs([
        '⚡ [Paso 1: PREPARACIÓN] Se registran y marcan 12 incidencias de diseño colaborativo directamente en Autodesk Forma.',
        '🔑 Autenticando credenciales OAuth 2.0 con el servidor de Autodesk...'
      ]);

      setTimeout(() => {
        setIssuesStep(2);
        setIssuesLogs(prev => [
          ...prev,
          '📡 [Paso 2: EXTRACCIÓN DIRECTA] API REST GET invocado: /forma/v1/issues',
          '📥 Descargando payload JSON en tiempo real directamente de la nube sin archivos intermedios.'
        ]);
      }, 1500);

      setTimeout(() => {
        setIssuesStep(3);
        setIssuesLogs(prev => [
          ...prev,
          '⚙️ [Paso 3: POWER QUERY] Cargando flujo JSON recibido de la API.',
          '🔄 Desanidando columnas de ubicación espacial, fechas límite y responsables de resolución.'
        ]);
      }, 3000);

      setTimeout(() => {
        setIssuesStep(4);
        setIssuesLogs(prev => [
          ...prev,
          '📊 [Paso 4: DASHBOARD DE CONTROL] Actualizando gráficos de severidad y responsables en Power BI.',
          '✅ ¡Éxito! Las incidencias en la nube están integradas y monitoreadas al instante.'
        ]);
        setIsSimulatingIssues(false);
      }, 4500);
    } else {
      setIssuesLogs([
        '⚡ [Paso 1: PREPARACIÓN] Coordinador BIM documenta choques espaciales crítcos en el software de autoría.',
        '🛠️ Preparando el archivo neutral de coordinación de incidencias...'
      ]);

      setTimeout(() => {
        setIssuesStep(2);
        setIssuesLogs(prev => [
          ...prev,
          '📦 [Paso 2: EXTRACCIÓN CON BCF] Exportación exitosa. Archivo "Coord-Incidencias.bcfzip" generado localmente.',
          '💾 Contenedor BIM Collaboration Format (BCF) listo para el analista.'
        ]);
      }, 1500);

      setTimeout(() => {
        setIssuesStep(3);
        setIssuesLogs(prev => [
          ...prev,
          '⚙️ [Paso 3: POWER QUERY / PARSER] Cargando archivo .bcfzip en el origen de datos local.',
          '📂 Deserializando la estructura XML, marcadores tridimensionales y capturas de cámara.'
        ]);
      }, 3000);

      setTimeout(() => {
        setIssuesStep(4);
        setIssuesLogs(prev => [
          ...prev,
          '📊 [Paso 4: DASHBOARD DE CONTROL] Refrescando orígenes de datos locales en Power BI.',
          '✅ ¡Éxito! Incidencias mapeadas correctamente desde el formato abierto BCF de buildingSMART.'
        ]);
        setIsSimulatingIssues(false);
      }, 4500);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase font-bold tracking-widest inline-flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 animate-pulse" />
          <span>Ecosistema de Datos VDC</span>
        </span>
        <h2 className="text-2xl font-black uppercase font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-200 to-slate-400">
          Arquitectura del Flujo de Información
        </h2>
        <p className="text-xs text-slate-400 leading-normal font-sans">
          Descubra cómo transitan el <strong className="text-blue-400">Modelo 3D</strong> y las <strong className="text-indigo-400">Incidencias de Coordinación</strong>, estructurándose desde su origen hasta la toma de decisiones gerenciales en Power BI.
        </p>
      </div>

      {/* FLOW TYPE SELECTOR TABS */}
      <div className="flex justify-center">
        <div className="flex bg-slate-950/80 border border-slate-900 rounded-2xl p-1 md:p-1.5 max-w-md w-full">
          <button
            onClick={() => {
              if (!isSimulatingModel && !isSimulatingIssues) {
                setActiveFlow('modelo');
                setModelStep(0);
              }
            }}
            disabled={isSimulatingModel || isSimulatingIssues}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeFlow === 'modelo' 
                ? 'bg-blue-500 text-slate-950 shadow-lg shadow-blue-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
            }`}
          >
            <Layers3 className="w-4 h-4" />
            <span>1. Flujo del Modelo (IFC)</span>
          </button>
          <button
            onClick={() => {
              if (!isSimulatingModel && !isSimulatingIssues) {
                setActiveFlow('incidencias');
                setIssuesStep(0);
              }
            }}
            disabled={isSimulatingModel || isSimulatingIssues}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeFlow === 'incidencias' 
                ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/10' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
            }`}
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>2. Flujo de Incidencias</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE DISPLAY SECTION */}
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: MODEL FLOW */}
        {activeFlow === 'modelo' && (
          <motion.div
            key="flow-modelo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-slate-950/40 rounded-3xl border border-slate-900 p-5 md:p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/25 to-transparent" />
              
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xs font-bold font-mono tracking-wide text-slate-200 uppercase">
                    Pipeline del Modelo: Del Diseño al Reporte
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-mono uppercase font-black border border-blue-500/20">
                  Modelo 3D y Parámetros
                </span>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
                {[
                  {
                    step: '1',
                    title: 'Plan IFC / Revit',
                    desc: 'Modelado 3D riguroso clasificando categorías, GUIDs, materiales y propiedades de diseño estructuradas.',
                    icon: '🏗️',
                    badge: 'Autoría BIM',
                    detail: 'Consistencia de datos'
                  },
                  {
                    step: '2',
                    title: 'Extracción CDE',
                    desc: 'El puente es Autodesk Forma (CDE) para centralizar, consolidar y consultar la información, erradicando Dynamo.',
                    icon: '☁️',
                    badge: 'Autodesk Forma CDE',
                    detail: 'Extracción en la nube'
                  },
                  {
                    step: '3',
                    title: 'Power Query',
                    desc: 'Limpieza de vacíos, pivoteo de parámetros y definición de claves primarias relacionales para el análisis.',
                    icon: '⚙️',
                    badge: 'Transformación',
                    detail: 'Normalización de datos'
                  },
                  {
                    step: '4',
                    title: 'Dashboard final',
                    desc: 'Creación de visuales 3D, cálculos DAX de rendimiento y publicación del dashboard de reporte gerencial en Power BI.',
                    icon: '📊',
                    badge: 'Power BI',
                    detail: 'Toma de decisiones'
                  }
                ].map((item, idx) => {
                  const isActive = isSimulatingModel && modelStep === idx + 1;
                  const isCompleted = isSimulatingModel ? modelStep > idx + 1 : false;

                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border relative flex flex-col justify-between min-h-[185px] transition-all duration-300 ${
                        isActive 
                          ? 'bg-slate-950 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/10'
                          : isCompleted
                            ? 'bg-slate-950/80 border-slate-800/80 opacity-90'
                            : 'bg-slate-950/20 border-slate-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-mono text-[8.5px] text-slate-500 uppercase font-black">
                            PASO {item.step}
                          </span>
                        </div>

                        <span className={`text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded uppercase tracking-wider inline-block mb-1.5 ${
                          isActive 
                            ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20' 
                            : 'bg-slate-900 text-slate-500 border border-transparent'
                        }`}>
                          {item.badge}
                        </span>

                        <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-200 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-normal font-sans">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-900/50 mt-2 text-[8px] font-mono text-slate-500">
                        Foco: <span className="text-slate-300 font-semibold">{item.detail}</span>
                      </div>

                      {idx < 3 && (
                        <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 hidden md:block z-10" />
                      )}

                      {isActive && (
                        <div className="absolute inset-0 bg-amber-500/5 border border-amber-500/20 rounded-xl animate-pulse pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Simulation Console for Model Flow */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch pt-2">
                
                <div className="md:col-span-8 p-3.5 bg-slate-950 border border-slate-900 rounded-xl flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-1.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Consola de Procesamiento del Modelo IFC</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSimulatingModel ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                  </div>
                  
                  <div className="space-y-1 font-mono text-[9.5px]">
                    {modelLogs.map((log, idx) => (
                      <div key={idx} className={`leading-relaxed ${
                        log.includes('🔴') || log.includes('🚨') ? 'text-rose-400' : 
                        log.includes('✅') || log.includes('🟢') || log.includes('⚡') ? 'text-blue-400' : 
                        'text-slate-300'
                      }`}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 bg-slate-950/60 border border-slate-900 p-3.5 rounded-xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider">CDE UNIFICADO</span>
                    <p className="text-[9.5px] text-slate-400 font-sans leading-normal">
                      Ejecute la simulación para comprobar de qué manera los datos geométricos IFC viajan desde Autodesk Forma hacia Power Query y Power BI.
                    </p>
                  </div>

                  <button
                    onClick={runModelSimulation}
                    disabled={isSimulatingModel}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-400 disabled:bg-slate-900 disabled:text-slate-500 text-slate-950 font-mono text-[9.5px] font-bold uppercase rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simular Flujo del Modelo</span>
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* VIEW 2: ISSUES FLOW */}
        {activeFlow === 'incidencias' && (
          <motion.div
            key="flow-incidencias"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Double Method Selector for Issues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Option A: Autodesk Forma Direct */}
              <button
                onClick={() => {
                  if (!isSimulatingIssues) {
                    setMethod('forma');
                    setIssuesStep(0);
                    setIssuesLogs([
                      '🔄 Cambio a Extracción Directa desde Autodesk Forma (Cloud API).',
                      'Presione "Simular Ingesta de Incidencias" para ver el procesamiento.'
                    ]);
                  }
                }}
                disabled={isSimulatingIssues}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[110px] relative ${
                  method === 'forma'
                    ? 'bg-slate-950/90 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/10'
                    : 'bg-slate-950/20 border-slate-900/60 hover:border-slate-800 hover:bg-slate-950/40'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className={`text-[9px] font-mono font-black uppercase tracking-wider ${method === 'forma' ? 'text-blue-400' : 'text-slate-500'}`}>
                    OPCIÓN A • NUBE DIRECTA
                  </span>
                  <div className={`p-1.5 rounded-lg ${method === 'forma' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-900 text-slate-500'}`}>
                    <Cloud className="w-4.5 h-4.5" />
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className={`text-xs font-bold font-mono uppercase tracking-wider transition-colors ${method === 'forma' ? 'text-blue-200' : 'text-slate-300'}`}>
                    Autodesk Forma Cloud REST API
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans mt-0.5">
                    Extracción en la nube en tiempo real mediante integraciones web sin archivos manuales locales.
                  </p>
                </div>
              </button>

              {/* Option B: BCF Files */}
              <button
                onClick={() => {
                  if (!isSimulatingIssues) {
                    setMethod('bcf');
                    setIssuesStep(0);
                    setIssuesLogs([
                      '📦 Cambio a Extracción mediante Estándar Abierto BCF (XML).',
                      'Presione "Simular Ingesta de Incidencias" para ver el procesamiento.'
                    ]);
                  }
                }}
                disabled={isSimulatingIssues}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[110px] relative ${
                  method === 'bcf'
                    ? 'bg-slate-950/90 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.12)] ring-1 ring-purple-500/10'
                    : 'bg-slate-950/20 border-slate-900/60 hover:border-slate-800 hover:bg-slate-950/40'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className={`text-[9px] font-mono font-black uppercase tracking-wider ${method === 'bcf' ? 'text-purple-400' : 'text-slate-500'}`}>
                    OPCIÓN B • ESTÁNDAR DE ARCHIVOS
                  </span>
                  <div className={`p-1.5 rounded-lg ${method === 'bcf' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-slate-900 text-slate-500'}`}>
                    <FileCode className="w-4.5 h-4.5" />
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className={`text-xs font-bold font-mono uppercase tracking-wider transition-colors ${method === 'bcf' ? 'text-purple-200' : 'text-slate-300'}`}>
                    Mediante el Uso de Archivos BCF
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans mt-0.5">
                    Exportación del estándar BIM Collaboration Format para transferir marcadores XML, capturas y comentarios.
                  </p>
                </div>
              </button>

            </div>

            {/* Core 4-step pipeline for Issues */}
            <div className="bg-slate-950/40 rounded-3xl border border-slate-900 p-5 md:p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent" />
              
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <h3 className="text-xs font-bold font-mono tracking-wide text-slate-200 uppercase">
                    Pipeline de Incidencias: De la Detección al Cuadro de Mando
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[8px] font-mono uppercase font-black border ${
                  method === 'forma' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                }`}>
                  {method === 'forma' ? 'Forma API (Cloud JSON)' : 'BCF Zip Container (XML)'}
                </span>
              </div>

              {/* 4 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
                {currentSteps.map((item, idx) => {
                  const isActive = isSimulatingIssues && issuesStep === idx + 1;
                  const isCompleted = isSimulatingIssues ? issuesStep > idx + 1 : false;

                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border relative flex flex-col justify-between min-h-[185px] transition-all duration-300 ${
                        isActive 
                          ? (method === 'forma' ? 'bg-slate-950 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/10' : 'bg-slate-950 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/10')
                          : isCompleted
                            ? 'bg-slate-950/80 border-slate-800/80 opacity-90'
                            : 'bg-slate-950/20 border-slate-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-mono text-[8.5px] text-slate-500 uppercase font-black">
                            PASO {item.step}
                          </span>
                        </div>

                        <span className={`text-[7.5px] font-mono font-bold px-1.5 py-0.2 rounded uppercase tracking-wider inline-block mb-1.5 ${
                          isActive 
                            ? 'bg-amber-400/10 text-amber-300 border border-amber-400/20' 
                            : 'bg-slate-900 text-slate-500 border border-transparent'
                        }`}>
                          {item.badge}
                        </span>

                        <h4 className="text-xs font-bold font-mono uppercase tracking-wide text-slate-200 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-normal font-sans">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-900/50 mt-2 text-[8px] font-mono text-slate-500">
                        Foco: <span className="text-slate-300 font-semibold">{item.detail}</span>
                      </div>

                      {idx < 3 && (
                        <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 hidden md:block z-10" />
                      )}

                      {isActive && (
                        <div className="absolute inset-0 bg-amber-500/5 border border-amber-500/20 rounded-xl animate-pulse pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Simulation Console for Issues */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch pt-2">
                
                <div className="md:col-span-8 p-3.5 bg-slate-950 border border-slate-900 rounded-xl flex flex-col justify-between min-h-[95px]">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-1.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Consola de Ingesta y Extracción de Incidencias (QA/QC)</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isSimulatingIssues ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                  </div>
                  
                  <div className="space-y-1 font-mono text-[9.5px]">
                    {issuesLogs.map((log, idx) => (
                      <div key={idx} className={`leading-relaxed ${
                        log.includes('🔴') || log.includes('🚨') ? 'text-rose-400' : 
                        log.includes('✅') || log.includes('🟢') || log.includes('⚡') ? (method === 'forma' ? 'text-blue-400' : 'text-purple-400') : 
                        'text-slate-300'
                      }`}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 bg-slate-950/60 border border-slate-900 p-3.5 rounded-xl flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider">PIPELINE DE TICKET</span>
                    <p className="text-[9.5px] text-slate-400 font-sans leading-normal">
                      Ejecute la simulación de incidencias para visualizar el paso de datos XML/JSON a través de Power Query hasta el Dashboard de Power BI.
                    </p>
                  </div>

                  <button
                    onClick={runIssuesSimulation}
                    disabled={isSimulatingIssues}
                    className={`w-full py-2 disabled:bg-slate-900 disabled:text-slate-500 text-slate-950 font-mono text-[9.5px] font-bold uppercase rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      method === 'forma' 
                        ? 'bg-blue-500 hover:bg-blue-400' 
                        : 'bg-purple-500 hover:bg-purple-400'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simular Ingesta de Incidencias</span>
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
