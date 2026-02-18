import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComponentsByProduct, addComponent, deleteComponent } from '../features/components/componentSlice';
import { fetchMaterials } from '../features/materials/materialSlice'; 
import { X, Plus, Trash2 } from 'lucide-react';

const RecipeModal = ({ product, onClose }) => {
  const dispatch = useDispatch();
  
  
  const materials = useSelector((state) => state.materials.list);
  const recipe = useSelector((state) => state.components.list);
  
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (product) {
      dispatch(fetchComponentsByProduct(product.id));
    }
    
    
    if (materials.length === 0) {
      dispatch(fetchMaterials());
    }
  }, [product, dispatch, materials.length]);

  const handleAdd = () => {
    if (!selectedMaterial || !quantity) return;
    
    dispatch(addComponent({
      product: { id: product.id },
      material: { id: parseInt(selectedMaterial) },
      quantity: parseFloat(quantity)
    }));
    
    setQuantity('');
    setSelectedMaterial('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[1000] flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Composição do Produto</h3>
            <p className="text-xs text-slate-500 font-medium">{product.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-end gap-2 mb-6 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            <div className="flex-[2]">
              <label className="text-[10px] font-black uppercase text-blue-500 ml-1">Matéria Prima</label>
              <select 
                value={selectedMaterial} 
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full mt-1 bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Selecione a Matéria Prima</option>
                {/* Verificação de segurança: mapeia apenas se 'materials' existir */}
                {materials && materials.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} {m.unit ? `(${m.unit})` : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-24">
              <label className="text-[10px] font-black uppercase text-blue-500 ml-1">Qtd</label>
              <input 
                type="number" 
                placeholder="0"
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full mt-1 bg-white border border-blue-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button 
              onClick={handleAdd}
              className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 text-[10px] font-black uppercase text-slate-400">Material</th>
                  <th className="text-left py-2 text-[10px] font-black uppercase text-slate-400">Qtd</th>
                  <th className="text-center py-2 text-[10px] font-black uppercase text-slate-400">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recipe.map(item => {
                  const materialInfo = materials.find(m => m.id === item.material.id);
                  return (
                    <tr key={item.id}>
                      <td className="py-3 font-medium text-slate-700">
                        {materialInfo ? materialInfo.name : (item.material.name || 'Material ID: ' + item.material.id)}
                      </td>
                      <td className="py-3 text-slate-600">
                        {item.quantity} {materialInfo ? materialInfo.unit : (item.material.unit || '')}
                      </td>
                      <td className="py-3 text-center">
                        <button onClick={() => dispatch(deleteComponent(item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;