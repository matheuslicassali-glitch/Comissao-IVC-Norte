import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Evento, Noticia, AgendaItem, InstagramPost, AppConfig, Oracao, Capela, Pastoral, Produto } from '../../types';
import { supabase } from '../../services/supabase';
import { createClient } from '@supabase/supabase-js';
import EditModal from '../../components/Admin/EditModal';

type Section = 'home' | 'eventos' | 'agenda' | 'dizimo' | 'instagram' | 'oracoes' | 'capelas' | 'pastorais' | 'usuarios' | 'loja';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isLogged, setIsLogged] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState<string | null>(null);

  const sectionTitles: Record<Section, string> = {
    home: 'Notícias em Destaque (Slides)',
    eventos: 'Eventos',
    agenda: 'Agenda Semanal',
    dizimo: 'Informações do Dízimo/PIX',
    instagram: 'Posts do Instagram',
    oracoes: 'Orações',
    capelas: 'Capelas',
    pastorais: 'Pastorais',
    loja: 'Loja Virtual',
    usuarios: 'Administradores do Sistema'
  };

  // States specific for "Notícias" (Home Slides)
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  // States specific for "Eventos"
  const [eventos, setEventos] = useState<Evento[]>([]);
  // States specific for "Agenda"
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  // States specific for "Instagram"
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  // States specific for "Orações"
  const [oracoes, setOracoes] = useState<Oracao[]>([]);
  const [capelas, setCapelas] = useState<Capela[]>([]);
  const [pastorais, setPastorais] = useState<Pastoral[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // States specific for "Dízimo" (AppConfig)
  const [appConfig, setAppConfig] = useState<Partial<AppConfig>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>({});
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    checkSession();
  }, [navigate]);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    } else {
      setIsLogged(true);
      if (session.user.email) setCurrentUserEmail(session.user.email);
      fetchData(activeSection);
    }
  };

  useEffect(() => {
    if (isLogged) fetchData(activeSection);
  }, [activeSection, isLogged]);

  const fetchData = async (section: Section) => {
    setLoading(true);
    setErrorMSG(null);
    try {
      if (section === 'home') {
        const { data, error } = await supabase.from('noticias').select('*');
        if (error) {
          console.error('Erro ao buscar noticias:', error);
          if (error.code === '42P01') {
            setErrorMSG("Tabela 'noticias' não encontrada no Supabase.");
            setNoticias([]);
          } else {
            setErrorMSG(error.message);
          }
        } else {
          setNoticias(data || []);
        }
      } else if (section === 'eventos') {
        const { data, error } = await supabase.from('eventos').select('*').order('data_hora', { ascending: true });
        if (error) {
          console.error('Erro ao buscar eventos:', error);
          if (error.code === '42P01') {
            setErrorMSG("Tabela 'eventos' não encontrada no Supabase.");
            setEventos([]);
          } else {
            setErrorMSG(error.message);
          }
        } else {
          setEventos(data || []);
        }
      } else if (section === 'agenda') {
        const { data, error } = await supabase.from('agenda').select('*').order('dia', { ascending: true }).order('horario', { ascending: true });
        if (error) {
          console.error('Erro ao buscar agenda:', error);
          if (error.code === '42P01') {
            setErrorMSG("Tabela 'agenda' não encontrada no Supabase.");
            setAgenda([]);
          } else {
            setErrorMSG(error.message);
          }
        } else {
          setAgenda(data || []);
        }
      } else if (section === 'instagram') {
        const { data, error } = await supabase.from('instagram_posts').select('*').order('data_publicacao', { ascending: false });
        if (error) {
          console.error('Erro ao buscar instagram:', error);
          if (error.code === '42P01') {
            setErrorMSG("Tabela 'instagram_posts' não encontrada no Supabase.");
            setInstagramPosts([]);
          } else {
            setErrorMSG(error.message);
          }
        } else {
          setInstagramPosts(data || []);
        }
      } else if (section === 'oracoes') {
        const { data, error } = await supabase.from('oracoes').select('*');
        if (error) {
          console.error('Erro ao buscar oracoes:', error);
          if (error.code === '42P01') {
            setErrorMSG("Tabela 'oracoes' não encontrada no Supabase.");
            setOracoes([]);
          } else {
            setErrorMSG(error.message);
          }
        } else {
          setOracoes(data || []);
        }
      } else if (section === 'capelas') {
        const { data, error } = await supabase.from('capelas').select('*');
        if (error) {
          setErrorMSG(error.message);
        } else {
          setCapelas(data || []);
        }
      } else if (section === 'pastorais') {
        const { data, error } = await supabase.from('pastorais').select('*');
        if (error) {
          setErrorMSG(error.message);
        } else {
          setPastorais(data || []);
        }
      } else if (section === 'loja') {
        const { data: pData } = await supabase.from('produtos').select('*');
        setProdutos(pData || []);
        const { data: cData } = await supabase.from('app_config').select('*').eq('id', 1).single();
        setAppConfig(cData || {});
      } else if (section === 'dizimo') {
        const { data, error } = await supabase.from('app_config').select('*').eq('id', 1).single();
        if (error) {
          console.error('Erro ao buscar config:', error);
          if (error.code === '42P01' || error.code === 'PGRST116') {
            setErrorMSG("Configuração não encontrada. Crie o registro inicial.");
            setAppConfig({});
          } else {
            setErrorMSG(error.message);
          }
        } else {
          setAppConfig(data || {});
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMSG('Erro inesperado ao buscar dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  if (!isLogged) return null;

  // --- Handlers for Notícias ---

  const handleEditNoticia = (item: Noticia) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleNewNoticia = () => {
    setEditingItem({ titulo: '', resumo: '', imagem_url: '', link: '' });
    setIsModalOpen(true);
  };

  const handleDeleteNoticia = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir?')) return;
    try {
      const { error } = await supabase.from('noticias').delete().match({ id });
      if (error) throw error;
      setNoticias(noticias.filter(n => n.id !== id));
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  // --- Handlers for Eventos ---

  const handleEditEvento = (item: Evento) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleNewEvento = () => {
    setEditingItem({ nome: '', descricao: '', data_hora: '', local: '', imagem_url: '' });
    setIsModalOpen(true);
  };

  const handleDeleteEvento = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este evento?')) return;
    try {
      const { error } = await supabase.from('eventos').delete().match({ id });
      if (error) throw error;
      setEventos(eventos.filter(e => e.id !== id));
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  // --- Handlers for Agenda ---
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const handleEditAgenda = (item: AgendaItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleNewAgenda = () => {
    setEditingItem({ titulo: '', horario: '', tipo: 'outro', dia: 0 });
    setIsModalOpen(true);
  };

  const handleDeleteAgenda = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item da agenda?')) return;
    try {
      const { error } = await supabase.from('agenda').delete().match({ id });
      if (error) throw error;
      setAgenda(agenda.filter(a => a.id !== id));
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  // --- Handlers for Instagram ---

  const handleEditInstagram = (item: InstagramPost) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleNewInstagram = () => {
    setEditingItem({ url_post: '', legenda: '', data_publicacao: '', imagem_url: '' });
    setIsModalOpen(true);
  };

  const handleDeleteInstagram = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;
    try {
      const { error } = await supabase.from('instagram_posts').delete().match({ id });
      if (error) throw error;
      setInstagramPosts(instagramPosts.filter(p => p.id !== id));
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  // --- Handlers for Orações ---
  const handleEditOracao = (item: Oracao) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleNewOracao = () => {
    setEditingItem({ titulo: '', conteudo: '', imagem_url: '' });
    setIsModalOpen(true);
  };

  const handleDeleteOracao = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta oração?')) return;
    try {
      const { error } = await supabase.from('oracoes').delete().match({ id });
      if (error) throw error;
      setOracoes(oracoes.filter(o => o.id !== id));
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  // --- Handlers for Capelas ---
  const handleEditCapela = (item: Capela) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleNewCapela = () => {
    setEditingItem({ nome: '', descricao: '', endereco: '', padroeiro: '', imagem_url: '' });
    setIsModalOpen(true);
  };
  const handleDeleteCapela = async (id: string) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      const { error } = await supabase.from('capelas').delete().match({ id });
      if (error) throw error;
      setCapelas(capelas.filter(c => c.id !== id));
    } catch (err: any) { alert(err.message); }
  };

  // --- Handlers for Pastorais ---
  const handleEditPastoral = (item: Pastoral) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleNewPastoral = () => {
    setEditingItem({ nome: '', descricao: '', coordenador: '', reunioes: '', destaque: '', imagem_url: '' });
    setIsModalOpen(true);
  };
  const handleDeletePastoral = async (id: string) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      const { error } = await supabase.from('pastorais').delete().match({ id });
      if (error) throw error;
      setPastorais(pastorais.filter(p => p.id !== id));
    } catch (err: any) { alert(err.message); }
  };

  // --- Handlers for Loja ---
  const handleEditProduto = (item: Produto) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };
  const handleNewProduto = () => {
    setEditingItem({ nome: '', descricao: '', preco: 0, imagem_url: '' });
    setIsModalOpen(true);
  };
  const handleDeleteProduto = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      const { error } = await supabase.from('produtos').delete().match({ id });
      if (error) throw error;
      setProdutos(produtos.filter(p => p.id !== id));
    } catch (err: any) { alert(err.message); }
  };

  // --- Handler for Create User (Master Only) ---
  const handleNewUser = () => {
    setEditingItem({ email: '', password: '' });
    setIsModalOpen(true);
  };

  const handleCreateUser = async (userData: any) => {
    if (activeSection !== 'usuarios') return;

    try {
      // @ts-ignore
      const tempSupabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      });

      const { data, error } = await tempSupabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) throw error;

      alert(`Usuário ${userData.email} criado com sucesso! Como a confirmação automática está ativa (via SQL ou Dashboard), o login já pode ser realizado.`);
      setIsModalOpen(false); // Close Modal

    } catch (err: any) {
      alert('Erro ao criar usuário: ' + err.message);
      throw err; // Propagate error
    }
  };

  // --- Handler for Dízimo (AppConfig) ---

  const handleSaveConfig = async () => {
    try {
      const { error } = await supabase.from('app_config').upsert({ id: 1, ...appConfig });
      if (error) throw error;
      alert('Configurações salvas com sucesso!');
      if (activeSection === 'loja') fetchData('loja');
    } catch (err: any) {
      alert('Erro ao salvar: ' + err.message);
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `banner-loja-${Math.random()}.${fileExt}`;
    const filePath = `noticias/${fileName}`;

    setUploadingImage(true);
    try {
      const { error: uploadError } = await supabase.storage.from('imagens').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: publicURLData } = supabase.storage.from('imagens').getPublicUrl(filePath);
      setAppConfig(prev => ({ ...prev, loja_banner_url: publicURLData.publicUrl }));
      alert('Banner carregado! Clique em "Salvar Alterações do Banner" para confirmar.');
    } catch (error: any) {
      alert('Erro ao fazer upload: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveItem = async (itemToSave: any) => {
    let table = 'noticias';
    if (activeSection === 'eventos') table = 'eventos';
    else if (activeSection === 'agenda') table = 'agenda';
    else if (activeSection === 'instagram') table = 'instagram_posts';
    else if (activeSection === 'oracoes') table = 'oracoes';
    else if (activeSection === 'capelas') table = 'capelas';
    else if (activeSection === 'pastorais') table = 'pastorais';
    else if (activeSection === 'loja') table = 'produtos';

    if (activeSection === 'usuarios') {
      await handleCreateUser(itemToSave);
      return;
    }

    try {
      if (itemToSave.id) {
        const { error } = await supabase.from(table).update(itemToSave).match({ id: itemToSave.id });
        if (error) throw error;
      } else {
        const { id, ...toInsert } = itemToSave;
        const { error } = await supabase.from(table).insert([toInsert]);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchData(activeSection);
    } catch (err: any) {
      alert('Erro ao salvar: ' + err.message);
      throw err;
    }
  };

  const SidebarLink = ({ id, icon, label }: { id: Section; icon: string; label: string }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === id
        ? 'bg-[#1E3A8A] text-white shadow-md'
        : 'text-slate-600 hover:bg-[#1E3A8A]/5'
        }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-2">
        <div className="bg-white p-6 rounded-3xl border border-[#1E3A8A]/10 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-[#1E3A8A] mb-4">Gerenciamento</h2>
          <div className="space-y-1">
            <SidebarLink id="home" icon="🏠" label="Início (Slides)" />
            <SidebarLink id="eventos" icon="📅" label="Eventos" />
            <SidebarLink id="agenda" icon="🕒" label="Agenda" />
            <SidebarLink id="dizimo" icon="🙏" label="Dízimo" />
            <SidebarLink id="instagram" icon="📸" label="Instagram" />
            <SidebarLink id="oracoes" icon="⛪" label="Orações" />
            <SidebarLink id="capelas" icon="💒" label="Capelas" />
            <SidebarLink id="pastorais" icon="🤝" label="Pastorais" />
            <SidebarLink id="loja" icon="🛍️" label="Loja" />
            {currentUserEmail === 'matheuslicassali@gmail.com' && (
              <SidebarLink id="usuarios" icon="👥" label="Usuários (Master)" />
            )}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-all"
        >
          <span>🚪</span> Sair do Painel
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="bg-white rounded-3xl border border-[#1E3A8A]/10 shadow-sm p-8 min-h-[600px]">
          <header className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sectionTitles[activeSection]}
              </h1>
              <p className="text-slate-500 text-sm mt-1">Gerencie o conteúdo exibido nesta seção</p>
            </div>
            {activeSection === 'home' && (
              <button
                onClick={handleNewNoticia}
                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                + Adicionar Notícia
              </button>
            )}
            {activeSection === 'eventos' && (
              <button
                onClick={handleNewEvento}
                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                + Adicionar Evento
              </button>
            )}
            {activeSection === 'agenda' && (
              <button
                onClick={handleNewAgenda}
                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                + Adicionar Horário
              </button>
            )}
            {activeSection === 'instagram' && (
              <button
                onClick={handleNewInstagram}
                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                + Adicionar Post
              </button>
            )}
            {activeSection === 'oracoes' && (
              <button
                onClick={handleNewOracao}
                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                + Adicionar Oração
              </button>
            )}
            {activeSection === 'capelas' && (
              <button onClick={handleNewCapela} className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md">
                + Adicionar Capela
              </button>
            )}
            {activeSection === 'pastorais' && (
              <button onClick={handleNewPastoral} className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md">
                + Adicionar Pastoral
              </button>
            )}
            {activeSection === 'loja' && (
              <button onClick={handleNewProduto} className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md">
                + Adicionar Produto
              </button>
            )}
            {activeSection === 'usuarios' && currentUserEmail === 'matheuslicassali@gmail.com' && (
              <button
                onClick={handleNewUser}
                className="bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-md"
              >
                + Cadastrar Admin
              </button>
            )}
          </header>

          {errorMSG && (
            <div className="mb-4 bg-red-100 text-red-700 p-4 rounded-xl border border-red-200">
              {errorMSG}
            </div>
          )}

          <div className="space-y-6">
            {/* Dynamic Rendering of Tables/Lists per section */}
            {activeSection === 'home' && (
              <div className="space-y-4">
                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
                  * Aqui você pode gerenciar as notícias que aparecem no slider da página inicial.
                </p>
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Imagem</th>
                          <th className="pb-3 px-4">Título</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {noticias.length === 0 && (
                          <tr><td colSpan={3} className="text-center py-4 text-gray-400">Nenhum item encontrado</td></tr>
                        )}
                        {noticias.map((t) => (
                          <tr key={t.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 w-20">
                              {t.imagem_url && <img src={t.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-800">{t.titulo}</td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditNoticia(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeleteNoticia(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'eventos' && (
              <div className="space-y-4">
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Imagem</th>
                          <th className="pb-3 px-4">Nome</th>
                          <th className="pb-3 px-4">Data</th>
                          <th className="pb-3 px-4">Local</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {eventos.length === 0 && (
                          <tr><td colSpan={5} className="text-center py-4 text-gray-400">Nenhum evento encontrado</td></tr>
                        )}
                        {eventos.map((e) => (
                          <tr key={e.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 w-20">
                              {e.imagem_url && <img src={e.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-800">{e.nome}</td>
                            <td className="py-4 px-4 text-sm text-slate-600">
                              {new Date(e.data_hora).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-600">{e.local}</td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditEvento(e)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeleteEvento(e.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'dizimo' && (
              <div className="space-y-8">
                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
                  * Configure aqui as informações de dízimo exibidas na página pública.
                </p>
                {loading ? <p>Carregando...</p> : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Chave PIX da Comissão</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        value={appConfig.dizimo_pix || ''}
                        onChange={e => setAppConfig({ ...appConfig, dizimo_pix: e.target.value })}
                        placeholder="00.000.000/0001-00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Texto da Campanha</label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                        value={appConfig.dizimo_texto || ''}
                        onChange={e => setAppConfig({ ...appConfig, dizimo_texto: e.target.value })}
                        placeholder="O dízimo não é uma taxa, mas um gesto de gratidão a Deus..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Telefone da Secretaria</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          value={appConfig.telefone_secretaria || ''}
                          onChange={e => setAppConfig({ ...appConfig, telefone_secretaria: e.target.value })}
                          placeholder="(00) 0000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">E-mail da Secretaria</label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          value={appConfig.email_secretaria || ''}
                          onChange={e => setAppConfig({ ...appConfig, email_secretaria: e.target.value })}
                          placeholder="secretaria@comissaoivcnorte.com.br"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Username do Instagram</label>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">@</span>
                        <input
                          type="text"
                          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                          value={appConfig.instagram_username || ''}
                          onChange={e => setAppConfig({ ...appConfig, instagram_username: e.target.value })}
                          placeholder="comissaoivcnorte"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Este username será usado na página do Instagram</p>
                    </div>
                    <button
                      onClick={handleSaveConfig}
                      className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform"
                    >
                      Salvar Alterações
                    </button>
                  </>
                )}
              </div>
            )}

            {activeSection === 'agenda' && (
              <div className="space-y-4">
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Dia</th>
                          <th className="pb-3 px-4">Horário</th>
                          <th className="pb-3 px-4">Título</th>
                          <th className="pb-3 px-4">Tipo</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {agenda.length === 0 && (
                          <tr><td colSpan={5} className="text-center py-4 text-gray-400">Nenhum item na agenda</td></tr>
                        )}
                        {agenda.map((a) => (
                          <tr key={a.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 font-semibold text-slate-800">{diasSemana[a.dia]}</td>
                            <td className="py-4 px-4 text-sm text-slate-600">{a.horario}</td>
                            <td className="py-4 px-4 font-semibold text-slate-800">{a.titulo}</td>
                            <td className="py-4 px-4 text-xs uppercase text-slate-500">{a.tipo}</td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditAgenda(a)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeleteAgenda(a.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'instagram' && (
              <div className="space-y-4">
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Imagem</th>
                          <th className="pb-3 px-4">Legenda</th>
                          <th className="pb-3 px-4">Data</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {instagramPosts.length === 0 && (
                          <tr><td colSpan={4} className="text-center py-4 text-gray-400">Nenhum post encontrado</td></tr>
                        )}
                        {instagramPosts.map((p) => (
                          <tr key={p.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 w-20">
                              {p.imagem_url && <img src={p.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                            </td>
                            <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate">{p.legenda}</td>
                            <td className="py-4 px-4 text-sm text-slate-600">
                              {p.data_publicacao ? new Date(p.data_publicacao).toLocaleDateString() : '-'}
                            </td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditInstagram(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeleteInstagram(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'oracoes' && (
              <div className="space-y-4">
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Imagem</th>
                          <th className="pb-3 px-4">Título</th>
                          <th className="pb-3 px-4">Conteúdo (Início)</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {oracoes.length === 0 && (
                          <tr><td colSpan={4} className="text-center py-4 text-gray-400">Nenhuma oração cadastrada</td></tr>
                        )}
                        {oracoes.map((o) => (
                          <tr key={o.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 w-20">
                              {o.imagem_url && <img src={o.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-800">{o.titulo}</td>
                            <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate">{o.conteudo}</td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditOracao(o)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeleteOracao(o.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'capelas' && (
              <div className="space-y-4">
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Imagem</th>
                          <th className="pb-3 px-4">Nome</th>
                          <th className="pb-3 px-4">Padroeiro</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {capelas.length === 0 && (
                          <tr><td colSpan={4} className="text-center py-4 text-gray-400">Nenhuma capela cadastrada</td></tr>
                        )}
                        {capelas.map((c) => (
                          <tr key={c.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 w-20">
                              {c.imagem_url && <img src={c.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-800">{c.nome}</td>
                            <td className="py-4 px-4 text-sm text-slate-600">{c.padroeiro}</td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditCapela(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeleteCapela(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'pastorais' && (
              <div className="space-y-4">
                {loading ? <p>Carregando...</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                          <th className="pb-3 px-4">Imagem</th>
                          <th className="pb-3 px-4">Nome</th>
                          <th className="pb-3 px-4">Coordenador</th>
                          <th className="pb-3 px-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {pastorais.length === 0 && (
                          <tr><td colSpan={4} className="text-center py-4 text-gray-400">Nenhuma pastoral cadastrada</td></tr>
                        )}
                        {pastorais.map((p) => (
                          <tr key={p.id} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-4 w-20">
                              {p.imagem_url && <img src={p.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-800">{p.nome}</td>
                            <td className="py-4 px-4 text-sm text-slate-600">{p.coordenador}</td>
                            <td className="py-4 px-4 w-32">
                              <div className="flex gap-2">
                                <button onClick={() => handleEditPastoral(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                <button onClick={() => handleDeletePastoral(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'loja' && (
              <div className="space-y-10">
                {/* Banner Config Area */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">Banner da Loja</h3>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Imagem do Banner</label>
                      <input
                        type="file"
                        onChange={handleBannerUpload}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-xs text-slate-400 mt-2 italic">Recomendado: 1200x400px</p>
                      <button
                        onClick={handleSaveConfig}
                        disabled={uploadingImage}
                        className="mt-4 bg-[#1E3A8A] text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-all"
                      >
                        Salvar Alterações do Banner
                      </button>
                    </div>
                    <div className="w-full md:w-1/2">
                      <p className="text-sm font-bold text-slate-700 mb-2">Prévia Atual:</p>
                      <div className="h-32 w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
                        <img
                          src={appConfig.loja_banner_url || "https://images.unsplash.com/photo-1544427928-c440367a80ea?auto=format&fit=crop&q=80&w=1600"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-8">
                  <h3 className="text-lg font-bold text-[#1E3A8A] mb-4">Lista de Produtos</h3>
                  {loading ? <p>Carregando...</p> : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-50">
                            <th className="pb-3 px-4">Imagem</th>
                            <th className="pb-3 px-4">Nome</th>
                            <th className="pb-3 px-4">Preço</th>
                            <th className="pb-3 px-4">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {produtos.length === 0 && (
                            <tr><td colSpan={4} className="text-center py-4 text-gray-400">Nenhum produto cadastrado</td></tr>
                          )}
                          {produtos.map((p) => (
                            <tr key={p.id} className="group hover:bg-slate-50 transition-colors">
                              <td className="py-4 px-4 w-20">
                                {p.imagem_url && <img src={p.imagem_url} alt="mini" className="w-10 h-10 object-cover rounded-lg" />}
                              </td>
                              <td className="py-4 px-4 font-semibold text-slate-800">{p.nome}</td>
                              <td className="py-4 px-4 text-sm text-slate-600">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.preco)}
                              </td>
                              <td className="py-4 px-4 w-32">
                                <div className="flex gap-2">
                                  <button onClick={() => handleEditProduto(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">✏️</button>
                                  <button onClick={() => handleDeleteProduto(p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">🗑️</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'usuarios' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-blue-50 p-6 rounded-full mb-4">
                  <span className="text-4xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Gerenciamento de Administradores</h3>
                <p className="text-gray-500 max-w-md">
                  Como usuário Master, você pode cadastrar novos administradores para o sistema.
                  <br />Eles terão acesso total a este painel administrativo.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Edição */}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={activeSection}
        initialData={editingItem}
        onSave={handleSaveItem}
      />
    </div>
  );
};

export default AdminDashboard;
