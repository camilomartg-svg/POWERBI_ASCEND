import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Cpu, 
  Database, 
  Send, 
  Download, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  FileSpreadsheet, 
  HelpCircle,
  RefreshCw
} from 'lucide-react';

interface EventLog {
  id: string;
  timestamp: string;
  type: string;
  value: string;
  status: 'buffered' | 'ingested';
}

export default function DataEtlParadigms() {
  const [paradigm, setParadigm] = useState<'push' | 'pull'>('push');

  // Push Simulation States
  const [pushLogs, setPushLogs] = useState<EventLog[]>([
    { id: '1', timestamp: '13:40:12', type: 'Sensor CO2', value: '350 ppm', status: 'ingested' },
    { id: '2', timestamp: '13:41:05', type: 'Sensor Gas', value: '0.02% CH4', status: 'ingested' }
  ]);
  const [pushAnimating, setPushAnimating] = useState(false);
  const [newPushEvent, setNewPushEvent] = useState<EventLog | null>(null);

  // Pull Simulation States
  const [sourceBuffer, setSourceBuffer] = useState<EventLog[]>([
    { id: 'p1', timestamp: '08:00:00', type: 'Avance Túnel', value: '1.2 m excavados', status: 'buffered' },
    { id: 'p2', timestamp: '11:30:00', type: 'Avance Losa', value: '15 m³ vaciados', status: 'buffered' }
  ]);
  const [destinationLogs, setDestinationLogs] = useState<EventLog[]>([
    { id: 'p0', timestamp: 'Ayer', type: 'Cierre Diario', value: 'Reporte Conciliado', status: 'ingested' }
  ]);
  const [pullAnimating, setPullAnimating] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);

  // Auto-Pull Scheduler Mock
  const [secondsToNextPull, setSecondsToNextPull] = useState(15);
  const [autoPullActive, setAutoPullActive] = useState(true);

  // Countdown timer for automatic Pull simulation
  useEffect(() => {
    if (paradigm !== 'pull' || !autoPullActive) return;

    const interval = setInterval(() => {
      setSecondsToNextPull((prev) => {
        if (prev <= 1) {
          triggerPull();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paradigm, autoPullActive, sourceBuffer]);

  // Trigger a Push Event
  const triggerPush = (type: 'gas' | 'sst') => {
    if (pushAnimating) return;

    const timeString = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const event: EventLog = {
      id: Math.random().toString(),
      timestamp: timeString,
      type: type === 'gas' ? 'Sensor Gas Crítico' : 'Alerta SST Botón de Pánico',
      value: type === 'gas' ? '0.85% CH4 (ALERTA)' : 'Incidente de Desprendimiento',
      status: 'ingested'
    };

    setNewPushEvent(event);
    setPushAnimating(true);

    // After animation finishes, commit to ingested logs list
    setTimeout(() => {
      setPushLogs(prev => [event, ...prev]);
      setPushAnimating(false);
      setNewPushEvent(null);
    }, 1200);
  };

  // Log progress into local buffer for Pull Simulation
  const addSourcePullRecord = (type: 'excavation' | 'concrete') => {
    const timeString = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newRecord: EventLog = {
      id: Math.random().toString(),
      timestamp: timeString,
      type: type === 'excavation' ? 'Avance Túnel (Residente)' : 'Control Concreto (Planta)',
      value: type === 'excavation' ? '0.8 metros lineales' : '8.5 m³ de Mezcla',
      status: 'buffered'
    };

    setSourceBuffer(prev => [...prev, newRecord]);
  };

  // Execute the "PULL" action to fetch buffer to destination
  const triggerPull = () => {
    if (pullAnimating || sourceBuffer.length === 0) return;

    setPullAnimating(true);
    setPullProgress(10);

    const interval = setInterval(() => {
      setPullProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    setTimeout(() => {
      // Transfer buffered items to destination with status updated
      const ingestedItems = sourceBuffer.map(item => ({ ...item, status: 'ingested' as const }));
      setDestinationLogs(prev => [...ingestedItems.reverse(), ...prev]);
      setSourceBuffer([]);
      setPullAnimating(false);
      setPullProgress(0);
      setSecondsToNextPull(15);
    }, 1200);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* BANNER HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950/60 p-4 border border-slate-900 rounded-2xl">
        <div className="md:col-span-8 space-y-1">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
              3. Paradigmas de Flujos de Extracción (ETL)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal font-sans">
            Conceptualmente, extraer no es "copiar". Es el proceso de mover datos desde sistemas operativos (orígenes) hacia sistemas analíticos (destinos). Se rige por dos paradigmas de flujo según el dinamismo y la urgencia.
          </p>
        </div>
        
        {/* Toggle Button Group */}
        <div className="md:col-span-4 flex bg-slate-900 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setParadigm('push')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-all ${
              paradigm === 'push'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Send className="w-3.5 h-3.5 inline mr-1.5 align-middle" />
            Push (Empuje)
          </button>
          <button
            onClick={() => setParadigm('pull')}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider text-center cursor-pointer transition-all ${
              paradigm === 'pull'
                ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Download className="w-3.5 h-3.5 inline mr-1.5 align-middle" />
            Pull (Extracción)
          </button>
        </div>
      </div>

      {/* DETAILED COMPARATIVE GRID CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* THE PLAYGROUND STAGE */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {paradigm === 'push' ? 'SIMULADOR PUSH: EVENTOS EN TIEMPO REAL' : 'SIMULADOR PULL: CARGAS POR LOTES PROGRAMADAS'}
              </span>
              <div className="flex gap-1.5 items-center">
                <span className={`w-1.5 h-1.5 rounded-full ${paradigm === 'push' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500 animate-pulse'}`} />
                <span className="text-[8px] font-mono text-slate-500 uppercase">Motor de Simulación</span>
              </div>
            </div>

            {/* FLOW PIPELINE CANVAS */}
            <div className="relative bg-slate-950/60 border border-slate-900/80 rounded-xl p-4 h-52 flex items-center justify-between overflow-hidden">
              {/* Central flow pipeline track */}
              <div className="absolute left-1/4 right-1/4 h-1 bg-slate-900 border-t border-b border-slate-800" />
              
              {/* Dynamic traveling data packet for PUSH */}
              {paradigm === 'push' && pushAnimating && newPushEvent && (
                <motion.div
                  initial={{ left: '20%', opacity: 0 }}
                  animate={{ left: '80%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute y-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1"
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500 animate-ping absolute" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500" />
                  <span className="text-[8px] font-mono text-emerald-400 bg-slate-950 px-1 border border-emerald-900 rounded absolute -top-5 whitespace-nowrap">
                    {newPushEvent.type}
                  </span>
                </motion.div>
              )}

              {/* Dynamic traveling batch envelope for PULL */}
              {paradigm === 'pull' && pullAnimating && (
                <motion.div
                  initial={{ left: '20%', opacity: 0 }}
                  animate={{ left: '80%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute y-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1"
                >
                  <div className="p-2 bg-blue-500/10 border border-blue-500 rounded-lg flex items-center gap-1 shadow-lg">
                    <Database className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
                    <span className="text-[8px] font-mono text-blue-400 font-bold">Lote ({sourceBuffer.length + destinationLogs.filter(i => i.id.startsWith('p') && i.id !== 'p0' && i.status === 'ingested').length} items)</span>
                  </div>
                </motion.div>
              )}

              {/* Left Side: Source System */}
              <div className="w-1/3 flex flex-col items-center gap-2 text-center relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 block">SISTEMA ORIGEN</span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">Frente de Obra / Sensores</span>
                </div>

                {/* Local buffering indicators for PULL */}
                {paradigm === 'pull' && (
                  <div className="mt-2 w-full max-w-[130px] bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                    <div className="flex items-center justify-between text-[8px] font-mono mb-1">
                      <span className="text-slate-500 uppercase">Buffer Local</span>
                      <span className="text-blue-400 font-bold">({sourceBuffer.length})</span>
                    </div>
                    <div className="space-y-1 max-h-16 overflow-y-auto">
                      {sourceBuffer.length === 0 ? (
                        <span className="text-[8px] font-mono text-slate-600 italic block">Vacío</span>
                      ) : (
                        sourceBuffer.map(item => (
                          <div key={item.id} className="text-[7px] font-mono bg-blue-950/20 border border-blue-900/20 rounded p-0.5 text-slate-400 truncate text-left">
                            {item.timestamp} • {item.type}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Central flow status badge overlay */}
              <div className="bg-slate-950 px-2 py-1 rounded-full border border-slate-900 text-[8px] font-mono text-slate-500 z-10 select-none">
                {paradigm === 'push' ? (
                  pushAnimating ? 'ENVIANDO INMEDIATO' : 'ESCUCHANDO EVENTOS'
                ) : (
                  pullAnimating ? `CONECTANDO Y EXTRÁYENDO ${pullProgress}%` : 'SIGUIENTE CONSULTA PROGRAMADA'
                )}
              </div>

              {/* Right Side: Analytical Destination */}
              <div className="w-1/3 flex flex-col items-center gap-2 text-center relative z-10">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <Database className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 block">DESTINO ANALÍTICO</span>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">Power BI / Data Lake</span>
                </div>

                {/* Total ingested count display */}
                <div className="mt-2 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800/80">
                  <span className="text-[9px] font-mono text-slate-400">
                    Ingestados: <strong className={paradigm === 'push' ? 'text-emerald-400' : 'text-blue-400'}>
                      {paradigm === 'push' ? pushLogs.length : destinationLogs.length}
                    </strong>
                  </span>
                </div>
              </div>

            </div>

            {/* ACTION TRIGGERS & SIMULATOR CONTROL PANEL */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/30 p-3 rounded-xl border border-slate-900">
              
              {paradigm === 'push' ? (
                /* PUSH ACTION TRIGGERS */
                <>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">Simular Eventos del Origen (Disparador Push)</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => triggerPush('gas')}
                        disabled={pushAnimating}
                        className="flex-1 py-2 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer transition-all disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 inline mr-1 align-top" />
                        Sensor Gas Crítico
                      </button>
                      <button
                        onClick={() => triggerPush('sst')}
                        disabled={pushAnimating}
                        className="flex-1 py-2 px-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-400 hover:text-red-300 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer transition-all disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 inline mr-1 align-top" />
                        Pánico SST de Obra
                      </button>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 block">Cada click representa un evento imprevisto que gatilla de inmediato el envío hacia el destino.</span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">Comportamiento del Flujo</span>
                    <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg text-[10px] text-slate-300 leading-relaxed">
                      El origen <strong>empuja (Push)</strong> la información sin esperar peticiones. Es asíncrono y reduce la latencia a milisegundos, vital para alertas tempranas y seguridad industrial en obra.
                    </div>
                  </div>
                </>
              ) : (
                /* PULL ACTION TRIGGERS */
                <>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">1. Simular Eventos Diarios (Acumular en Origen)</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addSourcePullRecord('excavation')}
                        className="flex-1 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer transition-all"
                      >
                        <TrendingUp className="w-3.5 h-3.5 inline mr-1 align-top" />
                        Avance Físico Túnel
                      </button>
                      <button
                        onClick={() => addSourcePullRecord('concrete')}
                        className="flex-1 py-2 px-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer transition-all"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 inline mr-1 align-top" />
                        Cubicación Concreto
                      </button>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 block">Acumula registros en la base de datos operacional. El destino (Power BI) aún no ve los cambios.</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 font-bold">2. Solicitar Extracción (Pull Analítico)</span>
                      
                      {/* Interval auto-pull check */}
                      <button 
                        onClick={() => setAutoPullActive(!autoPullActive)}
                        className="text-[8px] font-mono text-slate-500 hover:text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900 cursor-pointer"
                      >
                        {autoPullActive ? `Auto: Activo (${secondsToNextPull}s)` : 'Auto: Desactivado'}
                      </button>
                    </div>
                    
                    <button
                      onClick={triggerPull}
                      disabled={pullAnimating || sourceBuffer.length === 0}
                      className="w-full py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 text-blue-400 hover:text-blue-300 font-mono text-[9.5px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Extraer Lote Acumulado (Pull)
                    </button>
                    <span className="text-[8px] font-mono text-slate-500 block">El destino interroga al origen en base a un horario fijo o de forma manual, descargando todo el bloque.</span>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* ACTIVE DISCIPLINE COMPARATOR LEGEND */}
          <div className="pt-3 border-t border-slate-900 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Caso Práctico: Push (Empuje)</span>
              <p className="text-[10.5px] font-sans text-slate-400 leading-normal">
                <strong>Sensores en Túnel:</strong> Cuando el detector de monóxido de carbono excede el límite permisible de PPM, no puede esperar una consulta nocturna. Envía un paquete HTTP inmediato (Webhook) para alertar y evacuar al personal técnico de forma instantánea.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Caso Práctico: Pull (Extracción)</span>
              <p className="text-[10.5px] font-sans text-slate-400 leading-normal">
                <strong>Tableros Power BI:</strong> No es práctico interrogar la base de datos transaccional cada segundo para ver avances de pavimentación. Se programa una extracción Pull nocturna (8:00 PM) para recopilar y resumir la jornada constructiva.
              </p>
            </div>
          </div>
        </div>

        {/* LOG PANEL AND THEORETICAL BREAKDOWN */}
        <div className="lg:col-span-4 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                Registros en Destino
              </h4>
            </div>

            {/* Ingestion Stream Logs */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {paradigm === 'push' ? (
                /* Push Ingested Logs */
                pushLogs.map((log) => (
                  <div key={log.id} className="p-2.5 bg-slate-950 border border-emerald-500/10 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[8px] font-mono">
                      <span className="text-emerald-400 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 uppercase tracking-wider">
                        Push Real-Time
                      </span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-200">
                      {log.type}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Valor: <span className="font-mono text-slate-300 font-semibold">{log.value}</span>
                    </div>
                  </div>
                ))
              ) : (
                /* Pull Ingested Logs */
                destinationLogs.map((log) => (
                  <div key={log.id} className="p-2.5 bg-slate-950 border border-blue-500/10 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-[8px] font-mono">
                      <span className="text-blue-400 font-bold bg-blue-500/5 px-1.5 py-0.5 rounded border border-blue-500/10 uppercase tracking-wider">
                        Pull Ingested
                      </span>
                      <span className="text-slate-500">{log.timestamp}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-200">
                      {log.type}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Detalle: <span className="font-mono text-slate-300 font-semibold">{log.value}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Core Theoretical Points */}
            <div className="space-y-2.5 border-t border-slate-900 pt-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Límites y Advertencias</span>
              
              <div className="flex gap-2 items-start text-[10.5px] leading-relaxed text-slate-400 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <p>
                  <strong>Saturación de Push:</strong> Enviar millones de micro-registros en tiempo real satura las bases analíticas. Se deben usar colas de mensajes (Kafka/Event Hubs) antes de Power BI.
                </p>
              </div>

              <div className="flex gap-2 items-start text-[10.5px] leading-relaxed text-slate-400 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                <p>
                  <strong>Gobernanza de Pull:</strong> Consultar un origen muy frecuentemente genera carga transaccional que puede ralentizar los sistemas operativos de obra. Requiere programaciones lógicas de intervalos óptimos.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal flex items-start gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Recomendación del Experto:</strong> Combine ambos mundos usando el paradigma de <em>Arquitectura Lambda</em>, manejando velocidad (Push) para alarmas y lotes (Pull) para conciliación de presupuestos.
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
