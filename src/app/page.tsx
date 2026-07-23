'use client';

import { useState, useEffect } from 'react';
import { Skull, Swords, Music, BookOpen, ShoppingBag, Mountain, Crown, Video, Zap, Shield, Terminal, Wifi, ChevronRight, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Heatmap from '@/components/Heatmap';
import { useGame } from '@/context/GameContext';

/* ── tiny helpers ── */
const Blink = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`animate-pulse ${className}`}>{children}</span>
);

const DigitalNumber = ({ value, label }: { value: number | string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="font-mono text-2xl sm:text-3xl font-bold text-primary drop-shadow-[0_0_8px_rgba(255,140,0,0.6)]">
      {value}
    </span>
    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{label}</span>
  </div>
);

/* ── CRT scanline overlay ── */
const CRTOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-2xl">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
    }} />
    <div className="absolute inset-0 rounded-2xl" style={{
      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.4), inset 0 0 120px rgba(0,0,0,0.2)',
    }} />
  </div>
);

/* ── Banner Carousel ── */
const banners = [
  {
    id: 'mission',
    tag: '[ MISSÃO ATUAL ]',
    tagColor: 'text-emerald-400',
    title: 'Família K — Hiragana',
    subtitle: 'Continue seu treinamento no Sistema de Escrita base.',
    href: '/lesson?group=k',
    btnText: 'INICIAR TREINAMENTO',
    btnClass: 'bg-emerald-500 hover:bg-emerald-400',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 'boss',
    tag: '⚠ ALERTA DE CHEFE',
    tagColor: 'text-red-400',
    title: 'O Fantasma da Memória',
    subtitle: 'BOSS DETECTED! Prepare-se para a batalha de velocidade.',
    href: '/boss/memory-ghost',
    btnText: 'ENFRENTAR BOSS',
    btnClass: 'bg-red-600 hover:bg-red-500',
    icon: <Skull className="w-6 h-6" />,
  },
  {
    id: 'karaoke',
    tag: '[ NOVO MÓDULO ]',
    tagColor: 'text-pink-400',
    title: 'Cyber Karaoke — J-Pop',
    subtitle: 'Aprenda japonês cantando hits de anime e J-Pop!',
    href: '/jpop',
    btnText: 'ABRIR KARAOKE',
    btnClass: 'bg-pink-600 hover:bg-pink-500',
    icon: <Music className="w-6 h-6" />,
  },
  {
    id: 'aulas',
    tag: '[ AULAS AO VIVO ]',
    tagColor: 'text-cyan-400',
    title: 'Senseis Ninja Online',
    subtitle: 'Agende aulas particulares de japonês com mestres reais!',
    href: '/aulas',
    btnText: 'VER SENSEIS',
    btnClass: 'bg-cyan-600 hover:bg-cyan-500',
    icon: <Video className="w-6 h-6" />,
  },
];

