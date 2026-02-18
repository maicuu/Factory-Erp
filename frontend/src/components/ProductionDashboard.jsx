import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { CheckCircle, Info, TrendingUp, Package, Loader2, DollarSign } from 'lucide-react';
import Swal from 'sweetalert2';

import { fetchProducts } from '../features/products/productSlice';
import { fetchMaterials } from '../features/materials/materialSlice';

const ProductionDashboard = () => {
  const dispatch = useDispatch();
  const [capacities, setCapacities] = useState([]);
  const [suggestion, setSuggestion] = useState({ 
    items: [], 
    totalPotentialValue: 0, 
    totalPotentialProfit: 0 
  });
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resCap, resSug] = await Promise.all([
        axios.get('/api/products/availability'),
        axios.get('/api/products/optimized-suggestion')
      ]);
      setCapacities(resCap.data);
      setSuggestion(resSug.data);
    } catch (error) {
      console.error("Erro ao sincronizar dados da fábrica:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleProduce = async (productId, isCheckOnly = false) => {
    const productInfo = capacities.find(c => c.productId === productId);
    const max = productInfo?.maxPossible || 0;
    
    
    
    let qty = "1";
    if (!isCheckOnly) {
      const { value: quantity } = await Swal.fire({
        title: `<span class="text-xl font-black text-slate-800 uppercase tracking-tight">Ordem de Produção</span>`,
        html: `
          <div class="mt-4 text-left font-sans">
            <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Item Selecionado</p>
              <p class="text-base font-bold text-slate-700">${productInfo?.productName || 'Produto'}</p>
            </div>
            
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-black text-slate-500 uppercase ml-1">Quantidade desejada</label>
              <div class="relative">
                <input 
                  id="swal-input-qty" 
                  type="number" 
                  value="1" 
                  min="1" 
                  max="${max}"
                  class="w-full py-4 px-5 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-2xl font-black text-slate-800 transition-all"
                >
                <div class="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">
                  unid.
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <div class="bg-blue-500 p-1.5 rounded-lg text-white shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              </div>
              <div>
                <p class="text-[10px] font-black text-blue-900 uppercase tracking-wider">Capacidade de Insumos</p>
                <p class="text-xs font-medium text-blue-700 leading-tight">
                  Limite máximo: <span class="font-black text-blue-900">${max} unidades</span>.
                  <br/>
                  <span class="text-[10px] opacity-80 italic">Produzir acima disso requer reposição de estoque imediata.</span>
                </p>
              </div>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Produção',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#f1f5f9',
        focusConfirm: false,
        padding: '2rem',
        customClass: {
          popup: 'rounded-[32px] border-none shadow-2xl',
          confirmButton: 'py-4 px-8 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-200 transition-transform active:scale-95',
          cancelButton: 'py-4 px-8 rounded-2xl font-black uppercase text-xs tracking-widest text-slate-400 border-none'
        },
        preConfirm: () => {
          const val = document.getElementById('swal-input-qty').value;
          if (!val || val <= 0) {
            Swal.showValidationMessage('A quantidade deve ser maior que zero');
            return false;
          }
          if (parseInt(val) > max) {
            Swal.showValidationMessage(`Limite excedido! Máximo disponível: ${max}`);
            return false;
          }
          return val;
        }
      });
      if (!quantity) return;
      qty = quantity;
    }

    try {
      await axios.post(`/api/products/${productId}/produce/${qty}`);
      dispatch(fetchProducts());  
      dispatch(fetchMaterials()); 
      loadData();
      Swal.fire({ 
        icon: 'success', 
        title: '<span class="font-black uppercase tracking-tight">Sucesso!</span>', 
        text: 'Ordem de produção finalizada e estoque atualizado.',
        timer: 2000, 
        showConfirmButton: false,
        customClass: { popup: 'rounded-[32px]' }
      });
    } catch (err) {
      if (err.response?.status === 400 && typeof err.response.data === 'string') {
        const formattedList = err.response.data
          .replace("Estoque insuficiente. Itens necessários: ", "")
          .split(", ")
          .join("</li><li>");

        Swal.fire({
          icon: isCheckOnly ? 'info' : 'error',
          title: isCheckOnly ? 'Requisitos' : 'Estoque Insuficiente',
          html: `<div class="text-left font-sans"><p class="text-sm font-bold text-slate-600 mb-3">Para produzir esta quantidade, faltam:</p><ul class="text-red-500 font-black text-sm list-disc ml-5"><li>${formattedList}</li></ul></div>`,
          confirmButtonColor: '#ef4444',
          customClass: { popup: 'rounded-[32px]' }
        });
      } else {
        console.error("Erro na produção:", err);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4 text-center px-6">
      <Loader2 className="animate-spin text-blue-600" size={48} />
      <p className="text-gray-500 font-medium italic">Sincronizando dados da fábrica...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen font-sans">
      
      {/* 1. HEADER / PLANO DE LUCRO REAL */}
      <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl mb-8 shadow-xl relative overflow-hidden border border-white/5">
        <div className="absolute -right-10 -top-10 opacity-10 rotate-12 text-emerald-500 pointer-events-none">
          <DollarSign size={240} />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <TrendingUp size={20} />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Inteligência de Negócio</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-white leading-tight">
              Otimização de <span className="text-emerald-400">Margem Real</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium">
              O algoritmo priorizou os itens de maior valor de mercado para otimizar o faturamento bruto disponível.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col justify-center w-full lg:w-auto lg:min-w-[280px]">
            <span className="text-slate-400 text-xs font-bold uppercase mb-1">Lucro Líquido Estimado</span>
            <span className="text-2xl md:text-3xl font-mono font-bold text-emerald-400">
              R$ {suggestion.totalPotentialProfit?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
              <div className="h-1.5 flex-grow bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${suggestion.totalPotentialValue > 0 ? (suggestion.totalPotentialProfit / suggestion.totalPotentialValue) * 100 : 0}%` }} 
                />
              </div>
              <span className="whitespace-nowrap">{(suggestion.totalPotentialValue > 0 ? (suggestion.totalPotentialProfit / suggestion.totalPotentialValue) * 100 : 0).toFixed(0)}% Margem</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {suggestion.items?.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-2xl group border-l-4 border-l-emerald-500 transition-all hover:bg-white/10">
              <div className="flex justify-between items-start mb-3 gap-2">
                <p className="text-slate-300 text-[9px] md:text-[10px] font-black uppercase leading-tight flex-grow break-words">{item.productName}</p>
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                  {item.margin?.toFixed(1)}%
                </span>
              </div>
              
              <p className="text-xl md:text-2xl font-black">{item.quantity} <span className="text-xs font-normal opacity-50">un</span></p>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col xs:flex-row justify-between items-start xs:items-end gap-2">
                <div>
                  <p className="text-[8px] md:text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Custo Total</p>
                  <p className="text-[11px] md:text-xs font-mono text-red-400">R$ {item.totalCost?.toLocaleString('pt-BR')}</p>
                </div>
                <div className="xs:text-right">
                  <p className="text-[8px] md:text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Faturamento</p>
                  <p className="text-[11px] md:text-xs font-mono text-emerald-400">R$ {item.subtotal?.toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. GRID DE CAPACIDADE TÉCNICA */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <Package className="text-blue-600" size={28} />
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Capacidade Técnica</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {capacities.map(cap => (
          <div key={cap.productId} className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className={`h-2 ${cap.maxPossible > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div className="p-6 flex flex-col flex-grow">
              <h4 className="font-bold text-slate-800 text-lg mb-4 h-[50px] line-clamp-2 leading-tight">{cap.productName}</h4>
              <div className={`rounded-2xl p-6 mb-6 text-center ${cap.maxPossible > 0 ? 'bg-emerald-50/50' : 'bg-red-50/50'}`}>
                <span className={`text-5xl font-black ${cap.maxPossible > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {cap.maxPossible}
                </span>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Disponível agora</p>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => handleProduce(cap.productId, cap.maxPossible === 0)} 
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm ${
                    cap.maxPossible > 0 
                    ? 'bg-slate-900 hover:bg-emerald-600 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  {cap.maxPossible > 0 ? <><CheckCircle size={18} /> Produzir Item</> : <><Info size={18} /> Ver Pendências</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionDashboard;