import React from 'react';

const Liturgia: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Palavra de Deus</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Liturgia Diária</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Acompanhe as leituras do dia, responsório e evangelho. Alimente sua fé com a Palavra de Deus.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#C41E3A]/5 mb-12">
        <div className="p-3 bg-slate-50 border-b border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fonte: liturgia.cancaonova.com</p>
        </div>
        <iframe
          src="https://liturgia.cancaonova.com/pb/"
          title="Liturgia Diária"
          className="w-full h-[800px] border-none"
          style={{ display: 'block' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#C41E3A]/5">
          <div className="text-[#C41E3A] mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Primeira Leitura</h3>
          <p className="text-gray-600 text-sm">Trecho do Antigo Testamento ou das Epístolas, que nos prepara para o Evangelho do dia.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F5841F]/5">
          <div className="text-[#F5841F] mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Salmo Responsorial</h3>
          <p className="text-gray-600 text-sm">Canto de resposta entre as leituras, meditando sobre a Palavra de Deus.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1B5E8C]/5">
          <div className="text-[#1B5E8C] mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Evangelho</h3>
          <p className="text-gray-600 text-sm">Palavra de Jesus Cristo, centro de toda a celebração litúrgica.</p>
        </div>
      </div>

      <section className="bg-gradient-to-r from-[#C41E3A] to-[#F5841F] p-8 sm:p-12 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Aprofunde sua fé</h3>
        <p className="text-white/90 max-w-2xl mx-auto mb-6">
          Participe das celebrações da Comissão IVC Norte e viva a liturgia em comunidade.
        </p>
        <a
          href="/eventos"
          className="inline-block bg-white text-[#C41E3A] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
        >
          Ver Próximas Celebrações
        </a>
      </section>
    </div>
  );
};

export default Liturgia;
