'use client';

import { useState, useEffect, useCallback } from 'react';
import { Skull, Heart, ShieldAlert, Sparkles, XCircle, ArrowRight, Zap, Ghost } from 'lucide-react';
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

const ROUND_TIME = 50; // 5.0 seconds
const ULTIMATE_TIME = 100; // 10.0 seconds

export default function MemoryGhostBossPage() {
  const { addRyo } = useGame();
  const [gameState, setGameState] = useState<GameState>('intro');
  const [hp, setHp] = useState(3);
  const [time, setTime] = useState(ROUND_TIME);
  
  const [roundIdx, setRoundIdx] = useState(0);
  const [attackIdx, setAttackIdx] = useState(0);
  
  const [ultimateProgress, setUltimateProgress] = useState<string[]>([]);
  
  const [isHit, setIsHit] = useState(false);
  
  // Timer Logic
  useEffect(() => {
    if (gameState !== 'playing' && gameState !== 'ultimate') return;
    
    if (time <= 0) {
      handleDamage();
      return;
    }

    const timerId = setInterval(() => {
      setTime(t => t - 1);
    }, 100);

    return () => clearInterval(timerId);
  }, [time, gameState]);

  const handleDamage = useCallback(() => {
    setIsHit(true);
    setTimeout(() => setIsHit(false), 500);
    
    const newHp = hp - 1;
    setHp(newHp);
    
    if (newHp <= 0) {
      setGameState('gameover');
      return;
    }

    // Move to next attack or round after taking damage
    if (gameState === 'ultimate') {
      // Failed ultimate resets the ultimate? Or just loses 1 hp and tries again.
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
        nextAttack();
      } else {
        handleDamage();
      }
    } else if (gameState === 'ultimate') {
      const nextExpected = BOSS_DATA.ultimate.correctSequence[ultimateProgress.length];
      if (option === nextExpected) {
        const newProgress = [...ultimateProgress, option];
        setUltimateProgress(newProgress);
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
    addRyo(300); // Boss loot
  };

  const startGame = () => {
    setHp(3);
    setRoundIdx(0);
    setAttackIdx(0);
    setUltimateProgress([]);
    setTime(ROUND_TIME);
    setGameState('playing');
  };

  // UI Renderers
  if (gameState === 'intro') {
    return (
      <div className="min-h-screen w-full bg-[#0a0510] text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-xl bg-[#110a1f] p-8 border-4 border-purple-800 shadow-[0_0_30px_rgba(128,0,128,0.5)]">
          <div className="w-32 h-32 mx-auto mb-6 relative shadow-[0_0_15px_rgba(128,0,128,0.8)] border-2 border-purple-500 overflow-hidden rounded-full animate-bounce">
            <img src="/images/boss/ghost.png" alt="O Fantasma da Memória" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
          </div>
          <h1 className="text-4xl font-pixel text-purple-400 mb-2 uppercase drop-shadow-[2px_2px_0_#000]">O Fantasma da Memória</h1>
          <p className="text-gray-300 font-bold mb-6 text-sm uppercase tracking-widest border-b-2 border-purple-900/50 pb-4">Boss Battle: Speed Run</p>
          
          <div className="text-left space-y-4 mb-8 text-sm">
            <p className="text-gray-400"><span className="text-purple-400 font-bold">INFO:</span> O cenário escurece. Uma névoa fria cobre a tela... Ele flutua diante de você, pronto para testar seus reflexos!</p>
            <p className="text-red-400 font-bold"><ShieldAlert className="inline w-4 h-4 mr-1"/> 3 Corações de HP</p>
            <p className="text-orange-400 font-bold"><Zap className="inline w-4 h-4 mr-1"/> 5 Segundos por Ataque!</p>
          </div>

          <button 
            onClick={startGame}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-pixel text-2xl py-4 border-2 border-purple-300 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-all"
          >
            FIGHT!
          </button>
          
          <Link href="/" className="block mt-6 text-gray-500 font-pixel text-sm hover:text-white transition-colors">
            {"< FUGIR COVARDEMENTE"}
          </Link>
        </div>
      </div>
    );
  }

  if (gameState === 'gameover') {
    return (
      <div className="min-h-screen w-full bg-black text-foreground flex flex-col items-center justify-center p-6 relative font-sans">
        <div className="text-center max-w-xl bg-red-950/20 p-8 border-4 border-red-900 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
          <Skull className="w-24 h-24 text-red-600 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
          <h1 className="text-5xl font-pixel text-red-500 mb-4 uppercase drop-shadow-[2px_2px_0_#000]">GAME OVER</h1>
          
          <div className="bg-black/50 p-4 border border-red-900/50 mb-8">
            <p className="text-gray-300 italic mb-4 text-sm leading-relaxed">
              "O Fantasma roubou sua memória de curto prazo. Sua espada ninja transformou-se num ursinho de pelúcia (nuigurumi)."
            </p>
            <p className="text-red-400 font-bold text-xs uppercase tracking-widest">
              PUNIÇÃO: Você deve tentar ler a palavra sangue (ち / chi) três vezes de costas para o espelho antes de tentar novamente.
            </p>
          </div>

          <button 
            onClick={startGame}
            className="w-full bg-red-800 hover:bg-red-700 text-white font-pixel text-2xl py-3 border-2 border-red-400 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-all mb-4"
          >
            TRY AGAIN
          </button>
          <Link href="/" className="block text-gray-500 font-pixel text-sm hover:text-white transition-colors">
            {"< RETORNAR AO DOJO"}
          </Link>
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="min-h-screen w-full bg-[#05100a] text-foreground flex flex-col items-center justify-center p-6 relative font-sans">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black pointer-events-none"></div>
        <div className="relative z-10 text-center max-w-xl bg-[#0a1f11] p-8 border-4 border-emerald-800 shadow-[0_0_30px_rgba(0,255,100,0.3)]">
          <Sparkles className="w-24 h-24 text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,255,100,0.8)]" />
          <h1 className="text-4xl sm:text-5xl font-pixel text-emerald-400 mb-4 uppercase drop-shadow-[2px_2px_0_#000]">PERFECT COMBO!</h1>
          
          <div className="bg-black/50 p-4 border border-emerald-900/50 mb-8 text-left">
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Você derrotou o Fantasma da Memória. O fantasma explode em moedas (おかね / okane). 
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-bold bg-amber-900/20 p-3 border border-amber-900/50 mb-4">
              <Sparkles className="w-5 h-5"/> Loot Adquirido: +300 RC Coins
            </div>
            <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest border-l-2 border-emerald-500 pl-3">
              DESBLOQUEIO: Habilidade "Visão Dupla". Você está autorizado a avançar para a Fase 2 (Katakana)!
            </p>
          </div>

          <Link
            href="/"
            className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-2xl py-3 border-2 border-emerald-300 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-all"
          >
            CONTINUAR JORNADA
          </Link>
        </div>
      </div>
    );
  }

  // --- PLAYING & ULTIMATE STATES ---
  
  const isUltimate = gameState === 'ultimate';
  const currentRound = BOSS_DATA.rounds[roundIdx];
  const currentAttack = currentRound?.attacks[attackIdx];
  
  const timeLimit = isUltimate ? ULTIMATE_TIME : ROUND_TIME;
  const timePercent = (time / timeLimit) * 100;
  
  let timeColor = 'bg-emerald-500';
  if (timePercent < 50) timeColor = 'bg-amber-500';
  if (timePercent < 20) timeColor = 'bg-red-500';

  return (
    <div className={`min-h-[100dvh] w-full bg-[#0a0510] text-foreground flex flex-col font-sans transition-transform duration-75 ${isHit ? 'translate-x-2' : ''}`}>
      {/* Visual Effects */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-100 ${isHit ? 'bg-red-900/30' : 'bg-transparent'}`}></div>
      {isUltimate && (
        <div className="absolute inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-pulse mix-blend-overlay"></div>
      )}
      
      {/* HEADER / HUD */}
      <div className="w-full bg-[#110a1f] border-b-4 border-purple-900/50 p-4 sticky top-0 z-10 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors">
            <XCircle className="w-6 h-6" />
          </Link>
          
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <Heart key={i} className={`w-8 h-8 ${i <= hp ? 'fill-red-500 text-red-500' : 'fill-black text-red-900/50'} drop-shadow-[0_0_5px_rgba(255,0,0,0.5)] transition-all`} />
            ))}
          </div>
        </div>

        {/* TIME BAR */}
        <div className="w-full h-3 bg-black border border-gray-800 rounded-full overflow-hidden">
          <div className={`h-full ${timeColor} transition-all duration-100 ease-linear`} style={{ width: `${timePercent}%` }}></div>
        </div>
      </div>

      {/* COMBAT AREA */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        
        {/* Boss Character / Title */}
        <div className="mb-8 text-center animate-pulse">
          <div className={`w-20 h-20 mx-auto mb-4 relative shadow-[0_0_20px_rgba(128,0,128,0.8)] border-2 ${isUltimate ? 'border-red-500' : 'border-purple-500'} overflow-hidden rounded-full`}>
            <img src="/images/boss/ghost.png" alt="Ghost" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
          </div>
          <h2 className={`font-pixel text-xl sm:text-2xl uppercase tracking-widest ${isUltimate ? 'text-red-400' : 'text-purple-300'}`}>
            {isUltimate ? BOSS_DATA.ultimate.title : currentRound.title}
          </h2>
        </div>

        {/* The Attack Display */}
        <div className={`w-full max-w-lg bg-black/60 border-2 ${isUltimate ? 'border-red-900' : 'border-purple-800'} p-8 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] mb-12 text-center`}>
          {!isUltimate ? (
             <h1 className="text-6xl sm:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
               {currentAttack.kana}
             </h1>
          ) : (
             <div className="flex flex-col gap-4">
               <div className="flex justify-center gap-4 flex-wrap">
                 {BOSS_DATA.ultimate.kanas.map((k, i) => {
                   const isSolved = ultimateProgress.length > i;
                   return (
                     <span key={i} className={`text-3xl sm:text-5xl font-black ${isSolved ? 'text-emerald-500 opacity-50' : 'text-red-100'} transition-colors`}>
                       {k}
                     </span>
                   )
                 })}
               </div>
               <div className="flex justify-center gap-2 mt-4 text-xs font-pixel text-gray-500">
                 {BOSS_DATA.ultimate.correctSequence.map((_, i) => (
                   <div key={i} className={`w-16 h-1 ${i < ultimateProgress.length ? 'bg-emerald-500' : 'bg-red-900/50'}`}></div>
                 ))}
               </div>
             </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="w-full max-w-md grid grid-cols-2 gap-3">
          {(!isUltimate ? currentAttack.options : BOSS_DATA.ultimate.options).map((opt) => {
             const isSelectedInUltimate = isUltimate && ultimateProgress.includes(opt);
             
             return (
               <button
                 key={opt}
                 onClick={() => handleOptionClick(opt)}
                 disabled={isSelectedInUltimate}
                 className={`w-full py-4 px-2 font-pixel sm:text-xl uppercase border-2 text-center transition-transform active:scale-95
                   ${isSelectedInUltimate 
                     ? 'bg-black text-emerald-900 border-emerald-900 opacity-50 cursor-not-allowed' 
                     : isUltimate
                       ? 'bg-[#1a0a0a] border-red-800 text-red-200 hover:bg-red-900 hover:border-red-500'
                       : 'bg-[#110a1f] border-purple-800 text-purple-200 hover:bg-purple-900 hover:border-purple-500'
                   } shadow-[2px_2px_0_#000]`}
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