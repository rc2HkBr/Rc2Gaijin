'use client';

import { useState, useEffect, useCallback } from 'react';
import { Skull, Heart, ShieldAlert, Sparkles, XCircle, Zap, Terminal, Wifi, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';

type GameState = 'intro' | 'playing' | 'ultimate' | 'victory' | 'gameover';

const BOSS_DATA = {
  rounds: [
    {
      title: "ROUND 1: A Ilusão da Natureza",
      attacks: [
        { kana: 'き', answer: 'Árvore', options: ['Árvore', 'Mar', 'Fogo', 'Montanha'] },
        { kana: 'うみ', answer: 'Mar', options: ['Mar', 'Rio', 'Pedra', 'Árvore'] }
      ]
    },
    {
      title: "ROUND 2: Chuva de Objetos",
      attacks: [
        { kana: 'かさ', answer: 'Guarda-chuva', options: ['Espada', 'Lápis', 'Guarda-chuva', 'Mochila'] },
        { kana: 'けん', answer: 'Espada', options: ['Espada', 'Arco', 'Cajado', 'Faca'] },
        { kana: 'えんぴつ', answer: 'Lápis', options: ['Borracha', 'Caderno', 'Caneta', 'Lápis'] }
      ]
    },
    {
      title: "ROUND 3: Bestiário Assombrado",
      attacks: [
        { kana: 'いぬ', answer: 'Cachorro', options: ['Cachorro', 'Gato', 'Peixe', 'Urso'] },
        { kana: 'さかな', answer: 'Peixe', options: ['Peixe', 'Pássaro', 'Sapo', 'Urso'] },
        { kana: 'くま', answer: 'Urso', options: ['Lobo', 'Macaco', 'Urso', 'Cachorro'] }
      ]
    },
    {
      title: "ROUND 4: Ação Incessante",
      attacks: [
        { kana: 'たべる', answer: 'Comer', options: ['Beber', 'Dormir', 'Comer', 'Andar'] },
        { kana: 'のむ', answer: 'Beber', options: ['Comer', 'Beber', 'Falar', 'Ler'] },
        { kana: 'はしる', answer: 'Correr', options: ['Correr', 'Pular', 'Nadar', 'Pensar'] }
      ]
    },
    {
      title: "ROUND 5: Cidades de Neon",
      attacks: [
        { kana: 'とうきょう', answer: 'Tóquio', options: ['Tóquio', 'Kyoto', 'Osaka', 'Sapporo'] },
        { kana: 'がっこう', answer: 'Escola', options: ['Loja', 'Escola', 'Hospital', 'Estação'] },
        { kana: 'みせ', answer: 'Loja', options: ['Casa', 'Templo', 'Rua', 'Loja'] }
      ]
    }
  ],
  ultimate: {
    title: "ULTIMATE: O APAGÃO",
    kanas: ['たいこ', 'つき', 'にほん'],
    correctSequence: ['Tambor', 'Lua', 'Japão'],
    options: ['Tambor', 'Lua', 'Japão', 'Sol', 'Sino', 'Castelo']
  }
};

const ROUND_TIME = 50;
const ULTIMATE_TIME = 100;

/* ── CRT Scanlines ── */
const CRTScanlines = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(128,0,255,0.08) 2px, rgba(128,0,255,0.08) 4px)',
    }} />
  </div>
);

/* ── Rain effect ── */
const CyberRain = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
    {Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"
        style={{
          left: `${Math.random() * 100}%`,
          height: `${20 + Math.random() * 40}px`,
          top: `${Math.random() * 100}%`,
          animation: `rain ${1 + Math.random() * 2}s linear infinite`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ))}
    <style jsx>{`
      @keyframes rain {
        0% { transform: translateY(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
      }
    `}</style>
  </div>
);

/* ── HP Bar component (arcade style) ── */
function HPBar({ current, max, label, color }: { current: number; max: number; label: string; color: string }) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <span className="font-pixel text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
        <span className={`font-mono text-xs ${color}`}>{current}/{max}</span>
      </div>
      <div className="h-3 bg-black border border-gray-700 overflow-hidden flex">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${i < current ? color.replace('text-', 'bg-') : 'bg-gray-900'} ${i > 0 ? 'border-l border-black' : ''} transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

