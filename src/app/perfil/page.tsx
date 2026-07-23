'use client';

import { useGame } from '@/context/GameContext';
import { ChevronLeft, LogOut, Flame, Target, BookOpen, Crown, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PerfilPage() {
  const { ryo, activeAvatar } = useGame();
  const router = useRouter();

  const handleLogout = () => {
    // Apenas simulação estética
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans relative z-10 overflow-x-hidden">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-pixel text-primary uppercase mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            PERFIL NINJA
          </h1>
        </div>
      </div>

      <div className="w-full max-w-2xl px-4 sm:px-8 mt-6 flex flex-col gap-6">
        
        {/* IDENTIFICATION CARD */}
        <div className="bg-[#1a2332] border-4 border-[#2c3e50] p-6 shadow-[8px_8px_0_#000] relative">
          {/* Fita / Badge */}
          <div className="absolute top-0 right-4 bg-orange-600 text-white font-pixel text-xs px-2 py-3 shadow-[2px_2px_0_#000]">
            NÍVEL 1
          </div>
          
          <div className="flex items-center gap-6">
            {/* AVATAR BOX */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-black border-[3px] border-secondary shrink-0 overflow-hidden flex justify-center items-center group cursor-pointer">
              {activeAvatar.imageUrl ? (
                <img src={activeAvatar.imageUrl} alt="Avatar" className="w-full h-full object-contain filter group-hover:brightness-125 transition-all" style={{ imageRendering: 'pixelated' }} />
              ) : (
                <span className="text-6xl drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">{activeAvatar.emoji}</span>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-pixel text-primary uppercase mb-1 drop-shadow-[0_0_2px_rgba(255,140,0,0.5)]">
                GaijinPlayer
              </h2>
              <p className="text-sm text-gray-400 font-sans mb-3">gaijin@ninja.com</p>
              
              <div className="flex items-center gap-2">
                <span className="bg-surface-dark border border-border text-secondary font-pixel text-xs px-2 py-1 uppercase">
                  PLANO ATUAL: GENIN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ESTATÍSTICAS / PROGRESSO */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Streak */}
          <div className="bg-surface border-2 border-border p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_#000]">
            <Flame className="w-8 h-8 text-orange-500 mb-2 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
            <span className="text-3xl font-pixel text-white mb-1">1</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Dias Ofensivos</span>
          </div>

          {/* Precision */}
          <div className="bg-surface border-2 border-border p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_#000]">
            <Target className="w-8 h-8 text-emerald-500 mb-2 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            <span className="text-3xl font-pixel text-white mb-1">87%</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Precisão Média</span>
          </div>

          {/* Cards Studied */}
          <div className="bg-surface border-2 border-border p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_#000]">
            <BookOpen className="w-8 h-8 text-blue-500 mb-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
            <span className="text-3xl font-pixel text-white mb-1">46</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Kanas Dominados</span>
          </div>

          {/* Ryo */}
          <div className="bg-surface border-2 border-border p-4 flex flex-col items-center justify-center text-center shadow-[4px_4px_0_#000]">
            <Crown className="w-8 h-8 text-amber-500 mb-2 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]" />
            <span className="text-3xl font-pixel text-white mb-1">{ryo}</span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">RC Coins Totais</span>
          </div>

        </div>

        {/* UPGRADE VIP AREA */}
        <Link href="/planos" className="w-full bg-[#110a1f] border-2 border-secondary p-6 shadow-[0_0_15px_rgba(0,210,255,0.2)] flex items-center justify-between group hover:scale-[1.02] transition-transform">
          <div>
            <h3 className="text-xl font-pixel text-secondary uppercase drop-shadow-sm mb-1">Fazer Upgrade</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Acesse o modo Offline e Kanjis!</p>
          </div>
          <Crown className="w-8 h-8 text-secondary group-hover:scale-125 transition-transform" />
        </Link>

        {/* LOGOUT */}
        <button 
          onClick={handleLogout}
          className="mt-4 w-full bg-red-950/30 text-red-500 border-2 border-red-900/50 p-4 font-pixel uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-900/50 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Sair do Dojo
        </button>

      </div>
    </div>
  );
}
