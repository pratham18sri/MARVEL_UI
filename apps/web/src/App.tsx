import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Components from './pages/Components';
import ComponentDetail from './pages/ComponentDetail';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useMarvelTheme } from 'pratham-ui';

export const App: React.FC = () => {
  const { checkAuth } = useAuthStore();

  // Programmatically hook Marvel System Custom CSS properties
  useMarvelTheme();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/:slug" element={<ComponentDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        
        {/* Footer info S.H.I.E.L.D copyright mockup */}
        <footer className="py-8 border-t border-white/5 bg-[#080808] text-center text-[10px] text-[#A8A9AD] font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} PRATHAMUI SYSTEMS. ALL CORE SHIELDS ARE LOGICALLY REGISTERED. LEVEL 7 CLEARANCE.
        </footer>
      </div>
    </Router>
  );
};
export default App;
