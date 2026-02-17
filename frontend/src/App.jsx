import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm'; 

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <header style={{ 
        backgroundColor: '#001529', 
        padding: '20px', 
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Factory-Erp | Dashboard</h1>
      </header>

      <main style={{ maxWidth: '1200px', margin: '20px auto', backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
        
        <ProductForm /> 
        <hr style={{ margin: '30px 0', border: '0.5px solid #eee' }} />
        <ProductList />
      </main>
    </div>
  );
}

export default App;