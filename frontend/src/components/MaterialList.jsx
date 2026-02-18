import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMaterials, deleteMaterial, setSearchMaterialTerm } from '../features/materials/materialSlice';
import { Trash2, Box, Search, AlertTriangle, AlertCircle, DollarSign, Package } from 'lucide-react';
import Swal from 'sweetalert2';

const MaterialList = () => {
  const dispatch = useDispatch();
  const { list, searchTerm } = useSelector((state) => state.materials);

  const filtered = list.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchMaterials());
    }
  }, [dispatch, list.length]);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Excluir Material?',
      text: `Tem certeza que deseja remover "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Sim, excluir!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const action = await dispatch(deleteMaterial(id));
        if (deleteMaterial.fulfilled.match(action)) {
          Swal.fire({ title: 'Removido!', icon: 'success', timer: 1500, showConfirmButton: false });
        } else {
          Swal.fire({ title: 'Erro!', text: action.payload || 'Erro ao excluir.', icon: 'error' });
        }
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Box className="text-blue-600" size={28} /> 
            <span>Almoxarifado</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">Gerenciamento de matérias-primas e custos</p>
        </div>
        
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar material..." 
            value={searchTerm} 
            onChange={(e) => dispatch(setSearchMaterialTerm(e.target.value))} 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white text-slate-600"
          />
        </div>
      </div>

      {/* --- DESKTOP TABLE --- */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">ID</th>
              <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Material</th>
              <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Preço Un.</th>
              <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Estoque</th>
              <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Valor Total</th>
              <th className="p-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((m) => {
              const isLowStock = m.minStock !== null && m.stockQuantity < m.minStock;
              return (
                <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${isLowStock ? 'bg-red-50/20' : ''}`}>
                  <td className="p-4 text-slate-400 text-sm font-mono">#{m.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{m.name}</span>
                      {isLowStock && <AlertTriangle size={16} className="text-red-500 animate-pulse" />}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-600">R$ {m.unitPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-4">
                    <span className={`font-black ${isLowStock ? 'text-red-600' : 'text-slate-700'}`}>{m.stockQuantity}</span>
                    <span className="ml-1 text-[10px] text-slate-400 uppercase">{m.unit}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-blue-600">R$ {(m.stockQuantity * (m.unitPrice || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleDelete(m.id, m.name)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARDS (FIXED ICONS) --- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filtered.map((m) => {
          const isLowStock = m.minStock !== null && m.stockQuantity < m.minStock;
          const totalValue = m.stockQuantity * (m.unitPrice || 0);

          return (
            <div key={m.id} className={`bg-white p-5 rounded-2xl border ${isLowStock ? 'border-red-200 bg-red-50/10' : 'border-slate-200'} shadow-sm`}>
              <div className="flex justify-between items-start mb-4">
                
                <div className="flex gap-3 items-start"> 
                  
                  <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center aspect-square ${isLowStock ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    <Package size={20} />
                  </div>
                  <div className="min-w-0"> 
                    <span className="text-[10px] font-mono text-slate-400 uppercase">ID #{m.id}</span>
                    <h4 className="text-lg font-black text-slate-800 leading-tight break-words">{m.name}</h4>
                  </div>
                </div>
                <button onClick={() => handleDelete(m.id, m.name)} className="p-2 text-red-400 shrink-0">
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Preço Unitário</p>
                  <p className="text-sm font-bold text-slate-700 font-mono">R$ {m.unitPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Estoque Atual</p>
                  <p className={`text-sm font-black ${isLowStock ? 'text-red-600' : 'text-emerald-600'}`}>
                    {m.stockQuantity} <span className="text-[10px] font-normal uppercase">{m.unit}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Valor Total</p>
                  <p className="text-sm font-black text-blue-600 font-mono italic">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Status</p>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${isLowStock ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {isLowStock ? 'Reposição' : 'OK'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER SUMMARY */}
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Patrimônio em Materiais</p>
            <p className="text-2xl font-black font-mono text-emerald-400">
              R$ {filtered.reduce((acc, m) => acc + (m.stockQuantity * (m.unitPrice || 0)), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Itens Cadastrados</p>
          <p className="text-2xl font-black">{filtered.length}</p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="mt-10 p-16 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold text-lg">Nenhum material encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default MaterialList;