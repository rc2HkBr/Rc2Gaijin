'use client';

import { useState } from 'react';
import { Music, BookOpen, ChevronDown, ChevronUp, Star, Sparkles, Eye, EyeOff } from 'lucide-react';
import { JPOP_SONGS, JPopLyricLine } from '@/data/jpopData';
import Link from 'next/link';

function LyricLineCard({ line, index }: { line: JPopLyricLine; index: number }) {
  const [showNotes, setShowNotes] = useState(false);
  const [showHiragana, setShowHiragana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <div
      className={`w-full rounded-2xl border-2 p-4 sm:p-6 transition-all ${
        line.isChorus
          ? 'bg-amber-500/5 border-amber-500/30'
          : line.isEnglish
          ? 'bg-blue-500/5 border-blue-500/20'
          : 'bg-surface border-border'
      }`}
    >
      {/* Line Number & Chorus Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Linha {line.id}
          {line.isChorus && (
            <span className="ml-2 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">♪ Refrão</span>
          )}
          {line.isEnglish && (
            <span className="ml-2 text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">🌐 Inglês</span>
          )}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setShowHiragana(!showHiragana)}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${showHiragana ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 text-gray-400'}`}
          >
            かな
          </button>
          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${showRomaji ? 'bg-sky-500/10 text-sky-500' : 'bg-gray-100 text-gray-400'}`}
          >
            ABC
          </button>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors ${showTranslation ? 'bg-purple-500/10 text-purple-500' : 'bg-gray-100 text-gray-400'}`}
          >
            PT
          </button>
        </div>
      </div>

      {/* KANJI (Always visible — the challenge) */}
      <p className="text-2xl sm:text-3xl font-black text-foreground mb-3 leading-relaxed tracking-wide">
        {line.kanji}
      </p>

      {/* Layers */}
      <div className="space-y-1.5">
        {showHiragana && (
          <p className="text-base sm:text-lg font-bold text-emerald-600 leading-relaxed">
            {line.hiragana}
          </p>
        )}
        {showRomaji && (
          <p className="text-sm sm:text-base font-semibold text-sky-500 italic">
            {line.romaji}
          </p>
        )}
        {showTranslation && (
          <p className="text-sm font-medium text-gray-500">
            {line.translation}
          </p>
        )}
      </div>

      {/* Master Notes Toggle */}
      {!line.isEnglish && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="mt-4 w-full flex items-center justify-between bg-background border-2 border-border rounded-xl px-4 py-3 text-sm font-bold text-gray-500 hover:text-primary hover:border-primary/30 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {showNotes ? 'Esconder Análise do Mestre' : 'Mestre, Explica! 🥷'}
          </span>
          {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}

      {showNotes && !line.isEnglish && (
        <div className="mt-3 bg-amber-500/5 border-2 border-amber-500/20 rounded-xl p-4 text-sm text-foreground leading-relaxed">
          <p className="font-bold text-amber-600 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> Análise Gramatical & Kanjis
          </p>
          <p className="whitespace-pre-wrap font-medium">{line.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function JPopPage() {
  const song = JPOP_SONGS[0]; // Nagareboshi
  const [showAllLayers, setShowAllLayers] = useState(true);

  return (
    <div className="flex flex-col items-center pb-24 pt-6 w-full max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="w-full mb-8 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 font-bold text-xs uppercase tracking-wider">
          <Music className="w-4 h-4" /> J-Pop Karaoke Learning
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">{song.title}</h1>
        <p className="text-gray-500 font-medium">{song.artist}</p>
        <div className="flex justify-center gap-2">
          <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold uppercase px-3 py-1 rounded-full">
            {song.difficulty}
          </span>
        </div>
      </div>

      {/* YouTube Player */}
      <div className="w-full aspect-video rounded-3xl overflow-hidden border-4 border-border shadow-xl mb-10 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${song.youtubeId}?rel=0`}
          title={song.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Controls */}
      <div className="w-full flex items-center justify-between bg-surface border-2 border-border rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="font-bold text-foreground text-sm">Letra Interativa</span>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg">Kanji</span>
          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg">Hiragana</span>
          <span className="bg-sky-500/10 text-sky-500 px-2 py-1 rounded-lg">Romaji</span>
          <span className="bg-purple-500/10 text-purple-500 px-2 py-1 rounded-lg">PT-BR</span>
        </div>
      </div>

      {/* Lyrics */}
      <div className="w-full space-y-4">
        {song.lyrics.map((line, index) => (
          <LyricLineCard key={line.id} line={line} index={index} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="w-full mt-12 bg-surface border-2 border-border rounded-3xl p-6 text-center shadow-sm">
        <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-black text-foreground mb-2">Missão Completa! 🌟</h3>
        <p className="text-gray-500 text-sm mb-4">
          Você analisou todas as {song.lyrics.length} linhas da música. Cada Kanji estudado aqui reforça sua memória!
        </p>
        <Link
          href="/"
          className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-2xl uppercase tracking-wider border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all"
        >
          Voltar ao Mapa
        </Link>
      </div>
    </div>
  );
}
