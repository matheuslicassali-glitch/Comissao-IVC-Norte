import React from 'react';

interface Inscricao {
  id: string;
  nome: string;
  descricao: string;
  dataLimite: string;
  vagas: number;
  vagasDisponiveis: number;
  link: string;
  cor: string;
}

const inscricoes: Inscricao[] = [
  {
    id: '1',
    nome: 'Encontro de Jovens da IVC',
    descricao: 'Encontro de jovens das paróquias da região norte para reflexão, oração e integração comunitária. Aberto a jovens de 15 a 30 anos.',
    dataLimite: '01 de Agosto de 2026',
    vagas: 100,
    vagasDisponiveis: 45,
    link: 'https://forms.google.com/inscricao-ivc-jovens',
    cor: '#C41E3A'
  },
  {
    id: '2',
    nome: 'Workshop: Evangelização Digital',
    descricao: 'Capacitação para líderes comunitários sobre uso de ferramentas digitais para evangelização e comunicação social.',
    dataLimite: '25 de Agosto de 2026',
    vagas: 50,
    vagasDisponiveis: 30,
    link: 'https://forms.google.com/inscricao-workshop-evangelizacao',
    cor: '#F5841F'
  },
  {
    id: '3',
    nome: 'Retiro Espiritual da Comissão',
    descricao: 'Retiro de 3 dias para aprofundamento espiritual e integração dos membros da Comissão IVC Norte.',
    dataLimite: '15 de Setembro de 2026',
    vagas: 40,
    vagasDisponiveis: 40,
    link: 'https://forms.google.com/inscricao-retiro-espiritual',
    cor: '#1B5E8C'
  },
  {
    id: '4',
    nome: 'Curso de Formação de Catequistas',
    descricao: 'Curso para formação de novos catequistas nas paróquias da região norte. Duração: 3 meses.',
    dataLimite: '10 de Agosto de 2026',
    vagas: 30,
    vagasDisponiveis: 15,
    link: 'https://forms.google.com/inscricao-formacao-catequistas',
    cor: '#C41E3A'
  }
];

const Inscricoes: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Participe</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Inscrições Abertas</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Inscreva-se nos eventos e atividades da Comissão IVC Norte. Vagas limitadas!
        </p>
      </div>

      <div className="space-y-8 mb-16">
        {inscricoes.map((inscricao) => {
          const percentualVagas = ((inscricao.vagas - inscricao.vagasDisponiveis) / inscricao.vagas) * 100;
          const vagasEsgotadas = inscricao.vagasDisponiveis === 0;

          return (
            <div
              key={inscricao.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-2" style={{ backgroundColor: inscricao.cor }}></div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-white text-xs font-bold px-3 py-1 rounded-full"
                        style={{ backgroundColor: inscricao.cor }}
                      >
                        Inscrição Aberta
                      </span>
                      <span className="text-sm text-gray-500">Prazo: {inscricao.dataLimite}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{inscricao.nome}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{inscricao.descricao}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Vagas: {inscricao.vagasDisponiveis} de {inscricao.vagas}</span>
                        <span className="font-bold" style={{ color: inscricao.cor }}>{Math.round(percentualVagas)}% preenchido</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentualVagas}%`, backgroundColor: inscricao.cor }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {vagasEsgotadas ? (
                      <div className="bg-gray-100 text-gray-500 px-8 py-4 rounded-lg font-bold cursor-not-allowed">
                        Esgotado
                      </div>
                    ) : (
                      <a
                        href={inscricao.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-white px-8 py-4 rounded-lg font-bold hover:scale-105 transition-all shadow-lg text-center"
                        style={{ backgroundColor: inscricao.cor }}
                      >
                        Inscrever-se
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="bg-white/40 p-12 rounded-3xl border border-[#C41E3A]/5 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quer criar um evento?</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Se você deseja propor um evento ou atividade para a Comissão IVC Norte, entre em contato conosco.
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

export default Inscricoes;
