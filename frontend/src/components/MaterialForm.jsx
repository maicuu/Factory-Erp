import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMaterial } from '../features/materials/materialSlice';
import { PlusCircle } from 'lucide-react';

const MaterialForm = () => {
  const [form, setForm] = useState({ name: '', unit: '', stockQuantity: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMaterial({ ...form, stockQuantity: parseFloat(form.stockQuantity) }));
    setForm({ name: '', unit: '', stockQuantity: '' });
  };

  const inputStyle = {
    padding: '10px', borderRadius: '4px', border: '1px solid #d9d9d9', flex: '1 1 150px'
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', flexWrap: 'wrap', gap: '12px', backgroundColor: '#fafafa', 
      padding: '20px', borderRadius: '8px', marginBottom: '20px', alignItems: 'center', border: '1px solid #f0f0f0' 
    }}>
      <input style={inputStyle} placeholder="Nome da Matéria Prima" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
      <input style={inputStyle} placeholder="Unidade (ex: KG, UN)" value={form.unit} onChange={(e) => setForm({...form, unit: e.target.value})} required />
      <input style={inputStyle} type="number" placeholder="Quantidade em Stock" value={form.stockQuantity} onChange={(e) => setForm({...form, stockQuantity: e.target.value})} required />
      <button type="submit" style={{ backgroundColor: '#1890ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PlusCircle size={18} /> Cadastrar Material
      </button>
    </form>
  );
};

export default MaterialForm;