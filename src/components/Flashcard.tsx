'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface FlashcardProps {
  romaji: string;
  hiragana: string;
  word: string;
  meaning: string;
  imageSrc: string;
}

export default function Flashcard({ romaji, hiragana, word, meaning, imageSrc }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm aspect-[3/4] mx-auto cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)} style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-surface border-2 border-border rounded-2xl p-6 flex flex-col items-center justify-between shadow-sm hover:border-primary/50 transition-colors" style={{ backfaceVisibility: 'hidden' }}>
          <div className="text-9xl font-bold text-foreground mt-12">{hiragana}</div>
          <div className="text-gray-400 font-semibold mb-6 text-xl">Clique para revelar</div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-surface border-2 border-primary rounded-2xl p-6 flex flex-col items-center shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div className="text-7xl font-bold text-foreground mt-4">{hiragana}</div>
          <div className="w-full border-b-2 border-border my-6"></div>
          <div className="text-4xl font-bold text-primary">{romaji}</div>
          <div className="text-xl text-gray-500 font-medium mt-3 text-center">{word}<br/>{meaning}</div>
          
          <div className="mt-auto relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
            <Image src={imageSrc} alt={meaning} fill className="object-contain drop-shadow-md" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
