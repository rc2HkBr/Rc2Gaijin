'use client';

import { useState } from 'react';
import { Music, ChevronDown, ChevronUp, Star, Sparkles, ChevronLeft, Terminal } from 'lucide-react';
import { JPOP_SONGS, JPopLyricLine } from '@/data/jpopData';
import Link from 'next/link';

function LyricLineCard({ line }: { line: JPopLyricLine }) {
  const [showNotes, setShowNotes] = useState(false);
  const [showHiragana, setShowHiragana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <div className={`w-full bg-surface-dark border-[3px] p-4 sm:p-6 transition-all duration-300 shadow-[4px_4px_0_#000] relative overflow-hidden group ${
        line.isChorus ? 'border-primary' : 
        line.isEnglish ? 'border-secondary' : 'border-border'
      }`}>
      
      {/* Retro Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20"></div>

      {/* Line Number & Chorus Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-pixel uppercase tracking-widest text-gray-500">
          SYS.LINE {line.id < 10 ? `0${line.id}` : line.id}
          {line.isChorus && (
            <span className="ml-3 text-[#111] bg-primary px-2 py-0.5 border border-white">CHORUS</span>
          )}
          {line.isEnglish && (
            <span className="ml-3 text-[#111] bg-secondary px-2 py-0.5 border border-white">ENG.SYS</span>
          )}
        </span>
        <div className="flex gap-2 font-pixel">
          <button
            onClick={() => setShowHiragana(!showHiragana)}
            className={`text-sm px-2 py-1 border transition-colors ${showHiragana ? 'bg-success/20 text-success border-success' : 'bg-background text-gray-600 border-border'}`}
          >
            KANA
          </button>
          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className={`text-sm px-2 py-1 border transition-colors ${showRomaji ? 'bg-secondary/20 text-secondary border-secondary' : 'bg-background text-gray-600 border-border'}`}
          >
            ABC
          </button>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`text-sm px-2 py-1 border transition-colors ${showTranslation ? 'bg-purple-500/20 text-purple-400 border-purple-500' : 'bg-background text-gray-600 border-border'}`}
          >
            PT
          </button>
        </div>
      </div>

      {/* KANJI (Always visible) */}
      <p className="text-3xl sm:text-4xl font-sans font-black text-white mb-4 leading-relaxed tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
        {line.kanji}
      </p>

      {/* Layers */}
      <div className="space-y-2 mb-4 bg-black/50 p-4 border border-white/10 font-sans">
        {showHiragana && (
          <p className="text-lg sm:text-xl font-bold text-success leading-relaxed flex items-center gap-2">
            <span className="text-gray-600 text-sm select-none font-pixel">{">"} KANA:</span> {line.hiragana}
          </p>
        )}
        {showRomaji && (
          <p className="text-base sm:text-lg font-semibold text-secondary flex items-center gap-2">
            <span className="text-gray-600 text-sm select-none font-pixel">{">"} ROMAJI:</span> {line.romaji}
          </p>
        )}
        {showTranslation && (
          <p className="text-sm font-medium text-gray-400 flex items-start gap-2">
            <span className="text-gray-600 text-sm select-none font-pixel mt-0.5">{">"} DATA:</span> {line.translation}
          </p>
        )}
      </div>

      {/* Master Notes Toggle */}
      {!line.isEnglish && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="w-full flex items-center justify-between bg-[#111] border-2 border-border px-4 py-3 text-sm font-pixel text-primary hover:text-white hover:bg-primary/20 hover:border-primary transition-colors"
        >
          <span className="flex items-center gap-2 text-lg">
            <Terminal className="w-5 h-5" />
            {showNotes ? 'HIDE SENSEI DATA' : 'REQUEST SENSEI ANALYSIS'}
          </span>
          {showNotes ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      )}

      {showNotes && !line.isEnglish && (
        <div className="mt-3 bg-primary/10 border-2 border-primary/50 p-4 text-sm text-primary-dark font-sans leading-relaxed shadow-inner">
          <p className="font-pixel text-primary text-lg uppercase tracking-wider mb-2 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(255,140,0,0.5)]">
            <Terminal className="w-4 h-4" /> DECRYPTED DATA
          </p>
          <p className="whitespace-pre-wrap font-medium">{line.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function JPopPage() {
  const song = JPOP_SONGS[0]; // Nagareboshi ou Cybercops

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-pixel text-primary uppercase mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-sm font-pixel text-secondary uppercase tracking-widest mt-1">
            CYBER KARAOKE
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6 w-full max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="w-full mb-8 text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1 border-2 border-[#ff00ff] text-[#ff00ff] bg-[#ff00ff]/10 font-pixel text-lg uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,255,0.4)]">
            <Music className="w-4 h-4" /> AUDIO LINK ESTABLISHED
          </span>
          <h1 className="text-4xl sm:text-5xl font-pixel text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{song.title}</h1>
          <p className="text-secondary font-pixel text-xl uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]">{song.artist}</p>
        </div>

        {/* YouTube Player */}
        <div className="w-full aspect-video border-[6px] border-border shadow-[0_0_30px_rgba(0,210,255,0.2)] mb-10 relative bg-black p-1">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-secondary z-10 pointer-events-none -translate-x-1 -translate-y-1"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-secondary z-10 pointer-events-none translate-x-1 -translate-y-1"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-secondary z-10 pointer-events-none -translate-x-1 translate-y-1"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-secondary z-10 pointer-events-none translate-x-1 translate-y-1"></div>
          
          <iframe 
            src={`https://www.youtube.com/embed/${song.youtubeId}?rel=0`}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full relative z-0"
          ></iframe>
        </div>

        {/* Controls */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between bg-[#111] border-2 border-border p-4 mb-8 gap-4 font-pixel shadow-[4px_4px_0_#000]">
          <div className="flex items-center gap-3 text-lg text-gray-400">
            <Terminal className="w-5 h-5 text-success" />
            <p>
              SYSTEM MSG: Acompanhe os <span className="text-white">Kanjis</span> de cima para baixo.
            </p>
          </div>
        </div>

        {/* Lyrics List */}
        <div className="w-full space-y-6">
          {song.lyrics.map((line) => (
            <LyricLineCard key={line.id} line={line} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="w-full mt-16 mb-8 bg-surface-dark border-4 border-success p-8 text-center shadow-[0_0_20px_rgba(57,255,20,0.2)] relative">
          <Sparkles className="w-12 h-12 text-success mx-auto mb-4 drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
          <h3 className="text-3xl font-pixel text-white mb-2 uppercase">TREINO CONCLUÍDO!</h3>
          <p className="text-gray-400 font-sans mb-6">
            Você decodificou {song.lyrics.length} blocos de dados. Sua proficiência em Kanji foi atualizada no servidor.
          </p>
          <Link
            href="/"
            className="inline-block bg-success text-[#000] font-pixel text-2xl py-3 px-10 uppercase tracking-widest border-2 border-white shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-all hover:brightness-110"
          >
            RETURN TO BASE
          </Link>
        </div>

      </div>
    </div>
  );
}
