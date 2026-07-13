import React, { useState } from 'react';

interface CatecismoItem {
  id: string;
  titulo: string;
  categoria: string;
  conteudo: string;
  cor: string;
}

const catecismoData: CatecismoItem[] = [
  {
    id: '1',
    titulo: 'O Credo',
    categoria: 'Profissão de Fé',
    conteudo: 'Creio em Deus, Pai todo-poderoso, criador do céu e da terra. Creio em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, pôncio Pilatos, foi crucificado, morto e sepultado, desceu aos infernos, ressuscitou ao terceiro dia, subiu aos céus, está sentado à direita de Deus, Pai todo-poderoso, de onde há de vir a julgar os vivos e os mortos.',
    cor: '#C41E3A'
  },
  {
    id: '2',
    titulo: 'Os Sacramentos',
    categoria: 'Sacramentos',
    conteudo: 'A Igreja reconhece sete sacramentos: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem Sacramental e Matrimônio. São sinais visíveis da graça invisível de Deus.',
    cor: '#F5841F'
  },
  {
    id: '3',
    titulo: 'Os Mandamentos',
    categoria: 'Lei de Deus',
    conteudo: 'Os Dez Mandamentos: 1) Amar a Deus sobre todas as coisas; 2) Não tomar o nome de Deus em vão; 3) Guardar domingos e festas; 4) Honrar pai e mãe; 5) Não matar; 6) Não cometer adultério; 7) Não furtar; 8) Não mentir nem caluniar; 9) Não desejar a mulher do próximo; 10) Não cobiçar os bens alheios.',
    cor: '#1B5E8C'
  },
  {
    id: '4',
    titulo: 'As Bem-Aventuranças',
    categoria: 'Jesus Cristo',
    conteudo: 'Bem-aventurados os pobres de espírito, porque deles é o Reino dos Céus. Bem-aventurados os mansos, porque herdarão a terra. Bem-aventurados os que choram, porque serão consolados. Bem-aventurados os que têm fome e sede de justiça, porque serão saciados. Bem-aventurados os misericordiosos, porque alcançarão misericórdia.',
    cor: '#C41E3A'
  },
  {
    id: '5',
    titulo: 'A oração do Pai Nosso',
    categoria: 'Orações',
    conteudo: 'Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. Não nos deixe cair em tentação, mas livrai-nos do mal.',
    cor: '#F5841F'
  },
  {
    id: '6',
    titulo: 'As Virtudes Teologais',
    categoria: 'Virtudes',
    conteudo: 'As três virtudes teologais são: Fé (acreditar em Deus e em tudo que Ele revelou), Esperança (confiar na salvação eterna e nas promessas de Deus) e Caridade (amar a Deus sobre todas as coisas e ao próximo como a nós mesmos).',
    cor: '#1B5E8C'
  }
];

const Catecismo: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Formação na Fé</h1>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Catecismo</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Aprofunde seus conhecimentos na fé católica com os fundamentos do catecismo da Igreja.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {catecismoData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="h-2" style={{ backgroundColor: item.cor }}></div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: item.cor }}
                >
                  {item.categoria}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.titulo}</h3>
              <p className={`text-gray-600 text-sm leading-relaxed ${expandedId === item.id ? '' : 'line-clamp-3'}`}>
                {item.conteudo}
              </p>
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="mt-4 text-sm font-bold transition-colors"
                style={{ color: item.cor }}
              >
                {expandedId === item.id ? 'Ler menos ↑' : 'Ler mais ↓'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white/40 p-12 rounded-3xl border border-[#C41E3A]/5 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quer se aprofundar?</h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          A Comissão IVC Norte promove cursos de catequese para crianças, jovens e adultos. Participe!
        </p>
        <a
          href="/contato"
          className="bg-[#C41E3A] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg inline-block"
        >
          Entre em Contato
        </a>
      </section>
    </div>
  );
};

export default Catecismo;
