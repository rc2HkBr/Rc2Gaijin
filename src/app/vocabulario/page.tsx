'use client';

import { useState } from 'react';
import { ChevronLeft, Volume2, Sparkles, RefreshCw, CheckCircle2, Heart, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { sfx } from '@/utils/sfx';

const VOCAB_CARDS = [
  {
    id: 1,
    hiragana: "たべる (ラーメン)",
    romaji: "Taberu (Ramen)",
    meaning: "Comer (Miojo / Ramen)",
    category: "Alimentação & Restauração",
    image: "/images/cards/ramen.png",
    exampleHiragana: "しんのび は ラーメン を たべます。",
    exampleRomaji: "Shinobi wa ramen wo tabemasu.",
    examplePt: "O shinobi come um ramen bem quente no restaurante."
  },
  {
    id: 2,
    hiragana: "でんしゃ",
    romaji: "Densha",
    meaning: "Trem Urbano",
    category: "Transporte & Cidade",
    image: "/images/cards/densha.png",
    exampleHiragana: "でんしゃ で とうきょう へ いきます。",
    exampleRomaji: "Densha de Toukyou he ikimasu.",
    examplePt: "Eu vou para Tóquio de trem todos os dias."
  },
  {
    id: 3,
    hiragana: "ねこ",
    romaji: "Neko",
    meaning: "Gato de Estimação",
    category: "Animais do Cotidiano",
    image: "/images/cards/neko.png",
    exampleHiragana: "ねこ が まち で ねています。",
    exampleRomaji: "Neko ga machi de netemasu.",
    examplePt: "O gato dorme tranquilamente na rua ensolarada."
  },
  {
    id: 4,
    hiragana: "ほん",
    romaji: "Hon",
    meaning: "Livro / Leitura",
    category: "Estudo & Cultura",
    image: "/images/cards/hon.png",
    exampleHiragana: "わたし は ほん を よみます。",
    exampleRomaji: "Watashi wa hon wo yomimasu.",
    examplePt: "Eu leio um livro interessante na livraria."
  },
  {
    id: 5,
    hiragana: "こーひー (のむ)",
    romaji: "Ko-hi- (Nomu)",
    meaning: "Café (Beber)",
    category: "Bebidas & Cafeteria",
    image: "/images/cards/coffee.png",
    exampleHiragana: "つめたい こーひー を のみます。",
    exampleRomaji: "Tsumetai ko-hi- wo nomimasu.",
    examplePt: "Bebo um café gelado na frente da cafeteria de Tóquio."
  }
];

export default function EverydayVocabularyCardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedCount, setLearnedCount] = useState(0);

  const currentCard = VOCAB_CARDS[currentIndex];

  const handleFlip = () => {
    sfx.playClick();
    setIsFlipped(!isFlipped);
  };

  const speakText = (text: string) => {
    sfx.playClick();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = (mastered: boolean) => {
    sfx.playSuccess();
    if (mastered) setLearnedCount(c => c + 1);
    setIsFlipped(false);
    setCurrentIndex(i => (i + 1) % VOCAB_CARDS.length);
  };

  return (
    <div className="min-h-screen w-full bg-[#07030d] text-foreground flex flex-col items-center select-none pb-28 font-sans relative z-10">
      
      {/* HEADER */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-cyan-400 hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
              VOCABULÁRIO DO COTIDIANO
            </h1>
            <p className="text-[10px] text-cyan-300 font-bold uppercase">
              Cartões Ilustrados — Vida Normal em Tóquio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-purple-950/80 border border-purple-600/50 px-3 py-1 rounded-full text-xs font-black text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>{learnedCount}/{VOCAB_CARDS.length} Dominados</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-xl px-4 mt-6 flex flex-col items-center gap-6">
        
        {/* Progress Bar */}
        <div className="w-full bg-[#120722] border border-purple-900/60 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / VOCAB_CARDS.length) * 100}%` }}
          />
        </div>

        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
          Carta {currentIndex + 1} de {VOCAB_CARDS.length} — {currentCard.category}
        </div>

        {/* ── 3D FLIP CARD ── */}
        <div 
          onClick={handleFlip}
          className="w-full h-[450px] cursor-pointer perspective-1000 relative group"
        >
          <div className={`w-full h-full duration-500 transition-transform transform-style-3d relative rounded-3xl border-2 ${
            isFlipped ? 'rotate-y-180 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-[#0b1626]' : 'border-purple-600/70 shadow-[0_0_25px_rgba(168,85,247,0.25)] bg-[#120722]'
          }`}>
            
            {/* ── FRONT FACE ── */}
            <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between items-center text-center">
              
              {/* Illustration */}
              <div className="w-full h-56 rounded-2xl border-2 border-purple-500/50 overflow-hidden bg-black relative shadow-md">
                <img 
                  src={currentCard.image} 
                  alt={currentCard.meaning} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                />
                <div className="absolute top-2 right-2 bg-black/70 border border-purple-400/60 px-2 py-0.5 rounded-full text-[10px] font-bold text-cyan-300 uppercase">
                  Cena do Cotidiano
                </div>
              </div>

              {/* Word Display */}
              <div className="my-auto space-y-1">
                <h2 className="text-4xl font-black text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                  {currentCard.hiragana}
                </h2>
                <p className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                  {currentCard.romaji}
                </p>
              </div>

              {/* Pronunciation & Flip hint */}
              <div className="w-full flex justify-between items-center pt-3 border-t border-purple-900/50 text-xs font-bold text-gray-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(currentCard.hiragana);
                  }}
                  className="flex items-center gap-1.5 text-cyan-300 hover:text-white bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/50"
                >
                  <Volume2 className="w-4 h-4" /> Ouvir Áudio
                </button>
                <span className="text-[11px] text-purple-300 animate-pulse">Toque para ver a tradução 🔄</span>
              </div>
            </div>

            {/* ── BACK FACE ── */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 p-6 flex flex-col justify-between items-center text-center">
              
              <div className="w-full space-y-2">
                <span className="text-[10px] font-black text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/50 uppercase">
                  TRADUÇÃO & FRASE PRÁTICA
                </span>
                <h2 className="text-3xl font-black text-white pt-2">
                  {currentCard.meaning}
                </h2>
              </div>

              {/* Example Sentence Box */}
              <div className="w-full bg-[#050c17] border border-cyan-500/40 p-4 rounded-2xl text-left space-y-2 shadow-inner">
                <span className="text-[10px] font-bold text-cyan-300 uppercase block">Frase no Dia a Dia:</span>
                <p className="text-lg font-black text-white">{currentCard.exampleHiragana}</p>
                <p className="text-xs font-bold text-cyan-400">{currentCard.exampleRomaji}</p>
                <p className="text-xs text-gray-300 italic border-t border-cyan-900/50 pt-1">"{currentCard.examplePt}"</p>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex gap-3 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext(false);
                  }}
                  className="flex-1 bg-purple-950 hover:bg-purple-900 border border-purple-600 text-purple-200 font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider"
                >
                  Revisar Depois 🔄
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext(true);
                  }}
                  className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-md"
                >
                  Memorizado! ✅
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
