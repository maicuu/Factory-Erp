import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMaterials, deleteMaterial, setSearchMaterialTerm } from '../features/materials/materialSlice';
import { Trash2, Box, Search } from 'lucide-react';

const MaterialList = () => {
  const dispatch = useDispatch();
  const { list, status, searchTerm } = useSelector((state) => state.materials);

  const filtered = list.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    if (status === 'idle') dispatch(fetchMaterials());
  }, [status, dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Box size={24} /> Inventário de Matérias Primas</h2>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: '#8c8c8c' }} />
        <input type="text" placeholder="Buscar material..." value={searchTerm} onChange={(e) => dispatch(setSearchMaterialTerm(e.target.value))} 
               style={{ padding: '10px 10px 10px 35px', width: '100%', borderRadius: '4px', border: '1px solid #d9d9d9' }} />
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '600px', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa', borderBottom: '2px solid #f0f0f0' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Nome</th>
              <th style={{ padding: '12px' }}>Unidade</th>
              <th style={{ padding: '12px' }}>Qtd em Stock</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '12px' }}>{m.id}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{m.name}</td>
                <td style={{ padding: '12px' }}>{m.unit}</td>
                <td style={{ padding: '12px' }}>{m.stockQuantity}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button onClick={() => dispatch(deleteMaterial(m.id))} style={{ backgroundColor: 'transparent', color: '#ff4d4f', border: '1px solid #ff4d4f', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialList;