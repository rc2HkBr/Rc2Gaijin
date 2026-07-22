'use client';

import { Trophy, Medal, Crown, Shield, Flame, Coins, Search, Swords } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const LEADERBOARD = [
  { id: 1, name: "Naruto Uzumaki", rank: "Jonin", xp: 12450, ryo: 3500, streak: 84, avatar: "🦊" },
  { id: 2, name: "Gaijin Sensei", rank: "Anbu", xp: 11200, ryo: 2800, streak: 62, avatar: "🐉" },
  { id: 3, name: "Sakura H.", rank: "Chunin", xp: 10500, ryo: 2100, streak: 51, avatar: "🌸" },
  { id: 4, name: "Sasuke Uchiha", rank: "Jonin", xp: 9800, ryo: 1500, streak: 45, avatar: "⚡" },
  { id: 5, name: "Kakashi Hatake", rank: "Hokage", xp: 9100, ryo: 1200, streak: 120, avatar: "📖" },
  { id: 6, name: "Rock Lee", rank: "Genin", xp: 8500, ryo: 800, streak: 365, avatar: "🥋" },
  { id: 7, name: "Hinata H.", rank: "Chunin", xp: 8200, ryo: 950, streak: 40, avatar: "👁️" },
  { id: 8, name: "Shikamaru N.", rank: "Jonin", xp: 7900, ryo: 600, streak: 12, avatar: "☁️" },
  { id: 9, name: "Gaara", rank: "Kazekage", xp: 7500, ryo: 4000, streak: 30, avatar: "🏜️" },
  { id: 10, name: "Jiraiya", rank: "Sannin", xp: 7100, ryo: 50, streak: 8, avatar: "🐸" },
];

export default function RankingPage() {
  const top3 = LEADERBOARD.slice(0, 3);
  const remaining = LEADERBOARD.slice(3);

  return (
    <div className="flex flex-col items-center pb-24 pt-6 w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="w-full mb-10 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 font-bold text-xs uppercase tracking-wider">
          <Crown className="w-4 h-4" /> Temporada de Verão
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Ranking da Guilda</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
          Os Shinobis mais dedicados do servidor. Suba de nível para garantir seu lugar no Hall da Fama!
        </p>
      </div>

      {/* Podium (Top 3) */}
      <div className="w-full flex items-end justify-center gap-2 sm:gap-6 mb-16 h-64">
        {/* 2nd Place */}
        <div className="flex flex-col items-center relative z-10 w-28 sm:w-32">
          <div className="w-16 h-16 rounded-full bg-gray-200 border-4 border-gray-300 flex items-center justify-center text-3xl shadow-lg mb-4 relative">
            {top3[1].avatar}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-black text-white text-xs border-2 border-surface">2</div>
          </div>
          <div className="w-full h-32 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-xl border-t-4 border-gray-300 flex flex-col items-center pt-4 shadow-sm">
            <span className="font-bold text-foreground text-sm truncate w-full text-center px-1">{top3[1].name}</span>
            <span className="text-gray-500 text-xs font-bold">{top3[1].xp} XP</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center relative z-20 w-32 sm:w-40 -mx-4 sm:mx-0">
          <div className="absolute -top-12 animate-bounce">
            <Crown className="w-10 h-10 text-amber-500 fill-amber-500 drop-shadow-lg" />
          </div>
          <div className="w-20 h-20 rounded-full bg-amber-200 border-4 border-amber-400 flex items-center justify-center text-4xl shadow-xl mb-4 relative z-10">
            {top3[0].avatar}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-black text-white text-xs border-2 border-surface">1</div>
          </div>
          <div className="w-full h-40 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-xl border-t-4 border-amber-400 flex flex-col items-center pt-4 shadow-xl">
            <span className="font-black text-foreground text-sm truncate w-full text-center px-1">{top3[0].name}</span>
            <span className="text-amber-600 text-xs font-bold">{top3[0].xp} XP</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center relative z-10 w-28 sm:w-32">
          <div className="w-16 h-16 rounded-full bg-orange-200 border-4 border-orange-300 flex items-center justify-center text-3xl shadow-lg mb-4 relative">
            {top3[2].avatar}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center font-black text-white text-xs border-2 border-surface">3</div>
          </div>
          <div className="w-full h-24 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-xl border-t-4 border-orange-300 flex flex-col items-center pt-4 shadow-sm">
            <span className="font-bold text-foreground text-sm truncate w-full text-center px-1">{top3[2].name}</span>
            <span className="text-orange-600 text-xs font-bold">{top3[2].xp} XP</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="w-full bg-surface border-2 border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 font-bold text-sm uppercase tracking-wider">
            <Search className="w-4 h-4" /> Top 10 Global
          </div>
          <div className="text-xs font-bold text-gray-400">Atualizado agora</div>
        </div>
        
        <div className="divide-y divide-border">
          {remaining.map((user, index) => (
            <div key={user.id} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
              <div className="w-8 font-black text-gray-400 text-lg text-center mr-4">
                #{index + 4}
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-border flex items-center justify-center text-xl mr-4">
                {user.avatar}
              </div>
              
              <div className="flex-1 flex flex-col">
                <span className="font-bold text-foreground text-sm sm:text-base">{user.name}</span>
                <span className="text-xs text-gray-400 font-medium">{user.rank}</span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold text-amber-500 flex items-center gap-1">
                    <Coins className="w-3 h-3 fill-amber-500" /> Ryō
                  </span>
                  <span className="font-black text-gray-700">{user.ryo.toLocaleString()}</span>
                </div>
                
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] uppercase font-bold text-orange-500 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-orange-500" /> Streak
                  </span>
                  <span className="font-black text-gray-700">{user.streak}d</span>
                </div>
                
                <div className="flex flex-col items-end w-20">
                  <span className="text-[10px] uppercase font-bold text-primary flex items-center gap-1">
                    <Swords className="w-3 h-3" /> XP
                  </span>
                  <span className="font-black text-primary">{user.xp.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
