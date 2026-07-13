import React, { useState, useEffect } from 'react';
import { AppConfig } from '../types';
import { supabase } from '../services/supabase';

const PrestacaoContas: React.FC = () => {
  const [config, setConfig] = useState<Partial<AppConfig>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase.from('app_config').select('*').eq('id', 1).single();
      if (error) {
        console.error('Erro ao buscar config:', error);
      } else {
        setConfig(data || {});
      }
    } catch (error) {
      console.error('Erro desconhecido:', error);
    } finally {
      setLoading(false);
    }
  };

  const demonstracoes = [
    { id: '1', titulo: 'Receitas Operacionais', valor: 'R$ 125.430,00', tipo: 'entrada', cor: '#22c55e' },
    { id: '2', titulo: 'Despesas com Ações Sociais', valor: 'R$ 45.200,00', tipo: 'saida', cor: '#C41E3A' },
    { id: '3', titulo: 'Manutenção de Templos', valor: 'R$ 32.150,00', tipo: 'saida', cor: '#C41E3A' },
    { id: '4', titulo: 'Eventos e Encontros', valor: 'R$ 18.750,00', tipo: 'saida', cor: '#C41E3A' },
    { id: '5', titulo: 'Formação e Evangelização', valor: 'R$ 15.300,00', tipo: 'saida', cor: '#C41E3A' },
    { id: '6', titulo: 'Saldo Disponível', valor: 'R$ 14.030,00', tipo: 'saldo', cor: '#1B5E8C' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Transparência</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Prestação de Contas</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          A Comissão IVC Norte mantém total transparência na gestão dos recursos financeiros.
          Aqui você pode acompanhar as receitas e despesas da comissão.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C41E3A]/5">
            <h3 className="text-2xl font-bold text-[#C41E3A] mb-4 flex items-center gap-3">
              <span className="p-2 bg-[#C41E3A]/10 rounded-lg">📊</span>
              Demonstrativo Financeiro 2026
            </h3>
            <div className="space-y-4">
              {demonstracoes.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.cor }}></div>
                    <span className="text-gray-700 font-medium">{item.titulo}</span>
                  </div>
                  <span className="font-bold" style={{ color: item.cor }}>{item.valor}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1B5E8C] p-8 rounded-2xl shadow-xl text-white">
            <h3 className="text-2xl font-bold mb-4">Princípios de Gestão</h3>
            <p className="text-blue-100 mb-6 italic">Nossa gestão é pautada em valores cristãos:</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-2xl">✝️</div>
                <div>
                  <p className="font-bold">Fidelidade</p>
                  <p className="text-sm text-blue-200">Recursos aplicados conforme a vontade de Deus e as necessidades da comunidade.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-2xl">📋</div>
                <div>
                  <p className="font-bold">Transparência</p>
                  <p className="text-sm text-blue-200">Prestação de contas clara e acessível a todos os membros da comunidade.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-2xl">🤲</div>
                <div>
                  <p className="font-bold">Solidariedade</p>
                  <p className="text-sm text-blue-200">Prioridade para ações sociais e apoio a famílias em situação de vulnerabilidade.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800"
            alt="Transparência Financeira"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-[#C41E3A]/10">
            <p className="text-gray-800 font-medium italic">
              "Cada um dê conforme determinou em seu coração, não com pesar nem por obrigação, pois Deus ama quem dá com alegria."
            </p>
            <p className="text-[#C41E3A] text-sm font-bold mt-2">— 2 Coríntios 9:7</p>
          </div>
        </div>
      </div>

      <section className="bg-white/40 p-12 rounded-3xl border border-[#C41E3A]/5 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas sobre a Prestação de Contas?</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Nossa equipe está à disposição para esclarecer qualquer dúvida sobre a gestão financeira da Comissão IVC Norte.
        </p>
        <a
          href={`tel:${config.telefone_secretaria || ''}`}
          className="bg-[#C41E3A] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg inline-block"
        >
          Falar com a Secretaria
        </a>
      </section>
    </div>
  );
};

export default PrestacaoContas;
