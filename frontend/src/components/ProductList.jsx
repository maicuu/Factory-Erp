import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, setSearchTerm } from '../features/products/productSlice';
import { Trash2, Package, Search, Settings2, AlertCircle, DollarSign, BarChart3 } from 'lucide-react'; 
import RecipeModal from '../components/RecipeModal'; 
import Swal from 'sweetalert2';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status, searchTerm } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = list.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (list.length === 0) dispatch(fetchProducts());
  }, [dispatch, list.length]);

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Excluir Produto?',
      text: `Tem certeza que deseja remover "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Sim, excluir!',
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Package className="text-blue-600" size={28} /> 
            <span>Catálogo de Produtos</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">Gestão de estoque e receitas de produção</p>
        </div>
        
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou SKU..." 
            value={searchTerm} 
            onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm bg-white text-slate-600"
          />
        </div>
      </div>

      {status === 'loading' ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-slate-500 font-medium italic">Sincronizando catálogo...</p>
        </div>
      ) : (
        <>
          {/* --- DESKTOP VIEW (TABLE) --- */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Produto</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">SKU</th>
                  <th className="p-4 text-left text-xs font-bold text-slate-500 uppercase tracking-widest">Preço Venda</th>
                  <th className="p-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Estoque</th>
                  <th className="p-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-slate-800">{product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono italic">ID: #{product.id}</div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{product.sku || '---'}</td>
                    <td className="p-4 font-mono font-bold text-slate-700">R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black border border-blue-100">
                        {product.stockQuantity || 0} un
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => setSelectedProduct(product)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-blue-50">
                          <Settings2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-50">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE VIEW (CARDS) --- */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center aspect-square">
                      <Package size={24} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">ID #{product.id}</span>
                      <h4 className="text-lg font-black text-slate-800 leading-tight break-words">{product.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-medium">SKU: {product.sku || '---'}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                     <button onClick={() => setSelectedProduct(product)} className="p-2 text-blue-500">
                      <Settings2 size={20} />
                    </button>
                    <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-red-400">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Preço de Venda</p>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <DollarSign size={14} />
                      <p className="text-sm font-bold">{product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Estoque Atual</p>
                    <div className="flex items-center justify-end gap-1 text-blue-600">
                      <BarChart3 size={14} />
                      <p className="text-sm font-black">{product.stockQuantity || 0} <span className="text-[10px] font-normal uppercase">un</span></p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full mt-4 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest border border-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  Ver Receita / Composição
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && status === 'succeeded' && (
        <div className="mt-10 p-16 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-bold text-lg">Nenhum produto encontrado.</p>
        </div>
      )}

      {selectedProduct && (
        <RecipeModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductList;