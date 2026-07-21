import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HardDrive, 
  Gauge, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  Database,
  Cpu,
  AlertTriangle,
  RefreshCw,
  Zap,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface VDimension {
  id: string;
  name: string;
  english: string;
  color: string;
  lightColor: string;
  borderColor: string;
  icon: React.ReactNode;
  shortDesc: string;
  longDesc: string;
  bimExample: string;
  metricLabel: string;
  metricUnit: string;
  interactiveTitle: string;
}

export default function DataDynamics() {
  const [activeV, setActiveV] = useState<string>('volumen');
  
  // Interactive Sandbox state for VOLUMEN
  const [projectSize, setProjectSize] = useState<number>(3); // 1 = Casa, 2 = Condominio, 3 = Hospital, 4 = Aeropuerto Megaproyecto
  
  // Interactive Sandbox state for VELOCIDAD
  const [syncFrequency, setSyncFrequency] = useState<'lote' | 'diario' | 'tiempo-real'>('diario');
  const [liveTelem, setLiveTelem] = useState<Array<{ time: string; value: number; status: string }>>([]);
  
  // Interactive Sandbox state for VARIEDAD
  const [selectedFormats, setSelectedFormats] = useState<string[]>(['ifc', 'xlsx']);
  
  // Interactive Sandbox state for VERACIDAD
  const [gigoAudit, setGigoAudit] = useState<{
    audited: boolean;
    issuesCount: number;
    dataHealth: number;
    resolved: boolean;
    issuesList: string[];
  }>({
    audited: false,
    issuesCount: 14,
    dataHealth: 65,
    resolved: false,
    issuesList: [
      '8 elementos con GUID duplicado (colisiones relacionales)',
      '12 muros IfcWall con "Volumen = 0" (error de modelado)',
      'Faltan metadatos de resistencia (MPa) en 4 zapatas estructurales',
      '43 tuberías MEP clasificadas como tipo genérico sin códigos de mantenimiento'
    ]
  });
  const [isAuditing, setIsAuditing] = useState(false);

  // Interactive Sandbox state for VALOR
  const [roiFactor, setRoiFactor] = useState<number>(85); // 0-100 analytics maturity
  
  const dimensions: VDimension[] = [
    {
      id: 'volumen',
      name: 'Volumen',
      english: 'Volume',
      color: 'from-cyan-500 to-blue-500',
      lightColor: 'text-cyan-400 bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      icon: <HardDrive className="w-5 h-5" />,
      shortDesc: 'La escala o cantidad de datos generados en el ecosistema digital.',
      longDesc: 'En el sector de construcción, un solo activo digital genera terabytes de información. Desde la densa nube de puntos con millones de coordenadas espaciales, hasta extensas tablas que registran el ciclo de vida completo de cada sensor de climatización, el volumen determina la necesidad de almacenar en nube y optimizar índices relacionales.',
      bimExample: 'Un proyecto hospitalario de 80,000 m² contiene más de 120,000 entidades individuales en su base de datos IFC. Consumir esta información cruda sin un modelo de datos lógico (Star Schema) congelaría las visuales de Power BI.',
      metricLabel: 'Filas / Entidades estimadas',
      metricUnit: 'registros',
      interactiveTitle: 'Simulador de Volumen de Datos según Escala'
    },
    {
      id: 'velocidad',
      name: 'Velocidad',
      english: 'Velocity',
      color: 'from-amber-500 to-orange-500',
      lightColor: 'text-amber-400 bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      icon: <Gauge className="w-5 h-5" />,
      shortDesc: 'El ritmo al que se crean, procesan, estructuran y analizan los datos.',
      longDesc: 'Tradicionalmente la construcción operaba "por lotes" mensuales (informes en PDF). Hoy, la analítica predictiva exige velocidad: asimilar avances diarios de obra, reportar interferencias en el instante del modelado en la nube y recopilar lecturas continuas (milisegundos) de sensores IoT instalados en el concreto o maquinaria.',
      bimExample: 'Los tableros ejecutivos consumen flujos de avance físico con sincronizaciones automatizadas cada mañana, permitiendo desviar recursos críticos antes de que se complete el vaciado erróneo.',
      metricLabel: 'Latencia de Actualización',
      metricUnit: 'frecuencia',
      interactiveTitle: 'Simulador de Latencia y Flujos de Obra'
    },
    {
      id: 'variedad',
      name: 'Variedad',
      english: 'Variety',
      color: 'from-purple-500 to-indigo-500',
      lightColor: 'text-purple-400 bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: <Layers className="w-5 h-5" />,
      shortDesc: 'La diversidad de fuentes, estándares, esquemas y tipos de archivos.',
      longDesc: 'El analista de datos VDC (Virtual Design & Construction) se enfrenta al caos de formatos. Un proyecto exitoso une bases de datos estructuradas (bases de presupuestos ERP, SQL), archivos semiestructurados (esquemas jerárquicos IFC, JSON) y flujos no estructurados (fotografías aéreas con drones, audios de comités técnicos, bitácoras firmadas a mano).',
      bimExample: 'Consolidar en un único cuadro de mando el avance físico (modelo 3D Revit), el costo real (SAP ERP) y el reporte de calidad técnica (formularios en la nube).',
      metricLabel: 'Formatos Integrados',
      metricUnit: 'sistemas',
      interactiveTitle: 'Mapeador de Compatibilidad Multiformato'
    },
    {
      id: 'veracidad',
      name: 'Veracidad',
      english: 'Veracity',
      color: 'from-rose-500 to-red-500',
      lightColor: 'text-rose-400 bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      icon: <ShieldCheck className="w-5 h-5" />,
      shortDesc: 'El nivel de confianza, consistencia, calidad y limpieza de los metadatos.',
      longDesc: 'El dato es el reflejo directo del modelador. El principio "GIGO" (Garbage In, Garbage Out) es letal: de nada sirve un sofisticado panel interactivo si los parámetros de volumen en Revit contienen nulos, si las zapatas no registran resistencia estructural, o si las disciplinas se cruzan con nombres contradictorios. La veracidad requiere auditoría automática de datos.',
      bimExample: 'Reglas de validación DAX o scripts de Power Query que rechazan la carga de un modelo 3D si más del 5% de sus elementos clave carecen de un GUID o código de activo estándar.',
      metricLabel: 'Índice de Calidad del Dato',
      metricUnit: 'salud',
      interactiveTitle: 'Consola de Auditoría Automática (Anti-GIGO)'
    },
    {
      id: 'valor',
      name: 'Valor',
      english: 'Value',
      color: 'from-emerald-500 to-teal-500',
      lightColor: 'text-emerald-400 bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      icon: <TrendingUp className="w-5 h-5" />,
      shortDesc: 'La utilidad práctica, retorno financiero e impacto real en el negocio.',
      longDesc: 'Esta es la "V" más importante. Almacenar datos, procesarlos rápido y tenerlos perfectamente limpios no sirve de nada si no reduce los costos de obra, mitiga colisiones críticas antes de construir, u optimiza los tiempos de entrega. El valor es la transformación del dato crudo en decisiones sabias de construcción.',
      bimExample: 'Detectar y resolver 45 interferencias de tuberías contra vigas de acero en la fase virtual evita un costo de demolición física estimado en $75,000 USD y un retraso de 14 días en la ruta crítica.',
      metricLabel: 'Retorno de Inversión (ROI)',
      metricUnit: 'impacto',
      interactiveTitle: 'Calculadora de Valor Financiero y Mitigación'
    }
  ];

  // Live telemetry stream for VELOCIDAD
  useEffect(() => {
    let interval: any;
    if (syncFrequency === 'tiempo-real') {
      interval = setInterval(() => {
        setLiveTelem(prev => {
          const next = [...prev];
          if (next.length > 5) next.shift();
          const sensorVal = Math.floor(Math.random() * 15) + 32; // Simulating concrete core temp
          const timestamp = new Date().toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
          next.push({
            time: timestamp,
            value: sensorVal,
            status: sensorVal > 42 ? 'ALERTA TÉRMICA' : 'ÓPTIMO'
          });
          return next;
        });
      }, 1000);
    } else {
      // Static daily feed
      setLiveTelem([
        { time: '07:00:00', value: 28, status: 'ÓPTIMO' },
        { time: '11:00:00', value: 34, status: 'ÓPTIMO' },
        { time: '15:00:00', value: 37, status: 'ÓPTIMO' },
        { time: '19:00:00', value: 35, status: 'ÓPTIMO' }
      ]);
    }
    return () => clearInterval(interval);
  }, [syncFrequency]);

  const activeVData = dimensions.find(d => d.id === activeV) || dimensions[0];

  // Run audit simulation for VERACIDAD
  const runDataAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setGigoAudit(prev => ({
        ...prev,
        audited: true,
        issuesCount: 0,
        dataHealth: 100,
        resolved: true
      }));
      setIsAuditing(false);
    }, 1500);
  };

  const resetDataAudit = () => {
    setGigoAudit({
      audited: false,
      issuesCount: 14,
      dataHealth: 65,
      resolved: false,
      issuesList: [
        '8 elementos con GUID duplicado (colisiones relacionales)',
        '12 muros IfcWall con "Volumen = 0" (error de modelado)',
        'Faltan metadatos de resistencia (MPa) en 4 zapatas estructurales',
        '43 tuberías MEP clasificadas como tipo genérico sin códigos de mantenimiento'
      ]
    });
  };

  // Calculations for dynamic VOLUMEN card
  const getVolumenDetails = () => {
    switch(projectSize) {
      case 1:
        return { name: 'Vivienda Unifamiliar', rows: '4,500 registros', dbSize: '12 MB', files: '1 x .RVT', desc: 'Bajo volumen. Ideal para almacenamiento local.' };
      case 2:
        return { name: 'Edificio Residencial (10 niveles)', rows: '48,000 registros', dbSize: '140 MB', files: '4 x .RVT (Vinculados)', desc: 'Volumen moderado. Comienza a requerir optimización de consultas.' };
      case 3:
        return { name: 'Hospital de Alta Complejidad', rows: '380,000 registros', dbSize: '1.2 GB', files: '14 x .RVT + IFCs', desc: 'Alto volumen. Es indispensable usar vistas optimizadas en Power BI.' };
      case 4:
        return { name: 'Megaproyecto Aeroportuario (Terminal + Pistas)', rows: '4,200,000 registros', dbSize: '18 GB', files: '42 x .RVT + 100 x .IFC', desc: 'Volumen extremo (Big Data BIM). Indispensable bases SQL y almacenamiento en la nube.' };
      default:
        return { name: 'Hospital', rows: '380,000 registros', dbSize: '1.2 GB', files: '14 x .RVT', desc: 'Alto volumen.' };
    }
  };

  // Calculations for dynamic VALOR card
  const getRoiDetails = () => {
    const clashesPrevented = Math.round(roiFactor * 0.6);
    const moneySaved = clashesPrevented * 1800; // Average cost to fix clash in design vs field
    const delayMitigated = Math.round(roiFactor * 0.15);
    return { clashesPrevented, moneySaved, delayMitigated };
  };

  const currentRoi = getRoiDetails();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 5 "V" CARD SELECTORS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {dimensions.map((dim) => {
          const isActive = activeV === dim.id;
          return (
            <button
              key={dim.id}
              onClick={() => setActiveV(dim.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[110px] cursor-pointer ${
                isActive 
                  ? `bg-slate-950/80 border-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.1)] ring-1 ring-blue-500/10` 
                  : 'bg-slate-950/20 border-slate-900 hover:border-slate-800 hover:bg-slate-950/40'
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <div className={`p-1.5 rounded-lg border ${
                  isActive 
                    ? `bg-gradient-to-r ${dim.color} text-slate-950 border-transparent font-bold` 
                    : 'bg-slate-900 border-transparent text-slate-500'
                }`}>
                  {dim.icon}
                </div>
                <span className="text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">{dim.english}</span>
              </div>
              <div className="mt-2">
                <h4 className={`text-xs font-bold uppercase font-mono tracking-wider transition-colors ${
                  isActive ? 'text-transparent bg-clip-text bg-gradient-to-r ' + dim.color : 'text-slate-300'
                }`}>
                  {dim.name}
                </h4>
                <p className="text-[9px] text-slate-500 leading-tight font-sans mt-0.5 truncate">
                  {dim.shortDesc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* CORE THEORETICAL VIEW */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Left Side: Concept & Information */}
        <div className="md:col-span-5 flex flex-col bg-slate-950/40 border border-slate-900 rounded-2xl p-5 justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-wider ${activeVData.lightColor}`}>
                Eje de Complejidad
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {activeVData.english} Dimension
              </span>
            </div>

            <div>
              <h3 className={`text-lg font-black uppercase font-mono tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${activeVData.color}`}>
                {activeVData.name}
              </h3>
              <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans mt-2">
                {activeVData.longDesc}
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider block">Contexto BIM de Práctica</span>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                {activeVData.bimExample}
              </p>
            </div>
          </div>

          <div className="text-[9px] font-mono text-slate-500 flex items-center gap-1.5 border-t border-slate-900 pt-3 mt-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Dimensión evaluada como {activeV === 'valor' || activeV === 'veracidad' ? 'CRÍTICA' : 'DINÁMICA'} en el análisis.</span>
          </div>
        </div>

        {/* Right Side: Dynamic Interactive Sandbox */}
        <div className="md:col-span-7 flex flex-col bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3 border-b border-slate-900 bg-slate-950/75 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-300">
                {activeVData.interactiveTitle}
              </span>
            </div>
            <span className="text-[8px] font-mono text-slate-500 uppercase bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">
              MODULADOR DINÁMICO
            </span>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              
              {/* VOLUMEN SANDBOX */}
              {activeV === 'volumen' && (
                <motion.div
                  key="volumen-sandbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Ajuste el tamaño de la obra civil para estimar cómo crece el volumen de parámetros y metadatos de construcción que Power Query debe procesar:
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Tamaño del Activo</span>
                      <span className="text-cyan-400 font-bold">{getVolumenDetails().name}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={projectSize}
                      onChange={(e) => setProjectSize(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-slate-600 font-bold">
                      <span>CASA</span>
                      <span>CONDOMINIO</span>
                      <span>HOSPITAL</span>
                      <span>AEROPUERTO</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">Entidades IFC</span>
                      <span className="text-sm font-bold font-mono text-cyan-400 tracking-tight">{getVolumenDetails().rows}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">Peso DB Cruda</span>
                      <span className="text-sm font-bold font-mono text-slate-200 tracking-tight">{getVolumenDetails().dbSize}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">Archivos BIM</span>
                      <span className="text-sm font-bold font-mono text-slate-200 tracking-tight">{getVolumenDetails().files}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-[10px] text-cyan-400/80 leading-normal font-sans">
                    💡 <strong>Lección de Rendimiento:</strong> {getVolumenDetails().desc}
                  </div>
                </motion.div>
              )}

              {/* VELOCIDAD SANDBOX */}
              {activeV === 'velocidad' && (
                <motion.div
                  key="velocidad-sandbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Seleccione la velocidad del flujo de datos de obra. Observe la simulación de telemetría térmica de fraguado de concreto en tiempo real:
                  </p>

                  <div className="flex gap-2">
                    {[
                      { id: 'lote', label: 'Mensual / Lotes', desc: 'Minutas en PDF' },
                      { id: 'diario', label: 'Diario (Carga programada)', desc: 'Power BI Scheduled Refresh' },
                      { id: 'tiempo-real', label: 'Tiempo Real (IoT Stream)', desc: 'Sensores en Obra directos' }
                    ].map((freq) => (
                      <button
                        key={freq.id}
                        onClick={() => setSyncFrequency(freq.id as any)}
                        className={`flex-1 p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          syncFrequency === freq.id 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                            : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800'
                        }`}
                      >
                        <span className="text-[10px] font-bold font-mono uppercase block">{freq.label}</span>
                        <span className="text-[8px] opacity-75 font-sans mt-0.5 block leading-tight">{freq.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                        <Zap className={`w-3.5 h-3.5 text-amber-400 ${syncFrequency === 'tiempo-real' ? 'animate-pulse' : ''}`} />
                        <span>Moni-Core Telemetry Concrete Stream</span>
                      </span>
                      <span className="text-[8px] font-mono text-slate-500">
                        STATUS: {syncFrequency === 'tiempo-real' ? 'STREAMING ACTIVE' : 'STATIC DB'}
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[10px]">
                      {liveTelem.map((t, idx) => (
                        <div key={idx} className="flex justify-between items-center text-slate-300 py-0.5 border-b border-slate-950 last:border-0">
                          <span className="text-slate-500">[{t.time}] Sensor-Concrete-C01:</span>
                          <div className="flex gap-3">
                            <span className="font-bold text-amber-400">{t.value} °C</span>
                            <span className={`text-[8px] px-1 rounded font-bold ${
                              t.status === 'ALERTA TÉRMICA' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            }`}>{t.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VARIEDAD SANDBOX */}
              {activeV === 'variedad' && (
                <motion.div
                  key="variedad-sandbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Un verdadero analista BIM cruza múltiples fuentes. Seleccione qué formatos desea fusionar en el tablero para ver la complejidad del ETL:
                  </p>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'ifc', label: 'IFC (Modelos 3D)', type: 'Semiestructurado' },
                      { id: 'xlsx', label: 'Excel (Presupuestos ERP)', type: 'Estructurado' },
                      { id: 'sql', label: 'Sensores IoT (SQL)', type: 'Estructurado' },
                      { id: 'pdf', label: 'Planos PDF (Dificultad)', type: 'No estructurado' },
                      { id: 'drone', label: 'Drones Video (Dificultad)', type: 'No estructurado' },
                      { id: 'minutas', label: 'Audios de Obra', type: 'No estructurado' }
                    ].map((format) => {
                      const isSelected = selectedFormats.includes(format.id);
                      return (
                        <button
                          key={format.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedFormats(selectedFormats.filter(f => f !== format.id));
                            } else {
                              setSelectedFormats([...selectedFormats, format.id]);
                            }
                          }}
                          className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-purple-500/10 border-purple-500/40 text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.1)]' 
                              : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800'
                          }`}
                        >
                          <span className="text-[10px] font-bold font-mono uppercase block">{format.label}</span>
                          <span className="text-[8px] opacity-75 font-sans mt-0.5 block leading-tight">{format.type}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider block mb-2">Diagnóstico de la Ingesta de Power Query</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(10, selectedFormats.length * 17))}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-purple-400 font-bold whitespace-nowrap">
                        {selectedFormats.length === 0 ? 'Sin datos' :
                         selectedFormats.length <= 2 ? 'Conexión Fácil' :
                         selectedFormats.length <= 4 ? 'ETL Intermedio' : 'Complejidad Extrema'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans leading-normal mt-2">
                      {selectedFormats.length === 0 ? 'Seleccione al menos un formato para iniciar el mapeo.' :
                       selectedFormats.includes('pdf') || selectedFormats.includes('drone') || selectedFormats.includes('minutas') ?
                       '⚠️ Has incluido fuentes no estructuradas. Requerirás servicios de Inteligencia Artificial (AI Builder, Azure Cognitive o APIs de transcripción) para convertirlas a tablas relacionales antes de Power BI.' :
                       '✅ Combinación limpia. Power Query puede resolver esta conexión de forma directa relacionando las tablas mediante campos llave como el GUID del modelo.'}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* VERACIDAD SANDBOX */}
              {activeV === 'veracidad' && (
                <motion.div
                  key="veracidad-sandbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    El modelo cargado contiene varios errores graves de metadatos (GIGO). Ejecute la auditoría automática de Power Query para sanear la información:
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mb-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                        <AlertTriangle className={`w-3.5 h-3.5 ${gigoAudit.resolved ? 'text-emerald-400' : 'text-rose-400'}`} />
                        <span>Diagnóstico de Metadatos del Modelo</span>
                      </span>
                      <span className="text-[8px] font-mono text-slate-500">
                        HEALTH: <span className={gigoAudit.resolved ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{gigoAudit.dataHealth}%</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[9.5px] font-sans">
                      {gigoAudit.resolved ? (
                        <div className="p-4 text-center space-y-2">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                          <div>
                            <span className="font-mono text-xs font-bold text-slate-200">¡Limpieza de Datos Completa!</span>
                            <p className="text-[10px] text-slate-400 mt-0.5">Filtros y parámetros nulos corregidos. Compatible con DAX sin errores de división entre cero.</p>
                          </div>
                        </div>
                      ) : (
                        gigoAudit.issuesList.map((issue, idx) => (
                          <div key={idx} className="flex gap-2 items-start text-rose-300 bg-rose-500/5 p-1 rounded border border-rose-500/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                            <span>{issue}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!gigoAudit.resolved ? (
                      <button
                        onClick={runDataAudit}
                        disabled={isAuditing}
                        className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 disabled:opacity-50 text-slate-950 font-bold font-mono text-[10px] uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-500/10"
                      >
                        {isAuditing ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Corriendo scripts de validación ETL...</span>
                          </>
                        ) : (
                          <>
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Ejecutar Limpieza y Auditoría</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={resetDataAudit}
                        className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold font-mono text-[10px] uppercase rounded-lg cursor-pointer"
                      >
                        Resetear Errores GIGO
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* VALOR SANDBOX */}
              {activeV === 'valor' && (
                <motion.div
                  key="valor-sandbox"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Ajuste la madurez analítica del equipo VDC. A mayor integración y calidad del dato, mayor es la mitigación de sobrecostos reales en obra física:
                  </p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Madurez Analítica (Power BI + VDC)</span>
                      <span className="text-emerald-400 font-bold">{roiFactor}% (Óptima)</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={roiFactor}
                      onChange={(e) => setRoiFactor(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-slate-600 font-bold">
                      <span>NIVEL BÁSICO (EXCEL)</span>
                      <span>INTERMEDIO (BIM)</span>
                      <span>AVANZADO (VDC + BI)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">Interferencias Evitadas</span>
                      <span className="text-base font-bold font-mono text-emerald-400 tracking-tight">{currentRoi.clashesPrevented} colisiones</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">Ahorro Estimado ($)</span>
                      <span className="text-base font-bold font-mono text-slate-200 tracking-tight">${currentRoi.moneySaved.toLocaleString()} USD</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-900">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block">Días de Obra Salvados</span>
                      <span className="text-base font-bold font-mono text-slate-200 tracking-tight">{currentRoi.delayMitigated} días hábiles</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400/80 leading-normal font-sans">
                    💡 <strong>Conclusión Académica:</strong> El verdadero valor del dato no reside en poseerlo, sino en usar la analítica relacional para tomar decisiones oportunas de ingeniería antes de colocar el primer ladrillo físico.
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            <div className="mt-4 pt-3.5 border-t border-slate-900 flex justify-between items-center text-[9px] font-mono text-slate-500 font-bold">
              <span>{activeVData.metricLabel}:</span>
              <span className={`px-1.5 py-0.5 rounded ${activeVData.lightColor} font-extrabold uppercase`}>
                {activeV === 'volumen' ? getVolumenDetails().rows :
                 activeV === 'velocidad' ? (syncFrequency === 'tiempo-real' ? 'Milisegundos (IoT)' : syncFrequency === 'diario' ? 'Cada 24 horas' : 'Mensual / Lote') :
                 activeV === 'variedad' ? `${selectedFormats.length} orígenes activos` :
                 activeV === 'veracidad' ? (gigoAudit.resolved ? '100% Sólido' : '65% Requiere Limpieza') :
                 `+$${currentRoi.moneySaved.toLocaleString()} USD ROI`}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
