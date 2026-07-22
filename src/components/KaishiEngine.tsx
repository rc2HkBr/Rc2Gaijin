'use client';

import { useState } from 'react';
import { KAISHI_DECK } from '@/data/kaishiData';
import { X, Check, Zap, Heart, Coins, ArrowRight, ShieldAlert, PenTool } from 'lucide-react';
import Link from 'next/link';

export default function KaishiEngine() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [ryo, setRyo] = useState(0);
  const [hearts, setHearts] = useState(3);
  
  const currentCard = KAISHI_DECK[index];
  const isFinished = index >= KAISHI_DECK.length || hearts <= 0;

  const handleReveal = () => setRevealed(true);

  const handleScore = (quality: 'wrong' | 'correct' | 'critical') => {
    if (quality === 'wrong') {
      setHearts(h => h - 1);
    } else if (quality === 'correct') {
      setScore(s => s + 20);
      setRyo(r => r + 10);
    } else if (quality === 'critical') {
      // Dobro de dano/XP pelo Pitch Accent!
      setScore(s => s + 40);
      setRyo(r => r + 20);
    }
    
    setRevealed(false);
    setIndex(i => i + 1);
  };

  if (isFinished) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
        <h2 className="text-3xl font-black mb-6">
          {hearts > 0 ? 'Fase Concluída!' : 'Missão Falhou...'}
        </h2>
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-surface border-2 border-border p-4 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">XP Ganho</span>
            <span className="text-2xl font-black text-secondary">+{score} XP</span>
          </div>
          <div className="bg-surface border-2 border-border p-4 rounded-2xl flex flex-col items-center">
            <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Ouro (Ryō)</span>
            <span className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Coins className="w-5 h-5 fill-amber-500" /> +{ryo}
            </span>
          </div>
        </div>
        <Link href="/" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl uppercase text-lg border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all">
          Retornar ao Mapa
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center p-4 sm:p-8 max-w-xl mx-auto w-full">
      {/* HUD Local */}
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/" className="text-gray-400 hover:text-foreground">
          <X className="w-8 h-8" />
        </Link>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-red-500 font-bold">
            <Heart className="w-5 h-5 fill-red-500" /> {hearts}/3
          </div>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold">
            <Coins className="w-5 h-5 fill-amber-500" /> {ryo}
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-between text-xs font-bold text-orange-500 mb-2 uppercase tracking-widest">
        <span>O Segredo dos Símbolos</span>
        <span>{index + 1} / {KAISHI_DECK.length}</span>
      </div>

      {/* Card */}
      <div className="w-full flex-1 bg-surface border-4 border-border rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center relative shadow-lg mb-8">
        {/* Modo Ferreiro: Botão de Edição mock */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold uppercase bg-border/50 px-2 py-1 rounded-lg">
          <PenTool className="w-4 h-4" /> Editar
        </button>

        <h1 className="text-6xl sm:text-8xl font-black text-foreground mb-4 drop-shadow-sm">
          {currentCard.kanji}
        </h1>
        
        {revealed ? (
          <div className="animate-fade-in w-full space-y-6 mt-4">
            <div className="space-y-1">
              <p className="text-xl font-bold text-gray-500">{currentCard.furigana}</p>
              <p className="text-3xl font-black text-primary">{currentCard.meaning}</p>
            </div>
            
            <div className="bg-background rounded-2xl p-4 border-2 border-border text-left">
              <span className="text-[10px] uppercase font-black text-purple-500 mb-1 block">Ataque Crítico (Pitch Accent)</span>
              <p className="font-bold text-foreground text-lg">{currentCard.pitchAccent}</p>
            </div>

            <div className="bg-background rounded-2xl p-4 border-2 border-border text-left">
              <span className="text-[10px] uppercase font-black text-blue-500 mb-1 block">Contexto (Frase)</span>
              <p className="font-bold text-foreground mb-1">{currentCard.sentence}</p>
              <p className="text-sm text-gray-500">{currentCard.sentenceTranslation}</p>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-gray-400 font-medium flex items-center gap-2">
            Qual o significado e a leitura?
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="w-full mt-auto">
        {!revealed ? (
          <button
            onClick={handleReveal}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl text-xl uppercase tracking-wider shadow-lg border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all"
          >
            Revelar Resposta
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full">
            <button
              onClick={() => handleScore('wrong')}
              className="flex flex-col items-center justify-center bg-surface border-2 border-red-500 hover:bg-red-500/10 text-red-500 font-bold py-3 sm:py-4 rounded-2xl transition-colors"
            >
              <X className="w-6 h-6 mb-1" />
              <span className="text-xs sm:text-sm">Errei</span>
            </button>
            <button
              onClick={() => handleScore('correct')}
              className="flex flex-col items-center justify-center bg-success hover:bg-success-dark text-white font-bold py-3 sm:py-4 rounded-2xl border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all"
            >
              <Check className="w-6 h-6 mb-1" />
              <span className="text-xs sm:text-sm">Acertei</span>
            </button>
            <button
              onClick={() => handleScore('critical')}
              className="flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 rounded-2xl border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
              <Zap className="w-6 h-6 mb-1 fill-white" />
              <span className="text-xs sm:text-sm">Crítico!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
