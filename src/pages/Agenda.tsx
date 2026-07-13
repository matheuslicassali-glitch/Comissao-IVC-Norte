import React, { useState, useEffect } from 'react';
import { AgendaItem } from '../types';
import { supabase } from '../services/supabase';

const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const Agenda: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgenda();
  }, []);

  const fetchAgenda = async () => {
    try {
      const { data, error } = await supabase.from('agenda').select('*').order('horario', { ascending: true });
      if (error) {
        console.error('Erro ao buscar agenda:', error);
      } else {
        setAgenda(data || []);
      }
    } catch (error) {
      console.error('Erro desconhecido:', error);
    } finally {
      setLoading(false);
    }
  };

  const itemsFiltrados = agenda.filter(item => item.dia === selectedDay);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'missa': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reuniao': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-sm font-bold text-[#C41E3A] uppercase tracking-widest mb-2">Compromissos</h1>
        <h2 className="text-4xl font-bold text-gray-900">Agenda da Comissão</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#C41E3A]/5">
        <div className="grid grid-cols-7 border-b border-[#C41E3A]/10 bg-[#C41E3A]">
          {diasSemana.map((dia, idx) => (
            <button
              key={dia}
              onClick={() => setSelectedDay(idx)}
              className={`py-6 text-xs md:text-sm font-bold transition-colors ${selectedDay === idx
                ? 'bg-white text-[#C41E3A]'
                : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
            >
              <span className="hidden md:inline">{dia}</span>
              <span className="md:hidden">{dia.substring(0, 3)}</span>
            </button>
          ))}
        </div>

        <div className="p-8 min-h-[400px]">
          <h3 className="text-2xl font-bold text-[#C41E3A] mb-8 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-[#C41E3A] rounded-full"></span>
            {diasSemana[selectedDay]}
          </h3>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C41E3A]"></div>
            </div>
          ) : itemsFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500">Nenhuma atividade agendada para este dia.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {itemsFiltrados.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-[#C41E3A]/20 hover:bg-slate-50/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-xl font-bold text-gray-900 w-20">
                      {item.horario}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg group-hover:text-[#C41E3A] transition-colors">{item.titulo}</h4>
                      <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold border mt-1 uppercase tracking-wider ${getTipoColor(item.tipo)}`}>
                        {item.tipo}
                      </span>
                    </div>
                  </div>
                  <button className="text-[#C41E3A] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm italic">
        * Horários sujeitos a alterações sem aviso prévio. Consulte a secretaria da Comissão.
      </div>
    </div>
  );
};

export default Agenda;
