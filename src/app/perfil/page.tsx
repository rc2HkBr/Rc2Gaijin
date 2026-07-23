'use client';

import { useGame } from '@/context/GameContext';
import { ChevronLeft, LogOut, Crown, Terminal, Wifi, Shield } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

/* ── CRT green phosphor overlay ── */
const PhosphorOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.15) 2px, rgba(0,255,65,0.15) 4px)',
    }} />
    <div className="absolute inset-0" style={{
      boxShadow: 'inset 0 0 80px rgba(0,0,0,0.5), inset 0 0 160px rgba(0,0,0,0.3)',
    }} />
  </div>
);

/* ── Typing effect line ── */
function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 800);
        }
      }, 25);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && <span className="animate-pulse">█</span>}
    </span>
  );
}

/* ── Progress bar ASCII ── */
function AsciiBar({ value, max, width = 20 }: { value: number; max: number; width?: number }) {
  const filled = Math.round((value / max) * width);
  const empty = width - filled;
  return (
    <span className="text-emerald-400">
      [<span className="text-emerald-300">{'█'.repeat(filled)}</span>
      <span className="text-emerald-900">{'░'.repeat(empty)}</span>]
      {' '}{Math.round((value / max) * 100)}%
    </span>
  );
}

/* ── Stat row ── */
function StatRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex gap-2 py-1 border-b border-emerald-900/30">
      <span className="text-emerald-600 w-28 sm:w-40 shrink-0 uppercase text-[11px] sm:text-xs">{label}:</span>
      <span className="text-emerald-300 text-[11px] sm:text-xs font-bold">{value}</span>
    </div>
  );
}

