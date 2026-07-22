'use client';

import { useState } from 'react';
import { Star, Grid, Sparkles, BookOpen, CheckCircle2, ShieldAlert, Skull, Map, Heart, Flame, Coins, MapPin, Mountain } from 'lucide-react';
import Link from 'next/link';
import { HIRAGANA_GROUPS } from '@/data/hiraganaData';
import HiraganaChartModal from '@/components/HiraganaChartModal';
import Heatmap from '@/components/Heatmap';

export default function Home() {
  const [isChartOpen, setIsChartOpen] = useState(false);

  return (
    <div className="flex flex-col items-center pb-24 pt-6 w-full max-w-2xl mx-auto px-4">
      {/* MOBILE HUD (Hidden on desktop since Sidebar has it) */}
      <div className="sm:hidden w-full bg-surface border-2 border-border rounded-2xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-primary font-bold text-sm">
          <Heart className="w-5 h-5 fill-primary" /> 3
        </div>
        <div className="flex items-center gap-1.5 text-orange-500 font-bold text-sm">
          <Flame className="w-5 h-5 fill-orange-500" /> 1
        </div>
        <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
          <Coins className="w-5 h-5 fill-amber-500" /> 150
        </div>
      </div>

      {/* Banner / Header */}
      <div className="w-full mb-10 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
          <Map className="w-4 h-4" /> Mapa Mundi Ninja
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">A Jornada do Shinobi</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Cumpra missões diárias, derrote chefões e domine a leitura para se tornar um Mestre Ninja!
        </p>
      </div>

      <Heatmap />

      {/* Trilha do Mestre Banner */}
      <Link href="/trilha" className="w-full bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-6 shadow-xl mb-12 relative overflow-hidden group hover:scale-[1.02] transition-transform block">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-inner">
            <Mountain className="w-8 h-8 text-white drop-shadow-md" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-white drop-shadow-md">A Trilha do Mestre</h3>
            <p className="text-white/80 text-sm font-medium">Complete os 1000 exercícios e desbloqueie o J-Pop Karaoke Learning!</p>
          </div>
          <div className="bg-white text-primary font-black px-6 py-3 rounded-xl shadow-lg border-b-4 border-gray-200 group-active:border-b-0 group-active:translate-y-1 transition-all">
            Ver Progresso
          </div>
        </div>
      </Link>

      {/* ZONES MAP */}
      <div className="relative flex flex-col items-center w-full">
        {/* Central Vertical Connector Line */}
        <div className="absolute top-6 bottom-6 left-1/2 -ml-1 w-2 bg-border z-0 rounded-full"></div>

        {/* =========================================
            ZONA 1: O Despertar do Aprendiz
           ========================================= */}
        <div className="w-full mb-12 relative z-10">
          <div className="bg-surface border-2 border-border p-4 rounded-3xl shadow-sm text-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <h2 className="text-xl font-black text-foreground flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">1</span>
              O Despertar do Aprendiz
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Domínio do Hiragana e Reflexos Básicos</p>
          </div>

          <div className="space-y-10">
            {HIRAGANA_GROUPS.map((group, i) => {
              const isOffsetLeft = i % 2 === 0;
              const isCompleted = i === 0; // Demonstração

              return (
                <div
                  key={group.id}
                  className={`relative z-10 group w-full flex justify-center ${
                    isOffsetLeft ? '-ml-16 sm:-ml-24' : 'ml-16 sm:ml-24'
                  }`}
                >
                  <Link
                    href={`/lesson?group=${group.id}`}
                    className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-200"
                  >
                    {/* Level Title Badge */}
                    <div className="bg-surface border-2 border-border px-4 py-2 rounded-2xl mb-3 shadow-sm group-hover:border-emerald-500 transition-colors flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-500" />
                      <div className="text-left">
                        <p className="font-bold text-foreground text-sm leading-none">{group.name}</p>
                      </div>
                    </div>

                    {/* Circular Level Node */}
                    <div
                      className={`w-20 h-20 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-surface border-4 border-emerald-500'} flex items-center justify-center shadow-xl group-hover:-translate-y-1 transition-transform relative`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      ) : (
                        <Star className={`w-8 h-8 ${isCompleted ? 'text-white' : 'text-emerald-500 fill-emerald-500/20'}`} />
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
            
            {/* MINI BOSS - ZONA 1 */}
            <div className="relative z-10 w-full flex justify-center mt-12">
              <Link href="/boss/memory-ghost" className="flex flex-col items-center transition-transform hover:scale-105 group">
                <div className="bg-purple-900/10 border-2 border-purple-500 px-4 py-2 rounded-2xl mb-3 shadow-sm flex items-center gap-2 group-hover:bg-purple-900/20 transition-colors">
                  <Skull className="w-4 h-4 text-purple-500 animate-pulse group-hover:text-purple-600" />
                  <div className="text-left">
                    <p className="font-bold text-purple-600 text-sm leading-none">O Fantasma da Memória</p>
                    <p className="text-[10px] text-purple-500/80 font-bold uppercase mt-1">Boss Battle (Speed Run)</p>
                  </div>
                </div>

                <div className="w-24 h-24 rounded-2xl rotate-45 bg-purple-600 border-b-[8px] border-black/30 flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:bg-purple-700 transition-colors">
                  <Skull className="w-10 h-10 text-white -rotate-45 group-hover:scale-110 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================================
            ZONA 2: A Dança das Lâminas Gêmeas
           ========================================= */}
        <div className="w-full mb-12 relative z-10 opacity-60 pointer-events-none">
          <div className="bg-surface border-2 border-border p-4 rounded-3xl shadow-sm text-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
            <h2 className="text-xl font-black text-foreground flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs">2</span>
              A Dança das Lâminas Gêmeas
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Domínio do Katakana (Bloqueado)</p>
          </div>
          
          <div className="flex justify-center -ml-16">
            <div className="w-16 h-16 rounded-full bg-surface border-4 border-border flex items-center justify-center">
              <MapPin className="w-6 h-6 text-border" />
            </div>
          </div>
        </div>

        {/* =========================================
            ZONA 3: O Segredo dos Símbolos Antigos
           ========================================= */}
        <div className="w-full mb-12 relative z-10">
          <div className="bg-surface border-2 border-border p-4 rounded-3xl shadow-sm text-center mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500"></div>
            <h2 className="text-xl font-black text-foreground flex items-center justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs">3</span>
              O Segredo dos Símbolos Antigos
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Motor de Kanjis: Kaishi 1.5k</p>
          </div>

          <div className="relative z-10 w-full flex justify-center ml-16 sm:ml-24">
            <Link
              href={`/kaishi`}
              className="flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-200"
            >
              <div className="bg-surface border-2 border-border px-4 py-2 rounded-2xl mb-3 shadow-sm group-hover:border-orange-500 transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-500" />
                <div className="text-left">
                  <p className="font-bold text-foreground text-sm leading-none">Desafio de Vocabulário</p>
                </div>
              </div>
              <div className="w-20 h-20 rounded-full bg-surface border-4 border-orange-500 flex items-center justify-center shadow-xl group-hover:-translate-y-1 transition-transform relative">
                <Star className="w-8 h-8 text-orange-500 fill-orange-500/20" />
              </div>
            </Link>
          </div>
        </div>

      </div>

      <HiraganaChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />
    </div>
  );
}
