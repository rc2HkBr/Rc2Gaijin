'use client';

import { useState, useEffect, useCallback } from 'react';
import { Skull, Heart, Zap, Terminal, AlertTriangle, ShieldAlert, Sparkles, ChevronLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { sfx } from '@/utils/sfx';

type BattlePose = 'idle' | 'hit' | 'attack' | 'victory' | 'gameover';

const SHOGUN_ATTACKS = [
  { kana: 'かたな', answer: 'Espada Katana', options: ['Espada Katana', 'Escudo', 'Lança', 'Arco'] },
  { kana: 'かみなり', answer: 'Relâmpago / Trovão', options: ['Fogo', 'Relâmpago / Trovão', 'Vento', 'Água'] },
  { kana: 'よろい', answer: 'Armadura', options: ['Elmo', 'Manta', 'Armadura', 'Sapatos'] },
  { kana: 'あらし', answer: 'Tempestade', options: ['Chuva', 'Sol', 'Tempestade', 'Nuvem'] },
  { kana: 'しょうぐん', answer: 'Shogun (Comandante)', options: ['Shinobi', 'Shogun (Comandante)', 'Camponês', 'Monge'] },
  { kana: 'てんくう', answer: 'Céu / Firmamento', options: ['Mar', 'Terra', 'Céu / Firmamento', 'Montanha'] },
];

/* ── Rain Canvas Effect ── */
const TorrentialRain = () => (
  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-30">
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 bg-gradient-to-b from-transparent via-cyan-300 to-transparent"
        style={{
          left: `${Math.random() * 100}%`,
          height: `${30 + Math.random() * 60}px`,
          top: `${Math.random() * 100}%`,
          animation: `rain ${0.6 + Math.random() * 0.8}s linear infinite`,
          animationDelay: `${Math.random() * 1.5}s`,
        }}
      />
    ))}
    <style jsx>{`
      @keyframes rain {
        0% { transform: translateY(-100%) rotate(15deg); opacity: 0; }
        50% { opacity: 0.9; }
        100% { transform: translateY(100vh) rotate(15deg); opacity: 0; }
      }
    `}</style>
  </div>
);

