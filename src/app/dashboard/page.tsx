'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Flame, Book, Video, Trophy, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#07030d] flex items-center justify-center text-cyan-400 font-bold">Carregando QG Ninja...</div>;
  }

  if (!data || data.error) {
    return <div className="min-h-screen bg-[#07030d] flex items-center justify-center text-red-400 font-bold">Erro ao carregar os dados.</div>;
  }

  const { user, savedWordsCount, upcomingBookings } = data;

  // Calculando progresso do Nível (Cada level exige 1000 XP)
  const xpForNextLevel = 1000;
  const currentLevelXp = user.xp % xpForNextLevel;
  const progressPercent = Math.min(100, Math.max(0, (currentLevelXp / xpForNextLevel) * 100));

  return (
    <div className="min-h-screen bg-[#07030d] text-white pb-28">
      
      {/* HEADER */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center px-4 sm:px-8 sticky top-0 z-40 shadow-md">
        <Link href="/" className="text-cyan-400 hover:text-white transition-colors mr-4">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" /> DASHBOARD
          </h1>
          <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
            Quartel General do Gaijin
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* PERFIL & XP */}
        <div className="bg-gradient-to-r from-[#160a2b] to-[#120722] border border-cyan-500/30 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full"></div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 rounded-full border-4 border-cyan-400 bg-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Flame className="w-10 h-10 text-cyan-400" />
            </div>

            <div className="flex-1 w-full text-center md:text-left">
              <h2 className="text-2xl font-black text-white uppercase tracking-widest">{user.name}</h2>
              <p className="text-purple-400 font-bold text-sm mb-4">Ronin Iniciante (Nível {user.level})</p>

              {/* Barra de XP */}
              <div className="w-full">
                <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                  <span>XP Atual: {user.xp}</span>
                  <span>Próximo Nível: {user.level * xpForNextLevel} XP</span>
                </div>
                <div className="w-full h-4 bg-black/60 rounded-full border border-purple-900/50 overflow-hidden relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* GRIMÓRIO ESTATÍSTICA */}
          <div className="bg-[#120722] border border-purple-600/30 rounded-2xl p-6 flex flex-col justify-between group hover:border-purple-500 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-900/30 rounded-xl">
                  <Book className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-black text-white">Grimório Ninja</h3>
              </div>
              <p className="text-sm text-gray-400 mb-6">Palavras e Kanjis salvos no Banco para revisão diária.</p>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <span className="text-4xl font-black text-white drop-shadow-md">{savedWordsCount}</span>
                <span className="text-purple-400 ml-2 font-bold text-sm uppercase">Selos Forjados</span>
              </div>
              <Link href="/banco-kanji" className="text-cyan-400 p-2 rounded-full hover:bg-cyan-900/30 transition-colors">
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* MISSÕES DE HOJE (AULAS) */}
          <div className="bg-[#120722] border border-cyan-600/30 rounded-2xl p-6 flex flex-col group hover:border-cyan-500 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-cyan-900/30 rounded-xl">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-black text-white">Próximas Missões</h3>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto max-h-40 pr-2 custom-scrollbar">
              {upcomingBookings.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Nenhuma aula ao vivo agendada.</p>
              ) : (
                upcomingBookings.map((booking: any) => (
                  <div key={booking.id} className="bg-black/40 border border-cyan-900 rounded-xl p-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-cyan-300 text-sm">Com Sensei {booking.schedule.teacher.name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(booking.schedule.date).toLocaleDateString('pt-BR')} às {new Date(booking.schedule.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-900/40 text-green-400 rounded-lg hover:bg-green-800 transition-colors" title="Entrar na Aula (Meet)">
                      <Video className="w-5 h-5" />
                    </a>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-purple-900/50 flex justify-end">
              <Link href="/aulas-ao-vivo" className="text-xs font-bold uppercase text-cyan-500 hover:text-cyan-400 flex items-center gap-1">
                Agendar nova Aula <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
