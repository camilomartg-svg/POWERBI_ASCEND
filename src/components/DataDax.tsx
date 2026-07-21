import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  BookOpen, 
  AlertTriangle, 
  Check, 
  HelpCircle, 
  Calculator, 
  Layers, 
  Database,
  Cpu,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  X
} from 'lucide-react';

type TabType = 'fundamentos' | 'sintaxis' | 'conceptos' | 'funciones';

export default function DataDax() {
  const [activeTab, setActiveTab] = useState<TabType>('fundamentos');
  const [showModal, setShowModal] = useState(false);

  // Categories
  const categories = [
    { id: 'fundamentos', label: '1. Fundamentos DAX', icon: Code },
    { id: 'sintaxis', label: '2. Operadores y Fechas', icon: Clock },
    { id: 'conceptos', label: '3. Medidas vs Columnas', icon: Layers },
    { id: 'funciones', label: '4. Guía de Funciones', icon: FileSpreadsheet }
  ];

  const mostUsedFunctions = [
    { name: 'IF()', desc: 'Evalúa una condición lógica.' },
    { name: 'SWITCH()', desc: 'Múltiples condiciones.' },
    { name: 'SUM()', desc: 'Suma todos los números de una columna.' },
    { name: 'AVERAGE()', desc: 'Obtiene el promedio de una columna.' },
    { name: 'COUNT()', desc: 'Cuenta los valores de una columna.' },
    { name: 'DISTINCTCOUNT()', desc: 'Contar valores únicos de una columna.' },
    { name: 'CALCULATE()', desc: 'Modifica o cambia el contexto de filtro actual.' },
    { name: 'FILTER()', desc: 'Devuelve una tabla filtrada según condiciones.' },
    { name: 'RELATED()', desc: 'Trae datos de otra tabla que esté relacionada.' },
    { name: 'LOOKUPVALUE()', desc: 'Busca un valor de forma similar a un BUSCARV.' },
    { name: 'TODAY()', desc: 'Devuelve la fecha actual sin hora.' },
    { name: 'NOW()', desc: 'Devuelve la fecha y hora actuales en tiempo real.' },
    { name: 'DATEDIFF()', desc: 'Diferencia en días, meses o años entre fechas.' },
    { name: 'MAX()', desc: 'Retorna el valor máximo de una columna.' },
    { name: 'MIN()', desc: 'Retorna el valor mínimo de una columna.' },
    { name: 'SUMX()', desc: 'Suma el resultado de una expresión evaluada fila por fila.' }
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase font-bold tracking-widest inline-flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5" />
          <span>Fórmula y Modelado Analítico</span>
        </span>
        <h2 className="text-2xl font-black uppercase font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-200 to-slate-400">
          Manual Práctico de Expresiones DAX
        </h2>
        <p className="text-xs text-slate-400 leading-normal font-sans">
          DAX es el motor matemático detrás de los indicadores clave en Power BI. Descubra la sintaxis correcta, la diferencia entre medidas y columnas, y las funciones fundamentales para el tratamiento de datos.
        </p>
      </div>

      {/* TAB SELECTOR TABS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as TabType)}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-slate-950 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.12)] ring-1 ring-blue-500/10 text-blue-400'
                  : 'bg-slate-950/20 border-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-950/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* CORE DISPLAY CONTAINER */}
      <div className="bg-slate-950/40 rounded-3xl border border-slate-900 p-5 md:p-6 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        
        <AnimatePresence mode="wait">
          {activeTab === 'fundamentos' && (
            <motion.div
              key="tab-fundamentos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <Code className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">Estructura, Referencias y Reglas Iniciales</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 1. Estructura Básica */}
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-3">
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase">
                    1. Estructura básica
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    La mayoría de las funciones de cálculo siguen este patrón estructurado de desglose multilínea:
                  </p>
                  <pre className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-[10.5px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`Nombre =
FUNCION(
    argumento1,
    argumento2,
    argumento3
)`}
                  </pre>
                  <div className="text-[10px] text-slate-500 font-mono">Ejemplo de uso práctico:</div>
                  <pre className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-[10.5px] font-mono text-blue-300 overflow-x-auto leading-relaxed">
{`DiasVencidos =
DATEDIFF(
    'Tabla'[Due_date],
    TODAY(),
    DAY
)`}
                  </pre>
                </div>

                {/* 2 & 3. Referencias de Columnas y Medidas */}
                <div className="space-y-4">
                  <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                    <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">
                      2. Referenciar columnas
                    </span>
                    <p className="text-[11px] text-slate-400 font-sans leading-normal">
                      Siempre utiliza el nombre de la tabla antes de la columna para evitar ambigüedades en el modelo relacional:
                    </p>
                    <div className="p-2.5 bg-slate-950 border border-slate-900/80 rounded-lg text-xs font-mono">
                      <span className="text-emerald-400 font-bold">✓ Correcto: </span>
                      <code className="text-slate-300">'issues_issues'[due_date]</code>
                    </div>
                    <div className="p-2.5 bg-slate-950 border border-slate-900/80 rounded-lg text-xs font-mono">
                      <span className="text-rose-400 font-bold">✗ Incorrecto: </span>
                      <code className="text-slate-500">[due_date]</code> <span className="text-[10px] text-slate-500">(salvo en la misma tabla)</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                    <span className="text-[9px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded uppercase">
                      3. Referenciar medidas
                    </span>
                    <p className="text-[11px] text-slate-400 font-sans leading-normal">
                      Las medidas solo llevan corchetes, nunca el nombre de la tabla. Esto diferencia visualmente una medida de una columna calculada:
                    </p>
                    <div className="p-2 bg-slate-950 border border-slate-900/80 rounded-lg text-xs font-mono text-blue-300">
                      [Ventas Totales]
                    </div>
                  </div>
                </div>

              </div>

              {/* 4 & 10. Mayúsculas y Comentarios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                    4. Las funciones van en mayúsculas
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    Se recomienda enfáticamente escribir los nombres de las funciones siempre en mayúsculas para aumentar la legibilidad del código:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['IF()', 'SUM()', 'MAX()', 'TODAY()', 'DATEDIFF()', 'CALCULATE()', 'FILTER()'].map((fn) => (
                      <span key={fn} className="px-2 py-1 bg-slate-900 text-slate-300 border border-slate-800 rounded font-mono text-[10px] font-bold">
                        {fn}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded uppercase">
                    10. Comentarios en el código
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    Documente la lógica compleja de sus medidas para facilitar el mantenimiento futuro:
                  </p>
                  <pre className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-[10px] font-mono text-slate-500 overflow-x-auto leading-relaxed">
{`// comentario de una línea

/*
comentario
de varias líneas
*/`}
                  </pre>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'sintaxis' && (
            <motion.div
              key="tab-sintaxis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <Clock className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">Operadores, Comparaciones y Fechas</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 5. Textos entre comillas */}
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded uppercase">
                    5. Los textos siempre entre comillas
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    Toda cadena literal de texto debe estar envuelta obligatoriamente entre comillas dobles:
                  </p>
                  <div className="space-y-1">
                    <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-[10.5px] font-mono flex items-center justify-between">
                      <span className="text-slate-400">Correcto:</span>
                      <code className="text-emerald-400">"VENCIDO"</code>
                    </div>
                    <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-[10.5px] font-mono flex items-center justify-between">
                      <span className="text-slate-400">Incorrecto:</span>
                      <code className="text-rose-400">VENCIDO</code>
                    </div>
                  </div>
                </div>

                {/* 6. Las Fechas */}
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded uppercase">
                    6. Las fechas
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    Obtenga fechas del sistema en tiempo real para evaluar vencimientos o antigüedades:
                  </p>
                  <div className="space-y-2">
                    <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-[10.5px] font-mono">
                      <div className="text-[8px] text-slate-500 uppercase">FECHA DE HOY</div>
                      <code className="text-cyan-300">TODAY()</code>
                    </div>
                    <div className="p-2 bg-slate-950 border border-slate-900 rounded-lg text-[10.5px] font-mono">
                      <div className="text-[8px] text-slate-500 uppercase">FECHA Y HORA ACTUAL</div>
                      <code className="text-cyan-300">NOW()</code>
                    </div>
                  </div>
                </div>

                {/* 7. Comparaciones */}
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded uppercase">
                    7. Operadores de Comparación
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    Operadores lógicos estándar para establecer condiciones:
                  </p>
                  <div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
                    <div className="p-1.5 bg-slate-950 border border-slate-900/60 rounded flex justify-between">
                      <span className="text-slate-500">Mayor</span>
                      <span className="text-amber-400 font-bold">&gt;</span>
                    </div>
                    <div className="p-1.5 bg-slate-950 border border-slate-900/60 rounded flex justify-between">
                      <span className="text-slate-500">Menor</span>
                      <span className="text-amber-400 font-bold">&lt;</span>
                    </div>
                    <div className="p-1.5 bg-slate-950 border border-slate-900/60 rounded flex justify-between">
                      <span className="text-slate-500">Igual</span>
                      <span className="text-amber-400 font-bold">=</span>
                    </div>
                    <div className="p-1.5 bg-slate-950 border border-slate-900/60 rounded flex justify-between">
                      <span className="text-slate-500">Diferente</span>
                      <span className="text-amber-400 font-bold">&lt;&gt;</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 8 & 9. Función IF y Operadores Lógicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 8. Función IF */}
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-3">
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase">
                    8. Función IF (Condicional de 3 partes)
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    La estructura lógica de evaluación condicional requiere obligatoriamente tres argumentos:
                  </p>
                  <pre className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-[10px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`IF(
    condición,
    resultado_si_verdadero,
    resultado_si_falso
)`}
                  </pre>
                  <pre className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-[10px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`Ejemplo =
IF(
    TODAY() > 'issues_issues'[due_date].[Date],
    "VENCIDO",
    "A TIEMPO"
)`}
                  </pre>
                </div>

                {/* 9. Operadores Lógicos */}
                <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-3">
                  <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">
                    9. Operadores lógicos (Y, O)
                  </span>
                  <p className="text-[11px] text-slate-400 font-sans leading-normal">
                    Combine condiciones lógicas múltiples dentro de sus funciones condicionales:
                  </p>
                  <div className="grid grid-cols-2 gap-3 pb-1">
                    <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg text-xs font-mono text-center">
                      <div className="text-[8px] text-slate-500 uppercase mb-0.5">Operador lógico Y</div>
                      <span className="text-indigo-400 font-bold">&&</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg text-xs font-mono text-center">
                      <div className="text-[8px] text-slate-500 uppercase mb-0.5">Operador lógico O</div>
                      <span className="text-indigo-400 font-bold">||</span>
                    </div>
                  </div>
                  <pre className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-[10px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`Ejemplo =
IF(
    [Dias] > 30 && [Estado] = "Abierto",
    "Crítico",
    "Normal"
)`}
                  </pre>
                </div>

              </div>

            </motion.div>
          )}

          {activeTab === 'conceptos' && (
            <motion.div
              key="tab-conceptos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <Layers className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">Conceptos Críticos y Errores de Compilación</h3>
              </div>

              {/* 11. Medidas vs Columnas */}
              <div className="bg-slate-950/60 border border-slate-900 p-4.5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded uppercase">
                    11. Medidas vs Columnas calculadas
                  </span>
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 animate-pulse" />
                    <span>Explicación Gráfica (Ejemplo Visual)</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2.5">
                    <h4 className="text-xs font-bold font-mono text-slate-200 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Columna calculada
                    </h4>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                      Se calcula <strong>durante la actualización de los datos</strong> y se almacena en el modelo, aumentando el peso del archivo. Da un resultado estático fila por fila.
                    </p>
                    <pre className="p-3 bg-slate-950/80 border border-slate-900 rounded text-[9.5px] font-mono text-slate-300 overflow-x-auto">
{`Estado =
IF(
    TODAY() > [Due_date],
    "VENCIDO",
    "A TIEMPO"
)`}
                    </pre>
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2.5">
                    <h4 className="text-xs font-bold font-mono text-slate-200 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      Medida (Recomendada)
                    </h4>
                    <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                      Se calcula en tiempo de ejecución <strong>según la interacción</strong> con el reporte. No consume almacenamiento de disco, se actualiza dinámicamente según filtros.
                    </p>
                    <pre className="p-3 bg-slate-950/80 border border-slate-900 rounded text-[9.5px] font-mono text-slate-300 overflow-x-auto">
{`Total_Tickets =
SUM('Ventas'[Valor])`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 12. Errores Comunes */}
              <div className="bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-3.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4.5 h-4.5 text-rose-400" />
                  <span className="text-[9px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded uppercase">
                    12. Errores de sintaxis más comunes
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-normal">
                  Identifique y evite las fallas más habituales que impiden el guardado de fórmulas:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Comas faltantes */}
                  <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-lg space-y-2">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">FALTA UNA COMA EN LOS PARÁMETROS</div>
                    <div className="p-2.5 bg-rose-500/5 border border-rose-500/20 text-[10px] font-mono text-rose-300 rounded leading-relaxed">
                      <div>❌ INCORRECTO</div>
                      <pre>{`IF(
    A > 0
    "SI"
    "NO"
)`}</pre>
                    </div>
                    <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 rounded leading-relaxed">
                      <div>✅ CORRECTO</div>
                      <pre>{`IF(
    A > 0,
    "SI",
    "NO"
)`}</pre>
                    </div>
                  </div>

                  {/* Paréntesis desbalanceados */}
                  <div className="p-3.5 bg-slate-950 border border-slate-900 rounded-lg space-y-2">
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">PARÉNTESIS DESBALANCEADOS O SIN CERRAR</div>
                    <div className="p-2.5 bg-rose-500/5 border border-rose-500/20 text-[10px] font-mono text-rose-300 rounded leading-relaxed">
                      <div>❌ INCORRECTO</div>
                      <pre>{`IF(
    A > 0,
    "SI",
    "NO"`}</pre>
                    </div>
                    <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-mono text-emerald-300 rounded leading-relaxed">
                      <div>✅ CORRECTO</div>
                      <pre>{`IF(
    A > 0,
    "SI",
    "NO"
)`}</pre>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {activeTab === 'funciones' && (
            <motion.div
              key="tab-funciones"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                <FileSpreadsheet className="w-4.5 h-4.5 text-blue-400" />
                <h3 className="text-xs font-bold font-mono text-slate-200 uppercase tracking-wider">13. Funciones que más vas a utilizar</h3>
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-1.5 border border-slate-900/60 rounded-xl bg-slate-950">
                <table className="w-full text-left font-mono text-[10px] leading-relaxed">
                  <thead>
                    <tr className="bg-slate-900/60 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800">
                      <th className="py-2.5 px-4 font-mono">Función DAX</th>
                      <th className="py-2.5 px-4 font-mono">¿Para qué sirve?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/65">
                    {mostUsedFunctions.map((fn, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                        <td className="py-2.5 px-4 text-blue-300 font-bold whitespace-nowrap">{fn.name}</td>
                        <td className="py-2.5 px-4 text-slate-400 font-sans">{fn.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* EXPLICACIÓN DETALLADA MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur z-20">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400 animate-pulse" />
                  <div>
                    <h3 className="text-xs md:text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
                      Guía Interactiva: Medidas vs Columnas Calculadas
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Entienda la diferencia práctica en Power BI a través de un ejemplo de la vida real
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 md:p-6 space-y-6 overflow-y-auto">
                {/* Intro */}
                <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 space-y-2">
                  <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">1. El Modelo de Datos Base</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Imagina que tenemos la siguiente tabla con información de proyectos, sus fechas límites de vencimiento (Due_date) y sus respectivos valores monetarios.
                  </p>

                  <div className="overflow-x-auto pt-2">
                    <table className="min-w-full font-mono text-[10.5px] border border-slate-800 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800">
                          <th className="py-2 px-4 text-left">Proyecto</th>
                          <th className="py-2 px-4 text-left">Due_date</th>
                          <th className="py-2 px-4 text-right">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850 bg-slate-950/40">
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2 px-4 text-slate-200 font-bold">A</td>
                          <td className="py-2 px-4 text-slate-300">10/07/2026</td>
                          <td className="py-2 px-4 text-right text-slate-300 font-bold">100</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2 px-4 text-slate-200 font-bold">B</td>
                          <td className="py-2 px-4 text-slate-300">05/07/2026</td>
                          <td className="py-2 px-4 text-right text-slate-300 font-bold">200</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2 px-4 text-slate-200 font-bold">C</td>
                          <td className="py-2 px-4 text-slate-300">15/07/2026</td>
                          <td className="py-2 px-4 text-right text-slate-300 font-bold">300</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Columna Calculada */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-mono font-bold uppercase">
                      Columna calculada
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Una columna calculada <strong>agrega una nueva columna física</strong> a la tabla en memoria. Power BI la calcula fila por fila una sola vez cuando actualizas o importas los datos del origen.
                  </p>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                    <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Fórmula DAX para columna:</div>
                    <pre className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-[10.5px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
{`Estado =
IF(
    TODAY() > [Due_date],
    "VENCIDO",
    "A TIEMPO"
)`}
                    </pre>
                  </div>

                  <p className="text-xs text-slate-300">
                    Tras aplicar la fórmula, la tabla se almacena físicamente así:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full font-mono text-[10.5px] border border-slate-800 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 uppercase text-[9px] font-bold border-b border-slate-800">
                          <th className="py-2 px-4 text-left">Proyecto</th>
                          <th className="py-2 px-4 text-left">Due_date</th>
                          <th className="py-2 px-4 text-right">Valor</th>
                          <th className="py-2 px-4 text-left bg-blue-500/15 text-blue-400 font-bold">Estado (Columna)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850 bg-slate-950/40">
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2 px-4 text-slate-200 font-bold">A</td>
                          <td className="py-2 px-4 text-slate-300">10/07/2026</td>
                          <td className="py-2 px-4 text-right text-slate-300">100</td>
                          <td className="py-2 px-4 text-emerald-400 font-bold">A TIEMPO</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2 px-4 text-slate-200 font-bold">B</td>
                          <td className="py-2 px-4 text-slate-300">05/07/2026</td>
                          <td className="py-2 px-4 text-right text-slate-300">200</td>
                          <td className="py-2 px-4 text-rose-400 font-bold">VENCIDO</td>
                        </tr>
                        <tr className="hover:bg-slate-800/30">
                          <td className="py-2 px-4 text-slate-200 font-bold">C</td>
                          <td className="py-2 px-4 text-slate-300">15/07/2026</td>
                          <td className="py-2 px-4 text-right text-slate-300">300</td>
                          <td className="py-2 px-4 text-emerald-400 font-bold">A TIEMPO</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    💡 Observa que cada fila tiene su propio resultado. Por eso, responde a preguntas como: ¿Este proyecto está vencido? ¿Cuántos días lleva vencido este documento? ¿Cuál es la categoría de este registro? Siempre produce un resultado por cada fila.
                  </p>
                </div>

                {/* Medida */}
                <div className="space-y-3 pt-3 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-mono font-bold uppercase">
                      Medida (Cálculo Dinámico)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Una medida <strong>no crea una columna física</strong>. Solo hace un cálculo matemático cuando la utilizas dentro de un gráfico, matriz o tarjeta visual.
                  </p>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                    <div className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Fórmula DAX para Medida:</div>
                    <pre className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-[10.5px] font-mono text-indigo-400 overflow-x-auto leading-relaxed">
{`Total Valor =
SUM('Proyectos'[Valor])`}
                    </pre>
                  </div>

                  <p className="text-xs text-slate-300">
                    No aparece ninguna columna nueva. Pero si colocas la medida en un visual de <strong>tarjeta</strong>, verás:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                      <div className="text-[9px] font-mono text-slate-500 uppercase">1. Tarjeta sin filtros:</div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-center font-mono">
                        <div className="text-2xl font-black text-indigo-400">600</div>
                        <div className="text-[9px] text-slate-500 mt-1">porque: 100 + 200 + 300 = 600</div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
                      <div className="text-[9px] font-mono text-slate-500 uppercase">2. Tarjeta con filtro activo (Vencidos):</div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Ahora imagina que agregas un filtro para mostrar solo los proyectos vencidos. La medida automáticamente cambia:
                      </p>
                      
                      <div className="overflow-x-auto">
                        <table className="min-w-full font-mono text-[9.5px] border border-slate-800 rounded overflow-hidden">
                          <thead>
                            <tr className="bg-slate-900 text-slate-400 border-b border-slate-800">
                              <th className="py-1 px-2 text-left">Proyecto</th>
                              <th className="py-1 px-2 text-left">Estado</th>
                              <th className="py-1 px-2 text-right">Valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-slate-950/50">
                              <td className="py-1 px-2 text-slate-300">B</td>
                              <td className="py-1 px-2 text-rose-400">VENCIDO</td>
                              <td className="py-1 px-2 text-right text-slate-300 font-bold">200</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-center font-mono">
                        <div className="text-xl font-black text-amber-400">200</div>
                        <div className="text-[8px] text-slate-500 mt-0.5">La medida se recalcula según el contexto de filtrado actual.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regla nemotécnica */}
                <div className="pt-4 border-t border-slate-800 bg-slate-950/40 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold font-mono text-slate-200 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Una forma sencilla de recordarlo
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                      <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded uppercase">
                        Columna calculada
                      </span>
                      <p className="text-xs text-slate-300 leading-normal">
                        Responde a la pregunta:
                        <strong className="block text-slate-100 mt-1 font-mono text-xs text-blue-300">¿Qué valor tiene cada fila?</strong>
                      </p>
                      <div className="p-2.5 bg-slate-900/40 rounded border border-slate-800/60 text-[10px] font-mono space-y-1">
                        <div className="flex justify-between border-b border-slate-800/40 pb-1 text-slate-500">
                          <span>Proyecto</span>
                          <span>Estado</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>A</span>
                          <span className="text-emerald-400">A TIEMPO</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>B</span>
                          <span className="text-rose-400 font-bold">VENCIDO</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>C</span>
                          <span className="text-emerald-400">A TIEMPO</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-3 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded uppercase">
                          Medida
                        </span>
                        <p className="text-xs text-slate-300 leading-normal mt-2">
                          Responde a la pregunta:
                          <strong className="block text-slate-100 mt-1 font-mono text-xs text-indigo-300">¿Cuál es el resultado total de las filas que estoy viendo?</strong>
                        </p>
                      </div>
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/50">
                        <div className="text-[9px] font-mono text-slate-500 uppercase">Ejemplos de Resultados:</div>
                        <ul className="text-[11px] text-slate-400 font-sans space-y-1 pl-3 list-disc">
                          <li>Total de proyectos evaluados.</li>
                          <li>Valor acumulado de las obras visibles.</li>
                          <li>Promedio de duración real.</li>
                          <li>Número de proyectos en estado vencido.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded-lg transition-colors cursor-pointer border border-slate-800"
                >
                  Entendido, Cerrar Guía
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
