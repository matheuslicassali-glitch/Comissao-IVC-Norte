import React, { useEffect, useState } from 'react';
import { Oracao } from '../types';
import { supabase } from '../services/supabase';

const Skeleton: React.FC = () => (
  <div className="animate-pulse space-y-4 p-8">
    <div className="h-[300px] bg-slate-200 rounded-2xl"></div>
    <div className="h-8 bg-slate-200 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 rounded"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
    </div>
  </div>
);

const ROSARIO_MISTERIOS = {
  segunda: {
    nome: 'Gozosos',
    misterios: [
      { title: 'A Anunciação', explanation: 'O Anjo Gabriel anuncia a Maria que ela será a Mãe do Salvador.' },
      { title: 'A Visitação', explanation: 'Maria visita sua prima Isabel, que estava grávida de João Batista.' },
      { title: 'O Nascimento de Jesus', explanation: 'Jesus nasce pobre em uma manjedoura em Belém.' },
      { title: 'A Apresentação no Templo', explanation: 'Maria e José apresentam o Menino Jesus no Templo de Jerusalém.' },
      { title: 'A Perda e o Encontro de Jesus', explanation: 'Jesus é encontrado no Templo entre os doutores da Lei.' }
    ]
  },
  terca: {
    nome: 'Dolorosos',
    misterios: [
      { title: 'A Agonia no Horto', explanation: 'Jesus reza e transpira sangue no Horto das Oliveiras.' },
      { title: 'A Flagelação', explanation: 'Jesus é açoitado cruelmente atado à coluna.' },
      { title: 'A Coroação de Espinhos', explanation: 'Jesus é coroado com espinhos e zombado pelos soldados.' },
      { title: 'Jesus Carrega a Cruz', explanation: 'Jesus carrega a pesada cruz até o Monte Calvário.' },
      { title: 'A Crucificação e Morte', explanation: 'Jesus é pregado na cruz e morre pela nossa salvação.' }
    ]
  },
  quarta: {
    nome: 'Gloriosos',
    misterios: [
      { title: 'A Ressurreição', explanation: 'Jesus vence a morte e ressuscita glorioso no terceiro dia.' },
      { title: 'A Ascensão', explanation: 'Jesus sobe aos céus à vista de seus discípulos.' },
      { title: 'A Vinda do Espírito Santo', explanation: 'O Espírito Santo desce sobre os Apóstolos e Maria em Pentecostes.' },
      { title: 'A Assunção de Maria', explanation: 'Maria é levada de corpo e alma para a glória do céu.' },
      { title: 'A Coroação de Maria', explanation: 'Maria é coroada Rainha do Céu e da Terra.' }
    ]
  },
  quinta: {
    nome: 'Luminosos',
    misterios: [
      { title: 'Batismo de Jesus', explanation: 'Jesus é batizado por João no rio Jordão e o céu se abre.' },
      { title: 'Bodas de Caná', explanation: 'Jesus transforma a água em vinho em seu primeiro milagre.' },
      { title: 'Anúncio do Reino', explanation: 'Jesus anuncia o Reino de Deus e convida à conversão.' },
      { title: 'Transfiguração', explanation: 'Jesus se transfigura no Monte Tabor diante de Pedro, Tiago e João.' },
      { title: 'Instituição da Eucaristia', explanation: 'Jesus institui a Eucaristia na Última Ceia como memorial de seu amor.' }
    ]
  },
  sexta: {
    nome: 'Dolorosos',
    misterios: [
      { title: 'A Agonia no Horto', explanation: 'Jesus reza e transpira sangue no Horto das Oliveiras.' },
      { title: 'A Flagelação', explanation: 'Jesus é açoitado cruelmente atado à coluna.' },
      { title: 'A Coroação de Espinhos', explanation: 'Jesus é coroado com espinhos e zombado pelos soldados.' },
      { title: 'Jesus Carrega a Cruz', explanation: 'Jesus carrega a pesada cruz até o Monte Calvário.' },
      { title: 'A Crucificação e Morte', explanation: 'Jesus é pregado na cruz e morre pela nossa salvação.' }
    ]
  },
  sabado: {
    nome: 'Gozosos',
    misterios: [
      { title: 'A Anunciação', explanation: 'O Anjo Gabriel anuncia a Maria que ela será a Mãe do Salvador.' },
      { title: 'A Visitação', explanation: 'Maria visita sua prima Isabel, que estava grávida de João Batista.' },
      { title: 'O Nascimento de Jesus', explanation: 'Jesus nasce pobre em uma manjedoura em Belém.' },
      { title: 'A Apresentação no Templo', explanation: 'Maria e José apresentam o Menino Jesus no Templo de Jerusalém.' },
      { title: 'A Perda e o Encontro de Jesus', explanation: 'Jesus é encontrado no Templo entre os doutores da Lei.' }
    ]
  },
  domingo: {
    nome: 'Gloriosos',
    misterios: [
      { title: 'A Ressurreição', explanation: 'Jesus vence a morte e ressuscita glorioso no terceiro dia.' },
      { title: 'A Ascensão', explanation: 'Jesus sobe aos céus à vista de seus discípulos.' },
      { title: 'A Vinda do Espírito Santo', explanation: 'O Espírito Santo desce sobre os Apóstolos e Maria em Pentecostes.' },
      { title: 'A Assunção de Maria', explanation: 'Maria é levada de corpo e alma para a glória do céu.' },
      { title: 'A Coroação de Maria', explanation: 'Maria é coroada Rainha do Céu e da Terra.' }
    ]
  },
};

