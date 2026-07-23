'use client';

import { useState, useEffect, useCallback } from 'react';
import { Skull, Heart, ShieldAlert, Sparkles, XCircle, Zap, Terminal, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { sfx } from '@/utils/sfx';

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

const ROUND_TIME = 40; // 4.0 seconds (40 x 100ms)
const ULTIMATE_TIME = 80;

/* ── CRT Scanlines ── */
const CRTScanlines = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)',
    }} />
  </div>
);

export default function MemoryGhostBossPage() {
  const { addRyo, takeDamage, hp: globalHp } = useGame();
  const [gameState, setGameState] = useState<GameState>('intro');
  const [bossHp, setBossHp] = useState(15);
  const [time, setTime] = useState(ROUND_TIME);
  const [roundIdx, setRoundIdx] = useState(0);
  const [attackIdx, setAttackIdx] = useState(0);
  const [ultimateProgress, setUltimateProgress] = useState<string[]>([]);
  const [isHit, setIsHit] = useState(false);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'ultimate') return;
    if (time <= 0) { 
      handleDamage(); 
      return; 
    }
    const timerId = setInterval(() => setTime(t => t - 1), 100);
    return () => clearInterval(timerId);
  }, [time, gameState]);

  const handleDamage = useCallback(() => {
    setIsHit(true);
    setCombo(0);
    takeDamage();
    sfx.playAlarm();

    setTimeout(() => setIsHit(false), 500);

    if (globalHp <= 1) { 
      setGameState('gameover'); 
      return; 
    }

    if (gameState === 'ultimate') {
      setUltimateProgress([]);
      setTime(ULTIMATE_TIME);
    } else {
      nextAttack();
    }
  }, [globalHp, gameState, roundIdx, attackIdx, takeDamage]);

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
        sfx.playSuccess();
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
        sfx.playSuccess();
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
    sfx.playSuccess();
  };

  const startGame = () => {
    setBossHp(15);
    setRoundIdx(0);
    setAttackIdx(0);
    setUltimateProgress([]);
    setTime(ROUND_TIME);
    setCombo(0);
    setGameState('playing');
    sfx.playAlarm();
  };

  /* ═══════ INTRO ═══════ */
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen w-full bg-[#120202] text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <CRTScanlines />

        <div className="relative z-10 text-center max-w-lg w-full">
          <div className="flex items-center justify-center gap-2 mb-4 text-red-500">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="font-bold text-xs uppercase tracking-widest animate-pulse">⚠ PERIGO RED ALERT ⚠</span>
          </div>

          <div className="relative mx-auto mb-6 w-36 h-36">
            <div className="absolute inset-0 rounded-full bg-red-600/30 animate-ping" />
            <div className="relative w-36 h-36 rounded-full border-4 border-red-500 overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.7)] bg-black flex items-center justify-center">
              <Skull className="w-20 h-20 text-red-500 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-red-400 mb-1 uppercase tracking-wide drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]">
            O Fantasma da Memória
          </h1>
          <p className="text-xs text-red-400/80 font-bold uppercase tracking-widest mb-6">
            — Desafio de Velocidade Acelerado —
          </p>

          <div className="bg-[#1c0404] border-2 border-red-600/60 p-5 rounded-3xl mb-6 text-left text-xs space-y-3 shadow-lg">
            <p className="text-gray-300 font-medium leading-relaxed">
              O tempo é implacável! Você terá apenas <span className="text-red-400 font-bold">4.0 SEGUNDOS</span> por palavra para desarmar os ataques do chefe.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-red-900/60">
              <p className="text-red-400 font-bold flex items-center gap-2">
                <Heart className="w-4 h-4 fill-red-500" /> HP Atual: {globalHp}/3 (Perder tempo reduz seu HP real!)
              </p>
              <p className="text-amber-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4" /> RECOMPENSA: +300 RYŌ
              </p>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-xl py-4 rounded-2xl border-2 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)] active:scale-95 transition-all tracking-wider"
          >
            ⚔ INICIAR BATALHA ⚔
          </button>
        </div>
      </div>
    );
  }

  /* ═══════ GAME OVER ═══════ */
  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen w-full bg-[#120202] text-foreground flex flex-col items-center justify-center p-6 relative font-sans">
        <CRTScanlines />

        <div className="relative z-10 text-center max-w-lg w-full space-y-6">
          <Skull className="w-20 h-20 text-red-500 mx-auto drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-bounce" />

          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-red-500 uppercase tracking-wider">
              VOCÊ FOI DERROTADO!
            </h1>
            <p className="text-xs text-red-400 font-bold uppercase tracking-widest mt-1">
              O Fantasma roubou sua energia (HP 0)
            </p>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-lg py-4 rounded-2xl border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 transition-all uppercase tracking-wider"
          >
            TENTAR NOVAMENTE
          </button>
        </div>
      </div>
    );
  }

  /* ═══════ VICTORY ═══════ */
  if (gameState === 'victory') {
    return (
      <div className="min-h-screen w-full bg-[#021207] text-foreground flex flex-col items-center justify-center p-6 relative font-sans">
        <CRTScanlines />

        <div className="relative z-10 text-center max-w-lg w-full space-y-6">
          <Sparkles className="w-20 h-20 text-emerald-400 mx-auto drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse" />

          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-emerald-400 uppercase tracking-wider">
              VITÓRIA ÉPICA!
            </h1>
            <p className="text-xs text-emerald-300 font-bold uppercase tracking-widest mt-1">
              O Fantasma da Memória foi neutralizado!
            </p>
          </div>

          <div className="bg-[#072412] border-2 border-emerald-500/60 p-5 rounded-3xl text-left space-y-2 text-sm font-bold text-emerald-200">
            <p className="text-amber-400">💰 Recompensa Concedida: +300 Ryō</p>
            <p className="text-emerald-300">⚔ Domínio total da velocidade em Hiragana</p>
          </div>

          <Link
            href="/"
            className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg py-4 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.6)] active:scale-95 transition-all uppercase tracking-wider"
          >
            VOLTAR AO MAPA
          </Link>
        </div>
      </div>
    );
  }

  /* ═══════ PLAYING ═══════ */
  const isUltimate = gameState === 'ultimate';
  const currentRound = BOSS_DATA.rounds[roundIdx];
  const currentAttack = currentRound?.attacks[attackIdx];
  const timeLimit = isUltimate ? ULTIMATE_TIME : ROUND_TIME;
  const timePercent = (time / timeLimit) * 100;

  return (
    <div className={`min-h-[100dvh] w-full bg-[#170303] text-foreground flex flex-col font-sans relative transition-all duration-75 ${isHit ? 'bg-red-900 border-4 border-red-500' : ''}`}>
      <CRTScanlines />

      {/* Hit Red Screen Flash */}
      <div className={`absolute inset-0 pointer-events-none z-40 transition-colors duration-100 ${isHit ? 'bg-red-600/50' : 'bg-transparent'}`} />

      {/* ── HUD HEADER ── */}
      <div className="w-full bg-[#240505] border-b-2 border-red-600/60 p-4 sticky top-0 z-30 shadow-lg">
        
        {/* HP Indicator & Round */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            <span className="font-black text-sm text-red-300">HP Shinobi: {globalHp}/3</span>
          </div>
          
          <div className="text-xs font-black text-red-400 bg-red-950 px-3 py-1 rounded-full border border-red-500/40">
            {isUltimate ? '⚠ ULTIMATE ATTACK' : `ROUND ${roundIdx + 1}/5`}
          </div>

          <div className="text-xs font-black text-amber-400">
            Boss HP: {bossHp}/15
          </div>
        </div>

        {/* Rapid Timer Bar */}
        <div className="w-full h-3 bg-black border border-red-600/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-amber-500 transition-all duration-100 ease-linear rounded-full" 
            style={{ width: `${timePercent}%` }} 
          />
        </div>
      </div>

      {/* ── COMBAT AREA ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10 max-w-xl mx-auto w-full">

        <div className="mb-6 text-center">
          <h2 className="font-black text-xl text-red-300 uppercase">
            {isUltimate ? BOSS_DATA.ultimate.title : currentRound.title}
          </h2>
        </div>

        {/* Kana Target Box */}
        <div className="w-full bg-[#2d0707] border-4 border-red-500 rounded-3xl p-8 text-center mb-8 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
          {!isUltimate ? (
            <h1 className="text-6xl sm:text-8xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]">
              {currentAttack.kana}
            </h1>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex justify-center gap-3">
                {BOSS_DATA.ultimate.kanas.map((k, i) => (
                  <span key={i} className="text-4xl font-black text-red-100">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="w-full grid grid-cols-2 gap-3">
          {(!isUltimate ? currentAttack.options : BOSS_DATA.ultimate.options).map((opt) => (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className="bg-[#2d0707] hover:bg-red-600 text-white font-black text-base sm:text-lg py-4 rounded-2xl border-2 border-red-500/70 transition-all active:scale-95 shadow-md"
            >
              {opt}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}