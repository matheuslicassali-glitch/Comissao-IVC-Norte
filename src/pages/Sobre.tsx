import React from 'react';

const Sobre: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Quem Somos</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Comissão IVC Norte</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Conheça a história, os objetivos e o trabalho da Comissão Interdiocesana de Vida e Caridade na região norte da Diocese de Campos.
        </p>
      </div>

      {/* History Section */}
      <section className="mb-16">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-[#C41E3A]/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#C41E3A] mb-6">Nossa História</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                A Comissão IVC Norte foi fundada com o objetivo de coordenar as ações de vida e caridade na região norte da Diocese de Campos. Desde a sua criação, a comissão tem trabalhado para promover a dignidade humana e o evangelismo em todas as comunidades da região.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Através do trabalho voluntário e do compromisso com os valores cristãos, a comissão tem alcançado centenas de famílias, oferecendo assistência social, espiritual e material para aqueles que mais precisam.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Hoje, a Comissão IVC Norte é referência em ações sociais e evangelização na região, contando com o apoio de diversas paróquias e comunidades eclesiais de base.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#C41E3A]/10 to-[#F5841F]/10 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#C41E3A] mb-2">15+</div>
                <p className="text-gray-600 font-medium">Anos de Atuação</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F5841F] mb-1">12</div>
                  <p className="text-gray-600 text-sm">Paróquias</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1B5E8C] mb-1">500+</div>
                  <p className="text-gray-600 text-sm">Famílias Atendidas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#C41E3A]/5 text-center">
            <div className="w-16 h-16 bg-[#C41E3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#C41E3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Promover a dignidade humana e a evangelização na região norte da Diocese de Campos, através de ações de vida e caridade que alcancem as famílias mais necessitadas.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#F5841F]/5 text-center">
            <div className="w-16 h-16 bg-[#F5841F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#F5841F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nossa Visão</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ser referência em ações sociais e evangelização na região norte, alcançando todas as famílias com amor, fé e solidariedade cristã.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#1B5E8C]/5 text-center">
            <div className="w-16 h-16 bg-[#1B5E8C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#1B5E8C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fé, caridade, solidariedade, respeito à vida, comunhão e compromisso social. Acreditamos que cada pessoa é digna do amor de Cristo.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="mb-16">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-[#C41E3A]/5">
          <h3 className="text-2xl font-bold text-[#C41E3A] mb-8 text-center">Nossos Objetivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#C41E3A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Promover a Evangelização</h4>
                <p className="text-gray-600 text-sm">Levar a palavra de Deus a todas as comunidades da região norte da Diocese.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#F5841F] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Assistência Social</h4>
                <p className="text-gray-600 text-sm">Oferecer apoio material e emocional a famílias em situação de vulnerabilidade.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#1B5E8C] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Formação de Líderes</h4>
                <p className="text-gray-600 text-sm">Capacitar líderes comunitários para atuar nas ações de vida e caridade.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-[#C41E3A] text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Articulação Diocesana</h4>
                <p className="text-gray-600 text-sm">Fortalecer os laços entre as paróquias e comunidades da região norte.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diocese Reference */}
      <section>
        <div className="bg-gradient-to-r from-[#C41E3A] to-[#F5841F] p-8 sm:p-12 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Diocese de Campos</h3>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            A Comissão IVC Norte faz parte da Diocese de Campos, que atua na evangelização e assistência social em todo o estado do Rio de Janeiro.
          </p>
          <a
            href="https://www.diocesedecampos.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#C41E3A] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
          >
            Conheça a Diocese
          </a>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
