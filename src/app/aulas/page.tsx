'use client';

import Link from 'next/link';
import { Calendar, Video, Clock, DollarSign, Lock } from 'lucide-react';

const teachers = [
  { id: '1', name: 'Katsumoto Sensei', specialty: 'Kanji e História', price: 60.0, imageUrl: '/images/avatars/ronin.png' },
  { id: '2', name: 'Yumi Sensei', specialty: 'Conversação Natural', price: 60.0, imageUrl: '/images/avatars/onna.png' },
  { id: '3', name: 'Kenji Sensei', specialty: 'Gramática N5-N4', price: 60.0, imageUrl: '/images/avatars/shinobi.png' },
  { id: '4', name: 'Hikari Sensei', specialty: 'Preparatório JLPT', price: 60.0, imageUrl: null },
  { id: '5', name: 'Ryu Sensei', specialty: 'Keigo (Linguagem Formal)', price: 60.0, imageUrl: null },
];

export default function AulasPage() {
  return (
    <div className="min-h-screen bg-[#0a0510] text-foreground p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-pixel text-primary uppercase drop-shadow-[0_0_10px_rgba(255,140,0,0.8)]">
            Aulas ao Vivo
          </h1>
          <p className="text-gray-400 font-pixel text-lg">Aprenda japonês diretamente com Senseis ninjas!</p>
          <div className="bg-purple-900/20 border border-purple-500/50 p-4 rounded-xl text-left inline-block max-w-2xl mx-auto">
            <h3 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
              <Video className="w-5 h-5" /> Como funciona?
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>As aulas duram 1 hora via Google Meet.</li>
              <li>Valor fixo: R$ 60,00 por aula.</li>
              <li>Parte do valor apoia a plataforma GAIJIN RC2.</li>
              <li>Pagamento seguro e rápido via Pix ou Cartão.</li>
            </ul>
          </div>
        </header>

        {/* Banner de Em Breve */}
        <div className="bg-orange-900/20 border border-orange-500/50 p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 text-orange-300 font-bold mb-1">
            <Lock className="w-5 h-5" /> Sistema de Agendamento em Construção
          </div>
          <p className="text-gray-400 text-sm">
            Em breve você poderá agendar e pagar diretamente pela plataforma. Por enquanto, conheça nossos senseis!
          </p>
        </div>

        <section className="grid gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-lg hover:border-primary/50 transition-colors">
              <div className="sm:w-1/3 bg-black border-r border-border p-4 flex flex-col items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden mb-4 shadow-[0_0_15px_rgba(255,140,0,0.5)]">
                  {teacher.imageUrl ? (
                    <img src={teacher.imageUrl} alt={teacher.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl">🥷</div>
                  )}
                </div>
                <h2 className="font-pixel text-2xl text-secondary text-center">{teacher.name}</h2>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded mt-2">{teacher.specialty}</span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" /> Horários Disponíveis
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-background border border-border px-3 py-2 rounded-lg text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Em breve...
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/50">
                  <div className="text-gold font-bold flex items-center gap-1 text-lg">
                    <DollarSign className="w-5 h-5" /> R$ {teacher.price.toFixed(2)}
                  </div>
                  <button disabled className="bg-gray-700 text-gray-400 font-bold font-pixel px-6 py-2 rounded-lg cursor-not-allowed opacity-60">
                    EM BREVE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