export default function Home() {
  const { ryo } = useGame();
  const [bannerIdx, setBannerIdx] = useState(0);
  const [sysTime, setSysTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx((prev) => (prev + 1) % banners.length);
    }, 5000);
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
    <div className="flex flex-col items-center pb-24 pt-4 w-full max-w-3xl mx-auto px-4 gap-6">

      {/* ══════════════════════════════════════════
          HEADER — HUD STATUS BAR
         ══════════════════════════════════════════ */}
      <div className="w-full bg-black/80 border border-primary/30 rounded-2xl p-4 relative overflow-hidden">
        <CRTOverlay />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          {/* Rank */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-pixel text-primary text-sm uppercase leading-tight">LV. 1</p>
              <p className="font-pixel text-gray-400 text-[10px] uppercase tracking-wider">Shinobi das Sombras</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <DigitalNumber value={ryo} label="Ryō" />
            <DigitalNumber value={3} label="HP" />
            <DigitalNumber value={1} label="Streak" />
          </div>

          {/* System Status */}
          <div className="hidden sm:flex flex-col items-end">
            <span className="font-mono text-[10px] text-emerald-500/80">
              <Blink>●</Blink> SYS.VER 2.0.4
            </span>
            <span className="font-mono text-[10px] text-emerald-500/60 flex items-center gap-1">
              <Wifi className="w-3 h-3" /> SECURE CONNECTION
            </span>
            <span className="font-mono text-[10px] text-gray-600">{sysTime}</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MONITOR PRINCIPAL — CRT CAROUSEL
         ══════════════════════════════════════════ */}
      <div className="w-full bg-black border-2 border-gray-700 rounded-2xl relative overflow-hidden shadow-[0_0_30px_rgba(255,140,0,0.1)]">
        <CRTOverlay />

        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 relative z-10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-600" />
            <span className="font-mono text-[10px] text-gray-500 uppercase">Monitor Principal</span>
          </div>
          <div className="flex gap-1.5">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setBannerIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === bannerIdx ? 'bg-primary scale-125 shadow-[0_0_6px_rgba(255,140,0,0.6)]' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Banner Content */}
        <Link href={banner.href} className="block p-6 sm:p-8 relative z-10 group">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors shrink-0">
              {banner.icon}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className={`font-mono text-xs ${banner.tagColor} uppercase tracking-wider`}>
                {banner.tag}
              </span>
              <h2 className="font-pixel text-2xl sm:text-3xl text-white mt-1 group-hover:text-primary transition-colors">
                {banner.title}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{banner.subtitle}</p>
            </div>
            <div className={`${banner.btnClass} text-white font-pixel text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 shrink-0 group-hover:scale-105`}>
              {banner.btnText} <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          DATA LOGS — HEATMAP / CONTRIBUTION GRID
         ══════════════════════════════════════════ */}
      <div className="w-full bg-black/60 border border-gray-800 rounded-2xl p-4 relative overflow-hidden">
        <CRTOverlay />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4 text-emerald-500/60" />
            <span className="font-mono text-[10px] text-emerald-500/60 uppercase tracking-wider">Data Logs — Fogueira da Ofensiva</span>
          </div>
          <Heatmap />
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PAINEL DE CONTROLE — NAVIGATION BUTTONS
         ══════════════════════════════════════════ */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'SISTEMA DE\nTREINAMENTO', href: '/lesson?group=vowels', icon: <BookOpen className="w-6 h-6" />, color: 'border-emerald-500/50 hover:border-emerald-500 hover:bg-emerald-500/10', textColor: 'text-emerald-400' },
          { label: 'NINGU\nARSENAL', href: '/trilha', icon: <Swords className="w-6 h-6" />, color: 'border-sky-500/50 hover:border-sky-500 hover:bg-sky-500/10', textColor: 'text-sky-400' },
          { label: 'CYBER\nKARAOKE', href: '/jpop', icon: <Music className="w-6 h-6" />, color: 'border-pink-500/50 hover:border-pink-500 hover:bg-pink-500/10', textColor: 'text-pink-400' },
          { label: 'BANCO DE\nDADOS KANJI', href: '/kaishi', icon: <Mountain className="w-6 h-6" />, color: 'border-orange-500/50 hover:border-orange-500 hover:bg-orange-500/10', textColor: 'text-orange-400' },
          { label: 'NIHONGO\nHISTORIA', href: '/origens', icon: <BookOpen className="w-6 h-6" />, color: 'border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10', textColor: 'text-purple-400' },
          { label: 'SHURIKEN\nSHOP', href: '/shop', icon: <ShoppingBag className="w-6 h-6" />, color: 'border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/10', textColor: 'text-amber-400' },
        ].map((btn) => (
          <Link
            key={btn.href}
            href={btn.href}
            className={`bg-black/80 border-2 ${btn.color} rounded-xl p-4 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.03] active:scale-95 group`}
          >
            <div className={`${btn.textColor} group-hover:scale-110 transition-transform`}>{btn.icon}</div>
            <span className="font-pixel text-[11px] sm:text-xs text-gray-300 uppercase leading-tight whitespace-pre-line">
              {btn.label}
            </span>
          </Link>
        ))}
      </div>

      {/* ══════════════════════════════════════════
          VIP BANNER
         ══════════════════════════════════════════ */}
      <Link href="/planos" className="w-full bg-black/80 border-2 border-secondary/50 rounded-2xl p-5 relative overflow-hidden group hover:border-secondary transition-colors hover:scale-[1.01] active:scale-[0.99]">
        <CRTOverlay />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 border border-secondary/50 flex items-center justify-center">
              <Crown className="w-6 h-6 text-secondary animate-pulse" />
            </div>
            <div>
              <h3 className="font-pixel text-secondary text-sm uppercase">Torne-se VIP</h3>
              <p className="text-gray-500 text-xs">Desbloqueie o Nível Chunin e conteúdos exclusivos</p>
            </div>
          </div>
          <div className="bg-secondary text-black font-pixel text-xs px-4 py-2 rounded-lg group-hover:scale-105 transition-transform">
            VER PLANOS
          </div>
        </div>
      </Link>

      {/* ══════════════════════════════════════════
          BOSS ALERT — QUICK ACCESS
         ══════════════════════════════════════════ */}
      <Link href="/boss/memory-ghost" className="w-full bg-red-950/30 border border-red-800/50 rounded-2xl p-4 relative overflow-hidden group hover:border-red-600 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-red-900/30 border border-red-700/50 flex items-center justify-center group-hover:bg-red-900/50 transition-colors">
            <Skull className="w-7 h-7 text-red-500 animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="font-mono text-[10px] text-red-500 uppercase tracking-wider">
                <Blink>Boss Detected</Blink>
              </span>
            </div>
            <h3 className="font-pixel text-lg text-red-300 mt-0.5">O Fantasma da Memória</h3>
            <p className="text-gray-500 text-xs">Batalha de velocidade — teste seus reflexos de Hiragana</p>
          </div>
          <ChevronRight className="w-5 h-5 text-red-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

    </div>
  );
}
