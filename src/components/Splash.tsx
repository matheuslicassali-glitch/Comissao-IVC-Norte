import React, { useEffect, useState } from 'react';

const Splash: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1500);
    const timer2 = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'linear-gradient(180deg, #1B5E8C 0%, #0D3A5C 100%)' }}
    >
      <img
        src="/logo.png"
        alt="Comissão IVC Norte"
        className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-2xl mb-6"
      />
      <h1 className="text-white text-2xl font-bold tracking-wide">Comissão IVC Norte</h1>
      <p className="text-white/60 text-sm mt-2">Diocese de Campos</p>
      <div className="mt-8 flex gap-1.5">
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default Splash;
