import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { InstagramPost } from '../types';

interface InstagramConfig {
  instagram_username?: string;
  instagram_url?: string;
}

const Instagram: React.FC = () => {
  const [config, setConfig] = useState<InstagramConfig>({});
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();

    const script = document.createElement('script');
    script.src = "https://widgets.sociablekit.com/instagram-feed/widget.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://widgets.sociablekit.com/instagram-feed/widget.js"]');
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase.from('app_config').select('*').eq('id', 1).single();
      if (!error && data) {
        setConfig(data);
      }

      const { data: postsData } = await supabase.from('instagram_posts').select('*').order('data_publicacao', { ascending: false });
      if (postsData) {
        setPosts(postsData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const instagramUsername = config.instagram_username || 'comissaonorteivc';
  const instagramUrl = config.instagram_url || `https://www.instagram.com/comissaonorteivc/`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Redes Sociais</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Nosso Instagram</h2>
        <p className="text-gray-500 font-medium">Acompanhe a Comissão IVC Norte e interaja conosco</p>
      </div>

      <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 mb-12">
        <div className="bg-gradient-to-r from-[#a855f7] to-[#f97316] py-5 flex justify-center items-center shadow-inner">
          <h3 className="text-white font-black text-lg tracking-widest uppercase flex items-center gap-2">
            <span className="animate-pulse">●</span> Feed ao Vivo
          </h3>
        </div>

        <div className="p-4 md:p-8 bg-white min-h-[600px]">
          <div className="sk-instagram-feed" data-embed-id="25641306"></div>
        </div>

        <div className="p-6 text-center bg-gray-50 border-t border-gray-100">
          <p className="text-gray-400 text-sm italic">
            Arraste para o lado ou clique nas imagens para interagir
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-[40px] p-1 shadow-2xl mb-20">
        <div className="bg-white rounded-[38px] p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="insta-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F58529" />
                      <stop offset="50%" stopColor="#DD2A7B" />
                      <stop offset="100%" stopColor="#8134AF" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#insta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </div>

            <div className="text-center md:text-left flex-grow">
              <h3 className="text-3xl font-black text-gray-900 mb-2">@{instagramUsername}</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-lg">
                Siga-nos para acompanhar as missas, eventos e o dia a dia da Comissão IVC Norte.
              </p>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg text-lg"
              >
                Seguir no Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {posts.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="bg-orange-100 p-2 rounded-lg">✨</span> Posts em Destaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-50 hover:shadow-xl transition-all group">
                {post.imagem_url && (
                  <div className="h-72 overflow-hidden bg-slate-100 relative">
                    <img
                      src={post.imagem_url}
                      alt="Post Destaque"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">{post.legenda}</p>
                  <div className="flex justify-between items-center border-t border-gray-50 pt-4">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter">
                      {post.data_publicacao ? new Date(post.data_publicacao).toLocaleDateString('pt-BR') : ''}
                    </span>
                    <a
                      href={post.url_post}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C41E3A] text-sm font-black hover:text-[#F5841F] transition-colors uppercase"
                    >
                      Ver no Instagram →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Instagram;
