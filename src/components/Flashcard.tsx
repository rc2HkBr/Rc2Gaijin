'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { playJapaneseAudio } from '@/utils/audio';

interface FlashcardProps {
  romaji: string;
  hiragana: string;
  exampleWord: string;
  exampleMeaning: string;
  exampleRomaji: string;
  strokeCount?: number;
}

export default function Flashcard({
  romaji,
  hiragana,
  exampleWord,
  exampleMeaning,
  exampleRomaji,
  strokeCount = 2,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    playJapaneseAudio(hiragana);
  };

  return (
    <div
      className="w-full max-w-sm aspect-[3/4] mx-auto cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full bg-surface border-2 border-border rounded-3xl p-6 flex flex-col items-center justify-between shadow-md hover:border-primary/50 transition-colors"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500" /> Novo Card
            </span>
            <div className="flex gap-2">
              <button
                className="p-3 rounded-2xl hover:bg-gray-100 text-gray-400 transition-colors"
                title="Editar"
              >
                <PenTool className="w-5 h-5" />
              </button>
              <button
                onClick={handleAudio}
                className="p-3 rounded-2xl bg-secondary/10 hover:bg-secondary/20 text-secondary transition-transform active:scale-95"
                title="Ouvir Pronúncia"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="text-9xl font-extrabold text-foreground my-auto select-none tracking-wider">
            {hiragana}
          </div>

          <div className="flex items-center gap-2 text-gray-400 font-semibold text-sm">
            <RefreshCw className="w-4 h-4" /> Toque para revelar significado
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-surface border-2 border-primary rounded-3xl p-6 flex flex-col items-center justify-between shadow-xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {strokeCount} Traço{strokeCount > 1 ? 's' : ''}
            </span>
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center my-auto">
            <div className="text-7xl font-bold text-foreground mb-2">{hiragana}</div>
            <div className="text-4xl font-black text-primary tracking-widest">{romaji.toUpperCase()}</div>

            <div className="w-full max-w-[200px] border-b-2 border-border my-4"></div>

            <div className="bg-background border border-border rounded-2xl px-6 py-4 text-center w-full">
              <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Exemplo de Palavra:</span>
              <div className="text-2xl font-bold text-foreground">{exampleWord}</div>
              <div className="text-sm font-semibold text-secondary">{exampleRomaji}</div>
              <div className="text-xs font-medium text-gray-500 mt-1">{exampleMeaning}</div>
            </div>
          </div>

          <div className="text-xs text-gray-400 font-medium">Toque para desvirar</div>
        </div>
      </motion.div>
    </div>
  );
}
