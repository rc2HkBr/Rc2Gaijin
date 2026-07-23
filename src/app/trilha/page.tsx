'use client';

import { Mountain, Lock, Play, ChevronLeft, Star, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Dados das Missões
const MISSIONS = [
  {
    id: 1,
    title: "O Punho da Mestra",
    subtitle: "Vogais Primárias (A, I, U, E, O)",
    description: "A Mestra de Karate te desafia a decorar o som primordial das vogais. Não a decepcione!",
    reward: "50 RC COINS",
    image: "/images/shop/lutadora_karate.png",
    emoji: "🥋",
    isUnlocked: true,
    isCompleted: true,
    color: "bg-success",
    shadow: "shadow-[4px_4px_0_#4BB200]",
  },
  {
    id: 2,
    title: "A Lâmina Inflexível",
    subtitle: "Sistemas K e S",
    description: "O Samurai Honrado quer testar seu tempo de resposta. A espada dele não perdoa erros sistêmicos.",
    reward: "100 RC COINS",
    image: "/images/shop/samurai_honrado.png",
    emoji: "🗡️",
    isUnlocked: true,
    isCompleted: false,
    color: "bg-secondary",
    shadow: "shadow-[4px_4px_0_#00d2ff]",
  },
  {
    id: 3,
    title: "Infiltração Furtiva",
    subtitle: "Sistemas T e N",
    description: "Para andar nas sombras do mainframe, não hesite. Passe pelo Ninja Clássico despercebido.",
    reward: "SHURIKEN MECHA",
    image: "/images/shop/ninja_classico.png",
    emoji: "🥷",
    isUnlocked: false,
    isCompleted: false,
    color: "bg-primary",
    shadow: "shadow-[4px_4px_0_#ff8c00]",
  },
  {
    id: 4,
    title: "Desafio do Shogun",
    subtitle: "Override: KANJIS",
    description: "O Shogun corrompeu os arquivos principais. Mostre seu valor e derrote-o lendo dados completos para liberar a rede musical!",
    reward: "UNLOCK: J-POP",
    image: null,
    emoji: "👺",
    isUnlocked: false,
    isCompleted: false,
    color: "bg-[#7E22CE]",
    shadow: "shadow-[4px_4px_0_#9333EA]",
    isBoss: true,
  }
];

export default function TrilhaMissionsPage() {
  const [activeMission, setActiveMission] = useState<number>(2);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-pixel text-primary uppercase mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-sm font-pixel text-secondary uppercase tracking-widest mt-1">
            NINGU ARSENAL
          </span>
        </div>
      </div>

      {/* MISSION LIST CONTAINER */}
      <div className="w-full max-w-4xl px-4 sm:px-8 mt-6 flex flex-col gap-10 relative z-10">
        
        {/* Banner Intro */}
        <div className="bg-[#1a2332] border-4 border-[#2c3e50] p-8 flex flex-col items-center text-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <Mountain className="w-12 h-12 text-secondary mb-3 relative z-10 drop-shadow-[0_0_5px_rgba(0,210,255,0.8)]" />
          <h2 className="text-3xl font-pixel text-primary mb-2 uppercase drop-shadow-[0_0_8px_rgba(255,140,0,0.8)] leading-none relative z-10">
            A JORNADA DO HERÓI
          </h2>
          <p className="text-gray-400 font-sans relative z-10">
            Siga o caminho shinobi derrotando os mestres de dados. Cada vitória o aproxima do lendário servidor J-POP KARAOKE!
          </p>
        </div>

        {/* Missions Path */}
        <div className="flex flex-col relative w-full items-center">
          
          {/* Vertical Path Line (Cyber Cable) */}
          <div className="absolute top-10 bottom-10 w-2 bg-[#2c3e50] border-x border-[#1a2332] z-0 shadow-[0_0_10px_rgba(0,0,0,0.8)]"></div>

          {MISSIONS.map((mission, index) => {
            const isActive = activeMission === mission.id;
            
            return (
              <div key={mission.id} className="relative z-10 w-full max-w-3xl flex flex-col items-center mb-16">
                
                {/* Mission Card */}
                <div className={`w-full bg-surface-dark border-[3px] p-5 transition-transform flex flex-col sm:flex-row gap-6 shadow-[4px_4px_0_#000] ${
                    isActive ? 'border-secondary hover:-translate-y-1' : 'border-border'
                  } ${!mission.isUnlocked ? 'opacity-50 grayscale hover:scale-100' : ''}`}
                >
                  
                  {/* Character Avatar */}
                  <div className={`w-32 h-32 shrink-0 flex items-center justify-center border-[3px] relative overflow-hidden group ${
                    mission.isBoss ? 'bg-black border-[#9333EA]' : 'bg-black border-border'
                  }`}>
                    {mission.image ? (
                      <img src={mission.image} alt={mission.title} className="w-full h-full object-contain p-2 filter group-hover:brightness-125 transition-all" />
                    ) : (
                      <span className={`text-6xl drop-shadow-[0_0_10px_${mission.isBoss ? 'rgba(147,51,234,0.8)' : 'rgba(0,210,255,0.5)'}]`}>{mission.emoji}</span>
                    )}

                    {/* Retro Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30"></div>
                  </div>

                  {/* Mission Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`text-sm font-pixel uppercase tracking-widest mb-1 ${mission.isBoss ? 'text-[#9333EA] drop-shadow-[0_0_5px_rgba(147,51,234,0.5)]' : 'text-primary drop-shadow-[0_0_5px_rgba(255,140,0,0.5)]'}`}>
                          {mission.isBoss ? '💥 BOSS BATTLE' : `STAGE 0${index + 1}`}
                        </h3>
                        <h2 className={`text-2xl font-pixel leading-tight ${mission.isBoss ? 'text-white' : 'text-secondary drop-shadow-[0_0_2px_rgba(0,210,255,0.5)]'}`}>
                          {mission.title}
                        </h2>
                      </div>
                      
                      {/* Reward Badge */}
                      <div className="hidden sm:flex items-center gap-1 bg-[#1a2332] text-gold font-pixel px-2 py-1 border-2 border-[#2c3e50] shadow-[2px_2px_0_#000]">
                        <Star className="w-3 h-3 fill-gold" />
                        {mission.reward}
                      </div>
                    </div>
                    
                    <p className="text-xs font-bold text-success mb-2 uppercase tracking-wide">{"// "}{mission.subtitle}</p>
                    <p className="text-sm text-gray-400 font-sans leading-relaxed mb-4">
                      {mission.description}
                    </p>

                    {/* Action Button */}
                    <div className="mt-auto">
                      {mission.isCompleted ? (
                        <button disabled className="w-full sm:w-auto px-6 py-2 bg-[#111] border-2 border-[#333] text-gray-500 font-pixel text-xl uppercase shadow-[2px_2px_0_#000]">
                          COMPLETED
                        </button>
                      ) : !mission.isUnlocked ? (
                        <button disabled className="w-full sm:w-auto px-6 py-2 bg-[#111] border-2 border-[#333] text-gray-500 font-pixel text-xl uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0_#000]">
                          <Lock className="w-4 h-4" /> SYSTEM LOCKED
                        </button>
                      ) : (
                        <button className={`w-full sm:w-auto px-8 py-2 text-[#111] font-pixel text-xl uppercase border-2 border-white flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none hover:brightness-110 ${mission.color}`}>
                          {mission.isBoss ? <ShieldAlert className="w-5 h-5 text-[#111]" /> : <Play className="w-5 h-5 fill-[#111] text-[#111]" />}
                          {mission.isBoss ? 'OVERRIDE SHOGUN' : 'EXECUTE TRAINING'}
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
