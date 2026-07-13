import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Evento } from '../types';

const EventoDetalhes: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [evento, setEvento] = useState<Evento | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchEvento(id);
        }
    }, [id]);

    const fetchEvento = async (eventoId: string) => {
        try {
            const { data, error } = await supabase
                .from('eventos')
                .select('*')
                .eq('id', eventoId)
                .single();

            if (error) {
                console.error('Erro ao buscar evento:', error);
            } else {
                setEvento(data);
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatData = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A]"></div>
            </div>
        );
    }

    if (!evento) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Evento não encontrado</h2>
                <button
                    onClick={() => navigate('/eventos')}
                    className="mt-4 text-[#C41E3A] font-semibold hover:underline"
                >
                    Voltar para Eventos
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => navigate('/eventos')}
                className="flex items-center gap-2 text-[#C41E3A] font-semibold mb-8 hover:translate-x-[-4px] transition-transform"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para Eventos
            </button>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#C41E3A]/5">
                <div className="relative h-64 sm:h-96 w-full">
                    {evento.imagem_url ? (
                        <img
                            src={evento.imagem_url}
                            alt={evento.nome}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                            Sem imagem
                        </div>
                    )}
                    <div className="absolute top-6 left-6 bg-[#C41E3A] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                        EVENTO
                    </div>
                </div>

                <div className="p-8 sm:p-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{evento.nome}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-4 text-slate-700">
                            <div className="p-3 bg-[#C41E3A]/10 rounded-xl text-[#C41E3A]">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Quando</p>
                                <p className="font-semibold">{formatData(evento.data_hora)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-700">
                            <div className="p-3 bg-[#C41E3A]/10 rounded-xl text-[#C41E3A]">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase">Onde</p>
                                <p className="font-semibold">{evento.local}</p>
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre o Evento</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-6">
                            {evento.descricao}
                        </p>

                        {evento.detalhes && (
                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Informações Adicionais</h2>
                                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {evento.detalhes}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventoDetalhes;
