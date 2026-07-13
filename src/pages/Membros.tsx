import React from 'react';

interface Membro {
  id: string;
  nome: string;
  cargo: string;
  paroquia: string;
  email: string;
  telefone: string;
  imagem_url: string;
  cor: string;
}

const membros: Membro[] = [
  {
    id: '1',
    nome: 'Pe. Carlos Eduardo',
    cargo: 'Assessor Eclesiástico',
    paroquia: 'Paróquia Matriz',
    email: 'assessor@comissaonorteivc.com.br',
    telefone: '(22) 3456-0001',
    imagem_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    cor: '#C41E3A'
  },
  {
    id: '2',
    nome: 'Maria Aparecida Silva',
    cargo: 'Presidente',
    paroquia: 'Paróquia São José',
    email: 'presidente@comissaonorteivc.com.br',
    telefone: '(22) 3456-0002',
    imagem_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    cor: '#F5841F'
  },
  {
    id: '3',
    nome: 'José Francisco Santos',
    cargo: 'Vice-Presidente',
    paroquia: 'Paróquia Nossa Senhora da Conceição',
    email: 'vice@comissaonorteivc.com.br',
    telefone: '(22) 3456-0003',
    imagem_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    cor: '#1B5E8C'
  },
  {
    id: '4',
    nome: 'Ana Beatriz Oliveira',
    cargo: 'Secretária',
    paroquia: 'Paróquia Sagrado Coração',
    email: 'secretaria@comissaonorteivc.com.br',
    telefone: '(22) 3456-0004',
    imagem_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    cor: '#C41E3A'
  },
  {
    id: '5',
    nome: 'Paulo Roberto Costa',
    cargo: 'Tesoureiro',
    paroquia: 'Paróquia Santo Antônio',
    email: 'tesouraria@comissaonorteivc.com.br',
    telefone: '(22) 3456-0005',
    imagem_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    cor: '#F5841F'
  },
  {
    id: '6',
    nome: 'Luciana Ferreira',
    cargo: 'Coordenadora de Ação Social',
    paroquia: 'Paróquia Nossa Senhora das Graças',
    email: 'acao-social@comissaonorteivc.com.br',
    telefone: '(22) 3456-0006',
    imagem_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    cor: '#1B5E8C'
  },
  {
    id: '7',
    nome: 'Marcos Vinícius Lima',
    cargo: 'Coordenador de Juventude',
    paroquia: 'Paróquia São Francisco de Assis',
    email: 'juventude@comissaonorteivc.com.br',
    telefone: '(22) 3456-0007',
    imagem_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    cor: '#C41E3A'
  },
  {
    id: '8',
    nome: 'Tereza Cristina Mendes',
    cargo: 'Coordenadora da Pastoral da Família',
    paroquia: 'Paróquia Matriz',
    email: 'familia@comissaonorteivc.com.br',
    telefone: '(22) 3456-0008',
    imagem_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    cor: '#F5841F'
  }
];

const Membros: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Nossa Equipe</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Membros da Comissão</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Conheça os membros que compõem a Comissão IVC Norte e dedicam seu tempo ao serviço da Igreja.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {membros.map((membro) => (
          <div
            key={membro.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="h-2" style={{ backgroundColor: membro.cor }}></div>
            <div className="p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img
                  src={membro.imagem_url}
                  alt={membro.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{membro.nome}</h3>
              <p className="text-sm font-semibold mb-2" style={{ color: membro.cor }}>{membro.cargo}</p>
              <p className="text-gray-500 text-xs mb-4">{membro.paroquia}</p>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{membro.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 text-xs">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{membro.telefone}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white/40 p-12 rounded-3xl border border-[#C41E3A]/5 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quer fazer parte?</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          A Comissão IVC Norte está sempre aberta a novos membros que desejem servir a Igreja e a comunidade.
        </p>
        <a
          href="/contato"
          className="bg-[#C41E3A] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg inline-block"
        >
          Entre em Contato
        </a>
      </section>
    </div>
  );
};

export default Membros;