export default function MemoryGhostBossPage() {
  const { addRyo } = useGame();
  const [gameState, setGameState] = useState<GameState>('intro');
  const [hp, setHp] = useState(3);
  const [bossHp, setBossHp] = useState(15);
  const [time, setTime] = useState(ROUND_TIME);
  const [roundIdx, setRoundIdx] = useState(0);
  const [attackIdx, setAttackIdx] = useState(0);
  const [ultimateProgress, setUltimateProgress] = useState<string[]>([]);
  const [isHit, setIsHit] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'ultimate') return;
    if (time <= 0) { handleDamage(); return; }
    const timerId = setInterval(() => setTime(t => t - 1), 100);
    return () => clearInterval(timerId);
  }, [time, gameState]);

  const handleDamage = useCallback(() => {
    setIsHit(true);
    setCombo(0);
    setTimeout(() => setIsHit(false), 500);
    const newHp = hp - 1;
    setHp(newHp);
    if (newHp <= 0) { setGameState('gameover'); return; }
    if (gameState === 'ultimate') {
      setUltimateProgress([]);
      setTime(ULTIMATE_TIME);
    } else {
      nextAttack();
    }
  }, [hp, gameState, roundIdx, attackIdx]);

  const nextAttack = () => {
    const currentRound = BOSS_DATA.rounds[roundIdx];
    if (attackIdx + 1 < currentRound.attacks.length) {
      setAttackIdx(i => i + 1);
      setTime(ROUND_TIME);
    } else if (roundIdx + 1 < BOSS_DATA.rounds.length) {
      setRoundIdx(r => r + 1);
      setAttackIdx(0);
      setTime(ROUND_TIME);
    } else {
      setGameState('ultimate');
      setTime(ULTIMATE_TIME);
    }
  };

  const handleOptionClick = (option: string) => {
    if (gameState === 'playing') {
      const currentAttack = BOSS_DATA.rounds[roundIdx].attacks[attackIdx];
      if (option === currentAttack.answer) {
        setCombo(c => c + 1);
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 600);
        setBossHp(h => Math.max(0, h - 1));
        nextAttack();
      } else {
        handleDamage();
      }
    } else if (gameState === 'ultimate') {
      const nextExpected = BOSS_DATA.ultimate.correctSequence[ultimateProgress.length];
      if (option === nextExpected) {
        const newProgress = [...ultimateProgress, option];
        setUltimateProgress(newProgress);
        setBossHp(h => Math.max(0, h - 1));
        if (newProgress.length === BOSS_DATA.ultimate.correctSequence.length) {
          handleVictory();
        }
      } else {
        handleDamage();
      }
    }
  };

  const handleVictory = () => {
    setGameState('victory');
    setBossHp(0);
    addRyo(300);
  };

  const startGame = () => {
    setHp(3);
    setBossHp(15);
    setRoundIdx(0);
    setAttackIdx(0);
    setUltimateProgress([]);
    setTime(ROUND_TIME);
    setCombo(0);
    setGameState('playing');
  };

  /* ═══════ INTRO ═══════ */
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen w-full bg-[#050008] text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono">
        <CyberRain />
        <CRTScanlines />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 to-black pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg w-full">
          {/* Warning Header */}
          <div className="flex items-center justify-center gap-2 mb-6 text-red-500">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="font-pixel text-xs uppercase tracking-widest animate-pulse">⚠ THREAT DETECTED ⚠</span>
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>

          {/* Boss Portrait */}
          <div className="relative mx-auto mb-6 w-36 h-36">
            <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-ping" />
            <div className="relative w-36 h-36 rounded-full border-4 border-purple-600 overflow-hidden shadow-[0_0_40px_rgba(128,0,128,0.6)] bg-black">
              <img src="/images/boss/ghost.png" alt="O Fantasma da Memória" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
            </div>
          </div>

          {/* Boss Name */}
          <h1 className="text-3xl sm:text-4xl font-pixel text-purple-400 mb-1 uppercase drop-shadow-[0_0_15px_rgba(128,0,255,0.8)]">
            O Fantasma da Memória
          </h1>
          <p className="font-pixel text-xs text-purple-600 uppercase tracking-[0.3em] mb-6">
            — Boss Battle: Speed Run —
          </p>

          {/* Intel Box */}
          <div className="bg-black/80 border border-purple-800/60 p-4 mb-6 text-left text-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-purple-900/50">
              <Terminal className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600 uppercase tracking-wider">Intel Briefing</span>
            </div>
            <p className="text-gray-400 mb-3 leading-relaxed">
              O cenário escurece. Uma névoa fria cobre a tela... Ele flutua diante de você, pronto para testar seus reflexos!
            </p>
            <div className="space-y-2">
              <p className="text-red-400 flex items-center gap-2">
                <Heart className="w-4 h-4 fill-red-500" /> 3 CORAÇÕES DE HP — NÃO ERRE!
              </p>
              <p className="text-orange-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> 5 SEGUNDOS POR ATAQUE
              </p>
              <p className="text-purple-400 flex items-center gap-2">
                <Skull className="w-4 h-4" /> 5 ROUNDS + ULTIMATE ATTACK
              </p>
            </div>
          </div>

          {/* Fight Button */}
          <button
            onClick={startGame}
            className="w-full bg-purple-700 hover:bg-purple-600 text-white font-pixel text-2xl py-4 border-2 border-purple-400 shadow-[0_0_20px_rgba(128,0,255,0.4)] hover:shadow-[0_0_30px_rgba(128,0,255,0.6)] active:scale-95 transition-all tracking-widest"
          >
            ⚔ FIGHT! ⚔
          </button>

          <Link href="/" className="block mt-4 text-gray-600 font-pixel text-xs hover:text-gray-400 transition-colors uppercase tracking-wider">
            {"< abort_mission.exe"}
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════ GAME OVER ═══════ */
  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen w-full bg-[#0a0000] text-foreground flex flex-col items-center justify-center p-6 relative font-mono">
        <CRTScanlines />

        <div className="relative z-10 text-center max-w-lg w-full">
          <Skull className="w-20 h-20 text-red-600 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] animate-pulse" />

          <h1 className="text-5xl font-pixel text-red-500 mb-2 uppercase tracking-widest">
            SYSTEM FAILURE
          </h1>
          <p className="font-pixel text-xs text-red-800 uppercase tracking-[0.3em] mb-6">
            — Agent Terminated —
          </p>

          <div className="bg-black/80 border border-red-900/60 p-4 mb-6 text-left text-xs font-mono">
            <p className="text-red-700 mb-2">&gt; ERROR: Memory corruption detected</p>
            <p className="text-gray-500 mb-2 italic leading-relaxed">
              "O Fantasma roubou sua memória de curto prazo. Sua espada ninja transformou-se num ursinho de pelúcia (nuigurumi)."
            </p>
            <p className="text-red-500 border-t border-red-900/50 pt-2 mt-2">
              &gt; REBOOT REQUIRED
            </p>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-red-900 hover:bg-red-800 text-white font-pixel text-xl py-3 border border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)] active:scale-95 transition-all mb-3 tracking-widest"
          >
            REBOOT SYSTEM
          </button>
          <Link href="/" className="block text-gray-600 font-pixel text-xs hover:text-gray-400 transition-colors uppercase">
            {"< return_to_base.exe"}
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════ VICTORY ═══════ */
  if (gameState === 'victory') {
    return (
      <div className="min-h-screen w-full bg-[#020a05] text-foreground flex flex-col items-center justify-center p-6 relative font-mono">
        <CRTScanlines />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-black pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg w-full">
          <Sparkles className="w-20 h-20 text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_20px_rgba(0,255,100,0.8)]" />

          <h1 className="text-4xl sm:text-5xl font-pixel text-emerald-400 mb-2 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,255,100,0.6)]">
            MISSION COMPLETE
          </h1>
          <p className="font-pixel text-xs text-emerald-700 uppercase tracking-[0.3em] mb-6">
            — Boss Eliminated —
          </p>

          <div className="bg-black/80 border border-emerald-900/60 p-4 mb-6 text-left text-xs font-mono space-y-2">
            <p className="text-emerald-600">&gt; Threat neutralized successfully</p>
            <p className="text-gray-400 italic">O fantasma explode em moedas (おかね / okane).</p>
            <div className="border-t border-emerald-900/50 pt-3 mt-3 space-y-2">
              <p className="text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> LOOT: +300 RC COINS
              </p>
              <p className="text-emerald-400 flex items-center gap-2">
                <Zap className="w-4 h-4" /> UNLOCK: Habilidade "Visão Dupla"
              </p>
              <p className="text-purple-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> ACCESS: Fase 2 — Katakana
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full text-center bg-emerald-700 hover:bg-emerald-600 text-white font-pixel text-xl py-3 border border-emerald-400 shadow-[0_0_15px_rgba(0,255,100,0.3)] hover:shadow-[0_0_25px_rgba(0,255,100,0.5)] active:scale-95 transition-all tracking-widest"
          >
            CONTINUE MISSION
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════ PLAYING & ULTIMATE ═══════ */
  const isUltimate = gameState === 'ultimate';
  const currentRound = BOSS_DATA.rounds[roundIdx];
  const currentAttack = currentRound?.attacks[attackIdx];
  const timeLimit = isUltimate ? ULTIMATE_TIME : ROUND_TIME;
  const timePercent = (time / timeLimit) * 100;

  let timeColor = 'bg-emerald-500';
  if (timePercent < 50) timeColor = 'bg-amber-500';
  if (timePercent < 20) timeColor = 'bg-red-500 animate-pulse';

  return (
    <div className={`min-h-[100dvh] w-full bg-[#050008] text-foreground flex flex-col font-mono relative transition-transform duration-75 ${isHit ? 'translate-x-2' : ''}`}>
      <CyberRain />
      <CRTScanlines />

      {/* Hit flash */}
      <div className={`absolute inset-0 pointer-events-none z-40 transition-colors duration-100 ${isHit ? 'bg-red-900/40' : 'bg-transparent'}`} />

      {/* Combo popup */}
      {showCombo && combo > 1 && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50 font-pixel text-4xl text-amber-400 drop-shadow-[0_0_15px_rgba(255,200,0,0.8)] animate-bounce">
          {combo}x COMBO!
        </div>
      )}

      {/* ── HUD HEADER ── */}
      <div className="w-full bg-black/90 border-b-2 border-purple-900/50 p-3 sm:p-4 sticky top-0 z-30">
        {/* HP Bars */}
        <div className="flex gap-4 mb-3">
          <HPBar current={hp} max={3} label="SHINOBI" color="text-emerald-500" />
          <HPBar current={bossHp} max={15} label="GHOST" color="text-purple-500" />
        </div>

        {/* Timer + Round Info */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-600 hover:text-white transition-colors shrink-0">
            <XCircle className="w-5 h-5" />
          </Link>
          <div className="flex-1 h-2 bg-black border border-gray-800 overflow-hidden">
            <div className={`h-full ${timeColor} transition-all duration-100 ease-linear`} style={{ width: `${timePercent}%` }} />
          </div>
          <span className="font-mono text-xs text-gray-500 shrink-0 w-10 text-right">
            {(time / 10).toFixed(1)}s
          </span>
        </div>
      </div>

      {/* ── COMBAT AREA ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">

        {/* Round Title */}
        <div className="mb-4 text-center">
          <span className={`font-pixel text-xs uppercase tracking-[0.3em] ${isUltimate ? 'text-red-500 animate-pulse' : 'text-purple-600'}`}>
            {isUltimate ? '⚠ ULTIMATE ATTACK ⚠' : `ROUND ${roundIdx + 1}/5`}
          </span>
          <h2 className={`font-pixel text-base sm:text-lg uppercase ${isUltimate ? 'text-red-400' : 'text-purple-300'}`}>
            {isUltimate ? BOSS_DATA.ultimate.title : currentRound.title}
          </h2>
        </div>

        {/* Boss + Kana Display */}
        <div className="flex items-center gap-6 sm:gap-10 mb-8">
          {/* Player Side */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 border-emerald-700/50 bg-black overflow-hidden opacity-60">
            <img src="/images/avatars/shinobi.png" alt="Player" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
          </div>

          {/* VS / Kana */}
          <div className={`w-full max-w-xs bg-black/80 border-2 ${isUltimate ? 'border-red-800 shadow-[0_0_30px_rgba(255,0,0,0.2)]' : 'border-purple-800 shadow-[0_0_30px_rgba(128,0,255,0.2)]'} p-6 text-center`}>
            {!isUltimate ? (
              <h1 className="text-5xl sm:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                {currentAttack.kana}
              </h1>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex justify-center gap-3 flex-wrap">
                  {BOSS_DATA.ultimate.kanas.map((k, i) => {
                    const isSolved = ultimateProgress.length > i;
                    return (
                      <span key={i} className={`text-2xl sm:text-4xl font-black transition-all ${isSolved ? 'text-emerald-500 opacity-40 line-through' : 'text-red-100'}`}>
                        {k}
                      </span>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-1.5 mt-2">
                  {BOSS_DATA.ultimate.correctSequence.map((_, i) => (
                    <div key={i} className={`w-10 h-1.5 ${i < ultimateProgress.length ? 'bg-emerald-500' : 'bg-red-900/50'} transition-all`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Boss Side */}
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 ${isUltimate ? 'border-red-700/50' : 'border-purple-700/50'} bg-black overflow-hidden`}>
            <img src="/images/boss/ghost.png" alt="Ghost" className="w-full h-full object-cover animate-pulse" style={{ imageRendering: 'pixelated' }} />
          </div>
        </div>

        {/* ── OPTIONS GRID ── */}
        <div className="w-full max-w-md grid grid-cols-2 gap-2 sm:gap-3">
          {(!isUltimate ? currentAttack.options : BOSS_DATA.ultimate.options).map((opt) => {
            const isSelectedInUltimate = isUltimate && ultimateProgress.includes(opt);

            return (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                disabled={isSelectedInUltimate}
                className={`w-full py-3 sm:py-4 px-2 font-pixel text-sm sm:text-lg uppercase border-2 text-center transition-all active:scale-95
                  ${isSelectedInUltimate
                    ? 'bg-black text-emerald-900 border-emerald-900/30 opacity-40 cursor-not-allowed'
                    : isUltimate
                      ? 'bg-black/80 border-red-800/60 text-red-200 hover:bg-red-950 hover:border-red-500 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)]'
                      : 'bg-black/80 border-purple-800/60 text-purple-200 hover:bg-purple-950 hover:border-purple-500 hover:shadow-[0_0_10px_rgba(128,0,255,0.3)]'
                  }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}