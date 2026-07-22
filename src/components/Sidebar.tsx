'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, BookOpen, Grid, Trophy, User, Settings, Heart, Flame, Coins, Swords, Mountain, Music, ShoppingBag } from 'lucide-react';
import HiraganaChartModal from '@/components/HiraganaChartModal';
import { useGame } from '@/context/GameContext';

export default function Sidebar() {
  const [isChartOpen, setIsChartOpen] = useState(false);

  const { ryo, activeAvatar } = useGame();

  const navItems = [
    { name: "Sua Jornada", href: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Treinamento", href: "/lesson?group=vowels", icon: <Swords className="w-6 h-6" /> },
    { name: "Trilha do Mestre", href: "/trilha", icon: <Mountain className="w-6 h-6" /> },
    { name: "J-Pop Karaoke", href: "/jpop", icon: <Music className="w-6 h-6" /> },
    { name: "Loja do Ferreiro", href: "/shop", icon: <ShoppingBag className="w-6 h-6" /> },
  ];

  return (
    <>
      <div className="hidden sm:flex flex-col w-64 border-r border-border bg-surface p-4 h-full shadow-sm z-10">
        <div className="text-2xl font-black text-primary mb-6 px-4 mt-4 tracking-tight flex items-center gap-2">
          Nihongo<span className="text-secondary">App</span>
        </div>

        {/* RPG HUD PANEL */}
        <div className="bg-surface border-2 border-border rounded-2xl p-4 mb-6 mx-2 shadow-[0_4px_0_#E5E5E5]">
          <div className="text-xs font-bold text-gray-text uppercase mb-3 flex items-center gap-2">
            {activeAvatar.imageUrl ? (
              <img src={activeAvatar.imageUrl} alt="" className="w-8 h-8 rounded-full border-2 border-border object-cover" />
            ) : (
              <span className="text-xl">{activeAvatar.emoji}</span>
            )}
            <span className="truncate flex-1">{activeAvatar.name}</span>
            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded text-[10px]">Nv. 1</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* HP */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Heart className="w-5 h-5 fill-primary" /> HP
              </div>
              <span className="font-black text-foreground">3/3</span>
            </div>
            
            {/* Combo/Streak */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Flame className="w-5 h-5 fill-primary" /> Ofensiva
              </div>
              <span className="font-black text-foreground">1 Dia</span>
            </div>

            {/* Ryō / Coins */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gold font-bold text-sm">
                <Coins className="w-5 h-5 fill-gold" /> Ryō
              </div>
              <span className="font-black text-foreground">{ryo}</span>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-bold text-gray-text mb-1 uppercase">
              <span>XP Atual</span>
              <span>150 / 500</span>
            </div>
            <div className="w-full bg-border h-2 rounded-full overflow-hidden">
              <div className="bg-secondary h-full" style={{ width: '30%' }}></div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group"
            >
              <span className="text-gray-400 group-hover:text-primary transition-colors">{item.icon}</span>
              {item.name}
            </Link>
          ))}

          <button
            onClick={() => setIsChartOpen(true)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group text-left"
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors">
              <Grid className="w-6 h-6" />
            </span>
            Grimório (Hiragana)
          </button>

          <Link
            href="/ranking"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors">
              <Trophy className="w-6 h-6" />
            </span>
            Ranking Guilda
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors">
              <User className="w-6 h-6" />
            </span>
            Perfil Ninja
          </Link>
        </nav>
        <div className="mt-auto">
          <Link
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors">
              <Settings className="w-6 h-6" />
            </span>
            Equipamentos
          </Link>
        </div>
      </div>

      <HiraganaChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />
    </>
  );
}
