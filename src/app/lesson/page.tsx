'use client';
import { useState } from 'react';
import { X, Heart } from 'lucide-react';
import Link from 'next/link';
import Flashcard from '@/components/Flashcard';

const cards = [
  { id: 1, hiragana: 'か', romaji: 'ka', word: 'かさ (kasa)', meaning: 'guarda-chuva', imageSrc: '/images/ka.png' },
  { id: 2, hiragana: 'き', romaji: 'ki', word: 'き (ki)', meaning: 'árvore', imageSrc: '/images/ki.png' },
  { id: 3, hiragana: 'く', romaji: 'ku', word: 'くま (kuma)', meaning: 'urso', imageSrc: '/images/ku.png' },
  { id: 4, hiragana: 'け', romaji: 'ke', word: 'けん (ken)', meaning: 'espada', imageSrc: '/images/ke.png' },
  { id: 5, hiragana: 'こ', romaji: 'ko', word: 'こねこ (koneko)', meaning: 'gatinho', imageSrc: '/images/ko.png' },
];

export default function Lesson() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const progress = ((currentIndex + 1) / cards.length) * 100;
  const currentCard = cards[currentIndex];

  return (
    <div className="h-full flex flex-col bg-background p-4 sm:p-8 max-w-3xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-8">
        <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-8 h-8" />
        </Link>
        <div className="flex-1 bg-border h-4 rounded-full overflow-hidden">
          <div className="bg-success h-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center text-primary font-bold text-xl">
          <Heart className="w-8 h-8 fill-primary mr-2" /> 5
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center py-4 sm:py-8 w-full">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Novo caractere</h2>
        <div className="w-full max-w-sm">
          <Flashcard key={currentCard.id} {...currentCard} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 sm:pt-8 flex justify-center">
        <button 
          onClick={handleNext}
          className="w-full sm:w-auto min-w-[250px] bg-success hover:bg-success-dark text-white font-bold py-4 px-8 rounded-2xl uppercase tracking-wider text-lg border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all"
        >
          {currentIndex === cards.length - 1 ? 'Concluir' : 'Continuar'}
        </button>
      </div>
    </div>
  );
}
