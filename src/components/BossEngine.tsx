'use client';

import { useState, useEffect } from 'react';
import { Skull, Heart, ShieldAlert, Zap, X, Coins } from 'lucide-react';
import Link from 'next/link';
import { ALL_HIRAGANA_CHARACTERS } from '@/data/hiraganaData';
import { playFeedbackSound } from '@/utils/audio';

export default function BossEngine() {
  const [bossHp, setBossHp] = useState(1000);
  const [playerHp, setPlayerHp] = useState(3);
  const [timeLeft, setTimeLeft] = useState(3);
  const [currentWord, setCurrentWord] = useState(ALL_HIRAGANA_CHARACTERS[0]);
  const [choices, setChoices] = useState<string[]>([]);
  const [status, setStatus] = useState<'PLAYING' | 'VICTORY' | 'DEFEAT' | 'INTRO'>('INTRO');
  const [shake, setShake] = useState(false);
  const [damageText, setDamageText] = useState<string | null>(null);
  
  const BOSS_MAX_HP = 1000;

  // Generate question
  const generateQuestion = () => {
    const randomChar = ALL_HIRAGANA_CHARACTERS[Math.floor(Math.random() * ALL_HIRAGANA_CHARACTERS.length)];
    setCurrentWord(randomChar);

    const wrongChars = ALL_HIRAGANA_CHARACTERS.filter(c => c.id !== randomChar.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const newChoices = [randomChar.romaji, ...wrongChars.map(c => c.romaji)].sort(() => 0.5 - Math.random());
    setChoices(newChoices);
    setTimeLeft(3); // 3 seconds per question!
  };

  useEffect(() => {
    if (status === 'INTRO') return;
    
    if (bossHp <= 0) {
      setStatus('VICTORY');
      playFeedbackSound('complete');
      return;
    }
    if (playerHp <= 0) {
      setStatus('DEFEAT');
      playFeedbackSound('wrong');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 0) {
          handleTimeout();
          return 3;
        }
        return t - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [status, bossHp, playerHp]);

  const handleTimeout = () => {
    setPlayerHp(h => h - 1);
    playFeedbackSound('wrong');
    triggerShake();
    generateQuestion();
  };

  const handleChoice = (choice: string) => {
    if (choice === currentWord.romaji) {
      const damage = Math.floor(Math.random() * 50) + 50; // 50-100 damage
      setBossHp(h => Math.max(0, h - damage));
      setDamageText(`-${damage}`);
      playFeedbackSound('correct');
      setTimeout(() => setDamageText(null), 500);
      generateQuestion();
    } else {
      setPlayerHp(h => h - 1);
      playFeedbackSound('wrong');
      triggerShake();
      generateQuestion();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  const startBattle = () => {
    setStatus('PLAYING');
    generateQuestion();
  };

  if (status === 'INTRO') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto relative z-10 w-full">
        <div className="w-32 h-32 rounded-2xl rotate-45 bg-purple-600 border-b-[8px] border-black/30 flex items-center justify-center shadow-2xl mb-8">
          <Skull className="w-16 h-16 text-white -rotate-45 animate-pulse" />
        </div>
        <h1 className="text-3xl font-black text-purple-500 mb-2">O Fantasma da Memória</h1>
        <p className="text-gray-400 mb-8 font-medium">
          Ele se alimenta da sua hesitação. Você tem apenas <span className="text-primary font-bold">3 segundos</span> para ler cada caractere!
        </p>
        <button
          onClick={startBattle}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl uppercase tracking-wider text-lg border-b-4 border-black/30 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 fill-white" /> Iniciar Combate
        </button>
      </div>
    );
  }

  if (status === 'VICTORY' || status === 'DEFEAT') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
        <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 shadow-lg ${status === 'VICTORY' ? 'bg-amber-500/10 border-amber-500' : 'bg-red-500/10 border-red-500'}`}>
          {status === 'VICTORY' ? <Skull className="w-16 h-16 text-amber-500 opacity-50" /> : <ShieldAlert className="w-16 h-16 text-red-500" />}
        </div>
        <h2 className="text-4xl font-black text-foreground mb-2">
          {status === 'VICTORY' ? 'VITÓRIA ÉPICA!' : 'VOCÊ CAIU...'}
        </h2>
        <p className="text-gray-500 mb-8">
          {status === 'VICTORY' ? 'O Fantasma foi exorcizado pela sua leitura veloz!' : 'Seus reflexos não foram rápidos o suficiente desta vez.'}
        </p>

        {status === 'VICTORY' && (
          <div className="bg-surface border-2 border-amber-500/50 p-4 rounded-2xl flex flex-col items-center w-full mb-8">
            <span className="text-xs text-amber-600 uppercase font-black tracking-wider block mb-1">Loot Chefe Derrotado</span>
            <span className="text-3xl font-black text-amber-500 flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 fill-amber-500" /> +500 Ryō
            </span>
            <span className="text-sm font-bold text-success mt-2">+ Visão Dupla Desbloqueada</span>
          </div>
        )}

        <Link
          href="/"
          className="w-full bg-surface border-2 border-border hover:bg-border text-foreground font-bold py-4 px-8 rounded-2xl uppercase tracking-wider text-lg transition-all"
        >
          Voltar ao Mapa
        </Link>
      </div>
    );
  }

  // PLAYING STATE
  return (
    <div className={`h-full flex flex-col items-center p-4 sm:p-8 max-w-lg mx-auto w-full transition-transform ${shake ? 'translate-x-2 -translate-x-2' : ''}`}>
      
      {/* Header Info */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/" className="text-gray-400 hover:text-foreground">
          <X className="w-8 h-8" />
        </Link>
        <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-xl text-red-500 font-bold">
          <Heart className="w-5 h-5 fill-red-500" /> HP: {playerHp}/3
        </div>
      </div>

      {/* BOSS HP BAR */}
      <div className="w-full mb-8 relative">
        <div className="flex justify-between text-xs font-bold text-purple-500 mb-1">
          <span>FANTASMA DA MEMÓRIA</span>
          <span>{bossHp} / {BOSS_MAX_HP}</span>
        </div>
        <div className="w-full h-4 bg-border rounded-full overflow-hidden border-2 border-surface">
          <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${(bossHp / BOSS_MAX_HP) * 100}%` }}></div>
        </div>
        
        {/* Floating Damage Text */}
        {damageText && (
          <div className="absolute -top-6 right-0 text-xl font-black text-amber-500 animate-bounce">
            {damageText}
          </div>
        )}
      </div>

      {/* Main Enemy (Word) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
        
        {/* Rapid Timer Bar */}
        <div className="w-full max-w-xs h-2 bg-border rounded-full mb-8 overflow-hidden">
           <div className={`h-full transition-all duration-100 ${timeLeft < 1 ? 'bg-red-500' : 'bg-success'}`} style={{ width: `${(timeLeft / 3) * 100}%` }}></div>
        </div>

        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-surface border-4 border-purple-500/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] mb-8 animate-pulse">
          <span className="text-7xl sm:text-9xl font-black text-foreground drop-shadow-lg">
            {currentWord.hiragana}
          </span>
        </div>
      </div>

      {/* Attack Choices */}
      <div className="grid grid-cols-2 gap-3 w-full mt-auto">
        {choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleChoice(choice)}
            className="bg-surface border-2 border-border hover:border-purple-500 hover:bg-purple-500/10 text-foreground font-black py-6 rounded-2xl text-2xl uppercase transition-all shadow-sm active:scale-95"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
