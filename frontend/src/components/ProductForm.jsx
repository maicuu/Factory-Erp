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

  const inputStyle = {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    flex: '1 1 200px', 
    boxSizing: 'border-box'
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '12px', 
      backgroundColor: '#fafafa', 
      padding: '20px', 
      borderRadius: '8px',
      marginBottom: '20px',
      alignItems: 'center',
      border: '1px solid #f0f0f0'
    }}>
      <input 
        style={inputStyle}
        placeholder="Nome do Produto" 
        value={form.name} 
        onChange={(e) => setForm({...form, name: e.target.value})} 
        required 
      />
      <input 
        style={inputStyle}
        placeholder="SKU (ex: ENG-001)" 
        value={form.sku} 
        onChange={(e) => setForm({...form, sku: e.target.value})} 
        required 
      />
      <input 
        style={inputStyle}
        type="number" 
        step="0.01" 
        placeholder="Preço (R$)" 
        value={form.price} 
        onChange={(e) => setForm({...form, price: e.target.value})} 
        required 
      />
      <button type="submit" style={{ 
        backgroundColor: '#52c41a', 
        color: 'white', 
        border: 'none', 
        padding: '10px 20px', 
        borderRadius: '4px', 
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 'bold',
        minWidth: '140px',
        justifyContent: 'center',
        flex: '0 1 auto'
      }}>
        <PlusCircle size={18} /> Cadastrar
      </button>
    </form>
  );
};

export default ProductForm;