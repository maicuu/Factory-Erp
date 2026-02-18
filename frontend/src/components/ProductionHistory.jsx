import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { History, Calendar, Package, ArrowUpRight, Loader2, Clock, CheckCircle2 } from 'lucide-react';

const ProductionHistory = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = useCallback(async () => {
    try {
      const res = await axios.get('/api/logs');
      setLogs(res.data.reverse());
    } catch (error) {
      console.error("Erro ao carregar logs", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('pt-BR'),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-slate-500 font-medium animate-pulse">Consultando arquivos da fábrica...</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2.5 rounded-xl text-white shadow-lg shadow-slate-200">
            <History size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Histórico de Produção</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Registro de atividades da linha</p>
          </div>
        </div>
        
        <div className="self-start md:self-center bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Live Logs</span>
        </div>
      </div>

      {/* --- DESKTOP VIEW (TABLE) --- */}
      <div className="hidden md:block bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-4 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Data & Hora</th>
              <th className="p-4 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Produto</th>
              <th className="p-4 text-center text-[10px] font-black uppercase text-slate-400 tracking-widest">Volume</th>
              <th className="p-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {logs.map((log) => {
              const { day, time } = formatDate(log.timestamp);
              return (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500" /> {day}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1.5 ml-0.5">
                        <Clock size={12} /> {time}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Package size={18} />
                      </div>
                      <span className="font-semibold text-slate-700">{log.productName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold text-xs border border-emerald-100">
                      <ArrowUpRight size={14} />
                      +{log.quantityProduced} un
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-[10px] font-black uppercase py-1 px-2 bg-slate-100 text-slate-400 rounded-md">
                      Concluído
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE VIEW (LIST/TIMELINE) --- */}
      <div className="flex flex-col gap-4 md:hidden">
        {logs.map((log) => {
          const { day, time } = formatDate(log.timestamp);
          return (
            <div key={log.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
              {/* Status Badge flutuante */}
              <div className="absolute top-0 right-0 p-3">
                 <CheckCircle2 size={16} className="text-emerald-500/30" />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-800 leading-tight">{log.productName}</h4>
                  <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-400"/> {day}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase">Quantidade produzida</p>
                  <div className="flex items-center gap-1 text-emerald-600 font-black">
                    <ArrowUpRight size={14} />
                    <span>{log.quantityProduced} unidades</span>
                  </div>
                </div>
                <div className="text-right">
                   <span className="text-[9px] font-black uppercase py-1 px-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    Finalizado
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {logs.length === 0 && (
        <div className="bg-white p-16 rounded-3xl border-2 border-dashed border-slate-100 text-center">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <History size={32} className="text-slate-300" />
          </div>
          <h3 className="text-slate-500 font-bold">Nenhum registro encontrado</h3>
          <p className="text-sm text-slate-400">As produções aparecerão aqui automaticamente.</p>
        </div>
      )}

      {/* FOOTER RESUMO */}
      <div className="mt-6 flex justify-between items-center px-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Total de operações: <span className="text-slate-800 font-black">{logs.length}</span>
        </p>
        <button 
          onClick={loadLogs}
          className="text-[10px] font-black text-blue-600 uppercase hover:underline"
        >
          Atualizar Lista
        </button>
      </div>
    </div>
  );
};

export default ProductionHistory;