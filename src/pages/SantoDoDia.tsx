import React from 'react';

const SantoDoDia: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Inspiração Diária</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Santo do Dia</h2>
        <p className="text-gray-500">Conheça a história dos santos que inspiram nossa fé (Fonte: Canção Nova)</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#C41E3A]/5 w-full h-[800px] relative">
        <iframe
          src="https://santo.cancaonova.com/"
          className="w-full h-full border-0"
          title="Santo do Dia - Canção Nova"
          loading="lazy"
          allowFullScreen
        ></iframe>

        <div className="absolute top-0 left-0 w-full h-full -z-10 flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
          <p className="text-gray-500 mb-4">Carregando conteúdo...</p>
          <p className="text-sm text-gray-400">Se o conteúdo não aparecer, acesse diretamente:</p>
          <a
            href="https://santo.cancaonova.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-[#C41E3A] font-bold hover:underline"
          >
            Abrir site da Canção Nova
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://santo.cancaonova.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#C41E3A] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg text-sm"
        >
          Abrir em nova aba
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SantoDoDia;
