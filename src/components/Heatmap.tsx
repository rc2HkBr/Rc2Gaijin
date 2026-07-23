'use client';

import { Flame, Coins, Award, Zap } from 'lucide-react';

export default function Heatmap() {
  // Simula 84 dias (12 semanas x 7 dias)
  const days = Array.from({ length: 84 }).map((_, i) => {
    const isRecent = i > 60;
    let activity = Math.floor(Math.random() * 3);
    if (isRecent) activity = Math.floor(Math.random() * 3) + 2;
    if (i === 83) activity = 4; // Today max

    return { id: i, activity };
  });

  const getColor = (activity: number) => {
    switch (activity) {
      case 0: return 'bg-[#181018] border border-orange-900/20';
      case 1: return 'bg-orange-950 border border-orange-700/40 shadow-[0_0_5px_rgba(234,88,12,0.2)]';
      case 2: return 'bg-orange-800 border border-orange-600/60 shadow-[0_0_8px_rgba(234,88,12,0.4)]';
      case 3: return 'bg-orange-600 border border-orange-400 shadow-[0_0_10px_rgba(234,88,12,0.6)]';
      case 4: return 'bg-orange-500 border border-amber-300 shadow-[0_0_12px_rgba(249,115,22,0.8)]';
      default: return 'bg-[#181018]';
    }
  };

  return (
    <div className="w-full bg-[#0d0714]/80 border border-orange-900/40 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(234,88,12,0.08)] flex flex-col font-mono relative overflow-hidden">
      
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-3 border-b border-orange-900/30 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
          <h3 className="font-bold text-gray-200 text-sm tracking-wide">Fogueira da Ofensiva</h3>
        </div>
        <span className="text-xs font-bold text-orange-400 drop-shadow-[0_0_6px_rgba(234,88,12,0.6)]">
          23 Dias Seguidos!
        </span>
      </div>

      {/* Heatmap Grid */}
      <div className="flex gap-1.5 overflow-x-auto py-2 w-full justify-center scrollbar-none">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5">
          {days.map((day) => (
            <div
              key={day.id}
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm ${getColor(day.activity)} transition-transform hover:scale-125 cursor-pointer`}
              title={`${day.activity * 12} estudações`}
            />
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="w-full flex justify-between items-center mt-3 pt-3 border-t border-orange-900/20 text-[10px] text-gray-500">
        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-orange-400" /> 35.037 XP</span>
          <span className="flex items-center gap-1"><Award className="w-3 h-3 text-amber-400" /> 308 本</span>
          <span className="flex items-center gap-1"><Coins className="w-3 h-3 text-purple-400" /> 19.21 TOKEN</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span>Menos</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-2.5 h-2.5 rounded-sm ${getColor(level)}`} />
            ))}
          </div>
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
