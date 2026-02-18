import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMaterial } from '../features/materials/materialSlice';
import { PlusCircle, DollarSign } from 'lucide-react';
import Swal from 'sweetalert2';

const MaterialForm = () => {
  
  const [form, setForm] = useState({ name: '', unit: '', stockQuantity: '', minStock: '', unitPrice: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const action = await dispatch(addMaterial({ 
      ...form, 
      stockQuantity: parseFloat(form.stockQuantity),
      minStock: parseFloat(form.minStock) || 0,
      unitPrice: parseFloat(form.unitPrice) || 0 
    }));

    if (addMaterial.fulfilled.match(action)) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });

      Toast.fire({
        icon: 'success',
        title: 'Material cadastrado!'
      });

      
      setForm({ name: '', unit: '', stockQuantity: '', minStock: '', unitPrice: '' });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: action.payload || 'Verifique os dados ou a conexão.'
      });
    }
  };

  const inputStyle = {
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #d9d9d9', 
    flex: '1 1 150px', 
    fontSize: '14px',
    outline: 'none',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
    transition: 'border-color 0.2s'
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '12px', 
      backgroundColor: '#ffffff', 
      padding: '24px', 
      borderRadius: '12px', 
      marginBottom: '25px', 
      alignItems: 'center', 
      border: '1px solid #e8e8e8',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <input 
        style={inputStyle} 
        placeholder="Nome da Matéria Prima" 
        value={form.name} 
        onChange={(e) => setForm({...form, name: e.target.value})} 
        required 
      />
      <input 
        style={inputStyle} 
        placeholder="Unidade (ex: KG, UN)" 
        value={form.unit} 
        onChange={(e) => setForm({...form, unit: e.target.value})} 
        required 
      />
      
      {/* NOVO CAMPO: Preço Unitário */}
      <div style={{ flex: '1 1 150px', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span style={{ position: 'absolute', left: '10px', color: '#8c8c8c', fontSize: '14px' }}>R$</span>
        <input 
          style={{ ...inputStyle, paddingLeft: '30px', width: '100%' }} 
          type="number" 
          step="0.01" 
          placeholder="Preço Unit." 
          value={form.unitPrice} 
          onChange={(e) => setForm({...form, unitPrice: e.target.value})} 
          required 
        />
      </div>

      <input 
        style={inputStyle} 
        type="number" 
        step="0.01" 
        placeholder="Qtd em Stock" 
        value={form.stockQuantity} 
        onChange={(e) => setForm({...form, stockQuantity: e.target.value})} 
        required 
      />
      <input 
        style={inputStyle} 
        type="number" 
        step="0.01" 
        placeholder="Aviso Mínimo" 
        value={form.minStock} 
        onChange={(e) => setForm({...form, minStock: e.target.value})} 
        required 
      />

      <button 
        type="submit" 
        style={{ 
          backgroundColor: '#10b981', 
          color: 'white', 
          border: 'none', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          cursor: 'pointer', 
          fontWeight: 'bold', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          transition: 'all 0.2s',
          boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#059669'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
      >
        <PlusCircle size={18} /> Cadastrar
      </button>
    </form>
  );
};

export default MaterialForm;