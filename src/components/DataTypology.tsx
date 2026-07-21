import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  FileCode, 
  FileText, 
  Play, 
  Sparkles, 
  Check, 
  X, 
  Search, 
  Code, 
  Table, 
  RefreshCw, 
  Video, 
  Image as ImageIcon,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface ElementRow {
  id: string;
  elemento: string;
  disciplina: 'MEP' | 'Estructuras' | 'Arquitectura';
  costo: number;
}

const ELEMENT_DATA: ElementRow[] = [
  { id: '101', elemento: 'Tubería de Cobre 2"', disciplina: 'MEP', costo: 1200 },
  { id: '102', elemento: 'Losa de Cimentación', disciplina: 'Estructuras', costo: 14500 },
  { id: '103', elemento: 'Muro de Panel de Yeso', disciplina: 'Arquitectura', costo: 3200 },
  { id: '104', elemento: 'Bomba de Agua 15 HP', disciplina: 'MEP', costo: 4500 },
  { id: '105', elemento: 'Viga de Acero W12x26', disciplina: 'Estructuras', costo: 8800 },
  { id: '106', elemento: 'Puerta Principal Vidrio', disciplina: 'Arquitectura', costo: 1500 },
];

const SEMI_STRUCTURED_SAMPLE = {
  IfcProject: {
    GlobalId: "0Yv$8$7zD0$B$O1n_N9S4V",
    Name: "Edificio Administrativo Lomas",
    IfcSite: {
      GlobalId: "2xZg3G_45B$p_H5V_G5G$8",
      Name: "Terreno Principal Sur",
      IfcBuilding: {
        GlobalId: "14A9B2_45B$p_H5V_R8X_Y1",
        Name: "Módulo Central",
        IfcBuildingStorey: [
          {
            Name: "Nivel -1 (Sótano)",
            Elevation: -3.50,
            Elements: [
              { Class: "IfcSlab", Name: "Losa de Fundación", Material: "Hormigón Armado" },
              { Class: "IfcSensor", Name: "Sensor Térmico S-104", Type: "Temperatura" }
            ]
          }
        ]
      }
    }
  }
};

const CLASSIFICATION_ITEMS = [
  { id: 'item1', label: 'Presupuesto de Obra (.XLSX)', type: 'estructurado', hint: 'Tablas estrictas de filas y columnas con códigos definidos.' },
  { id: 'item2', label: 'Esquema de Intercambio IFC (.ifc)', type: 'semiestructurado', hint: 'Modelo BIM de texto plano estructurado con etiquetas y relaciones anidadas.' },
  { id: 'item3', label: 'Video de Inspección con Drone (.MP4)', type: 'no_estructurado', hint: 'Secuencia binaria de pixeles sin datos vectoriales directos.' },
  { id: 'item4', label: 'Base de Datos de Sensores SQL', type: 'estructurado', hint: 'Estructura relacional rígida, ideal para consultas SELECT continuas.' },
  { id: 'item5', label: 'Metadata de Configuración (.JSON)', type: 'semiestructurado', hint: 'Parámetros clave-valor legibles que no requieren una tabla fija.' },
  { id: 'item6', label: 'Plano PDF escaneado (sin vectorizar)', type: 'no_estructurado', hint: 'Imagen de mapa de bits que requiere escaneo óptico para extraer texto.' },
  { id: 'item7', label: 'Audio de Minuta de Reunión (.WAV)', type: 'no_estructurado', hint: 'Ondas acústicas grabadas sin transcripción textual nativa.' },
];

