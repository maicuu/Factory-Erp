import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, setSearchTerm } from '../features/products/productSlice';
import { Trash2, Package, Search } from 'lucide-react';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status, searchTerm } = useSelector((state) => state.products);

 
  const filteredProducts = list.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#001529' }}>
        <Package size={24} /> Estoque de Produtos
      </h2>
      
      
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={18} style={{ position: 'absolute', left: '10px', top: '10px', color: '#8c8c8c' }} />
        <input 
          type="text"
          placeholder="Buscar por nome ou SKU..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          style={{ 
            padding: '10px 10px 10px 35px', 
            width: '100%', 
            borderRadius: '4px', 
            border: '1px solid #d9d9d9',
            boxSizing: 'border-box',
            outline: 'none'
          }}
        />
      </div>

      {status === 'loading' && <p>Carregando...</p>}
      
      {/* Container com scroll horizontal para responsividade em celulares */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', minWidth: '600px', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#fafafa', borderBottom: '2px solid #f0f0f0' }}>
              <th style={{ padding: '12px', color: '#555' }}>ID</th>
              <th style={{ padding: '12px', color: '#555' }}>Nome</th>
              <th style={{ padding: '12px', color: '#555' }}>SKU</th>
              <th style={{ padding: '12px', color: '#555' }}>Preço</th>
              <th style={{ padding: '12px', color: '#555', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f0f0f0', transition: '0.3s' }}>
                <td style={{ padding: '12px' }}>{product.id}</td>
                <td style={{ padding: '12px', fontWeight: '500' }}>{product.name}</td>
                <td style={{ padding: '12px', color: '#666' }}>{product.sku}</td>
                <td style={{ padding: '12px' }}>R$ {product.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={() => dispatch(deleteProduct(product.id))}
                    title="Excluir produto"
                    style={{ 
                      backgroundColor: 'transparent', 
                      color: '#ff4d4f', 
                      border: '1px solid #ff4d4f', 
                      padding: '6px', 
                      cursor: 'pointer',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && status === 'succeeded' && (
        <p style={{ textAlign: 'center', color: '#8c8c8c', marginTop: '20px', border: '1px dashed #d9d9d9', padding: '20px' }}>
          Nenhum produto encontrado na busca.
        </p>
      )}
    </div>
  );
};

export default ProductList;