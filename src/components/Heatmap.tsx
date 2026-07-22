'use client';

import { Flame } from 'lucide-react';

export default function Heatmap() {
  // Simula 90 dias (12 semanas) de atividade
  const days = Array.from({ length: 84 }).map((_, i) => {
    // Generate random activity level 0-4
    // More chance of higher activity in recent days to simulate streak
    const isRecent = i > 60;
    let activity = Math.floor(Math.random() * 3);
    if (isRecent) activity = Math.floor(Math.random() * 3) + 2;
    if (i === 83) activity = 4; // Today is max activity

    return { id: i, activity };
  });

  const getColor = (activity: number) => {
    switch (activity) {
      case 0: return 'bg-surface border border-border';
      case 1: return 'bg-orange-500/30';
      case 2: return 'bg-orange-500/60';
      case 3: return 'bg-orange-500/80';
      case 4: return 'bg-orange-500';
      default: return 'bg-surface border border-border';
    }
  };

  return (
    <div className="w-full bg-surface border-2 border-border p-4 rounded-3xl shadow-sm mb-12 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500" />
          <h3 className="font-bold text-foreground">Fogueira da Ofensiva</h3>
        </div>
        <span className="text-sm font-black text-orange-500">23 Dias Seguidos!</span>
      </div>

      <div className="flex gap-1 overflow-hidden w-full justify-center">
        {/* Render grid of 12 columns x 7 rows */}
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {days.map((day) => (
            <div
              key={day.id}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${getColor(day.activity)} transition-colors hover:ring-2 hover:ring-foreground cursor-pointer`}
              title={`${day.activity * 10} cartas revisadas`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="w-full flex justify-end items-center gap-2 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        <span>Menos</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`}></div>
          ))}
        </div>
        <span>Mais</span>
      </div>
    </div>
  );
}
