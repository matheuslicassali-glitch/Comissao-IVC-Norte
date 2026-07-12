import React from 'react';

const paroquias = [
  {
    id: '1',
    nome: 'Paróquia São José',
    endereco: 'Rua Principal, 123 - Centro',
    horario: 'Segunda a Sexta: 7h e 19h | Domingo: 8h e 18h',
    telefone: '(22) 3456-7890',
    responsavel: 'Pe. José da Silva',
  },
  {
    id: '2',
    nome: 'Paróquia Nossa Senhora da Conceição',
    endereco: 'Av. da Paz, 456 - Bairro Novo',
    horario: 'Segunda a Sexta: 7h30 e 19h | Domingo: 9h e 19h',
    telefone: '(22) 3456-7891',
    responsavel: 'Pe. Maria Santos',
  },
  {
    id: '3',
    nome: 'Paróquia Sagrado Coração de Jesus',
    endereco: 'Rua das Flores, 789 - Jardim América',
    horario: 'Segunda a Sexta: 8h e 18h30 | Domingo: 8h30 e 19h',
    telefone: '(22) 3456-7892',
    responsavel: 'Pe. Paulo Oliveira',
  },
  {
    id: '4',
    nome: 'Paróquia Santo Antônio',
    endereco: 'Rua do Comércio, 101 - Vila Nova',
    horario: 'Segunda a Sexta: 7h30 e 19h | Domingo: 8h e 18h',
    telefone: '(22) 3456-7893',
    responsavel: 'Pe. Pedro Costa',
  },
  {
    id: '5',
    nome: 'Paróquia Nossa Senhora das Graças',
    endereco: 'Av. Brasil, 202 - Boa Vista',
    horario: 'Segunda a Sexta: 7h e 18h30 | Domingo: 9h e 19h30',
    telefone: '(22) 3456-7894',
    responsavel: 'Pe. Francisco Lima',
  },
  {
    id: '6',
    nome: 'Paróquia São Francisco de Assis',
    endereco: 'Rua da Caridade, 303 - Santa Cruz',
    horario: 'Segunda a Sexta: 7h30 e 19h | Domingo: 8h e 18h',
    telefone: '(22) 3456-7895',
    responsavel: 'Pe. Antônio Pereira',
  },
];

const Paroquias: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Nossas Comunidades</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Paróquias da Região Norte</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Conheça as paróquias que compõem a Comissão IVC Norte e participe das atividades de cada comunidade.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paroquias.map((paroquia) => (
          <div key={paroquia.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#C41E3A]/5 hover:shadow-xl transition-all duration-300">
            <div className="h-2 bg-gradient-to-r from-[#C41E3A] to-[#F5841F]"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{paroquia.nome}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#C41E3A] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{paroquia.endereco}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#F5841F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{paroquia.horario}</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#1B5E8C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{paroquia.telefone}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500">Responsável</p>
                <p className="text-[#C41E3A] font-semibold">{paroquia.responsavel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="mt-16 bg-gradient-to-r from-[#C41E3A] to-[#F5841F] p-8 sm:p-12 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Sua Paróquia Pode Fazer Parte</h3>
        <p className="text-white/90 max-w-2xl mx-auto mb-6">
          Caso sua paróquia não esteja listada e deseje fazer parte da Comissão IVC Norte, entre em contato conosco.
        </p>
        <a
          href="/contato"
          className="inline-block bg-white text-[#C41E3A] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
        >
          Entre em Contato
        </a>
      </section>
    </div>
  );
};

export default Paroquias;
