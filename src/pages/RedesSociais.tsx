import React from 'react';

interface RedeSocial {
  id: string;
  nome: string;
  descricao: string;
  url: string;
  icone: string;
  cor: string;
  corFundo: string;
}

const redes: RedeSocial[] = [
  {
    id: '1',
    nome: 'Instagram',
    descricao: 'Acompanhe fotos, vídeos e novidades da Comissão IVC Norte em tempo real.',
    url: 'https://www.instagram.com/comissaonorteivc/',
    icone: 'instagram',
    cor: '#E1306C',
    corFundo: 'from-purple-500 via-pink-500 to-orange-400'
  },
  {
    id: '2',
    nome: 'Facebook',
    descricao: 'Participe da nossa comunidade no Facebook e fique por dentro de todas as atividades.',
    url: 'https://www.facebook.com/comissaonorteivc',
    icone: 'facebook',
    cor: '#1877F2',
    corFundo: 'from-blue-600 to-blue-500'
  },
  {
    id: '3',
    nome: 'YouTube',
    descricao: 'Assista às missas, reflexões e eventos da Comissão IVC Norte no nosso canal.',
    url: 'https://www.youtube.com/@comissaonorteivc',
    icone: 'youtube',
    cor: '#FF0000',
    corFundo: 'from-red-600 to-red-500'
  },
  {
    id: '4',
    nome: 'WhatsApp',
    descricao: 'Receba avisos e comunicados diretamente no seu celular pelo grupo oficial.',
    url: 'https://chat.whatsapp.com/comissaonorteivc',
    icone: 'whatsapp',
    cor: '#25D366',
    corFundo: 'from-green-500 to-green-400'
  }
];

const RedesSociais: React.FC = () => {
  const renderIcon = (tipo: string) => {
    switch (tipo) {
      case 'instagram':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Conecte-se</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Redes Sociais</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Siga a Comissão IVC Norte nas redes sociais e fique por dentro de tudo que acontece na nossa região.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {redes.map((rede) => (
          <a
            key={rede.id}
            href={rede.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className={`bg-gradient-to-r ${rede.corFundo} p-8 flex items-center justify-center`}>
                {renderIcon(rede.icone)}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#C41E3A] transition-colors">
                  {rede.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{rede.descricao}</p>
                <span className="text-sm font-bold uppercase tracking-wider" style={{ color: rede.cor }}>
                  Seguir →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <section className="bg-gradient-to-r from-[#C41E3A] to-[#F5841F] p-8 sm:p-12 rounded-2xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Compartilhe nossa missão</h3>
        <p className="text-white/90 max-w-2xl mx-auto mb-6">
          Ajude-nos a divulgar o trabalho da Comissão IVC Norte. Compartilhe o conteúdo nas suas redes e espalhe a fé.
        </p>
        <a
          href="https://www.instagram.com/comissaonorteivc/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-[#C41E3A] px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
        >
          Compartilhar no Instagram
        </a>
      </section>
    </div>
  );
};

export default RedesSociais;