export default function PerfilPage() {
  const { ryo, activeAvatar } = useGame();
  const router = useRouter();
  const [sysTime, setSysTime] = useState('');
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 600);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full bg-[#0a100a] text-emerald-400 flex flex-col items-center select-none pb-24 font-mono relative overflow-x-hidden">
      <PhosphorOverlay />

      {/* ── HEADER ── */}
      <div className="w-full h-14 bg-[#0d140d] border-b border-emerald-900/50 flex items-center px-4 sm:px-8 top-0 sticky z-40">
        <Link href="/" className="flex items-center gap-2 hover:text-emerald-300 transition-colors mr-4">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Terminal className="w-4 h-4 text-emerald-600" />
          <span className="text-xs uppercase tracking-widest text-emerald-600">GAIJIN_OS://perfil/dossie</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-emerald-700">
          <Wifi className="w-3 h-3" />
          <span>ENCRYPTED</span>
          <span className="text-emerald-900">|</span>
          <span>{sysTime}</span>
        </div>
      </div>

      <div className="w-full max-w-2xl px-4 sm:px-8 mt-6 flex flex-col gap-0 relative z-10">

        {/* ── BOOT SEQUENCE ── */}
        <div className="mb-4 text-[10px] text-emerald-700 space-y-0.5">
          <p><TypeLine text="GAIJIN_OS v2.0.4 — Initializing secure session..." delay={0} /></p>
          <p><TypeLine text="Loading agent dossier... OK" delay={800} /></p>
          <p><TypeLine text="Decrypting profile data... DONE" delay={1400} /></p>
        </div>

        {/* ── BORDER BOX — DOSSIER ── */}
        <div className={`border border-emerald-800/60 bg-[#0a100a] p-5 sm:p-6 transition-opacity duration-500 ${booted ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* File Header */}
          <div className="border-b border-emerald-800/60 pb-3 mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg sm:text-xl text-emerald-300 uppercase tracking-wider">
                ╔══ Dossiê do Agente ══╗
              </h1>
              <p className="text-[10px] text-emerald-700 mt-1">Classificação: CONFIDENCIAL | Ref: #RC2-0742</p>
            </div>
            <div className="w-10 h-10 rounded bg-emerald-900/30 border border-emerald-800/50 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
          </div>

          {/* Avatar + Identity */}
          <div className="flex items-start gap-5 mb-6">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-black border-2 border-emerald-700/50 shrink-0 overflow-hidden flex items-center justify-center">
              {activeAvatar.imageUrl ? (
                <img 
                  src={activeAvatar.imageUrl} 
                  alt="Avatar" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated', filter: 'sepia(100%) saturate(300%) hue-rotate(90deg) brightness(0.7)' }} 
                />
              ) : (
                <span className="text-5xl">{activeAvatar.emoji}</span>
              )}
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-500" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-500" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-500" />
            </div>

            {/* Identity Info */}
            <div className="flex-1 space-y-1 pt-1">
              <StatRow label="Codinome" value="GAIJIN_PLAYER" />
              <StatRow label="Rank" value="SHINOBI DAS SOMBRAS" />
              <StatRow label="Nível" value="LV. 1" />
              <StatRow label="Plano" value="GENIN (FREE)" />
              <StatRow label="Status" value={
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ATIVO
                </span>
              } />
            </div>
          </div>

          {/* Separator */}
          <div className="text-emerald-800/60 text-xs mb-4 text-center tracking-[0.3em]">
            ════════════ ESTATÍSTICAS ════════════
          </div>

          {/* Stats Grid */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-600">EXPERIÊNCIA</span>
              <AsciiBar value={150} max={500} width={16} />
              <span className="text-emerald-500 text-[10px]">150/500 XP</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-600">HIRAGANA</span>
              <AsciiBar value={46} max={71} width={16} />
              <span className="text-emerald-500 text-[10px]">46/71</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-600">KATAKANA</span>
              <AsciiBar value={0} max={71} width={16} />
              <span className="text-emerald-500 text-[10px]">0/71</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-600">KANJI</span>
              <AsciiBar value={0} max={1500} width={16} />
              <span className="text-emerald-500 text-[10px]">0/1500</span>
            </div>
          </div>

          {/* Separator */}
          <div className="text-emerald-800/60 text-xs mb-4 text-center tracking-[0.3em]">
            ════════════ REGISTROS ════════════
          </div>

          {/* Mission Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'DIAS OFENSIVOS', value: '1', glyph: '🔥' },
              { label: 'PRECISÃO', value: '87%', glyph: '◎' },
              { label: 'KANAS OK', value: '46', glyph: '文' },
              { label: 'RYŌ TOTAL', value: String(ryo), glyph: '¥' },
            ].map((stat) => (
              <div key={stat.label} className="border border-emerald-900/50 bg-black/40 p-3 text-center">
                <div className="text-lg text-emerald-300 mb-1">{stat.glyph}</div>
                <div className="text-xl text-emerald-200 font-bold">{stat.value}</div>
                <div className="text-[9px] text-emerald-700 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="text-emerald-800/60 text-xs mb-4 text-center tracking-[0.3em]">
            ════════════ AÇÕES ════════════
          </div>

          {/* Upgrade */}
          <Link href="/planos" className="block w-full border border-emerald-700/50 bg-emerald-950/30 p-4 mb-3 hover:bg-emerald-900/30 hover:border-emerald-600 transition-colors group">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-emerald-400 text-xs uppercase tracking-wider">&gt; UPGRADE_RANK.exe</span>
                <p className="text-[10px] text-emerald-700 mt-0.5">Evoluir para CHUNIN — Desbloquear modo offline e Kanjis</p>
              </div>
              <Crown className="w-6 h-6 text-emerald-500 group-hover:text-emerald-300 transition-colors" />
            </div>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full border border-red-900/50 bg-red-950/20 p-3 text-red-500/80 hover:bg-red-950/40 hover:border-red-700 hover:text-red-400 transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" /> TERMINATE_SESSION
          </button>

        </div>

        {/* Footer */}
        <div className="mt-4 text-[10px] text-emerald-900 text-center">
          <p>GAIJIN_OS © 2026 — RC2 INDUSTRIES — ALL RIGHTS RESERVED</p>
          <p>END OF FILE</p>
        </div>

      </div>
    </div>
  );
}
