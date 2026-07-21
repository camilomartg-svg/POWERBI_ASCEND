import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HardHat, 
  ClipboardList, 
  MapPin, 
  Activity, 
  FileText, 
  Sliders, 
  Truck, 
  Database,
  Droplet, 
  Thermometer, 
  TrendingUp, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Wifi, 
  Battery, 
  Check,
  RefreshCw,
  Plus,
  Scale,
  Gauge
} from 'lucide-react';

interface FieldDataExplorerProps {
  slideId: string;
}

// Interfaces for local states
interface FieldReport {
  id: string;
  type: string;
  subType: string;
  location: string;
  timestamp: string;
  reporter: string;
  detail: string;
  status: 'Completado' | 'En Observación' | 'Crítico';
}

interface WeighTicket {
  ticketId: string;
  truckId: string;
  material: string;
  weightIn: number;
  weightOut: number;
  netWeight: number;
  bulkingVol: number;
  timestamp: string;
}

export default function FieldDataExplorer({ slideId }: FieldDataExplorerProps) {
  // Common state
  const [activeTab, setActiveTab] = useState<string>('sub1');

  // Slide 1 (Registro Directo) States
  const [reports, setReports] = useState<FieldReport[]>([
    { id: 'R-001', type: 'Biótica', subType: 'Ahuyentamiento', location: 'Túnel Entrada K1+200', timestamp: '10:15 AM', reporter: 'Ing. Elena Rostova', detail: 'Avistamiento de Zorro Chucho (Cerdocyon thous) en el talud de entrada. Reubicado exitosamente.', status: 'Completado' },
    { id: 'R-002', type: 'SST', subType: 'Acto Inseguro', location: 'Viaducto Pilar 3', timestamp: '11:30 AM', reporter: 'SST Carlos Ruiz', detail: 'Personal trabajando sin arnés de doble línea en andamio auxiliar. Actividad suspendida hasta corrección.', status: 'Completado' },
    { id: 'R-003', type: 'SST', subType: 'Túnel Registro', location: 'Frente de Avance Túnel 2', timestamp: '12:05 PM', reporter: 'SST Carlos Ruiz', detail: 'Registro activo de 14 operadores en túnel para inicio de voladura.', status: 'En Observación' }
  ]);
  const [newSpecie, setNewSpecie] = useState('Oso Perezoso (Melursus ursinus)');
  const [newLoc, setNewLoc] = useState('Viaducto Pilar 4');
  const [tunnelWorkers, setTunnelWorkers] = useState([
    { name: 'Juan Pérez', role: 'Perforador', inside: true, inTime: '07:30' },
    { name: 'Luis Gómez', role: 'Operador Jumbo', inside: true, inTime: '08:15' },
    { name: 'María Torres', role: 'Ing. Residente', inside: false, inTime: '--' },
    { name: 'Andrés Felipe', role: 'Electromecánico', inside: true, inTime: '08:45' },
    { name: 'Sonia Salazar', role: 'Topógrafa', inside: false, inTime: '--' }
  ]);

  // Slide 2 (Instrumentación) States
  // RMR inputs
  const [rmr1, setRmr1] = useState(12); // Resistencia roca (0-15)
  const [rmr2, setRmr2] = useState(15); // RQD (0-20)
  const [rmr3, setRmr3] = useState(10); // Espaciamiento (0-20)
  const [rmr4, setRmr4] = useState(18); // Condición juntas (0-30)
  const [rmr5, setRmr5] = useState(10); // Agua (0-15)
  const [activeSensor, setActiveSensor] = useState('piezometer');

  // Slide 3 (Logística) States
  const [truckId, setTruckId] = useState('V-102');
  const [materialType, setMaterialType] = useState('Tierra Excavada');
  const [weightIn, setWeightIn] = useState(28.4);
  const [weightOut, setWeightOut] = useState(14.1);
  const [weighTickets, setWeighTickets] = useState<WeighTicket[]>([
    { ticketId: 'T-8521', truckId: 'V-105', material: 'Roca de Túnel', weightIn: 32.2, weightOut: 14.5, netWeight: 17.7, bulkingVol: 12.6, timestamp: '13:40' },
    { ticketId: 'T-8520', truckId: 'V-109', material: 'Tierra de Descapote', weightIn: 27.8, weightOut: 14.0, netWeight: 13.8, bulkingVol: 10.6, timestamp: '13:22' }
  ]);
  const [boltStock, setBoltStock] = useState(420);
  const [steelStock, setSteelStock] = useState(84.5);
  const [concreteStock, setConcreteStock] = useState(140);

  // Slide 4 (Calidad y Ambiental) States
  const [waterPh, setWaterPh] = useState(7.2);
  const [waterTurb, setWaterTurb] = useState(15);
  const [waterSst, setWaterSst] = useState(25);
  const [curingDays, setCuringDays] = useState(28);
  const [concreteSlump, setConcreteSlump] = useState(4);

  // Slide 5 (Planificación) States
  const [rainDelay, setRainDelay] = useState(false);
  const [truckBreakdown, setTruckBreakdown] = useState(false);
  const [strikeDelay, setStrikeDelay] = useState(false);
  const [designDelay, setDesignDelay] = useState(false);

  // Reset subtab on slideId change
  useEffect(() => {
    setActiveTab('sub1');
  }, [slideId]);

  // Handlers
  const handleAddReport = (type: 'Biótica' | 'SST') => {
    const newReport: FieldReport = {
      id: `R-00${reports.length + 1}`,
      type,
      subType: type === 'Biótica' ? 'Ahuyentamiento' : 'Censo de Charla',
      location: newLoc,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reporter: type === 'Biótica' ? 'Ing. Elena Rostova' : 'SST Carlos Ruiz',
      detail: type === 'Biótica' 
        ? `Censo forestal de ahuyentamiento de especie [${newSpecie}] registrado en coordenadas geográficas de obra.` 
        : `Registro de charla de 5 minutos impartida sobre el uso de EPPs obligatorios en frentes de excavación.`,
      status: 'Completado'
    };
    setReports([newReport, ...reports]);
  };

  const handleToggleWorker = (idx: number) => {
    const updated = [...tunnelWorkers];
    updated[idx].inside = !updated[idx].inside;
    updated[idx].inTime = updated[idx].inside 
      ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '--';
    setTunnelWorkers(updated);
  };

  const handleAddTicket = () => {
    const net = parseFloat((weightIn - weightOut).toFixed(2));
    // Factor de esponjamiento
    const factor = materialType === 'Roca de Túnel' ? 1.4 : 1.3;
    // Volumen = peso / densidad simulada (1.8 ton/m3) * factor
    const vol = parseFloat(((net / 1.8) * factor).toFixed(2));

    const newTicket: WeighTicket = {
      ticketId: `T-${Math.floor(1000 + Math.random() * 9000)}`,
      truckId,
      material: materialType,
      weightIn,
      weightOut,
      netWeight: net,
      bulkingVol: vol,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setWeighTickets([newTicket, ...weighTickets]);
    // Deduct concrete or supplies slightly as a fun interaction
    setConcreteStock(prev => Math.max(20, prev - 8));
  };

  // Calculations for Slide 2 (RMR)
  const rmrScore = rmr1 + rmr2 + rmr3 + rmr4 + rmr5;
  const getRmrClass = (score: number) => {
    if (score > 80) return { label: 'Clase I: Roca Muy Buena', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5', support: 'Autosoportante, pernos ocasionales.' };
    if (score > 60) return { label: 'Clase II: Roca Buena', color: 'text-teal-400 border-teal-500/30 bg-teal-500/5', support: 'Pernos sistemáticos localizados L=3m espaciados 1.5m + Hormigón lanzado 50-100mm.' };
    if (score > 40) return { label: 'Clase III: Roca Media', color: 'text-amber-400 border-amber-500/30 bg-amber-500/5', support: 'Pernos sistemáticos L=4m espaciados 1-1.5m + Cerchas ligeras en clave + Hormigón lanzado 100-150mm.' };
    if (score > 20) return { label: 'Clase IV: Roca Mala', color: 'text-orange-400 border-orange-500/30 bg-orange-500/5', support: 'Cerchas de acero pesadas espaciadas 0.8-1m + Bulones sistemáticos + Hormigón lanzado 150-200mm.' };
    return { label: 'Clase V: Roca Muy Mala', color: 'text-red-400 border-red-500/30 bg-red-500/5', support: 'Sostenimiento inmediato en frente de avance con paraguas de micro-pilotes + Cerchas cada 0.5m + Hormigón 200mm+.' };
  };
  const rmrClass = getRmrClass(rmrScore);

  // Calculations for Slide 4 (Ambiental)
  const isAmbientAlert = waterPh < 6.5 || waterPh > 8.5 || waterTurb > 20 || waterSst > 30;
  const concreteStrength = curingDays === 7 
    ? 24.5 
    : curingDays === 14 
      ? 31.5 
      : 35.0; // MPa for standard H-35 concrete

  // Calculations for Slide 5 (Rendimiento)
  const baseExcavation = 4.5; // m lineales por dia planificado
  const baseConcrete = 180; // m3 de concreto planificado
  
  let delayHours = 0;
  if (rainDelay) delayHours += 3.5;
  if (truckBreakdown) delayHours += 1.5;
  if (strikeDelay) delayHours += 8.0;
  if (designDelay) delayHours += 4.0;

  // Actual performance falls based on delay hours
  const actualExcavation = parseFloat(Math.max(0.5, baseExcavation * (1 - delayHours / 16)).toFixed(2));
  const actualConcrete = parseFloat(Math.max(20, baseConcrete * (1 - delayHours / 20)).toFixed(2));
  const projectDeviation = delayHours > 0 ? `+${(delayHours * 1.2).toFixed(1)} días de holgura perdida` : 'A tiempo / Ruta crítica óptima';

  return (
    <div className="w-full">
      {/* ---------------- SLIDE 1: REGISTRO DIRECTO EN CAMPO ---------------- */}
      {slideId === 'field-direct-registry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* SIMULATED MOBILE TABLET */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 shadow-2xl p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            {/* Tablet Header Status */}
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                  SIMULADOR TABLET DE CAMPO (OFFLINE)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-emerald-500" /> GPS OK (±3m)
                </span>
                <span className="flex items-center gap-1">
                  <Battery className="w-3 h-3 text-emerald-400" /> 94%
                </span>
              </div>
            </div>

            {/* Sub-tab Selection inside the Tablet */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => setActiveTab('sub1')}
                className={`py-2 rounded-lg text-[10px] font-mono font-bold uppercase border cursor-pointer transition-all ${
                  activeTab === 'sub1'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                🚨 SST & CONTROL DE INGRESO
              </button>
              <button
                onClick={() => setActiveTab('sub2')}
                className={`py-2 rounded-lg text-[10px] font-mono font-bold uppercase border cursor-pointer transition-all ${
                  activeTab === 'sub2'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                🦊 FAUNA BIÓTICA & FORESTA
              </button>
            </div>

            {/* Tab 1 Content: SST / Tunnel entry roster */}
            {activeTab === 'sub1' && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-300 mb-2 uppercase flex items-center gap-2">
                    <span>Control Activo de Personal en Túnel</span>
                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] rounded">
                      Frente Avance 2
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mb-3 leading-relaxed font-sans">
                    Haga clic en los interruptores para simular el ingreso o salida de los operarios del túnel en tiempo real. Este registro alimenta las bitácoras de emergencias SST.
                  </p>

                  <div className="bg-slate-950/50 border border-slate-900 rounded-xl divide-y divide-slate-900 max-h-[180px] overflow-y-auto">
                    {tunnelWorkers.map((worker, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 hover:bg-slate-900/30">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${worker.inside ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`} />
                          <div>
                            <p className="text-xs font-semibold text-slate-300 font-sans">{worker.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono uppercase">{worker.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-mono text-slate-500">
                            {worker.inside ? `Ingreso: ${worker.inTime}` : 'Fuera de túnel'}
                          </span>
                          <button
                            onClick={() => handleToggleWorker(idx)}
                            className={`px-2 py-1 rounded text-[9px] font-mono uppercase font-bold cursor-pointer border transition-all ${
                              worker.inside
                                ? 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                          >
                            {worker.inside ? 'Registrar Salida' : 'Registrar Ingreso'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Total personal activo en Túnel: <strong className="text-emerald-400">{tunnelWorkers.filter(w => w.inside).length}</strong>
                  </span>
                  <button
                    onClick={() => handleAddReport('SST')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wide flex items-center gap-1 hover:bg-amber-400 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" /> Generar Alerta SST
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2 Content: Biótica */}
            {activeTab === 'sub2' && (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
                    <span>Censo de Ahuyentamiento de Fauna</span>
                    <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] rounded">
                      Biótica
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    Formulario para el registro rápido de individuos avistados durante el descapote y veda ambiental en el tramo de viaducto.
                  </p>

                  <div className="grid grid-cols-2 gap-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Especie Detectada</label>
                      <select
                        value={newSpecie}
                        onChange={(e) => setNewSpecie(e.target.value)}
                        className="w-full bg-slate-950 text-slate-300 border border-slate-900 rounded p-1.5 text-xs font-sans outline-none focus:border-emerald-500/40"
                      >
                        <option value="Zorro Chucho (Cerdocyon thous)">Zorro Chucho</option>
                        <option value="Oso Perezoso (Melursus ursinus)">Oso Perezoso</option>
                        <option value="Iguana Verde (Iguana iguana)">Iguana Verde</option>
                        <option value="Sapa Común (Rhinella marina)">Sapa Común</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Ubicación (GPS de Obra)</label>
                      <select
                        value={newLoc}
                        onChange={(e) => setNewLoc(e.target.value)}
                        className="w-full bg-slate-950 text-slate-300 border border-slate-900 rounded p-1.5 text-xs font-sans outline-none focus:border-emerald-500/40"
                      >
                        <option value="Viaducto Pilar 4">Viaducto Pilar 4 (K5+120)</option>
                        <option value="Túnel Frente Sur">Túnel Frente Sur (K3+800)</option>
                        <option value="ZODME La Herradura">ZODME La Herradura</option>
                        <option value="Planta de Lodos 2">Planta de Lodos 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-500">COORDENADA DE REGISTRO</span>
                    <span className="text-[10px] font-mono text-slate-400">Lat: 4.7592 | Long: -74.2341</span>
                  </div>
                  <button
                    onClick={() => handleAddReport('Biótica')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wide flex items-center gap-1 hover:bg-emerald-400 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" /> Registrar Avistamiento
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* HISTORIAL Y EXTRACTION LOG */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <ClipboardList className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Base de Datos Georreferenciada
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-3 leading-normal font-sans">
                Registros consolidados que se transmiten automáticamente a las bases de datos SQL una vez se recupere la conexión de red (Sincronización de Campo).
              </p>

              <div className="space-y-2.5 max-h-[240px] overflow-y-auto pr-1">
                {reports.map((r, idx) => (
                  <div key={r.id} className="p-2.5 bg-slate-950 border border-slate-900 rounded-xl relative overflow-hidden text-[11px] font-sans">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${r.type === 'Biótica' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span className="font-mono font-bold uppercase text-slate-200">{r.id} ({r.type})</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500">{r.timestamp}</span>
                    </div>
                    <p className="text-slate-400 leading-normal mb-1">{r.detail}</p>
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mt-1.5 border-t border-slate-900/60 pt-1">
                      <span>Ref: {r.location}</span>
                      <span className="text-blue-400 font-semibold">{r.reporter}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Extractor Conceptual:</strong> Esta ingesta se realiza bajo formato JSON mapeado con llaves unívocas geográficas y de tiempo, ideal para su procesamiento inmediato en tableros de control georreferenciados.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SLIDE 2: INSTRUMENTACIÓN Y LECTURA FÍSICA ---------------- */}
      {slideId === 'field-instrumentation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CALCULADORA DE RMR Y BARTON */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-teal-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Cálculo Periódico de Macizo Rocoso (Frente de Túnel)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[9px] font-mono uppercase font-bold">
                  Método Geotécnico RMR
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                Ajuste los parámetros del macizo rocoso obtenidos por la inspección geológica en el frente de avance para calcular dinámicamente la clase de roca y el tipo de sostenimiento estructural recomendado.
              </p>

              <div className="space-y-3">
                {/* Parameter 1 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">1. Resistencia Compresión Uniaxial de la Roca</span>
                    <span className="text-teal-400 font-bold">{rmr1} / 15 pts</span>
                  </div>
                  <input
                    type="range" min="0" max="15" step="1"
                    value={rmr1}
                    onChange={(e) => setRmr1(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                {/* Parameter 2 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">2. Calidad de la Roca (RQD % Spacing)</span>
                    <span className="text-teal-400 font-bold">{rmr2} / 20 pts</span>
                  </div>
                  <input
                    type="range" min="0" max="20" step="1"
                    value={rmr2}
                    onChange={(e) => setRmr2(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                {/* Parameter 3 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">3. Espaciamiento de Discontinuidades</span>
                    <span className="text-teal-400 font-bold">{rmr3} / 20 pts</span>
                  </div>
                  <input
                    type="range" min="0" max="20" step="1"
                    value={rmr3}
                    onChange={(e) => setRmr3(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                {/* Parameter 4 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">4. Condición y Rugosidad de Juntas</span>
                    <span className="text-teal-400 font-bold">{rmr4} / 30 pts</span>
                  </div>
                  <input
                    type="range" min="0" max="30" step="1"
                    value={rmr4}
                    onChange={(e) => setRmr4(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                {/* Parameter 5 */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">5. Presencia y Filtración de Agua</span>
                    <span className="text-teal-400 font-bold">{rmr5} / 15 pts</span>
                  </div>
                  <input
                    type="range" min="0" max="15" step="1"
                    value={rmr5}
                    onChange={(e) => setRmr5(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Result RMR */}
            <div className={`mt-4 p-3.5 rounded-xl border ${rmrClass.color} flex flex-col md:flex-row justify-between items-start md:items-center gap-3 transition-all duration-300`}>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-slate-400 mb-0.5">Clasificación Macizo</span>
                <p className="text-sm font-bold uppercase">{rmrClass.label} (RMR Score: {rmrScore})</p>
                <p className="text-[10px] leading-relaxed text-slate-300 mt-1 font-sans">
                  <strong>Sostenimiento Requerido:</strong> {rmrClass.support}
                </p>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-slate-950 font-mono text-center font-bold border border-slate-900 text-xs shrink-0 w-full md:w-auto">
                <span className="text-[8px] block text-slate-500 uppercase tracking-widest font-semibold">Q de Barton aprox.</span>
                <span className="text-teal-400 text-sm">{(Math.exp((rmrScore - 44) / 9) * 0.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* SENSOR LOG DE LECTURAS FÍSICAS */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <Activity className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Lecturas de Instrumentación
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
                Simulación de lecturas de dataloggers físicos en túneles e inclinómetros. Seleccione un sensor para ver los detalles técnicos de deformación.
              </p>

              <div className="space-y-2">
                {[
                  { id: 'piezometer', label: 'Piezómetro P-12 (Presión de Agua)', val: '4.2 kPa', state: 'Ideal', limit: '15 kPa', desc: 'Monitorea niveles de acuífero alrededor del túnel de presión.' },
                  { id: 'inclinometer', label: 'Inclinómetro I-03 (Desplazamiento Talud)', val: '14.2 mm', state: 'Advertencia', limit: '20 mm', desc: 'Mide la deformación lateral de taludes críticos encima del emboquille.' },
                  { id: 'convergimeter', label: 'Convergímetro C-01 (Convergencia Túnel)', val: '28.5 mm', state: 'Crítico', limit: '30 mm', desc: 'Mide la reducción del diámetro interno de la excavación por presión.' },
                  { id: 'anchorage', label: 'Carga en Anclaje A-05 (Puente)', val: '350 kN', state: 'Ideal', limit: '450 kN', desc: 'Sensor de celda de carga en el anclaje activo de la dovela central.' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSensor(s.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                      activeSensor === s.id
                        ? 'bg-slate-950 border-teal-500/40 shadow-md text-slate-100'
                        : 'bg-slate-950/20 border-slate-900/60 text-slate-400 hover:text-slate-300 hover:bg-slate-950/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-semibold">{s.label}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                        s.state === 'Ideal' ? 'bg-emerald-500/10 text-emerald-400' :
                        s.state === 'Advertencia' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
                      }`}>{s.val}</span>
                    </div>
                    {activeSensor === s.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        className="mt-2 pt-2 border-t border-slate-900/60 text-[10px] leading-relaxed text-slate-400 font-sans"
                      >
                        <p>{s.desc}</p>
                        <div className="mt-1 flex justify-between font-mono text-[9px] text-slate-500">
                          <span>Umbral Límite: {s.limit}</span>
                          <span className="text-teal-400 font-semibold">Sensor S-AutoActive</span>
                        </div>
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Extractor Conceptual:</strong> Los archivos de volcado contienen series temporales tabulares de deformaciones milimétricas mapeadas espacialmente en coordenadas 3D para su modelado estructural.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SLIDE 3: DATOS TRANSACCIONALES Y DE LOGÍSTICA ---------------- */}
      {slideId === 'field-logistics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CONTROL DE BÁSCULA Y ESPONJAMIENTO */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Control de Trazabilidad en Báscula de Obra
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-mono uppercase font-bold">
                  Ingreso ZODME
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                Simule el pesaje de una volqueta cargada de excavación. Se calcula automáticamente el factor de esponjamiento (incremento del volumen al ser excavado) para contrastar metros cúbicos de disposición real.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Placa Volqueta</label>
                  <select
                    value={truckId}
                    onChange={(e) => setTruckId(e.target.value)}
                    className="w-full bg-slate-950 text-slate-300 border border-slate-900 rounded p-1.5 text-xs outline-none focus:border-amber-500/40"
                  >
                    <option value="V-102">V-102 (Doble troque)</option>
                    <option value="V-105">V-105 (Volqueta sencilla)</option>
                    <option value="V-109">V-109 (Articulada caterpillar)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-slate-500 uppercase font-bold">Material Cargado</label>
                  <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                    className="w-full bg-slate-950 text-slate-300 border border-slate-900 rounded p-1.5 text-xs outline-none focus:border-amber-500/40"
                  >
                    <option value="Tierra Excavada">Tierra Común (Factor 1.3)</option>
                    <option value="Roca de Túnel">Roca Fracturada (Factor 1.4)</option>
                    <option value="Estéril Cohesivo">Estéril Húmedo (Factor 1.25)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 bg-slate-950/40 p-3 rounded-xl border border-slate-900 mb-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Peso Bruto Entrando (Cargado)</span>
                    <span className="text-amber-400 font-bold">{weightIn} Toneladas</span>
                  </div>
                  <input
                    type="range" min="15" max="45" step="0.1"
                    value={weightIn}
                    onChange={(e) => setWeightIn(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Peso Tara Saliendo (Vacío)</span>
                    <span className="text-amber-400 font-bold">{weightOut} Toneladas</span>
                  </div>
                  <input
                    type="range" min="10" max="15" step="0.1"
                    value={weightOut}
                    onChange={(e) => setWeightOut(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-900">
              <div className="font-mono text-xs text-slate-400">
                Peso Neto: <strong className="text-slate-100">{(weightIn - weightOut).toFixed(1)} Ton</strong>
                <span className="mx-2 text-slate-700">|</span>
                Volumen Esponjado: <strong className="text-amber-400">{(((weightIn - weightOut) / 1.8) * (materialType === 'Roca de Túnel' ? 1.4 : 1.3)).toFixed(2)} m³</strong>
              </div>
              <button
                onClick={handleAddTicket}
                className="px-3.5 py-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-[10px] uppercase font-mono tracking-wide flex items-center gap-1.5 hover:bg-amber-400 transition-all cursor-pointer"
              >
                <Scale className="w-3.5 h-3.5" /> Registrar en ZODME
              </button>
            </div>
          </div>

          {/* STOCK DE INVENTARIOS CRÍTICOS */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <Database className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Stock de Insumos Críticos
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-3 leading-normal font-sans">
                Trazabilidad de materiales colocados frente a los planificados en el presupuesto contractual de obra.
              </p>

              <div className="space-y-4 pt-2">
                {/* Pernos */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-300">Pernos de Anclaje (Unidades)</span>
                    <span className="text-amber-400 font-bold">{boltStock} / 600 und</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-900">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 h-full rounded-full transition-all duration-500" style={{ width: `${(boltStock / 600) * 100}%` }} />
                  </div>
                </div>

                {/* Acero */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-300">Acero Figurado Viaducto</span>
                    <span className="text-emerald-400 font-bold">{steelStock} / 120 Ton</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-900">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500" style={{ width: `${(steelStock / 120) * 100}%` }} />
                  </div>
                </div>

                {/* Concreto */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-300">Concreto Dovelas (Acumulado)</span>
                    <span className="text-amber-400 font-bold">{concreteStock} / 300 m³</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 border border-slate-900">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${(concreteStock / 300) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Tiquetes Recientes */}
              <div className="mt-4 pt-3 border-t border-slate-900/60">
                <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block mb-2">Tiquetes de Báscula Generados</span>
                <div className="space-y-1.5 max-h-[80px] overflow-y-auto">
                  {weighTickets.map(wt => (
                    <div key={wt.ticketId} className="flex justify-between font-mono text-[9px] text-slate-400 bg-slate-950 p-1.5 rounded border border-slate-900/80">
                      <span>{wt.ticketId} - Placa {wt.truckId}</span>
                      <span className="text-amber-400 font-semibold">+{wt.bulkingVol} m³ ({wt.netWeight} Ton)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Extractor Conceptual:</strong> Los tiquetes automáticos de báscula por RFID o GPS se procesan como transacciones financieras de obra para pagos de subcontratistas de acarreo.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SLIDE 4: CONTROL AMBIENTAL Y CALIDAD ---------------- */}
      {slideId === 'field-environmental-quality' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CONTROL AMBIENTAL PTAR */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Planta de Tratamiento (PTAR) Túneles
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold border transition-all ${
                  isAmbientAlert 
                    ? 'bg-red-500/10 border-red-500/20 text-red-400 animate-pulse' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                }`}>
                  {isAmbientAlert ? 'Alerta Incumplimiento' : 'Efluente Conforme'}
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                El agua de excavación de túneles contiene gran cantidad de sólidos. Ajuste los controles de la planta de sedimentación para verificar que cumple con los límites legales de vertido a la cuenca.
              </p>

              <div className="space-y-4">
                {/* pH Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Potencial Hidrógeno (pH)</span>
                    <span className={`font-bold ${waterPh < 6.5 || waterPh > 8.5 ? 'text-red-400' : 'text-emerald-400'}`}>{waterPh} pH (Rango: 6.5 - 8.5)</span>
                  </div>
                  <input
                    type="range" min="5.0" max="10.0" step="0.1"
                    value={waterPh}
                    onChange={(e) => setWaterPh(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                {/* Turbidez */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Turbidez efluente final</span>
                    <span className={`font-bold ${waterTurb > 20 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>{waterTurb} NTU (Límite: 20 NTU)</span>
                  </div>
                  <input
                    type="range" min="5" max="50" step="1"
                    value={waterTurb}
                    onChange={(e) => setWaterTurb(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>

                {/* SST */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Sólidos Suspendidos Totales (SST)</span>
                    <span className={`font-bold ${waterSst > 30 ? 'text-red-400' : 'text-emerald-400'}`}>{waterSst} mg/L (Límite: 30 mg/L)</span>
                  </div>
                  <input
                    type="range" min="10" max="60" step="1"
                    value={waterSst}
                    onChange={(e) => setWaterSst(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Ambient corrective actions */}
            <div className="mt-4 p-3 bg-slate-950 border border-slate-900 rounded-xl">
              {isAmbientAlert ? (
                <div className="flex gap-2 items-start text-xs text-red-400 font-sans">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold uppercase text-[10px] font-mono">Procedimiento Correctivo Activado</p>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                      Falta dosificación de cal (ajuste pH) o sulfato de aluminio (floculante para sólidos y turbidez). Detener vertido preventivo.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-start text-xs text-emerald-400 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold uppercase text-[10px] font-mono">Efluente Ambiental en Norma</p>
                    <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                      Parámetros conformes para descarga en cuerpos de agua superficiales. Sincronización automática de bitácora ANLA.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ENSAYOS DE CALIDAD (ROTURA CONCRETO) */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <Thermometer className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Ensayos de Rotura de Cilindros
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
                El concreto de las dovelas del viaducto debe ensayarse a compresión uniaxial. Seleccione la edad de curado en días para ver el desarrollo de la resistencia.
              </p>

              <div className="space-y-4">
                {/* Age selector */}
                <div className="flex gap-2">
                  {[7, 14, 28].map((day) => (
                    <button
                      key={day}
                      onClick={() => setCuringDays(day)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all border ${
                        curingDays === day
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {day} Días
                    </button>
                  ))}
                </div>

                {/* Strength info display */}
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl font-mono text-xs text-slate-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Resistencia Alcanzada:</span>
                    <span className="text-emerald-400 font-bold">{concreteStrength.toFixed(1)} MPa</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Porcentaje de Diseño:</span>
                    <span className="text-slate-400 font-semibold">{((concreteStrength / 35) * 100).toFixed(0)}% (H-35)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${(concreteStrength / 35) * 100}%` }} />
                  </div>
                </div>

                {/* Slump consistency */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Asentamiento (Slump)</span>
                    <span className="text-emerald-400 font-bold">{concreteSlump} pulgadas</span>
                  </div>
                  <input
                    type="range" min="1" max="8" step="1"
                    value={concreteSlump}
                    onChange={(e) => setConcreteSlump(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1 bg-slate-900 rounded-lg appearance-none"
                  />
                  <span className="text-[9px] text-slate-500 block font-sans">
                    {concreteSlump <= 2 ? 'Consistencia Seca (Ideal para pavimentos compactados)' :
                     concreteSlump <= 5 ? 'Consistencia Plástica (Ideal para dovelas y vigas de viaducto)' :
                     'Consistencia Fluida / Autonivelante (Peligro de segregación sin aditivos)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Extractor Conceptual:</strong> Los certificados de rotura del laboratorio son firmados y cargados al CDE mediante plantillas CSV estruturadas que alimentan el control de aceptación estructural.
            </div>
          </div>

        </div>
      )}

      {/* ---------------- SLIDE 5: DATOS DE PLANIFICACIÓN Y RENDIMIENTO ---------------- */}
      {slideId === 'field-planning' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ESCENARIOS DE RETRASO */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-900 p-4 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 uppercase">
                    Simulador de Holguras y Rendimiento
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono uppercase font-bold">
                  Ruta Crítica
                </span>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-relaxed font-sans">
                Active los factores de no cumplimiento más comunes en obra para observar de forma interactiva cómo disminuye el rendimiento diario real de excavación de túneles y hormigonado de viaductos frente al plan teórico.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { id: 'rain', label: '🌧️ Clima Lluvioso (+3.5h)', val: rainDelay, setter: setRainDelay },
                  { id: 'breakdown', label: '🔧 Falla Mecánica (+1.5h)', val: truckBreakdown, setter: setTruckBreakdown },
                  { id: 'strike', label: '📢 Bloqueo de Vía (+8h)', val: strikeDelay, setter: setStrikeDelay },
                  { id: 'design', label: '📐 Retraso Planos (+4h)', val: designDelay, setter: setDesignDelay }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => f.setter(!f.val)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                      f.val
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-md shadow-blue-500/5 font-bold'
                        : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wide">{f.label}</span>
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] ${f.val ? 'border-blue-400 bg-blue-400 text-slate-950' : 'border-slate-800'}`}>
                      {f.val && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic performance outcomes */}
            <div className="bg-slate-950 border border-slate-900 p-3 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Pérdida de Tiempo Productivo:</span>
                <span className={`font-bold ${delayHours > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>{delayHours} Horas / Turno 24h</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Rendimiento Excavación:</span>
                <span className={`font-bold ${actualExcavation < baseExcavation ? 'text-red-400' : 'text-emerald-400'}`}>{actualExcavation} ml/día (Meta: {baseExcavation} ml)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Rendimiento Concreto Pilas:</span>
                <span className={`font-bold ${actualConcrete < baseConcrete ? 'text-red-400' : 'text-emerald-400'}`}>{actualConcrete} m³/día (Meta: {baseConcrete} m³)</span>
              </div>
            </div>
          </div>

          {/* RUTA CRÍTICA GANTT ANALYTICS */}
          <div className="lg:col-span-5 bg-slate-950/40 border border-slate-900 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2 mb-3">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">
                  Impacto en Ruta Crítica
                </h4>
              </div>

              <p className="text-[10px] text-slate-400 mb-4 leading-normal font-sans">
                La holgura del proyecto define la flexibilidad de entrega contractual de la obra.
              </p>

              <div className="space-y-4">
                {/* Gantt progress simulators */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>Excavación de Túneles</span>
                      <span>45% Completado</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-900 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>Viaducto Pilas y Dovelas</span>
                      <span>72% Completado</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-900 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>

                {/* Deviation message */}
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1 text-xs">
                  <p className="font-mono text-[9px] text-slate-500 uppercase font-bold">Estado de Holgura de Hito Contractual</p>
                  <p className={`font-mono font-bold ${delayHours > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {projectDeviation}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans pt-1">
                    {delayHours > 5 ? 'Alerta: Hito de entrega parcial en peligro. Se recomienda doblar turno de trabajo nocturno.' : 'Parámetros de entrega conformes con la planeación de obra.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 mt-4 text-[9px] font-mono text-slate-500 leading-normal">
              💡 <strong>Extractor Conceptual:</strong> Las desviaciones de ruta crítica alimentan los tableros de programación ganada en Power BI mediante el cruce de reportes MS Project u Primavera P6.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