export default function DataTypology() {
  const [activeTab, setActiveTab] = useState<'estructurado' | 'semiestructurado' | 'no_estructurado'>('estructurado');
  
  // Structured sandbox states
  const [sqlQuery, setSqlQuery] = useState<string>("SELECT * FROM elementos WHERE disciplina = 'MEP'");
  const [queriedData, setQueriedData] = useState<ElementRow[]>(ELEMENT_DATA);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [sqlError, setSqlError] = useState<string | null>(null);

  // Semistructured sandbox states
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    project: true,
    site: true,
    building: false
  });

  // Unstructured sandbox states
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [extractedData, setExtractedData] = useState<null | {
    fecha: string;
    gravedad: string;
    incidencia: string;
    costoEstimado: string;
  }>(null);

  // Classifier Game states
  const [gameItems, setGameItems] = useState<Array<{ id: string; label: string; type: string; hint: string; userChoice?: 'estructurado' | 'semiestructurado' | 'no_estructurado' | null }>>(
    CLASSIFICATION_ITEMS.map(item => ({ ...item, userChoice: null }))
  );
  const [showGameResults, setShowGameResults] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<number>(0);

  // Execute SQL Sandbox
  const handleExecuteSQL = () => {
    setIsQuerying(true);
    setSqlError(null);
    setTimeout(() => {
      try {
        const query = sqlQuery.trim().toLowerCase();
        if (!query.startsWith('select')) {
          throw new Error('Sintaxis no admitida. Este simulador académico solo admite consultas "SELECT".');
        }
        
        if (query.includes("disciplina = 'mep'") || query.includes("disciplina='mep'")) {
          setQueriedData(ELEMENT_DATA.filter(d => d.disciplina === 'MEP'));
        } else if (query.includes("disciplina = 'estructuras'") || query.includes("disciplina='estructuras'")) {
          setQueriedData(ELEMENT_DATA.filter(d => d.disciplina === 'Estructuras'));
        } else if (query.includes("disciplina = 'arquitectura'") || query.includes("disciplina='arquitectura'")) {
          setQueriedData(ELEMENT_DATA.filter(d => d.disciplina === 'Arquitectura'));
        } else if (query.includes("costo > 5000")) {
          setQueriedData(ELEMENT_DATA.filter(d => d.costo > 5000));
        } else if (query.includes("* from elementos") && !query.includes("where")) {
          setQueriedData(ELEMENT_DATA);
        } else {
          setSqlError("Consulta válida, pero no retornó registros en este simulador de muestra.");
          setQueriedData([]);
        }
      } catch (err: any) {
        setSqlError(err.message || 'Error de sintaxis SQL');
        setQueriedData([]);
      } finally {
        setIsQuerying(false);
      }
    }, 600);
  };

  // Run AI Scanner on Unstructured data
  const handleRunScanner = () => {
    setIsScanning(true);
    setExtractedData(null);
    setScanStep(1);
    
    // Step 1: Scanning bitmap
    setTimeout(() => {
      setScanStep(2); // Step 2: NLP/OCR processing
      setTimeout(() => {
        setScanStep(3); // Step 3: Structuring fields
        setTimeout(() => {
          setIsScanning(false);
          setExtractedData({
            fecha: "06/Julio/2026",
            gravedad: "CRÍTICA",
            incidencia: "Interferencia física severa entre ducto de aire acondicionado (HVAC-04) y viga estructural principal (V-102) en sótano.",
            costoEstimado: "$3,500 USD"
          });
        }, 800);
      }, 800);
    }, 800);
  };

  // Game Handlers
  const handleSelectCategory = (itemId: string, choice: 'estructurado' | 'semiestructurado' | 'no_estructurado') => {
    setGameItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, userChoice: choice };
      }
      return item;
    }));
  };

  const checkGameAnswers = () => {
    let score = 0;
    gameItems.forEach(item => {
      if (item.userChoice === item.type) {
        score += 1;
      }
    });
    setGameScore(score);
    setShowGameResults(true);
  };

  const resetGame = () => {
    setGameItems(CLASSIFICATION_ITEMS.map(item => ({ ...item, userChoice: null })));
    setShowGameResults(false);
    setGameScore(0);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 3-WAY THEORY CARDS & SELECTORS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* STRUCTURED CARD */}
        <button
          onClick={() => setActiveTab('estructurado')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[160px] cursor-pointer ${
            activeTab === 'estructurado' 
              ? 'bg-slate-950/80 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20' 
              : 'bg-slate-950/20 border-slate-900 hover:border-slate-800 hover:bg-slate-950/40'
          }`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-xl border ${activeTab === 'estructurado' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-slate-900 border-transparent text-slate-500'}`}>
              <Database className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Tipo 1</span>
          </div>
          <div>
            <h4 className={`text-sm font-bold uppercase font-mono tracking-wider transition-colors ${activeTab === 'estructurado' ? 'text-cyan-400' : 'text-slate-200'}`}>
              Datos Estructurados
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal font-sans mt-1">
              Tienen un formato rígidamente definido (tablas, filas, columnas). Son altamente predecibles y fáciles de consultar mediante SQL.
            </p>
          </div>
        </button>

        {/* SEMI-STRUCTURED CARD */}
        <button
          onClick={() => setActiveTab('semiestructurado')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[160px] cursor-pointer ${
            activeTab === 'semiestructurado' 
              ? 'bg-slate-950/80 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20' 
              : 'bg-slate-950/20 border-slate-900 hover:border-slate-800 hover:bg-slate-950/40'
          }`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-xl border ${activeTab === 'semiestructurado' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-slate-900 border-transparent text-slate-500'}`}>
              <FileCode className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Tipo 2</span>
          </div>
          <div>
            <h4 className={`text-sm font-bold uppercase font-mono tracking-wider transition-colors ${activeTab === 'semiestructurado' ? 'text-amber-400' : 'text-slate-200'}`}>
              Datos Semiestructurados
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal font-sans mt-1">
              No encajan en tablas relacionales rígidas, pero contienen marcadores, etiquetas o metadatos que separan los elementos (ej. archivos JSON, XML, IFC).
            </p>
          </div>
        </button>

        {/* UNSTRUCTURED CARD */}
        <button
          onClick={() => setActiveTab('no_estructurado')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[160px] cursor-pointer ${
            activeTab === 'no_estructurado' 
              ? 'bg-slate-950/80 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/20' 
              : 'bg-slate-950/20 border-slate-900 hover:border-slate-800 hover:bg-slate-950/40'
          }`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-start justify-between">
            <div className={`p-2.5 rounded-xl border ${activeTab === 'no_estructurado' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-slate-900 border-transparent text-slate-500'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Tipo 3</span>
          </div>
          <div>
            <h4 className={`text-sm font-bold uppercase font-mono tracking-wider transition-colors ${activeTab === 'no_estructurado' ? 'text-rose-400' : 'text-slate-200'}`}>
              Datos No Estructurados
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal font-sans mt-1">
              Carecen de estructura nativa inherente. Representan el mayor volumen global (ej. videos de obra, audios de minutas, planos PDF escaneados).
            </p>
          </div>
        </button>
      </div>

      {/* DETAILED INTERACTIVE SANDBOX VIEWS */}
      <div className="bg-slate-950/40 rounded-2xl border border-slate-900 overflow-hidden relative shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        
        <div className="px-5 py-3 border-b border-slate-900 bg-slate-950/75 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              Laboratorio de Simulación Práctica: {activeTab.toUpperCase()}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-500 uppercase bg-slate-950 border border-slate-900 px-2 py-0.5 rounded">
            Interactivo
          </span>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {/* STRUCTURED SANDBOX */}
            {activeTab === 'estructurado' && (
              <motion.div
                key="structured-sandbox"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
              >
                {/* Left: SQL console */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-900">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1.5 font-bold uppercase">
                      <Code className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Consola de Consulta SQL (Predictible)</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal font-sans mb-3">
                      Escriba o seleccione una consulta relacional estándar para filtrar la base de datos estructural del proyecto en milisegundos.
                    </p>

                    <div className="space-y-1.5">
                      <label className="block text-[8px] font-mono text-slate-500 uppercase font-bold">Presets Rápidos:</label>
                      <div className="flex flex-wrap gap-1">
                        {[
                          { label: 'Todo', q: "SELECT * FROM elementos" },
                          { label: 'Solo MEP', q: "SELECT * FROM elementos WHERE disciplina = 'MEP'" },
                          { label: 'Solo Estructuras', q: "SELECT * FROM elementos WHERE disciplina = 'Estructuras'" },
                          { label: 'Costo Alto', q: "SELECT * FROM elementos WHERE costo > 5000" }
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSqlQuery(preset.q)}
                            className="px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[8px] font-mono text-cyan-400 border border-slate-800 cursor-pointer"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <textarea
                        value={sqlQuery}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-cyan-950 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 text-xs font-mono p-3 rounded-lg text-slate-200 focus:outline-none min-h-[75px]"
                        placeholder="Escriba aquí su consulta SQL..."
                      />
                    </div>
                    
                    {sqlError && (
                      <div className="text-[9px] font-mono bg-red-500/5 border border-red-500/20 text-red-400 p-2 rounded">
                        ⚠️ {sqlError}
                      </div>
                    )}

                    <button
                      onClick={handleExecuteSQL}
                      disabled={isQuerying}
                      className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 text-slate-950 font-bold font-mono text-[10px] uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/10"
                    >
                      {isQuerying ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Consultando motor...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Ejecutar Consulta SQL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right: Data Table */}
                <div className="md:col-span-7 flex flex-col bg-slate-950/40 rounded-xl border border-slate-900 p-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                      <Table className="w-3.5 h-3.5 text-cyan-500" />
                      <span>Resultados de la Base de Datos</span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">
                      SQL engine: PostgreSQL
                    </span>
                  </div>

                  <div className="flex-1 overflow-x-auto min-h-[160px] flex flex-col justify-between">
                    <table className="w-full text-left text-[10.5px] border-collapse">
                      <thead>
                        <tr className="border-b border-slate-900 text-slate-500 font-mono text-[8px] uppercase tracking-wider">
                          <th className="py-1.5 px-2">ID</th>
                          <th className="py-1.5 px-2">Elemento Constructivo</th>
                          <th className="py-1.5 px-2">Disciplina</th>
                          <th className="py-1.5 px-2 text-right">Costo (USD)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-950">
                        {queriedData.length > 0 ? (
                          queriedData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-900/40 text-slate-300 transition-colors">
                              <td className="py-2 px-2 font-mono text-slate-500 font-bold">#{row.id}</td>
                              <td className="py-2 px-2 font-semibold text-slate-200">{row.elemento}</td>
                              <td className="py-2 px-2">
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono border uppercase ${
                                  row.disciplina === 'MEP' ? 'bg-cyan-500/5 text-cyan-400 border-cyan-500/10' :
                                  row.disciplina === 'Estructuras' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                                  'bg-purple-500/5 text-purple-400 border-purple-500/10'
                                }`}>
                                  {row.disciplina}
                                </span>
                              </td>
                              <td className="py-2 px-2 text-right font-mono text-slate-200 font-bold">${row.costo.toLocaleString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-[10.5px] text-slate-500 italic">
                              Ningún registro coincide con los filtros de la consulta SQL.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[8px] font-mono text-slate-500 font-bold">
                      <span>Registros Totales: {ELEMENT_DATA.length}</span>
                      <span>Filtrados mostrados: {queriedData.length}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SEMI-STRUCTURED SANDBOX */}
            {activeTab === 'semiestructurado' && (
              <motion.div
                key="semistructured-sandbox"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
              >
                {/* Left: XML/JSON/IFC tag explorer */}
                <div className="md:col-span-6 flex flex-col bg-slate-950 border border-slate-900 rounded-xl p-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                      <Code className="w-3.5 h-3.5 text-amber-400" />
                      <span>Estructura IFC (Modelos jerárquicos)</span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 font-bold">JSON FORMAT</span>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 space-y-1 overflow-y-auto max-h-[220px] p-2 bg-slate-950/80 rounded border border-slate-950">
                    <div>{`{`}</div>
                    <div className="pl-4">
                      <button 
                        onClick={() => setExpandedNodes({ ...expandedNodes, project: !expandedNodes.project })} 
                        className="text-amber-400 hover:underline cursor-pointer font-bold"
                      >
                        "IfcProject" {expandedNodes.project ? '▼' : '▶'}
                      </button>
                      {`: {`}
                    </div>
                    
                    {expandedNodes.project && (
                      <div className="pl-8 border-l border-slate-900/50 ml-6 space-y-1.5">
                        <div>"GlobalId": <span className="text-emerald-400 font-bold">"0Yv$8$7zD0$B$O1n_N9S4V"</span>,</div>
                        <div>"Name": <span className="text-cyan-400">"Edificio Administrativo Lomas"</span>,</div>
                        <div>
                          <button 
                            onClick={() => setExpandedNodes({ ...expandedNodes, site: !expandedNodes.site })} 
                            className="text-amber-400 hover:underline cursor-pointer font-bold"
                          >
                            "IfcSite" {expandedNodes.site ? '▼' : '▶'}
                          </button>
                          {`: {`}
                        </div>
                        
                        {expandedNodes.site && (
                          <div className="pl-8 border-l border-slate-900/50 ml-6 space-y-1.5">
                            <div>"GlobalId": <span className="text-emerald-400 font-bold">"2xZg3G_45B$p_H5V_G5G$8"</span>,</div>
                            <div>"Name": <span className="text-cyan-400">"Terreno Principal Sur"</span>,</div>
                            <div>
                              <button 
                                onClick={() => setExpandedNodes({ ...expandedNodes, building: !expandedNodes.building })} 
                                className="text-amber-400 hover:underline cursor-pointer font-bold"
                              >
                                "IfcBuilding" {expandedNodes.building ? '▼' : '▶'}
                              </button>
                              {`: {`}
                            </div>

                            {expandedNodes.building && (
                              <div className="pl-8 border-l border-slate-900/50 ml-6 space-y-1">
                                <div>"GlobalId": <span className="text-emerald-400 font-bold">"14A9B2_45B$p_H5V_R8X_Y1"</span>,</div>
                                <div>"Name": <span className="text-cyan-400">"Módulo Central"</span>,</div>
                                <div className="text-slate-500">// ... contains IfcBuildingStorey details</div>
                              </div>
                            )}
                            <div>{`}`}</div>
                          </div>
                        )}
                        <div>{`}`}</div>
                      </div>
                    )}
                    <div className="pl-4">{`}`}</div>
                    <div>{`}`}</div>
                  </div>
                </div>

                {/* Right: Academic description of how IFC fits */}
                <div className="md:col-span-6 flex flex-col justify-between p-4 rounded-xl bg-slate-950/20 border border-slate-900 relative">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                      Metadatos e Intercambio BIM
                    </span>
                    
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg text-[10.5px] text-slate-300 leading-relaxed space-y-2">
                      <p>
                        Los esquemas <strong>IFC (Industry Foundation Classes)</strong> y los entregables <strong>COBie</strong> son los mayores exponentes de datos semiestructurados en la metodología BIM.
                      </p>
                      <p>
                        Aunque no están en una base de datos de celdas relacionales fijas, el uso de <strong>etiquetas anidadas (tags, XML, JSON, STEP)</strong> le permite a plataformas como Power BI y motores de renderizado 3D reconocer los parámetros del elemento estructural de forma flexible.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                      <div className="p-2 rounded bg-slate-950 border border-slate-900/80">
                        <span className="text-amber-400 font-mono font-bold block mb-0.5">Ventaja</span>
                        Flexibilidad extrema para añadir propiedades personalizadas sin alterar la estructura general.
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-900/80">
                        <span className="text-amber-400 font-mono font-bold block mb-0.5">Consulta</span>
                        Se lee mediante parsers jerárquicos o transformando las listas de objetos en tablas bidimensionales en Power Query.
                      </div>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-slate-500 flex items-center gap-1 border-t border-slate-900 pt-3 mt-3">
                    <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                    <span>Haga clic en los nodos naranjas de la izquierda para expandir el modelo IFC.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* UNSTRUCTURED SANDBOX */}
            {activeTab === 'no_estructurado' && (
              <motion.div
                key="unstructured-sandbox"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch"
              >
                {/* Left: Mock unvectorized document */}
                <div className="md:col-span-5 flex flex-col bg-slate-950 border border-slate-900 rounded-xl p-4 justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <FileText className="w-3.5 h-3.5 text-rose-500" />
                        <span>Informe Técnico (Texto Libre PDF Escaneado)</span>
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">No estructurado</span>
                    </div>

                    <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 relative">
                      {/* Visual scan effect overlay */}
                      {isScanning && (
                        <motion.div 
                          initial={{ y: 0 }}
                          animate={{ y: [0, 110, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_8px_rgba(244,63,94,0.8)] pointer-events-none"
                        />
                      )}

                      <div className="font-sans text-[10px] text-slate-400 leading-normal space-y-1.5 max-h-[120px] overflow-y-auto">
                        <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">REGISTRO DE INCIDENCIA DE OBRA #241</p>
                        <p><strong>Fecha de reporte:</strong> 06 de Julio de 2026. <strong>Reporta:</strong> Ing. Residente de Control de Calidad.</p>
                        <p>Se observa una interferencia física severa en el sótano -1. Durante el tendido del ducto de aire acondicionado HVAC-04, colisiona directamente con el canto inferior de la viga estructural principal V-102. La viga estructural no puede ser modificada. Se requiere desviar el ducto MEP.</p>
                        <p><strong>Gravedad:</strong> Se clasifica como CRÍTICA. Retrasa el hormigonado de cielos. El costo estimado de corrección y rediseño asciende a aproximadamente $3,500 USD de mano de obra y materiales.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={handleRunScanner}
                      disabled={isScanning}
                      className="w-full py-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 disabled:opacity-50 text-slate-950 font-bold font-mono text-[10px] uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-500/10"
                    >
                      {isScanning ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>
                            {scanStep === 1 ? 'Escaneando texto (OCR)...' : 
                             scanStep === 2 ? 'Analizando con IA (NLP)...' : 
                             'Estructurando campos...'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Extraer Datos con IA / Power Query</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right: Structure Conversion output */}
                <div className="md:col-span-7 flex flex-col bg-slate-950/40 rounded-xl border border-slate-900 p-4 justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                        <Cpu className="w-3.5 h-3.5 text-rose-400" />
                        <span>Esquema Convertido (Estructurado para Power BI)</span>
                      </span>
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">Power Query Transform</span>
                    </div>

                    <AnimatePresence mode="wait">
                      {extractedData ? (
                        <motion.div
                          key="extracted-output"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-2.5"
                        >
                          <div className="p-2 rounded bg-slate-950 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-1.5">
                            <Check className="w-4 h-4" />
                            <span>¡Conversión Exitosa! Texto no estructurado transformado a columnas.</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans">
                            <div className="p-2.5 rounded bg-slate-950 border border-slate-900">
                              <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Fecha Convertida</span>
                              <span className="font-mono text-slate-200 font-bold">{extractedData.fecha}</span>
                            </div>
                            <div className="p-2.5 rounded bg-slate-950 border border-slate-900">
                              <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Gravedad Detectada</span>
                              <span className="font-mono text-rose-400 font-bold uppercase">{extractedData.gravedad}</span>
                            </div>
                            <div className="p-2.5 rounded bg-slate-950 border border-slate-900 col-span-2">
                              <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Descripción de Incidencia (Estructurada)</span>
                              <p className="text-slate-300 font-medium leading-normal mt-0.5">{extractedData.incidencia}</p>
                            </div>
                            <div className="p-2.5 rounded bg-slate-950 border border-slate-900 col-span-2">
                              <span className="text-[8px] font-mono text-slate-500 block uppercase font-bold">Costo Estimado de Impacto (DAX Compatible)</span>
                              <span className="font-mono text-slate-100 font-bold text-xs">{extractedData.costoEstimado}</span>
                            </div>
                          </div>
                        </motion.div>
                      ) : isScanning ? (
                        <motion.div
                          key="scanning-loader"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="py-12 flex flex-col items-center justify-center text-center space-y-3"
                        >
                          <RefreshCw className="w-8 h-8 text-rose-500 animate-spin" />
                          <div>
                            <h4 className="text-xs font-bold font-mono text-slate-300">Extrayendo metadatos...</h4>
                            <p className="text-[9.5px] text-slate-500 font-sans mt-0.5 max-w-[280px]">
                              Identificando entidades nombradas, fecha del reporte e impacto financiero a partir de la minuta técnica de obra.
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="idle-scanning"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-12 flex flex-col items-center justify-center text-center space-y-2 border border-dashed border-slate-900 rounded-xl bg-slate-950/40"
                        >
                          <Search className="w-8 h-8 text-slate-700" />
                          <div>
                            <h4 className="text-xs font-bold font-mono text-slate-500 uppercase">Esperando Escaneo IA</h4>
                            <p className="text-[9.5px] text-slate-600 font-sans mt-0.5 max-w-[240px]">
                              Haga clic en el botón de la izquierda para extraer parámetros estructurados y tabular el texto de obra para reportabilidad.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <p className="text-[9.5px] text-slate-500 font-sans leading-relaxed border-t border-slate-900/60 pt-2.5 mt-2.5">
                    <strong>Teoría del volumen global:</strong> Más del 80% de los datos generados diariamente en una obra de construcción (planos PDF, correos, audios de comités VDC) no están estructurados. El verdadero reto del analista BIM es usar herramientas ETL (Extract, Transform, Load) para estructurar estos flujos y consumirlos en Power BI.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* GAMIFIED CLASSIFIER QUIZ */}
      <div className="bg-slate-950/40 rounded-2xl border border-slate-900 overflow-hidden relative shadow-xl">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        
        <div className="px-5 py-4 border-b border-slate-900 bg-slate-950/75 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Desafío Interactivo: Clasificador de Datos BIM</span>
            </h4>
            <p className="text-[10px] text-slate-400 font-sans mt-0.5 leading-normal">
              Evalúe sus conocimientos. Asigne cada archivo o flujo de trabajo del proyecto a su clasificación teórica correspondiente.
            </p>
          </div>

          {!showGameResults ? (
            <button
              onClick={checkGameAnswers}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold font-mono text-[10px] uppercase tracking-wider cursor-pointer self-start sm:self-center"
            >
              Calificar Respuestas
            </button>
          ) : (
            <button
              onClick={resetGame}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold font-mono text-[10px] uppercase tracking-wider cursor-pointer self-start sm:self-center"
            >
              Reiniciar Desafío
            </button>
          )}
        </div>

        <div className="p-5 space-y-4">
          
          {showGameResults && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                gameScore === CLASSIFICATION_ITEMS.length 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : gameScore >= 4 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              <div>
                <h5 className="text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5">
                  {gameScore === CLASSIFICATION_ITEMS.length ? '🏆 ¡Puntaje Perfecto!' : '📊 Resultados del Desafío'}
                </h5>
                <p className="text-[10.5px] mt-1 leading-normal font-sans text-slate-300">
                  {gameScore === CLASSIFICATION_ITEMS.length 
                    ? '¡Excelente! Ha demostrado un dominio impecable sobre la tipología de datos. Sabe clasificar flujos de construcción perfectamente.'
                    : `Ha clasificado correctamente ${gameScore} de ${CLASSIFICATION_ITEMS.length} elementos. Revise los errores señalados abajo.`}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                <span className="text-[9px] font-mono uppercase text-slate-500 font-bold">Tu Puntaje:</span>
                <span className="text-2xl font-black font-mono tracking-tight">
                  {gameScore} / {CLASSIFICATION_ITEMS.length}
                </span>
                <span className="text-[8px] font-mono opacity-80 mt-0.5">
                  ({Math.round((gameScore / CLASSIFICATION_ITEMS.length) * 100)}% de aciertos)
                </span>
              </div>
            </motion.div>
          )}

          <div className="divide-y divide-slate-900 bg-slate-950/50 rounded-xl border border-slate-900">
            {gameItems.map((item) => {
              const hasChoice = item.userChoice !== null;
              const isCorrect = item.userChoice === item.type;
              
              return (
                <div key={item.id} className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{item.label}</span>
                      
                      {showGameResults && (
                        <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold font-mono border uppercase ${
                          isCorrect 
                            ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' 
                            : 'bg-rose-500/5 text-rose-400 border-rose-500/10'
                        }`}>
                          {isCorrect ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                          {isCorrect ? 'Correcto' : 'Incorrecto'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight font-sans">
                      {item.hint}
                    </p>
                  </div>

                  {/* Classification buttons selector */}
                  <div className="flex flex-wrap gap-1.5 self-start md:self-center">
                    {(['estructurado', 'semiestructurado', 'no_estructurado'] as const).map((cat) => {
                      const isSelected = item.userChoice === cat;
                      const isRealAnswer = item.type === cat;
                      
                      let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800';
                      
                      if (isSelected) {
                        btnStyle = 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.1)]';
                      }

                      if (showGameResults) {
                        if (isSelected && isCorrect) {
                          btnStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-400';
                        } else if (isRealAnswer) {
                          // Highlight the actual correct answer if the user missed it
                          btnStyle = 'bg-slate-950 border-emerald-500/30 text-emerald-500/80 border-dashed animate-pulse';
                        } else {
                          btnStyle = 'bg-slate-950 border-slate-950 text-slate-600 opacity-30 cursor-not-allowed';
                        }
                      }

                      return (
                        <button
                          key={cat}
                          disabled={showGameResults}
                          onClick={() => handleSelectCategory(item.id, cat)}
                          className={`px-2.5 py-1 rounded text-[9.5px] font-mono uppercase font-bold border transition-all cursor-pointer ${btnStyle}`}
                        >
                          {cat === 'estructurado' ? 'Estructurado' : 
                           cat === 'semiestructurado' ? 'Semiestructurado' : 
                           'No Estructurado'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
