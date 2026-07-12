import React from 'react';

const eventos = [
  {
    id: '1',
    nome: 'Reunião da Comissão IVC Norte',
    descricao: 'Reunião mensal dos membros da Comissão IVC Norte para planejamento de atividades e accompanhamento dos projetos em andamento.',
    data: '15 de Julho de 2026',
    horario: '19h',
    local: 'Paróquia Matriz - Centro',
    tipo: 'Reunião',
    cor: '#C41E3A',
  },
  {
    id: '2',
    nome: 'Campanha do Agasalho 2026',
    descricao: 'Arrecadação de roupas de frio, cobertores e agasalhos para distribuição a famílias necessitadas da região norte da Diocese.',
    data: '22 de Julho a 15 de Agosto de 2026',
    horario: 'O dia todo',
    local: 'Todas as paróquias da região',
    tipo: 'Campanha',
    cor: '#F5841F',
  },
  {
    id: '3',
    nome: 'Encontro de Jovens da IVC',
    descricao: 'Encontro de jovens das paróquias da região norte para reflexão, oração e integração comunitária.',
    data: '05 de Agosto de 2026',
    horario: '15h',
    local: 'Centro Diocesano',
    tipo: 'Encontro',
    cor: '#1B5E8C',
  },
  {
    id: '4',
    nome: 'Missa de Ação de Graças',
    descricao: 'Missa especial de ação de graças por todas as bênçãos recebidas ao longo do ano pela Comissão IVC Norte.',
    data: '20 de Agosto de 2026',
    horario: '18h30',
    local: 'Catedral de Campos',
    tipo: 'Celebração',
    cor: '#C41E3A',
  },
  {
    id: '5',
    nome: 'Workshop: Evangelização Digital',
    descricao: 'Capacitação para líderes comunitários sobre uso de ferramentas digitais para evangelização e comunicação social.',
    data: '10 de Setembro de 2026',
    horario: '14h',
    local: 'Sala de Conferências - Diocese',
    tipo: 'Workshop',
    cor: '#F5841F',
  },
  {
    id: '6',
    nome: 'Festa da Comunidade',
    descricao: 'Festa comunitária para celebração da solidariedade e integração de todas as paróquias da região norte.',
    data: '25 de Setembro de 2026',
    horario: '16h',
    local: 'Praça Central - Centro',
    tipo: 'Festa',
    cor: '#1B5E8C',
  },
];

const Eventos: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Nossa Agenda</h1>
          <h2 className="text-4xl font-bold text-gray-900">Próximos Eventos</h2>
        </div>
        <div className="text-slate-500 text-sm bg-white px-4 py-2 rounded-full border border-[#C41E3A]/10">
          Mostrando {eventos.length} eventos
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventos.map((evento) => (
          <div key={evento.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#C41E3A]/5 hover:shadow-xl transition-all duration-300 group">
            <div className="h-2" style={{ backgroundColor: evento.cor }}></div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: evento.cor }}
                >
                  {evento.tipo}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#C41E3A] transition-colors">
                {evento.nome}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {evento.descricao}
              </p>
              <div className="space-y-2 mb-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#C41E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {evento.data}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#C41E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {evento.horario}
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#C41E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {evento.local}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
