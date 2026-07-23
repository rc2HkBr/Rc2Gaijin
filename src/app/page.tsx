'use client';

import { useState, useEffect } from 'react';
import { Skull, Swords, Music, BookOpen, ShoppingBag, Mountain, Crown, Video, Zap, Shield, Terminal, Wifi, ChevronRight, AlertTriangle, Gift, Flame, Radio } from 'lucide-react';
import Link from 'next/link';
import Heatmap from '@/components/Heatmap';
import { useGame } from '@/context/GameContext';

/* ── CRT scanline overlay ── */
const CRTOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-2xl">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.15) 2px, rgba(0,255,255,0.15) 4px)',
    }} />
  </div>
);

/* ── Banners Carousel Config ── */
const banners = [
  {
    id: 'karaoke',
    tag: 'HOLOGRAPHIC MODULE HIGHLIGHT',
    tagColor: 'text-cyan-400',
    title: 'Cyber Karaoke — J-Pop',
    subtitle: 'Aprenda japonês cantando hits de anime e J-Pop!',
    href: '/jpop',
    btnText: 'ABRIR KARAOKE >',
    btnClass: 'bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]',
    borderColor: 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]',
    icon: <Music className="w-8 h-8 text-cyan-400" />,
  },
  {
    id: 'mission',
    tag: 'TACTICAL MISSION LOG',
    tagColor: 'text-emerald-400',
    title: 'Família K — Hiragana',
    subtitle: 'Continue seu treinamento no Sistema de Escrita base.',
    href: '/lesson?group=k',
    btnText: 'INICIAR TREINAMENTO >',
    btnClass: 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_15px_rgba(16,185,129,0.6)]',
    borderColor: 'border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    icon: <Zap className="w-8 h-8 text-emerald-400" />,
  },
  {
    id: 'aulas',
    tag: 'LIVE TRANSMISSION PROTOCOL',
    tagColor: 'text-purple-400',
    title: 'Senseis Ninja Online',
    subtitle: 'Agende aulas particulares de japonês com mestres reais!',
    href: '/aulas',
    btnText: 'VER SENSEIS >',
    btnClass: 'bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.6)]',
    borderColor: 'border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.2)]',
    icon: <Video className="w-8 h-8 text-purple-400" />,
  },
];

