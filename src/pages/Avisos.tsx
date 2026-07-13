import React from 'react';

interface Aviso {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  tipo: 'urgente' | 'informativo' | 'lembrete';
  cor: string;
}

const avisos: Aviso[] = [
  {
    id: '1',
    titulo: 'Campanha do Agasalho 2026',
    descricao: 'Estamos arrecadando roupas de frio, cobertores e agasalhos para famílias necessitadas da região norte. Doe em qualquer paróquia da Comissão.',
    data: '12 de Julho de 2026',
    tipo: 'informativo',
    cor: '#F5841F'
  },
  {
    id: '2',
    titulo: 'Reunião Ordinária da Comissão',
    descricao: 'Reunião mensal dos membros da Comissão IVC Norte. Pauta: planejamento do segundo semestre e acompanhamento dos projetos sociais.',
    data: '15 de Julho de 2026',
    tipo: 'urgente',
    cor: '#C41E3A'
  },
  {
    id: '3',
    titulo: 'Inscrições Crisma 2026',
    descricao: 'Estão abertas as inscrições para jovens e adultos que desejam receber o sacramento da Crisma. Acesse a secretaria de sua paróquia.',
    data: '10 de Julho de 2026',
    tipo: 'lembrete',
    cor: '#1B5E8C'
  },
  {
    id: '4',
    titulo: 'Encontro de Jovens da IVC',
    descricao: 'Encontro de jovens das paróquias da região norte para reflexão, oração e integração comunitária. Aberto a todos os jovens de 15 a 30 anos.',
    data: '05 de Agosto de 2026',
    tipo: 'informativo',
    cor: '#F5841F'
  },
  {
    id: '5',
    titulo: 'Novo Horário da Secretaria',
    descricao: 'A secretaria da Comissão IVC Norte passará a funcionar de terça a sábado, das 8h às 17h, a partir do dia 01 de agosto.',
    data: '28 de Julho de 2026',
    tipo: 'urgente',
    cor: '#C41E3A'
  },
  {
    id: '6',
    titulo: 'Workshop: Evangelização Digital',
    descricao: 'Capacitação para líderes comunitários sobre uso de ferramentas digitais para evangelização e comunicação social. Vagas limitadas.',
    data: '10 de Setembro de 2026',
    tipo: 'informativo',
    cor: '#1B5E8C'
  }
];

const Avisos: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Comunicação</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Avisos e Comunicados</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Fique por dentro das novidades e comunicados da Comissão IVC Norte.
        </p>
      </div>

      <div className="space-y-6">
        {avisos.map((aviso) => (
          <div
            key={aviso.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex">
              <div className="w-2 flex-shrink-0" style={{ backgroundColor: aviso.cor }}></div>
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-white text-xs font-bold px-3 py-1 rounded-full uppercase"
                      style={{ backgroundColor: aviso.cor }}
                    >
                      {aviso.tipo}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">{aviso.data}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{aviso.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{aviso.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12 bg-gradient-to-r from-[#C41E3A] to-[#F5841F] p-8 sm:p-12 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Receba nossos avisos</h3>
        <p className="text-white/90 max-w-2xl mx-auto mb-6">
          Siga nossas redes sociais ou entre em contato para receber as últimas novidades da Comissão IVC Norte.
        </p>
        <a
          href="/redes-sociais"
          className="inline-block bg-white text-[#C41E3A] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
        >
          Ver Redes Sociais
        </a>
      </section>
    </div>
  );
};

export default Avisos;
