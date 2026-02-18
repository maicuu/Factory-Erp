import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/products/productSlice';
import { PlusCircle } from 'lucide-react';

const ProductForm = () => {
  const [form, setForm] = useState({ name: '', sku: '', price: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...form, price: parseFloat(form.price) }));
    setForm({ name: '', sku: '', price: '' });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col md:flex-row items-end gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8"
    >
      <div className="flex-1 w-full">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nome do Produto</label>
        <input 
          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50"
          placeholder="Ex: Banqueta Industrial" 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          required 
        />
      </div>

      <div className="flex-1 w-full md:max-w-[200px]">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">SKU</label>
        <input 
          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50"
          placeholder="ENG-001" 
          value={form.sku} 
          onChange={(e) => setForm({...form, sku: e.target.value})} 
          required 
        />
      </div>

      <div className="flex-1 w-full md:max-w-[150px]">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Preço Unitário</label>
        <input 
          type="number" 
          step="0.01"
          className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-slate-50"
          placeholder="0,00" 
          value={form.price} 
          onChange={(e) => setForm({...form, price: e.target.value})} 
          required 
        />
      </div>

      <button 
        type="submit" 
        className="w-full md:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100"
      >
        <PlusCircle size={18} /> Cadastrar
      </button>
    </form>
  );
};

export default ProductForm;