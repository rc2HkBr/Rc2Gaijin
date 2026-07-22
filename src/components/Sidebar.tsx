'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, BookOpen, Grid, Trophy, User, Settings } from 'lucide-react';
import HiraganaChartModal from '@/components/HiraganaChartModal';

export default function Sidebar() {
  const [isChartOpen, setIsChartOpen] = useState(false);

  const navItems = [
    { name: "Aprender", href: "/", icon: <Home className="w-6 h-6" /> },
    { name: "Lições", href: "/lesson?group=vowels", icon: <BookOpen className="w-6 h-6" /> },
  ];

  return (
    <>
      <div className="hidden sm:flex flex-col w-64 border-r border-border bg-surface p-4 h-full">
        <div className="text-2xl font-black text-primary mb-8 px-4 mt-4 tracking-tight">
          Nihongo<span className="text-secondary">App</span>
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
            Tabela Hiragana
          </button>

          <Link
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors">
              <Trophy className="w-6 h-6" />
            </span>
            Ranking
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-border/50 text-foreground font-bold text-base transition-colors group"
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors">
              <User className="w-6 h-6" />
            </span>
            Perfil
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
            Configurações
          </Link>
        </div>
      </div>

      <HiraganaChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />
    </>
  );
}
