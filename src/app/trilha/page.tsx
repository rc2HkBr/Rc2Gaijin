'use client';

import { Mountain, Lock, Play, ChevronLeft, Star, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Dados das Missões
const MISSIONS = [
  {
    id: 1,
    title: "O Punho da Mestra",
    subtitle: "Aprenda as 5 vogais (A, I, U, E, O)",
    description: "A Mestra de Karate te desafia a decorar o som primordial das vogais. Não a decepcione!",
    reward: "50 Ryō",
    image: "/images/shop/lutadora_karate.png",
    emoji: "🥋",
    isUnlocked: true,
    isCompleted: true,
    color: "bg-success",
    shadow: "shadow-[0_4px_0_#4BB200]",
  },
  {
    id: 2,
    title: "A Lâmina Inflexível",
    subtitle: "Família K e S",
    description: "O Samurai Honrado quer testar seu tempo de resposta. A espada dele não perdoa erros.",
    reward: "100 Ryō",
    image: "/images/shop/samurai_honrado.png",
    emoji: "🗡️",
    isUnlocked: true,
    isCompleted: false,
    color: "bg-secondary",
    shadow: "shadow-[0_4px_0_#1899D6]",
  },
  {
    id: 3,
    title: "Infiltração Silenciosa",
    subtitle: "Família T e N",
    description: "Para andar nas sombras, você não pode hesitar. Passe pelo Ninja Clássico despercebido.",
    reward: "Shuriken de Aço",
    image: "/images/shop/ninja_classico.png",
    emoji: "🥷",
    isUnlocked: false,
    isCompleted: false,
    color: "bg-primary",
    shadow: "shadow-[0_4px_0_#CC3C3C]",
  },
  {
    id: 4,
    title: "Desafio do Shogun",
    subtitle: "O Despertar dos Kanjis",
    description: "O impiedoso Shogun dos Kanjis trancou as portas da cidade musical. Mostre seu valor e derrote-o lendo palavras completas!",
    reward: "Desbloqueia J-Pop Karaoke",
    image: null,
    emoji: "👺",
    isUnlocked: false,
    isCompleted: false,
    color: "bg-purple-600",
    shadow: "shadow-[0_4px_0_#7E22CE]",
    isBoss: true,
  }
];

export default function TrilhaMissionsPage() {
  const [activeMission, setActiveMission] = useState<number>(2); // Missão atual

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24">
      
      {/* HEADER NAVBAR (Duolingo Style) */}
      <div className="w-full h-16 bg-white border-b-2 border-border flex items-center px-4 sm:px-8 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4">
           <ChevronLeft className="w-6 h-6 text-gray-light" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-xl font-black tracking-widest text-primary uppercase mr-4">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-nav-text">
            TRILHA DO MESTRE
          </span>
        </div>
      </div>

      {/* MISSION LIST CONTAINER */}
      <div className="w-full max-w-2xl px-4 sm:px-8 mt-8 flex flex-col gap-10">
        
        {/* Banner Intro */}
        <div className="bg-white rounded-3xl p-6 border-2 border-border shadow-[0_4px_0_#E5E5E5] flex flex-col items-center text-center">
          <Mountain className="w-12 h-12 text-primary mb-3" />
          <h2 className="text-2xl font-black text-gray-text mb-2 uppercase">A Jornada do Herói</h2>
          <p className="text-gray-light font-medium">
            Siga o caminho shinobi derrotando os grandes mestres. Cada vitória o aproxima do lendário Dojo do J-Pop Karaoke!
          </p>
        </div>

        {/* Missions Path */}
        <div className="flex flex-col relative w-full items-center">
          
          {/* Vertical Path Line */}
          <div className="absolute top-10 bottom-10 w-3 bg-border rounded-full z-0"></div>

          {MISSIONS.map((mission, index) => {
            const isActive = activeMission === mission.id;
            
            return (
              <div key={mission.id} className="relative z-10 w-full flex flex-col items-center mb-16">
                
                {/* Mission Card */}
                <div className={`w-full bg-white rounded-3xl p-5 border-2 transition-all flex flex-col sm:flex-row gap-6 shadow-[0_4px_0_#E5E5E5] ${
                    isActive ? 'border-secondary scale-[1.02]' : 'border-border'
                  } ${!mission.isUnlocked ? 'opacity-60 grayscale' : ''}`}
                >
                  
                  {/* Character Avatar */}
                  <div className={`w-28 h-28 shrink-0 rounded-2xl flex items-center justify-center border-2 border-border shadow-sm overflow-hidden p-2 ${
                    mission.isBoss ? 'bg-purple-100 border-purple-300' : 'bg-background'
                  }`}>
                    {mission.image ? (
                      <img src={mission.image} alt={mission.title} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-6xl drop-shadow-sm">{mission.emoji}</span>
                    )}
                  </div>

                  {/* Mission Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${mission.isBoss ? 'text-purple-600' : 'text-nav-text'}`}>
                          {mission.isBoss ? '💥 BATALHA DE CHEFE' : `CAPÍTULO ${index + 1}`}
                        </h3>
                        <h2 className={`text-xl font-bold leading-tight ${mission.isBoss ? 'text-gray-text' : 'text-gray-text'}`}>
                          {mission.title}
                        </h2>
                      </div>
                      
                      {/* Reward Badge */}
                      <div className="hidden sm:flex items-center gap-1 bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-lg border border-gold/30">
                        <Star className="w-3 h-3 fill-gold" />
                        {mission.reward}
                      </div>
                    </div>
                    
                    <p className="text-sm font-bold text-gray-400 mb-2">{mission.subtitle}</p>
                    <p className="text-sm text-gray-light font-medium leading-relaxed mb-4">
                      {mission.description}
                    </p>

                    {/* Action Button */}
                    <div className="mt-auto">
                      {mission.isCompleted ? (
                        <button disabled className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-border text-nav-text font-black uppercase rounded-xl shadow-[0_4px_0_#E5E5E5]">
                          Concluído
                        </button>
                      ) : !mission.isUnlocked ? (
                        <button disabled className="w-full sm:w-auto px-6 py-3 bg-gray-100 border-2 border-border text-gray-400 font-black uppercase rounded-xl flex items-center justify-center gap-2">
                          <Lock className="w-5 h-5" /> Bloqueado
                        </button>
                      ) : (
                        <button className={`w-full sm:w-auto px-8 py-3 text-white font-black uppercase rounded-xl flex items-center justify-center gap-2 transition-all hover:translate-y-1 active:shadow-none active:translate-y-1 ${mission.color} ${mission.shadow}`}>
                          {mission.isBoss ? <ShieldAlert className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                          {mission.isBoss ? 'Enfrentar Shogun' : 'Iniciar Treino'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