const Oracoes: React.FC = () => {
  const [oracoes, setOracoes] = useState<Oracao[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'santo' | 'liturgia' | 'rosario' | 'outras'>('santo');

  const today = new Date();
  const dayOfWeek = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'][today.getDay()] as keyof typeof ROSARIO_MISTERIOS;
  const rosario = ROSARIO_MISTERIOS[dayOfWeek];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('oracoes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) console.error("Erro Supabase:", error.message);
        if (data) setOracoes(data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-sm font-bold text-[#1B5E8C] uppercase tracking-widest mb-2">Vida de Fé</h1>
        <h2 className="text-4xl font-bold text-gray-900">Momento de Oração</h2>
      </div>

      <div className="flex justify-center gap-2 mb-10 p-1 bg-white rounded-xl shadow-sm border border-[#1B5E8C]/10 w-fit mx-auto">
        <button
          onClick={() => setActiveTab('santo')}
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'santo' ? 'bg-[#1B5E8C] text-white shadow-md' : 'text-slate-500 hover:text-[#1B5E8C]'}`}
        >
          Santo do Dia
        </button>
        <button
          onClick={() => setActiveTab('liturgia')}
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'liturgia' ? 'bg-[#1B5E8C] text-white shadow-md' : 'text-slate-500 hover:text-[#1B5E8C]'}`}
        >
          Liturgia Diária
        </button>
        <button
          onClick={() => setActiveTab('rosario')}
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'rosario' ? 'bg-[#1B5E8C] text-white shadow-md' : 'text-slate-500 hover:text-[#1B5E8C]'}`}
        >
          Santo Rosário
        </button>
        <button
          onClick={() => setActiveTab('outras')}
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'outras' ? 'bg-[#1B5E8C] text-white shadow-md' : 'text-slate-500 hover:text-[#1B5E8C]'}`}
        >
          Outras Orações
        </button>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#1B5E8C]/5">

        {activeTab === 'santo' && (
          <div className="w-full flex flex-col bg-white">
            <div className="p-3 bg-slate-50 border-b border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fonte: santo.cancaonova.com</p>
            </div>
            <iframe
              src="https://santo.cancaonova.com/"
              title="Santo do Dia"
              className="w-full h-[600px] sm:h-[800px] border-none"
              style={{ display: 'block' }}
            />
          </div>
        )}

        {activeTab === 'liturgia' && (
          <div className="w-full flex flex-col bg-white">
            <div className="p-3 bg-slate-50 border-b border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fonte: liturgia.cancaonova.com</p>
            </div>
            <iframe
              src="https://liturgia.cancaonova.com/pb/"
              title="Liturgia Diária"
              className="w-full h-[600px] sm:h-[800px] border-none"
              style={{ display: 'block' }}
            />
          </div>
        )}

        {activeTab === 'rosario' && (
          <div className="p-8 sm:p-12">
            <div className="text-center mb-10">
              <span className="text-sm font-bold text-[#C41E3A] bg-[#C41E3A]/10 px-4 py-1 rounded-full uppercase">
                Hoje: {rosario.nome}
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mt-4">Mistérios {rosario.nome}</h3>
            </div>
            <div className="space-y-4">
              {rosario.misterios.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-4 items-start">
                  <span className="bg-[#C41E3A] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1">{i + 1}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">{m.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{m.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'outras' && (
          <div className="p-8">
            {loading ? <Skeleton /> : (
              <div className="space-y-6">
                {oracoes.map(o => (
                  <div key={o.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-[#C41E3A] mb-2">{o.titulo}</h3>
                    <p className="whitespace-pre-wrap text-gray-600">{o.conteudo}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Oracoes;