export default function ShogunRaijinBossPage() {
  const { addRyo, takeDamage, hp: globalHp } = useGame();
  
  const [pose, setPose] = useState<BattlePose>('idle');
  const [shogunHp, setShogunHp] = useState(10);
  const [attackIdx, setAttackIdx] = useState(0);
  const [time, setTime] = useState(40); // 4.0s
  const [lightningFlash, setLightningFlash] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [screenRedFlash, setScreenRedFlash] = useState(false);
  const [sparks, setSparks] = useState(false);

  const currentAttack = SHOGUN_ATTACKS[attackIdx] || SHOGUN_ATTACKS[0];

  // Random Lightning Flash Effect
  useEffect(() => {
    const flashInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 150);
      }
    }, 4000);
    return () => clearInterval(flashInterval);
  }, []);

  // Timer Tick
  useEffect(() => {
    if (pose !== 'idle' && pose !== 'hit') return;
    if (time <= 0) {
      handleTimeOut();
      return;
    }
    const timerId = setInterval(() => setTime(t => t - 1), 100);
    return () => clearInterval(timerId);
  }, [time, pose]);

  // Handle Timeout or Wrong Answer
  const handleTimeOut = useCallback(() => {
    setPose('attack');
    setScreenShake(true);
    setScreenRedFlash(true);
    sfx.playAlarm();
    takeDamage();

    setTimeout(() => {
      setScreenShake(false);
      setScreenRedFlash(false);

      if (globalHp <= 1) {
        setPose('gameover');
      } else {
        nextQuestion();
      }
    }, 1200);
  }, [globalHp, takeDamage]);

  const nextQuestion = () => {
    if (attackIdx + 1 < SHOGUN_ATTACKS.length) {
      setAttackIdx(i => i + 1);
      setTime(40);
      setPose('idle');
    } else {
      handleVictory();
    }
  };

  const handleOptionClick = (option: string) => {
    if (pose !== 'idle') return;

    if (option === currentAttack.answer) {
      // Hit Shogun!
      setPose('hit');
      setSparks(true);
      sfx.playSuccess();
      setShogunHp(h => Math.max(0, h - 2));

      setTimeout(() => {
        setSparks(false);
        if (shogunHp <= 2) {
          handleVictory();
        } else {
          nextQuestion();
        }
      }, 700);

    } else {
      // Shogun Counter Attack!
      handleTimeOut();
    }
  };

  const handleVictory = () => {
    setPose('victory');
    setShogunHp(0);
    addRyo(500);
    sfx.playSuccess();
  };

  const startBattle = () => {
    setShogunHp(10);
    setAttackIdx(0);
    setTime(40);
    setPose('idle');
    sfx.playAlarm();
  };

  return (
    <div className={`min-h-screen w-full bg-[#03070d] text-foreground flex flex-col font-sans relative overflow-hidden select-none transition-transform duration-75 ${screenShake ? 'translate-x-3 translate-y-1' : ''}`}>
      
      <TorrentialRain />

      {/* Lightning Flash Background */}
      <div className={`absolute inset-0 bg-cyan-100 pointer-events-none z-30 transition-opacity duration-150 ${lightningFlash ? 'opacity-30' : 'opacity-0'}`} />

      {/* Screen Red Flash on Take Damage */}
      <div className={`absolute inset-0 bg-red-600/70 pointer-events-none z-40 transition-opacity duration-150 ${screenRedFlash ? 'opacity-100' : 'opacity-0'}`} />

      {/* Sparks Overlay */}
      {sparks && (
        <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center">
          <span className="text-6xl animate-ping">⚡💥⚡</span>
        </div>
      )}

      {/* ── HEADER HUD ── */}
      <div className="w-full bg-[#070e18]/90 border-b border-cyan-500/50 p-4 sticky top-0 z-30 shadow-lg backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-1 text-cyan-400 hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
            <span className="text-xs font-black uppercase hidden sm:inline">QG Shinobi</span>
          </Link>

          {/* Shinobi HP */}
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
            <span className="font-black text-sm text-white">Shinobi HP: {globalHp}/3</span>
          </div>

          {/* Shogun HP Bar */}
          <div className="flex-1 max-w-xs">
            <div className="flex justify-between items-center text-[10px] font-black text-cyan-300 uppercase mb-1">
              <span>⚡ SHOGUN RAIJIN</span>
              <span>{shogunHp}/10 HP</span>
            </div>
            <div className="h-3 bg-black border border-cyan-500/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 rounded-full" 
                style={{ width: `${(shogunHp / 10) * 100}%` }}
              />
            </div>
          </div>

        </div>

        {/* Rapid Question Timer Bar */}
        {(pose === 'idle' || pose === 'hit') && (
          <div className="w-full max-w-4xl mx-auto h-2 bg-black border border-cyan-800 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${(time / 40) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* ── BATTLE ARENA (KATSUHIRO OTOMO AKIRA STYLE) ── */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-between relative z-20">
        
        {/* EVENT BANNER / STATUS */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]">
          <AlertTriangle className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>EVENTO DE FIM DE SEMANA: INVASÃO TEMPESTADE</span>
        </div>

        {/* ── SHOGUN RAIJIN SPRITE & POSES ── */}
        <div className="relative w-full max-w-md h-72 sm:h-80 my-3 flex items-center justify-center">
          
          {/* Background Aura */}
          <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
            pose === 'attack' ? 'bg-red-600/30 blur-2xl' : pose === 'hit' ? 'bg-cyan-500/30 blur-2xl' : 'bg-blue-900/20 blur-xl'
          }`} />

          {/* Shogun Portrait */}
          <div className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl border-4 overflow-hidden shadow-2xl transition-all duration-200 ${
            pose === 'attack' 
              ? 'border-red-500 scale-110 shadow-[0_0_40px_rgba(239,68,68,0.8)]' 
              : pose === 'hit' 
              ? 'border-cyan-400 scale-95 shadow-[0_0_30px_rgba(6,182,212,0.8)]' 
              : 'border-cyan-500/80 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
          }`}>
            <img 
              src="/images/boss/shogun.png" 
              alt="Shogun Raijin" 
              className={`w-full h-full object-cover object-top transition-transform duration-200 ${
                pose === 'hit' ? 'brightness-150 contrast-200 hue-rotate-90' : 'brightness-100'
              }`}
            />

            {/* Glowing Red visor eye effect */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full blur-xs shadow-[0_0_15px_rgba(255,0,0,1)] animate-ping pointer-events-none" />

            {/* Pose Overlay Badges */}
            {pose === 'attack' && (
              <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center font-black text-2xl text-red-300 uppercase tracking-widest animate-bounce">
                ⚔ ATTACK! -1 HP
              </div>
            )}
            {pose === 'hit' && (
              <div className="absolute inset-0 bg-cyan-950/60 flex items-center justify-center font-black text-2xl text-cyan-300 uppercase tracking-widest">
                💥 DAMAGE! -2 HP
              </div>
            )}
          </div>
        </div>

        {/* ── BATTLE CONTROLS / STATES ── */}

        {/* GAME OVER STATE */}
        {pose === 'gameover' && (
          <div className="w-full bg-[#1c0404] border-2 border-red-500 rounded-3xl p-6 text-center space-y-4 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-fade-in">
            <h2 className="text-3xl font-black text-red-500 uppercase">
              DERROTADO PELO SHOGUN!
            </h2>
            <p className="text-sm text-gray-300 font-medium italic max-w-md mx-auto">
              "Você não está pronto. Estude mais no Módulo 01 para enfrentar a fúria da tempestade!"
            </p>
            <button
              onClick={startBattle}
              className="bg-red-600 hover:bg-red-500 text-white font-black text-sm px-8 py-3 rounded-2xl uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              DESAFIAR NOVAMENTE
            </button>
          </div>
        )}

        {/* VICTORY STATE */}
        {pose === 'victory' && (
          <div className="w-full bg-[#061e14] border-2 border-emerald-400 rounded-3xl p-6 text-center space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-fade-in">
            <Sparkles className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
            <h2 className="text-3xl font-black text-emerald-400 uppercase">
              SHOGUN DESTRUÍDO!
            </h2>
            <p className="text-sm text-emerald-200 font-medium">
              Você dominou a leitura acelerada em Kanji e ganhou <strong className="text-amber-400">+500 Ryō</strong>!
            </p>
            <Link
              href="/"
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm px-8 py-3 rounded-2xl uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              COLETAR RECOMPENSA & VOLTAR
            </Link>
          </div>
        )}

        {/* IDLE / ACTIVE QUESTION STATE */}
        {(pose === 'idle' || pose === 'hit') && (
          <div className="w-full space-y-4">
            
            {/* Target Kanji Box */}
            <div className="w-full bg-[#0a1220] border-2 border-cyan-500/60 rounded-3xl p-6 text-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                QUAL A TRADUÇÃO CORRETA?
              </span>
              <h1 className="text-5xl sm:text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                {currentAttack.kana}
              </h1>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentAttack.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  className="bg-[#0e1a2b] hover:bg-cyan-600 hover:text-black text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl border border-cyan-500/50 transition-all active:scale-95 shadow-md"
                >
                  {opt}
                </button>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
