'use client';

import { X, Volume2, Grid } from 'lucide-react';
import { HIRAGANA_GROUPS } from '@/data/hiraganaData';
import { playJapaneseAudio } from '@/utils/audio';

interface HiraganaChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HiraganaChartModal({ isOpen, onClose }: HiraganaChartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border-2 border-border rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Grid className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Tabela Completa do Hiragana</h2>
              <p className="text-xs sm:text-sm text-gray-500">Toque em qualquer ideograma para ouvir o som nativo!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-foreground hover:bg-border rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {HIRAGANA_GROUPS.map((group) => (
            <div key={group.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${group.color}`}></span>
                <h3 className="font-bold text-lg text-foreground">{group.name}</h3>
                <span className="text-xs text-gray-400 font-medium">({group.description})</span>
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
                {group.characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => playJapaneseAudio(char.hiragana)}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-background border-2 border-border hover:border-primary hover:bg-primary/5 active:scale-95 transition-all group relative"
                  >
                    <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {char.hiragana}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-secondary">
                      {char.romaji}
                    </span>
                    <Volume2 className="w-3 h-3 text-primary/40 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-background/50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-6 rounded-xl uppercase text-sm border-b-4 border-black/20 active:border-b-0 active:translate-y-0.5 transition-all"
          >
            Fechar Tabela
          </button>
        </div>
      </div>
    </div>
  );
}
