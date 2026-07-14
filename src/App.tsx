import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SplashScreen } from '@capacitor/splash-screen';
import Splash from './components/Splash';
import Layout from './components/Layout';
import Home from './pages/Home';
import Oracoes from './pages/Oracoes';
import Eventos from './pages/Eventos';
import EventoDetalhes from './pages/EventoDetalhes';
import Paroquias from './pages/Paroquias';
import Pastorais from './pages/Pastorais';
import Instagram from './pages/Instagram';
import Agenda from './pages/Agenda';
import SantoDoDia from './pages/SantoDoDia';
import Liturgia from './pages/Liturgia';
import Catecismo from './pages/Catecismo';
import Avisos from './pages/Avisos';
import Membros from './pages/Membros';
import RedesSociais from './pages/RedesSociais';
import Inscricoes from './pages/Inscricoes';
import PrestacaoContas from './pages/PrestacaoContas';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Splash />
      <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oracoes" element={<Oracoes />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:id" element={<EventoDetalhes />} />
          <Route path="/paroquias" element={<Paroquias />} />
          <Route path="/pastorais" element={<Pastorais />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/santo" element={<SantoDoDia />} />
          <Route path="/liturgia" element={<Liturgia />} />
          <Route path="/catecismo" element={<Catecismo />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/membros" element={<Membros />} />
          <Route path="/redes-sociais" element={<RedesSociais />} />
          <Route path="/inscricoes" element={<Inscricoes />} />
          <Route path="/prestacao-contas" element={<PrestacaoContas />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Layout>
      </Router>
    </>
  );
};

export default App;
