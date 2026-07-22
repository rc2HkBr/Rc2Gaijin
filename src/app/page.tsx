'use client';

import { useState } from 'react';
import { Star, Grid, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { HIRAGANA_GROUPS } from '@/data/hiraganaData';
import HiraganaChartModal from '@/components/HiraganaChartModal';

export default function Home() {
  const [isChartOpen, setIsChartOpen] = useState(false);

  return (
    <div className="flex flex-col items-center py-8 w-full max-w-2xl mx-auto px-4">
      {/* Banner / Header */}
      <div className="w-full mb-6 text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Curso Completo de Hiragana
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Trilha de Alfabetização</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Aprenda os cards com som nativo e teste sua escrita, som e ideogramas passo a passo!
        </p>

        {/* Quick Access to Full Hiragana Chart */}
        <div className="pt-3">
          <button
            onClick={() => setIsChartOpen(true)}
            className="inline-flex items-center gap-2 bg-surface border-2 border-border hover:border-primary text-foreground font-bold px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-sm"
          >
            <Grid className="w-5 h-5 text-primary" /> Ver Tabela Completa do Hiragana (46+ Ideogramas)
          </button>
        </div>
      </div>

      {/* Dynamic Learning Path */}
      <div className="relative flex flex-col items-center space-y-10 py-6 w-full">
        {/* Central Vertical Connector Line */}
        <div className="absolute top-6 bottom-6 left-1/2 -ml-0.5 w-1.5 bg-border z-0 rounded-full"></div>

        {HIRAGANA_GROUPS.map((group, i) => {
          const isOffsetLeft = i % 2 === 0;
          const isCompleted = i === 0; // First module unlocked/completed demo state

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
                <div className="bg-surface border-2 border-border px-4 py-2 rounded-2xl mb-3 shadow-sm group-hover:border-primary transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <div className="text-left">
                    <p className="font-bold text-foreground text-sm leading-none">{group.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">
                      {group.characters.length} Cards • 3 Testes
                    </p>
                  </div>
                </div>

                {/* Circular Level Node */}
                <div
                  className={`w-20 h-20 rounded-full ${group.color} border-b-[6px] border-black/20 flex items-center justify-center text-white shadow-xl group-hover:-translate-y-1 transition-transform relative`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-10 h-10 text-white fill-white/20" />
                  ) : (
                    <Star className="w-10 h-10 fill-white/50 text-white" />
                  )}

                  {/* Level Number Badge */}
                  <span className="absolute -top-1 -right-1 bg-surface border-2 border-border text-foreground font-black text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Hiragana Modal */}
      <HiraganaChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />
    </div>
  );
}
