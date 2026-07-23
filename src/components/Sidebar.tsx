'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, BookOpen, Grid, Trophy, User, Settings, Heart, Flame, Coins, Swords, Mountain, Music, ShoppingBag, Video } from 'lucide-react';
import HiraganaChartModal from '@/components/HiraganaChartModal';
import { useGame } from '@/context/GameContext';

export default function Sidebar() {
  const [isChartOpen, setIsChartOpen] = useState(false);

  const { ryo, activeAvatar } = useGame();

  const navItems = [
    { name: "HOME", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "SHURIKEN SHOP", href: "/shop", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "NINGU ARSENAL", href: "/trilha", icon: <Swords className="w-5 h-5" /> },
    { name: "CYBER KARAOKE", href: "/jpop", icon: <Music className="w-5 h-5" /> },
    { name: "NIHONGO HISTORIA", href: "/origens", icon: <BookOpen className="w-5 h-5" /> },
    { name: "AULA AO VIVO", href: "/aulas", icon: <Video className="w-5 h-5" /> },
  ];

  return (
    <>
      <div className="hidden sm:flex flex-col w-64 border-r border-border bg-surface p-4 h-full shadow-sm z-10 overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ff8c00 transparent' }}>
        <div className="text-3xl font-pixel text-primary mb-6 px-4 mt-4 tracking-tight flex flex-col gap-0 drop-shadow-[0_0_8px_rgba(255,140,0,0.8)]">
          <span>GAIJIN RC2</span>
          <span className="text-secondary text-lg">外人RC2</span>
        </div>

        {/* RPG HUD PANEL */}
        <div className="bg-[#15191e] border-2 border-border/50 rounded-xl p-4 mb-6 mx-2 shadow-inner">
          <div className="text-xs font-pixel text-secondary uppercase mb-4 flex flex-col items-center gap-3 tracking-wider text-center">
            {activeAvatar.imageUrl ? (
              <img src={activeAvatar.imageUrl} alt="" className="w-24 h-24 rounded border-2 border-primary object-contain bg-black shadow-[0_0_10px_rgba(255,140,0,0.5)] p-1" style={{ imageRendering: 'pixelated' }} />
            ) : (
              <span className="text-6xl drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]">{activeAvatar.emoji}</span>
            )}
            <div className="flex flex-col items-center gap-1">
              <span className="text-success border border-success/30 bg-success/10 px-2 py-0.5 rounded text-[10px]">LV. 1</span>
              <span className="text-primary text-sm drop-shadow-[0_0_5px_rgba(255,140,0,0.5)] break-words max-w-[180px]">
                {activeAvatar.name}
              </span>
            </div>
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

        {/* NAV ITEMS */}
        <nav className="flex-1 space-y-1.5 px-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-pixel text-xl hover:bg-secondary/10 hover:text-primary transition-colors border border-transparent hover:border-secondary/30"
            >
              {item.icon}
              <span className="uppercase tracking-widest">{item.name}</span>
            </Link>
          ))}
          
          <button 
            onClick={() => setIsChartOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-secondary font-pixel text-xl hover:bg-secondary/10 hover:text-primary transition-colors mt-4 border border-secondary/20"
          >
            <Grid className="w-5 h-5" />
            <span className="uppercase tracking-widest">SYSTEM DATA</span>
          </button>
        </nav>
        
        <div className="mt-auto px-4 py-4 text-[10px] text-secondary/50 font-pixel tracking-widest uppercase text-center border-t border-border/30">
          SYS.VER 2.0.4<br/>
          CONNECTION ESTABLISHED
        </div>
      </div>

      <HiraganaChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />
    </>
  );
}
