'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Sword, Plus, ChevronLeft, Volume2, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { sfx } from '@/utils/sfx';

type DictEntry = {
  id: string;
  kanji: string | null;
  reading: string;
  romaji: string | null;
  meaningPt: string;
  jlptLevel: number | null;
  isCommon: boolean;
};

export default function BancoKanjiPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DictEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchResults = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dictionary/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error('Failed to fetch dictionary', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWord = async (id: string) => {
    sfx.playSuccess();
    setSavedWords(prev => ({ ...prev, [id]: true }));
    try {
      await fetch('/api/dictionary/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wordId: id })
      });
    } catch (err) {
      console.error('Failed to save word', err);
      setSavedWords(prev => ({ ...prev, [id]: false }));
    }
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

  const getRarityTag = (level: number | null) => {
    switch (level) {
      case 5: return { label: 'Comum (N5)', color: 'text-gray-300 border-gray-600 bg-gray-900' };
      case 4: return { label: 'Incomum (N4)', color: 'text-green-400 border-green-600 bg-green-950' };
      case 3: return { label: 'Raro (N3)', color: 'text-blue-400 border-blue-600 bg-blue-950' };
      case 2: return { label: 'Épico (N2)', color: 'text-purple-400 border-purple-600 bg-purple-950' };
      case 1: return { label: 'Lendário (N1)', color: 'text-amber-400 border-amber-500 bg-amber-950 shadow-[0_0_10px_rgba(251,191,36,0.3)]' };
      default: return { label: 'Desconhecido', color: 'text-gray-400 border-gray-700 bg-gray-950' };
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07030d] text-foreground flex flex-col items-center pb-28 font-sans">
      
      {/* HEADER */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center px-4 sm:px-8 sticky top-0 z-40 shadow-md">
        <Link href="/" className="text-cyan-400 hover:text-white transition-colors mr-4" onClick={() => sfx.playClick()}>
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> BANCO KANJI
          </h1>
          <p className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
            Pesquisa Ninja & Grimório Pessoal
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl px-4 mt-6 flex flex-col items-center gap-6">
        
        {/* BUSCA NINJA */}
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className={`w-5 h-5 ${loading ? 'text-cyan-400 animate-pulse' : 'text-purple-500'}`} />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquise em Romaji, Kana ou Kanji..."
            className="w-full bg-[#120722] border-2 border-purple-600/50 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all font-bold placeholder-purple-800/80"
          />
        </div>

        {/* RESULTADOS */}
        <div className="w-full flex flex-col gap-4">
          {results.length === 0 && !loading && (
            <div className="text-center py-10 flex flex-col items-center gap-3">
              <Sword className="w-10 h-10 text-purple-900" />
              <p className="text-purple-400 font-bold uppercase text-sm">Nenhuma palavra encontrada.</p>
            </div>
          )}

          {results.map((entry) => {
            const rarity = getRarityTag(entry.jlptLevel);
            const isSaved = savedWords[entry.id];

            return (
              <div 
                key={entry.id}
                className="w-full bg-gradient-to-r from-[#11071f] to-[#0c0417] border border-purple-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
              >
                {/* Rarity Ribbon */}
                <div className={`absolute top-0 right-0 px-3 py-1 text-[9px] font-black uppercase tracking-widest border-b border-l rounded-bl-lg ${rarity.color}`}>
                  {rarity.label}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Info da Palavra */}
                  <div className="flex-1 space-y-1 mt-2 sm:mt-0">
                    <div className="flex items-end gap-3">
                      <h2 className="text-3xl font-black text-white tracking-widest drop-shadow-md">
                        {entry.kanji || entry.reading}
                      </h2>
                      {entry.kanji && (
                        <span className="text-sm font-bold text-cyan-400 mb-1">{entry.reading}</span>
                      )}
                    </div>
                    
                    <p className="text-xs font-black text-purple-400 uppercase tracking-widest">
                      {entry.romaji}
                    </p>

                    <div className="pt-2 border-t border-purple-900/50 mt-2">
                      <p className="text-lg font-bold text-gray-200 capitalize">
                        {entry.meaningPt}
                      </p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex sm:flex-col gap-2">
                    <button 
                      onClick={() => speakText(entry.reading)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-purple-900/40 hover:bg-purple-800 text-purple-200 p-3 rounded-xl border border-purple-600/50 transition-colors"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                    
                    <button 
                      onClick={() => !isSaved && handleSaveWord(entry.id)}
                      disabled={isSaved}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 p-3 rounded-xl border font-black uppercase tracking-wider text-[10px] transition-all shadow-lg ${
                        isSaved 
                        ? 'bg-green-900/40 border-green-500/50 text-green-400 opacity-80' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      }`}
                    >
                      {isSaved ? (
                        <>Selado ✅</>
                      ) : (
                        <><Plus className="w-4 h-4" /> Forjar Selo</>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
