import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#C41E3A]/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[#C41E3A] font-bold text-xl mb-2">Comissão IVC Norte</h2>
        <p className="text-[#1B5E8C] text-sm font-medium mb-4">Diocese de Campos</p>
        <p className="text-gray-500 text-sm mb-6">
          Promovendo a evangelização e a caridade cristã na região norte da Diocese.
        </p>
        <div className="flex justify-center space-x-6 mb-8 text-slate-600">
          <a href="https://www.facebook.com/diocese.de.campos" target="_blank" rel="noopener noreferrer" className="hover:text-[#C41E3A]">Facebook</a>
          <a href="https://www.instagram.com/diocese.de.campos" target="_blank" rel="noopener noreferrer" className="hover:text-[#C41E3A]">Instagram</a>
        </div>
        <p className="text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Comissão IVC Norte - Diocese de Campos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
