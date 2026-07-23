'use client';

import { useState, useEffect } from 'react';
import { Skull, Swords, Music, BookOpen, ShoppingBag, Mountain, Crown, Video, Zap, Terminal, Wifi, ChevronRight, AlertTriangle, Gift, Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Heatmap from '@/components/Heatmap';
import { useGame } from '@/context/GameContext';

/* ── Banners Carousel Config ── */
const banners = [
  {
    id: 'karaoke',
    tag: 'MÓDULO DE DESTAQUE',
    tagColor: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/50',
    title: 'Cyber Karaoke — J-Pop',
    subtitle: 'Aprenda japonês cantando os maiores hits de anime e J-Pop com furigana!',
    href: '/jpop',
    btnText: 'ABRIR KARAOKE ➔',
    btnClass: 'bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold shadow-[0_0_20px_rgba(6,182,212,0.6)]',
    borderColor: 'border-cyan-500/80 shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    image: '/images/avatars/onna.png',
    characterName: 'Yumi Sensei',
  },
  {
    id: 'mission',
    tag: 'MISSÃO RECOMENDADA',
    tagColor: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/50',
    title: 'Treinamento Hiragana — Família K',
    subtitle: 'Aprenda か, き, く, け, こ com exercícios práticos e áudio natural.',
    href: '/lesson?group=k',
    btnText: 'INICIAR AULA ➔',
    btnClass: 'bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.6)]',
    borderColor: 'border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    image: '/images/avatars/shinobi.png',
    characterName: 'Shinobi',
  },
  {
    id: 'aulas',
    tag: 'AULAS AO VIVO',
    tagColor: 'text-purple-400 bg-purple-950/80 border-purple-500/50',
    title: 'Aulas Individuais via Google Meet',
    subtitle: 'Agende 1 hora de conversação e gramática com Senseis nativos.',
    href: '/aulas',
    btnText: 'VER PROFESSORES ➔',
    btnClass: 'bg-purple-600 hover:bg-purple-500 text-white font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    borderColor: 'border-purple-500/80 shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    image: '/images/avatars/ronin.png',
    characterName: 'Katsumoto Sensei',
  },
];

export default function Home() {
  const { ryo, activeAvatar } = useGame();
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
    <div className="flex flex-col items-center pb-28 pt-3 w-full max-w-4xl mx-auto px-4 sm:px-6 gap-6 font-sans text-gray-100 select-none">

      {/* ══════════════════════════════════════════
          1. PERFIL DO PERSONAGEM (CHARACTER HEADER)
         ══════════════════════════════════════════ */}
      <div className="w-full bg-[#10071c] border-2 border-purple-500/60 rounded-3xl p-4 sm:p-5 relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          
          {/* Avatar Photo & Info */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Foto do Personagem com alta nitidez */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black border-2 border-purple-400 overflow-hidden shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              {activeAvatar.imageUrl ? (
                <img 
                  src={activeAvatar.imageUrl} 
                  alt={activeAvatar.name} 
                  className="w-full h-full object-cover object-center" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">🥷</div>
              )}
              <span className="absolute bottom-0 inset-x-0 bg-purple-950/90 text-purple-200 text-[10px] font-bold text-center py-0.5 border-t border-purple-500/50">
                ATIVO
              </span>
            </div>

            {/* Nome e Rank legíveis */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-purple-900/80 text-purple-300 text-xs font-black px-2 py-0.5 rounded-md border border-purple-500/50">
                  LV. 1
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  {activeAvatar.name}
                </h1>
              </div>
              <p className="text-sm text-purple-300/90 font-medium">Rank: Shinobi das Sombras</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Progresso diário de estudos ativo</span>
              </div>
            </div>
          </div>

          {/* Recursos em Destaque Nítido */}
          <div className="flex items-center justify-around sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-purple-900/60 pt-3 sm:pt-0 sm:pl-8">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]">
                ¥ {ryo}
              </span>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">Moedas Ryō</span>
            </div>

            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]">
                3/3
              </span>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">Vida (HP)</span>
            </div>

            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                23🔥
              </span>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mt-0.5">Ofensiva</span>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. DESTAQUE COM FOTO DE PERSONAGEM (CAROUSEL)
         ══════════════════════════════════════════ */}
      <div className={`w-full bg-[#080d18] border-2 ${banner.borderColor} rounded-3xl relative overflow-hidden transition-all duration-500`}>
        
        {/* Top Header Label */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-black/60 border-b border-gray-800">
          <span className={`text-xs font-black px-2.5 py-0.5 rounded border ${banner.tagColor} tracking-wider`}>
            {banner.tag}
          </span>

          <div className="flex gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setBannerIdx(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === bannerIdx ? 'bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(6,182,212,1)]' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content with Large Character Image */}
        <Link href={banner.href} className="block p-5 sm:p-6 group">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Foto do Personagem do Módulo */}
            <div className="flex items-center gap-5 text-center sm:text-left w-full sm:w-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black border-2 border-cyan-400/80 overflow-hidden shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
                <img 
                  src={banner.image} 
                  alt={banner.characterName} 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {banner.title}
                </h2>
                <p className="text-sm text-gray-300 font-medium leading-relaxed max-w-md">
                  {banner.subtitle}
                </p>
                <span className="inline-block text-xs font-bold text-cyan-400 pt-1">
                  Guia: {banner.characterName}
                </span>
              </div>
            </div>

            <button className={`${banner.btnClass} text-sm px-6 py-3 rounded-2xl transition-all shrink-0 group-hover:scale-105 uppercase tracking-wider`}>
              {banner.btnText}
            </button>
          </div>
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          3. DATA LOGS — HEATMAP / MATRIZ DE OFENSIVA
         ══════════════════════════════════════════ */}
      <div className="w-full">
        <Heatmap />
      </div>

      {/* ══════════════════════════════════════════
          4. GRADE 2x3 DE MÓDULOS (TEXTOS NÍTIDOS E GRANDES)
         ══════════════════════════════════════════ */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Module 1: Cyan */}
        <Link
          href="/lesson?group=vowels"
          className="bg-[#05151c] border-2 border-cyan-500/70 hover:border-cyan-400 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_20px_rgba(6,182,212,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <BookOpen className="w-7 h-7 text-cyan-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">MÓDULO 01</span>
            <h3 className="text-base font-black text-white group-hover:text-cyan-300 transition-colors">
              Sistema de Treinamento
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Aprenda Hiragana e Katakana</p>
          </div>
        </Link>

        {/* Module 2: Sky Blue */}
        <Link
          href="/trilha"
          className="bg-[#061224] border-2 border-blue-500/70 hover:border-blue-400 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_20px_rgba(59,130,246,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-950 border border-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Swords className="w-7 h-7 text-blue-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">MÓDULO 02</span>
            <h3 className="text-base font-black text-white group-hover:text-blue-300 transition-colors">
              Ningu Arsenal
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Trilha de evolução Shinobi</p>
          </div>
        </Link>

        {/* Module 3: Pink */}
        <Link
          href="/jpop"
          className="bg-[#1c0617] border-2 border-pink-500/70 hover:border-pink-400 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_20px_rgba(236,72,153,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-pink-950 border border-pink-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(236,72,153,0.4)]">
            <Music className="w-7 h-7 text-pink-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest">MÓDULO 03</span>
            <h3 className="text-base font-black text-white group-hover:text-pink-300 transition-colors">
              Cyber Karaoke
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">J-Pop e Músicas de Anime</p>
          </div>
        </Link>

        {/* Module 4: Orange */}
        <Link
          href="/kaishi"
          className="bg-[#1f1006] border-2 border-amber-500/70 hover:border-amber-400 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-950 border border-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
            <Mountain className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">MÓDULO 04</span>
            <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
              Banco de Dados Kanji
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Dicionário e significados</p>
          </div>
        </Link>

        {/* Module 5: Purple */}
        <Link
          href="/origens"
          className="bg-[#140621] border-2 border-purple-500/70 hover:border-purple-400 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-950 border border-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            <BookOpen className="w-7 h-7 text-purple-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">MÓDULO 05</span>
            <h3 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
              Nihongo História
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Origem da língua e cultura</p>
          </div>
        </Link>

        {/* Module 6: Gold/Yellow */}
        <Link
          href="/shop"
          className="bg-[#1f1b06] border-2 border-yellow-500/70 hover:border-yellow-400 rounded-3xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-95 group shadow-[0_0_20px_rgba(234,179,8,0.15)]"
        >
          <div className="w-14 h-14 rounded-2xl bg-yellow-950 border border-yellow-400 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(234,179,8,0.4)]">
            <Gift className="w-7 h-7 text-yellow-300" />
          </div>
          <div>
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">MÓDULO 06</span>
            <h3 className="text-base font-black text-white group-hover:text-yellow-300 transition-colors">
              Shuriken Shop
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Avatares e itens exclusivos</p>
          </div>
        </Link>

      </div>

      {/* ══════════════════════════════════════════
          5. BANNER VIP (CYAN & GOLD)
         ══════════════════════════════════════════ */}
      <Link 
        href="/planos" 
        className="w-full bg-gradient-to-r from-[#031c26] to-[#0a1520] border-2 border-cyan-500 rounded-3xl p-5 relative overflow-hidden group transition-all shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:scale-[1.01]"
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Crown className="w-8 h-8 text-cyan-300 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">TORNE-SE VIP CHUNIN 💎</h3>
              <p className="text-sm text-cyan-200/90 font-medium">
                ♾️ Vidas Infinitas (HP) • 🚫 Sem Anúncios • 🎧 Deck 1.5k com Áudio Nativo
              </p>
            </div>
          </div>
          
          <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm px-6 py-3 rounded-2xl transition-transform group-hover:scale-105 shrink-0 uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            VER PLANOS VIP
          </button>
        </div>
      </Link>

      {/* ══════════════════════════════════════════
          6. BOSS EVENT — SHOGUN RAIJIN (KATSUHIRO OTOMO STYLE)
         ══════════════════════════════════════════ */}
      <Link 
        href="/boss/shogun-raijin" 
        className="w-full bg-gradient-to-r from-[#031424] to-[#082038] border-2 border-cyan-400 rounded-3xl p-5 relative overflow-hidden group transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.01]"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Foto Akira Style do Shogun */}
            <div className="w-16 h-16 rounded-2xl bg-black border-2 border-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.6)] overflow-hidden">
              <img 
                src="/images/boss/shogun.png" 
                alt="Shogun Raijin" 
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform"
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-xs font-black uppercase px-2.5 py-0.5 rounded-md mb-1">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> 
                <span className="animate-pulse">EVENTO TEMPORÁRIO DE FIM DE SEMANA!</span>
              </div>
              <h3 className="text-xl font-black text-white">Shogun da Tempestade (Raijin)</h3>
              <p className="text-xs sm:text-sm text-cyan-200/90 font-medium">Batalha Estilo Akira — Chuva intensa e relâmpagos ao vivo!</p>
            </div>
          </div>

          <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-sm px-6 py-3 rounded-2xl transition-all group-hover:scale-105 shrink-0 uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center gap-1">
            ⚡ DESAFIAR SHOGUN
          </button>
        </div>
      </Link>

      {/* ══════════════════════════════════════════
          7. BOSS WARNING BANNER (RED CRIMSON - FANTASMA DA MEMÓRIA)
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

          <button className="bg-red-600 hover:bg-red-500 text-white font-pixel text-xs px-4 py-2.5 rounded-xl transition-all group-hover:scale-105 shrink-0 uppercase tracking-widest flex items-center gap-1 border border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.6)]">
            ⚔ BATTLE-READY ///
          </button>
        </div>
      </Link>

    </div>
  );
}
