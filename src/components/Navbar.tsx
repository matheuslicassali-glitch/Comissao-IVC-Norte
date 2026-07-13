import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Orações', path: '/oracoes' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Paróquias', path: '/paroquias' },
    { name: 'Membros', path: '/membros' },
  ];

  const moreLinks = [
    { name: 'Liturgia', path: '/liturgia' },
    { name: 'Santo do Dia', path: '/santo' },
    { name: 'Catecismo', path: '/catecismo' },
    { name: 'Avisos', path: '/avisos' },
    { name: 'Pastorais', path: '/pastorais' },
    { name: 'Inscrições', path: '/inscricoes' },
    { name: 'Instagram', path: '/instagram' },
    { name: 'Redes Sociais', path: '/redes-sociais' },
    { name: 'Prestação de Contas', path: '/prestacao-contas' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF8F0]/80 backdrop-blur-md border-b border-[#C41E3A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 text-[#C41E3A] text-lg font-bold tracking-tight">
              <img src="/logo.png" alt="Comissão IVC Norte" className="h-10 w-10 rounded-full object-cover border-2 border-[#1B5E8C]" />
              <span className="hidden sm:inline">Comissão IVC Norte</span>
            </Link>
            <Link to="/admin" className="text-[10px] bg-[#C41E3A]/5 text-[#C41E3A] px-2 py-1 rounded uppercase font-bold tracking-tighter hover:bg-[#C41E3A]/10 transition-colors">
              Admin
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${isActive(link.path)
                  ? 'text-[#C41E3A] font-semibold'
                  : 'text-slate-700'
                  } hover:text-[#C41E3A] transition-colors duration-200 text-sm font-medium`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mais Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-1 text-slate-700 hover:text-[#C41E3A] transition-colors duration-200 text-sm font-medium"
              >
                Mais
                <svg className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showMore && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setShowMore(false)}
                      className={`block px-4 py-2 text-sm font-medium transition-colors ${isActive(link.path)
                        ? 'text-[#C41E3A] bg-[#C41E3A]/5'
                        : 'text-slate-700 hover:text-[#C41E3A] hover:bg-[#C41E3A]/5'
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-[#C41E3A] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FFF8F0] border-b border-[#C41E3A]/10 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                  ? 'text-[#C41E3A] bg-[#C41E3A]/5'
                  : 'text-slate-700 hover:text-[#C41E3A] hover:bg-[#C41E3A]/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-[#C41E3A]/10 pt-2 mt-2">
              <p className="px-3 py-1 text-xs font-bold text-[#C41E3A] uppercase tracking-wider">Mais</p>
              {moreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                    ? 'text-[#C41E3A] bg-[#C41E3A]/5'
                    : 'text-slate-700 hover:text-[#C41E3A] hover:bg-[#C41E3A]/5'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-[#C41E3A] border-t border-[#C41E3A]/5 mt-2"
            >
              Painel Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
