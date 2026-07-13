import React, { useState } from 'react';

interface Pastoral {
    id: string;
    nome: string;
    descricao: string;
    imagem_url: string;
    coordenador: string;
    reunioes: string;
    destaque: string;
}

const Pastorais: React.FC = () => {
    const [pastorais] = useState<Pastoral[]>([
        {
            id: '1',
            nome: 'Pastoral da Família',
            descricao: 'Acolher, orientar e formar as famílias cristãs na região norte da Diocese.',
            imagem_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
            coordenador: 'Casal Maria e José',
            reunioes: 'Terças-feiras, 20h',
            destaque: 'Inscrições abertas para o Encontro de Casais com Cristo (ECC)!'
        },
        {
            id: '2',
            nome: 'Pastoral da Juventude',
            descricao: 'Jovens evangelizando jovens com dinamismo e fé na região norte.',
            imagem_url: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800',
            coordenador: 'Ana Maria',
            reunioes: 'Sábados, 17h',
            destaque: 'Gincana Bíblica arrecada 2 toneladas de alimentos.'
        },
        {
            id: '3',
            nome: 'Catequese',
            descricao: 'Iniciação à vida cristã para crianças, jovens e adultos das paróquias da região.',
            imagem_url: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80&w=800',
            coordenador: 'Irmã Lúcia',
            reunioes: 'Sábados, 09h e 15h',
            destaque: 'Matrículas abertas para turmas de 2026.'
        },
        {
            id: '4',
            nome: 'Ministério de Música',
            descricao: 'Servir a liturgia através do canto e da música sacra nas celebrações da Comissão.',
            imagem_url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800',
            coordenador: 'João Pedro',
            reunioes: 'Quintas, 19h (Ensaio)',
            destaque: 'Audições para novos coralistas na próxima semana.'
        },
        {
            id: '5',
            nome: 'Ação Social',
            descricao: 'Promover a caridade cristã através de campanhas de agasalho, alimentação e apoio a famílias.',
            imagem_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800',
            coordenador: 'Paulo Santos',
            reunioes: 'Quartas-feiras, 19h',
            destaque: 'Campanha do Agasalho 2026 em andamento.'
        },
        {
            id: '6',
            nome: 'Pastoral do Dízimo',
            descricao: 'Conscientizar sobre a importância do dízimo e da generosidade na Igreja.',
            imagem_url: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=800',
            coordenador: 'Francisco Lima',
            reunioes: '1º Domingo do mês, 10h',
            destaque: 'Novo método de prestação de contas disponível online.'
        }
    ]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Serviço e Doação</h1>
                <h2 className="text-4xl font-bold text-gray-900">Pastorais e Movimentos</h2>
                <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                    "Há diversidade de dons, mas o Espírito é o mesmo." (1 Cor 12,4)
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {pastorais.map((pastoral) => (
                    <div key={pastoral.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group">

                        <div className="h-48 overflow-hidden relative">
                            <img src={pastoral.imagem_url} alt={pastoral.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                                <h3 className="text-white font-bold text-2xl drop-shadow-md">{pastoral.nome}</h3>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <p className="text-gray-600 mb-6 min-h-[48px]">{pastoral.descricao}</p>

                            <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
                                <h4 className="flex items-center gap-2 text-[#C41E3A] font-bold text-sm mb-2 uppercase tracking-wide">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                                    Em Destaque
                                </h4>
                                <p className="text-gray-800 font-medium italic">"{pastoral.destaque}"</p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-slate-500 gap-2 border-t pt-4">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#F5841F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {pastoral.reunioes}
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#F5841F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Coord: {pastoral.coordenador}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pastorais;