export default function Home() {
  const { ryo } = useGame();
  const [bannerIdx, setBannerIdx] = useState(0);
  const [sysTime, setSysTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const banner = banners[bannerIdx];

  return (
    <div className="flex flex-col items-center pb-24 pt-2 w-full max-w-4xl mx-auto px-3 sm:px-6 gap-5 font-mono select-none">

      {/* ══════════════════════════════════════════
          1. HEADER HUD STATUS BAR
         ══════════════════════════════════════════ */}
      <div className="w-full bg-[#08030f]/90 border border-purple-900/50 rounded-2xl p-3 sm:p-4 relative overflow-hidden backdrop-blur-md shadow-[0_0_25px_rgba(128,0,255,0.1)]">
        <CRTOverlay />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
          {/* Agent info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-pixel text-purple-300 text-xs sm:text-sm uppercase tracking-wider">LV. 1 SHINOBI</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">GAIJIN_AGENT #RC2</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs">
            <div className="text-center">
              <span className="text-amber-400 font-bold text-sm sm:text-base drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]">¥ {ryo}</span>
              <span className="block text-[9px] text-gray-500 uppercase">Ryō</span>
            </div>
            <div className="text-center">
              <span className="text-emerald-400 font-bold text-sm sm:text-base drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]">3 HP</span>
              <span className="block text-[9px] text-gray-500 uppercase">Energia</span>
            </div>
            <div className="text-center">
              <span className="text-cyan-400 font-bold text-sm sm:text-base drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]">23</span>
              <span className="block text-[9px] text-gray-500 uppercase">Streak</span>
            </div>
          </div>

          {/* Connection status */}
          <div className="hidden sm:flex flex-col items-end text-[10px] text-gray-500">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> SECURE_NET
            </span>
            <span className="text-gray-600">{sysTime}</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. FEATURED CAROUSEL (HOLOGRAPHIC HIGHLIGHT)
         ══════════════════════════════════════════ */}
      <div className={`w-full bg-[#060a12]/90 border ${banner.borderColor} rounded-2xl relative overflow-hidden transition-all duration-500`}>
        <CRTOverlay />

        {/* Header Indicator */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800/80 relative z-10 bg-black/40">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className={`text-[10px] font-bold ${banner.tagColor} uppercase tracking-widest`}>
              &gt; {banner.tag}
            </span>
          </div>
          <div className="flex gap-1.5">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setBannerIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === bannerIdx ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <Link href={banner.href} className="block p-5 sm:p-6 relative z-10 group">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black/60 border border-cyan-500/40 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                {banner.icon}
              </div>
              <div>
                <h2 className="font-pixel text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors">
                  {banner.title}
                </h2>
                <p className="text-gray-400 text-xs sm:text-sm mt-0.5">{banner.subtitle}</p>
              </div>
            </div>

            <button className={`${banner.btnClass} text-xs font-pixel px-5 py-2.5 rounded-xl transition-all shrink-0 group-hover:scale-105 uppercase tracking-wider`}>
              {banner.btnText}
            </button>
          </div>
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          3. DATA LOGS — HEATMAP / STREAK MATRIX
         ══════════════════════════════════════════ */}
      <div className="w-full relative">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Terminal className="w-3.5 h-3.5 text-orange-500" />
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">DATA LOGS // FOGUEIRA DA OFENSIVA</span>
        </div>
        <Heatmap />
      </div>

      {/* ══════════════════════════════════════════
          4. 2x3 CYBERPUNK ACTION MODULES GRID
         ══════════════════════════════════════════ */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3.5">
        
        {/* Module 1: Cyan */}
        <Link
          href="/lesson?group=vowels"
          className="bg-[#05151c]/90 border border-cyan-500/50 hover:border-cyan-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.03] active:scale-95 group shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <BookOpen className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-cyan-500 font-bold border border-cyan-800 px-1.5 py-0.5 rounded">MOD.01</span>
          </div>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-cyan-300 uppercase leading-tight">SISTEMA DE TREINAMENTO</h3>
            <p className="text-[10px] text-gray-500 mt-1">Hiragana & Katakana</p>
          </div>
        </Link>

        {/* Module 2: Sky Blue */}
        <Link
          href="/trilha"
          className="bg-[#061224]/90 border border-blue-500/50 hover:border-blue-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.03] active:scale-95 group shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <Swords className="w-7 h-7 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-blue-500 font-bold border border-blue-800 px-1.5 py-0.5 rounded">MOD.02</span>
          </div>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-blue-300 uppercase leading-tight">NINGU ARSENAL</h3>
            <p className="text-[10px] text-gray-500 mt-1">Trilha Shinobi</p>
          </div>
        </Link>

        {/* Module 3: Pink */}
        <Link
          href="/jpop"
          className="bg-[#1c0617]/90 border border-pink-500/50 hover:border-pink-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.03] active:scale-95 group shadow-[0_0_15px_rgba(236,72,153,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-pink-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <Music className="w-7 h-7 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-pink-500 font-bold border border-pink-800 px-1.5 py-0.5 rounded">MOD.03</span>
          </div>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-pink-300 uppercase leading-tight">CYBER KARAOKE</h3>
            <p className="text-[10px] text-gray-500 mt-1">Musicas & Animes</p>
          </div>
        </Link>

        {/* Module 4: Orange */}
        <Link
          href="/kaishi"
          className="bg-[#1f1006]/90 border border-amber-500/50 hover:border-amber-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.03] active:scale-95 group shadow-[0_0_15px_rgba(245,158,11,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <Mountain className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-amber-500 font-bold border border-amber-800 px-1.5 py-0.5 rounded">MOD.04</span>
          </div>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-amber-300 uppercase leading-tight">BANCO KANJI</h3>
            <p className="text-[10px] text-gray-500 mt-1">Dicionario Visual</p>
          </div>
        </Link>

        {/* Module 5: Purple */}
        <Link
          href="/origens"
          className="bg-[#140621]/90 border border-purple-500/50 hover:border-purple-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.03] active:scale-95 group shadow-[0_0_15px_rgba(168,85,247,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <BookOpen className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-purple-500 font-bold border border-purple-800 px-1.5 py-0.5 rounded">MOD.05</span>
          </div>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-purple-300 uppercase leading-tight">NIHONGO HISTÓRIA</h3>
            <p className="text-[10px] text-gray-500 mt-1">Lore & Origens</p>
          </div>
        </Link>

        {/* Module 6: Gold/Yellow */}
        <Link
          href="/shop"
          className="bg-[#1f1b06]/90 border border-yellow-500/50 hover:border-yellow-400 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:scale-[1.03] active:scale-95 group shadow-[0_0_15px_rgba(234,179,8,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-4">
            <Gift className="w-7 h-7 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] text-yellow-500 font-bold border border-yellow-800 px-1.5 py-0.5 rounded">MOD.06</span>
          </div>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-yellow-300 uppercase leading-tight">SHURIKEN SHOP</h3>
            <p className="text-[10px] text-gray-500 mt-1">Avatares & Skins</p>
          </div>
        </Link>

      </div>

      {/* ══════════════════════════════════════════
          5. VIP BANNER (CYAN GRADIENT)
         ══════════════════════════════════════════ */}
      <Link 
        href="/planos" 
        className="w-full bg-gradient-to-r from-[#031c26]/90 to-[#060a12]/90 border border-cyan-500/60 hover:border-cyan-400 rounded-2xl p-4 sm:p-5 relative overflow-hidden group transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:scale-[1.01]"
      >
        <CRTOverlay />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-pixel text-cyan-300 text-sm uppercase tracking-wider">TORNE-SE VIP</h3>
              <p className="text-gray-400 text-xs mt-0.5">Desbloqueie o Nível Chunin e conteúdos exclusivos</p>
            </div>
          </div>
          
          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-pixel text-xs px-4 py-2 rounded-xl transition-transform group-hover:scale-105 shrink-0 uppercase tracking-widest font-bold">
            VER PLANOS
          </button>
        </div>
      </Link>

      {/* ══════════════════════════════════════════
          6. BOSS WARNING BANNER (RED CRIMSON)
         ══════════════════════════════════════════ */}
      <Link 
        href="/boss/memory-ghost" 
        className="w-full bg-gradient-to-r from-[#240606]/90 to-[#120303]/90 border border-red-600/70 hover:border-red-500 rounded-2xl p-4 sm:p-5 relative overflow-hidden group transition-all shadow-[0_0_25px_rgba(220,38,38,0.25)] hover:scale-[1.01]"
      >
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-950 border border-red-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Skull className="w-7 h-7 text-red-500 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5" /> 
                <span className="animate-pulse">⚠ BOSS DETECTED</span>
              </div>
              <h3 className="font-pixel text-lg sm:text-xl text-red-200">O Fantasma da Memória</h3>
              <p className="text-gray-400 text-xs">Batalha de velocidade — teste seus reflexos de Hiragana</p>
            </div>
          </div>

          <button className="bg-red-600 hover:bg-red-500 text-white font-pixel text-xs px-4 py-2.5 rounded-xl transition-all group-hover:scale-105 shrink-0 uppercase tracking-widest flex items-center gap-1 border border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
            ⚔ BATTLE-READY ///
          </button>
        </div>
      </Link>

    </div>
  );
}
