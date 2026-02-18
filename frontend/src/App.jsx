import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import MaterialList from './components/MaterialList';
import MaterialForm from './components/MaterialForm';
import ProductionDashboard from './components/ProductionDashboard';
import ProductionHistory from './components/ProductionHistory';
import { Package, Box, Play, History } from 'lucide-react';

function App() {
  
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'products');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  
  const tabClass = (tab) => `
    flex items-center gap-2 px-6 py-4 cursor-pointer font-bold transition-all duration-300 whitespace-nowrap
    border-b-4 text-sm md:text-base
    ${activeTab === tab 
      ? 'border-blue-500 text-blue-600 bg-blue-50/30' 
      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
  `;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      
      <header className="bg-slate-900 px-6 py-5 shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          <div className="flex flex-col">
            <h1 className="text-white text-xl md:text-2xl font-black tracking-tight leading-none">
              FACTORY<span className="text-blue-500 text-shadow-glow">ERP</span>
            </h1>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Gestão de Produção</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end border-r border-slate-700 pr-4">
              <span className="text-white text-xs font-bold uppercase tracking-widest">Status da Fábrica</span>
              <span className="text-emerald-400 text-[10px] font-black flex items-center gap-1 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Operacional
              </span>
            </div>
            <div className="text-slate-500 text-[10px] font-mono font-bold tracking-tighter bg-white/5 px-2 py-1 rounded">
              v2.0.26
            </div>
          </div>
        </div>
      </header>

     
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 overflow-x-auto scrollbar-hide shadow-sm">
        <div className="max-w-7xl mx-auto flex">
          <button className={tabClass('products')} onClick={() => handleTabChange('products')}>
            <Package size={18} /> Produtos
          </button>
          <button className={tabClass('materials')} onClick={() => handleTabChange('materials')}>
            <Box size={18} /> Insumos
          </button>
          <button className={tabClass('production')} onClick={() => handleTabChange('production')}>
            <Play size={18} /> Produção
          </button>
          <button className={tabClass('history')} onClick={() => handleTabChange('history')}>
            <History size={18} /> Histórico
          </button>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-sm p-4 md:p-10 border border-slate-200 min-h-[60vh]">
          
          {/* ABA: PRODUTOS */}
          {activeTab === 'products' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <section>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Cadastro de Produtos</h2>
                <ProductForm /> 
              </section>
              <div className="border-t border-slate-100" />
              <section>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Lista de Catálogo</h2>
                <ProductList />
              </section>
            </div>
          )}

          {/* ABA: INSUMOS (MATÉRIAS-PRIMAS) */}
          {activeTab === 'materials' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <section>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Entrada de Insumos</h2>
                <MaterialForm /> 
              </section>
              <div className="border-t border-slate-100" />
              <section>
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Estoque de Matéria-Prima</h2>
                <MaterialList />
              </section>
            </div>
          )}

          {/* ABA: PRODUÇÃO (DASHBOARD) */}
          {activeTab === 'production' && (
            <div className="animate-in slide-in-from-bottom-2 duration-500">
              <ProductionDashboard />
            </div>
          )}

          {/* ABA: HISTÓRICO */}
          {activeTab === 'history' && (
            <div className="animate-in fade-in duration-500">
              <ProductionHistory />
            </div>
          )}
          
        </div>
      </main>

    
      <footer className="max-w-7xl mx-auto pb-10 px-8 text-center">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          FactoryERP System &copy; 2026 - Otimização de Margem e Controle Industrial
        </p>
      </footer>
    </div>
  );
}

export default App;