import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Cpu, 
  Network, 
  Trash2, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Layers, 
  UserCheck, 
  FileText, 
  HardDriveDownload,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface LifecyclePhase {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  color: string;
  lightColor: string;
  borderColor: string;
  icon: React.ReactNode;
  description: string;
  actions: string[];
  systemExample: string;
  keyMetric: string;
  metricValue: string;
}

export default function DataGovernance() {
  const [activePhase, setActivePhase] = useState<string>('captura');
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([
    'Iniciando simulación de gobernanza...',
    'Ecosistema listo para transmisión.'
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  const phases: LifecyclePhase[] = [
    {
      id: 'captura',
      number: '01',
      name: 'Captura / Generación',
      subtitle: 'La entrada inicial al sistema',
      color: 'from-blue-500 to-cyan-400',
      lightColor: 'text-blue-400 bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: <Cpu className="w-5 h-5" />,
      description: 'El ciclo comienza aquí. El dato nace a través de sensores IoT en sitio, el modelado geométrico tridimensional por los ingenieros, entradas de bitácora manuales o integraciones automáticas entre suites de diseño.',
      actions: [
        'Sensores térmicos embebidos en el vaciado de concreto estructural.',
        'Modelado de elementos constructivos (IFC) en Autodesk Revit o Bentley Systems.',
        'Formularios móviles con firmas digitales del supervisor de control de calidad.',
        'Automatizaciones de diseño paramétrico con algoritmos de Dynamo.'
      ],
      systemExample: 'Sensor térmico IoT "S-Concrete-104" transmitiendo temperatura de fraguado cada 5 segundos.',
      keyMetric: 'Tasa de Entrada',
      metricValue: '120 lecturas/min'
    },
    {
      id: 'almacenamiento',
      number: '02',
      name: 'Almacenamiento y Procesamiento',
      subtitle: 'Centralización, limpieza y orden',
      color: 'from-indigo-500 to-purple-500',
      lightColor: 'text-indigo-400 bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      icon: <Database className="w-5 h-5" />,
      description: 'Los datos en bruto se centralizan en repositorios dedicados (CDE - Entorno Común de Datos, bases SQL o lagos en la nube) y luego se transforman mediante scripts de ETL (Extract, Transform, Load) para limpiarlos, remover nulos y normalizar sus parámetros relacionales.',
      actions: [
        'Hospedaje en Autodesk Construction Cloud (ACC) para modelos IFC unificados.',
        'Ingesta y estructuración de tablas paramétricas en bases de datos SQL relacionales.',
        'Saneamiento en Power Query: des-pivotado de propiedades, homologación de GUIDs.',
        'Indexación lógica de campos para acelerar el cálculo analítico posterior.'
      ],
      systemExample: 'Power Query remueve filas vacías y valida que no existan muros con volumen cero antes de la carga.',
      keyMetric: 'Eficiencia ETL',
      metricValue: '99.8% consistencia'
    },
    {
      id: 'analisis',
      number: '03',
      name: 'Análisis / Consumo',
      subtitle: 'La transformación en valor práctico',
      color: 'from-amber-500 to-orange-500',
      lightColor: 'text-amber-400 bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      icon: <Network className="w-5 h-5" />,
      description: 'Es la fase de valor. Los datos procesados se consumen mediante visualizaciones interactivas de Power BI, reportes analíticos de avance físico (Curvas S), matrices de colisiones tridimensionales y algoritmos predictivos para la toma de decisiones gerenciales en los comités de diseño.',
      actions: [
        'Tableros interactivos de Power BI vinculados en tiempo real al modelo 3D IFC.',
        'Generación de Curvas S automáticas de avance versus la línea de base programada.',
        'Detección visual de colisiones críticas de MEP contra zapatas y vigas.',
        'Consultas cruzadas de rendimiento por subcontratista basadas en avance físico.'
      ],
      systemExample: 'El Gerente de Proyecto visualiza en un monitor interactivo las interferencias con costo de mitigación estimado en $15,000 USD.',
      keyMetric: 'Soporte Decisiones',
      metricValue: 'Tiempo real'
    },
    {
      id: 'preservacion',
      number: '04',
      name: 'Preservación o Destrucción',
      subtitle: 'Seguridad y archivo histórico',
      color: 'from-rose-500 to-red-500',
      lightColor: 'text-rose-400 bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      icon: <Trash2 className="w-5 h-5" />,
      description: 'El ciclo cierra con el destino final del dato. Una vez entregada la obra, los datos del "As-Built" digital se preservan de forma segura bajo normas como la ISO 19650 para operar el activo (Gemelo Digital) o se eliminan ordenadamente si expira el plazo regulatorio para ahorrar costos de almacenamiento.',
      actions: [
        'Exportación del modelo definitivo consolidado al sistema de Facility Management (COBie).',
        'Copia de seguridad en almacenamiento en frío para auditorías legales futuras (10+ años).',
        'Depuración controlada de telemetría transitoria para optimizar espacio del servidor.',
        'Establecimiento de políticas de acceso restringido para proteger la propiedad intelectual.'
      ],
      systemExample: 'Migración del esquema IFC histórico a un almacenamiento de archivo y desactivación segura de sensores IoT.',
      keyMetric: 'Garantía Histórica',
      metricValue: 'ISO 19650 Compliant'
    }
  ];

  const activePhaseData = phases.find(p => p.id === activePhase) || phases[0];

  // Simulates a data particle moving through the lifecycle
  const runDataPipelineSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStep(1);
    setActivePhase('captura');
    setSimLogs([
      '⚡ [Fase 1: CAPTURA] Sensor IoT S-Concrete-104 detecta 39.5°C en zapata Z-02.',
      '📥 Transmitiendo paquete de telemetría a través del protocolo MQTT...'
    ]);

    setTimeout(() => {
      setSimulationStep(2);
      setActivePhase('almacenamiento');
      setSimLogs(prev => [
        ...prev,
        '🗄️ [Fase 2: ALMACENAMIENTO] Paquete recibido en el Entorno de Datos.',
        '⚙️ Corriendo rutina de limpieza: Se valida GUID, se empareja con la zapata Z-02 del modelo 3D Revit, se descartan lecturas duplicadas.'
      ]);
    }, 1800);

    setTimeout(() => {
      setSimulationStep(3);
      setActivePhase('analisis');
      setSimLogs(prev => [
        ...prev,
        '📊 [Fase 3: ANÁLISIS] El modelo relacional calcula una Alerta de Calor de Hidratación en Power BI.',
        '🚨 Alerta visual en pantalla: Se reporta al Ingeniero Residente para aplicar riego controlado y evitar agrietamiento térmico.'
      ]);
    }, 3600);

    setTimeout(() => {
      setSimulationStep(4);
      setActivePhase('preservacion');
      setSimLogs(prev => [
        ...prev,
        '🔒 [Fase 4: PRESERVACIÓN] Concreto fraguado y certificado.',
        '💾 Guardando registro histórico en el dossier As-Built ISO 19650 para Facility Management.',
        '✅ Simulación de gobernanza completada con éxito. El flujo del dato ha terminado.'
      ]);
      setIsSimulating(false);
    }, 5400);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase font-bold tracking-widest inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dinámica del Flujo de Información</span>
        </span>
        <h2 className="text-2xl font-black uppercase font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-200 to-slate-400">
          Ciclo de Vida y Gobernanza
        </h2>
        <p className="text-xs text-slate-400 leading-normal font-sans">
          Un dato no es estático; se comporta como un <strong className="text-blue-400">flujo viviente</strong> dentro de cualquier sistema de información técnica. Su salud depende de reglas de control claras desde su nacimiento hasta su destino final.
        </p>
      </div>

      {/* 4 STAGES OF THE LIFECYCLE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        
        {/* Connection line between phases (Desktop only) */}
        <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-[1px] bg-slate-900 z-0">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 transition-all duration-1000"
            style={{ 
              width: isSimulating 
                ? `${(simulationStep - 1) * 33.3}%` 
                : `${(phases.findIndex(p => p.id === activePhase)) * 33.3}%` 
            }}
          />
        </div>

        {phases.map((phase, idx) => {
          const isActive = activePhase === phase.id;
          const isSimActive = isSimulating && simulationStep === idx + 1;
          
          return (
            <button
              key={phase.id}
              onClick={() => {
                if (!isSimulating) setActivePhase(phase.id);
              }}
              disabled={isSimulating}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[125px] cursor-pointer relative z-10 ${
                isActive 
                  ? `bg-slate-950/90 border-slate-700 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20` 
                  : 'bg-slate-950/20 border-slate-900/60 hover:border-slate-800 hover:bg-slate-950/40'
              } ${isSimActive ? 'ring-2 ring-amber-400/50 border-amber-400/40' : ''}`}
            >
              <div className="flex items-start justify-between w-full">
                <span className={`text-[10px] font-mono font-black ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r ' + phase.color : 'text-slate-600'}`}>
                  FASE {phase.number}
                </span>
                <div className={`p-1.5 rounded-lg border ${
                  isActive 
                    ? `bg-gradient-to-r ${phase.color} text-slate-950 border-transparent font-bold` 
                    : 'bg-slate-900 border-transparent text-slate-500'
                }`}>
                  {phase.icon}
                </div>
              </div>

              <div className="mt-3">
                <h4 className={`text-xs font-bold font-mono tracking-wider transition-colors ${
                  isActive ? 'text-transparent bg-clip-text bg-gradient-to-r ' + phase.color : 'text-slate-300'
                }`}>
                  {phase.name}
                </h4>
                <p className="text-[9px] text-slate-500 leading-tight font-sans mt-0.5">
                  {phase.subtitle}
                </p>
              </div>

              {/* Simulation indicator */}
              {isSimActive && (
                <div className="absolute inset-0 bg-amber-500/5 border border-amber-500/20 rounded-2xl animate-pulse pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* DETAILED ACTIVE VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Side: Explanations & Standard Actions */}
        <div className="md:col-span-7 flex flex-col bg-slate-950/40 border border-slate-900 rounded-2xl p-5 justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3">
              <div>
                <span className={`text-[8px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded ${activePhaseData.lightColor}`}>
                  Fase de Operación: {activePhaseData.number}
                </span>
                <h3 className={`text-sm font-black uppercase font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${activePhaseData.color} mt-1`}>
                  {activePhaseData.name}
                </h3>
              </div>
              <div className="text-right font-mono text-[9px] text-slate-500">
                Métrica Clave: <span className="font-bold text-slate-300">{activePhaseData.metricValue}</span>
              </div>
            </div>

            <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
              {activePhaseData.description}
            </p>

            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Actividades y Tareas Críticas:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activePhaseData.actions.map((act, idx) => (
                  <div key={idx} className="flex gap-2 items-start bg-slate-950 border border-slate-900 p-2.5 rounded-xl hover:border-slate-800 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span className="text-[10px] text-slate-400 font-sans leading-tight">{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Ejemplo Técnico:</span>
              <span className="text-[9.5px] text-slate-400 font-mono italic">"{activePhaseData.systemExample}"</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Governance Simulator & Logs */}
        <div className="md:col-span-5 flex flex-col bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-xl justify-between">
          <div>
            <div className="px-4 py-3 border-b border-slate-900 bg-slate-950/75 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Network className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-300">
                  Flujo Viviente del Dato
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-500 uppercase bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">
                SIMULADOR
              </span>
            </div>

            {/* Sim visual console */}
            <div className="p-4 space-y-3">
              <p className="text-[10px] text-slate-400 leading-normal font-sans">
                Presione el botón para inyectar una lectura de sensor térmico en obra y observe su trayectoria en tiempo real cruzando las políticas de gobernanza técnica:
              </p>

              <button
                onClick={runDataPipelineSim}
                disabled={isSimulating}
                className="w-full py-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-bold font-mono text-[10px] uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-blue-500/10 transition-all duration-300 active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Transmitir e Inyectar Dato</span>
              </button>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-900/80 space-y-1.5 min-h-[145px] max-h-[145px] overflow-y-auto font-mono text-[9px] text-slate-400 scrollbar-thin">
                <div className="flex items-center justify-between border-b border-slate-900 pb-1 mb-1">
                  <span className="text-[8px] font-bold text-slate-500 uppercase">Consola de Gobernanza (Log)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                {simLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed border-b border-slate-950 pb-1 text-slate-300">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Rules of Data Governance (Static reminder block) */}
          <div className="p-4 bg-slate-950/80 border-t border-slate-900 space-y-2">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gobernanza del Dato (Anti-Caos)</span>
            </span>
            <div className="grid grid-cols-2 gap-2 text-[9px] font-sans">
              <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg">
                <span className="font-bold text-slate-300 block font-mono">1. Propietarios (Data Owners)</span>
                <span className="text-slate-500">Un líder de disciplina valida cada parámetro clave (Revit).</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg">
                <span className="font-bold text-slate-300 block font-mono">2. Diccionario Común</span>
                <span className="text-slate-500">Evita nombres duplicados o nulos en campos de Power Query.</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
