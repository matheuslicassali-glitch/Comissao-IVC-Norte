import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const bannerImages = [
  'https://images.unsplash.com/photo-1548625361-195fe57724e0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=1200',
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Slider Hero Section */}
      <section className="relative h-[600px] bg-slate-900 overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
            <img
              src={image}
              alt="Banner IVC Norte"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
              <span className="text-[#F5841F] font-bold tracking-widest uppercase text-sm mb-4 block">Diocese de Campos</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
                Comissão IVC Norte
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-10 leading-relaxed">
                Promovendo a evangelização e a caridade cristã na região norte da Diocese de Campos.
              </p>
              <Link
                to="/sobre"
                className="bg-[#C41E3A] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-200 shadow-lg shadow-red-900/40 inline-block w-fit"
              >
                Conheça Nossa Missão
              </Link>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/40'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Hero Welcome text below slider */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b border-[#C41E3A]/5">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo à Comissão IVC Norte</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          A Comissão Interdiocesana de Vida e Caridade (IVC) Norte atua na região norte da Diocese de Campos,
          promovendo a dignidade humana, a evangelização e o serviço aos mais necessitados.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/eventos"
            className="bg-white text-[#C41E3A] border-2 border-[#C41E3A] px-8 py-3 rounded-lg font-semibold hover:bg-[#C41E3A]/5 transition-all duration-200"
          >
            Próximos Eventos
          </Link>
          <Link
            to="/contato"
            className="bg-[#C41E3A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C41E3A]/90 transition-all duration-200"
          >
            Entre em Contato
          </Link>
        </div>
      </section>

      {/* Quick Info Grid */}
      <section className="bg-white/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-sm border border-[#C41E3A]/5 hover:shadow-md transition-shadow">
              <div className="text-[#C41E3A] mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#C41E3A]">Nossa Missão</h3>
              <p className="text-gray-600 text-sm">Promover a dignidade humana e a evangelização na região norte da Diocese de Campos através de ações de vida e caridade.</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-sm border border-[#C41E3A]/5 hover:shadow-md transition-shadow">
              <div className="text-[#F5841F] mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#F5841F]">Ações Sociais</h3>
              <p className="text-gray-600 text-sm">Realizamos campanhas de agasalho, distribuição de alimentos e apoio a famílias em situação de vulnerabilidade.</p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-sm border border-[#C41E3A]/5 hover:shadow-md transition-shadow">
              <div className="text-[#1B5E8C] mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1B5E8C]">Paróquias</h3>
              <p className="text-gray-600 text-sm">Conheça as paróquias da região norte que compõem nossa comissão e participe das atividades pastorais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Agenda</h2>
          <h3 className="text-3xl font-bold text-gray-900">Próximos Eventos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#C41E3A]/5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-[#C41E3A] text-white px-4 py-2 rounded-lg text-center min-w-[70px]">
                <div className="text-2xl font-bold">15</div>
                <div className="text-xs uppercase">Jul</div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Reunião da Comissão</h4>
                <p className="text-gray-600 text-sm">Reunião mensal dos membros da Comissão IVC Norte para planejamento de atividades.</p>
                <p className="text-gray-500 text-xs mt-2">Horário: 19h | Local: Paróquia Matriz</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#C41E3A]/5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-[#F5841F] text-white px-4 py-2 rounded-lg text-center min-w-[70px]">
                <div className="text-2xl font-bold">22</div>
                <div className="text-xs uppercase">Jul</div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">Campanha do Agasalho</h4>
                <p className="text-gray-600 text-sm">Arrecadação de roupas de frio para famílias necessitadas da região norte.</p>
                <p className="text-gray-500 text-xs mt-2">Horário: O dia todo | Local: Todas as paróquias</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            to="/eventos"
            className="inline-block bg-[#C41E3A] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#C41E3A]/90 transition-all duration-200"
          >
            Ver Todos os Eventos
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
