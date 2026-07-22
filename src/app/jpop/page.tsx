'use client';

import { useState, useRef, useEffect } from 'react';
import { Music, BookOpen, ChevronDown, ChevronUp, Star, Sparkles } from 'lucide-react';
import { JPOP_SONGS, JPopLyricLine } from '@/data/jpopData';
import Link from 'next/link';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

function LyricLineCard({ 
  line, 
  isActive, 
  innerRef 
}: { 
  line: JPopLyricLine; 
  isActive: boolean; 
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [showHiragana, setShowHiragana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  return (
    <div
      ref={innerRef}
      className={`w-full rounded-2xl border-2 p-4 sm:p-6 transition-all duration-500 ${
        isActive 
          ? 'bg-primary/10 border-primary shadow-xl scale-[1.02]' 
          : line.isChorus
          ? 'bg-amber-500/5 border-amber-500/30 opacity-70 hover:opacity-100'
          : line.isEnglish
          ? 'bg-blue-500/5 border-blue-500/20 opacity-70 hover:opacity-100'
          : 'bg-surface border-border opacity-70 hover:opacity-100'
      }`}
    >
      {/* Line Number & Chorus Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-primary' : 'text-gray-400'}`}>
          Linha {line.id} {isActive && <span className="ml-1 animate-pulse">●</span>}
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
      <p className={`text-2xl sm:text-3xl font-black mb-3 leading-relaxed tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-foreground'}`}>
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
  const [activeLineId, setActiveLineId] = useState<number | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs para rolar a tela
  const lineRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const onPlayerReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    // 1 = playing, 2 = paused
    setIsPlaying(event.data === 1);
  };

  // Tracking do tempo
  useEffect(() => {
    if (!isPlaying || !player) return;

    const interval = setInterval(() => {
      const currentTime = player.getCurrentTime();
      
      // Encontrar qual é a linha atual baseada no tempo
      let currentLine = null;
      for (let i = 0; i < song.lyrics.length; i++) {
        const line = song.lyrics[i];
        const nextLine = song.lyrics[i + 1];
        
        if (currentTime >= line.time && (!nextLine || currentTime < nextLine.time)) {
          currentLine = line.id;
          break;
        }
      }

      if (currentLine && currentLine !== activeLineId) {
        setActiveLineId(currentLine);
        // Scroll into view
        const element = lineRefs.current[currentLine];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying, player, song.lyrics, activeLineId]);

  const youtubeOptions: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

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

      {/* YouTube Player - Sticky Mobile Friendly */}
      <div className="sticky top-4 z-50 w-full aspect-video rounded-3xl overflow-hidden border-4 border-border shadow-2xl mb-10 bg-black">
        <YouTube 
          videoId={song.youtubeId} 
          opts={youtubeOptions} 
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          className="w-full h-full absolute inset-0"
        />
      </div>

      {/* Controls */}
      <div className="w-full flex items-center justify-between bg-surface border-2 border-border rounded-2xl p-4 mb-8 shadow-sm">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="font-bold text-foreground text-sm">Karaoke Sync Ativo</span>
        </div>
      </div>

      {/* Lyrics */}
      <div className="w-full space-y-4">
        {song.lyrics.map((line, index) => (
          <LyricLineCard 
            key={line.id} 
            line={line} 
            isActive={activeLineId === line.id}
            innerRef={(el) => {
              lineRefs.current[line.id] = el;
            }}
          />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="w-full mt-12 bg-surface border-2 border-border rounded-3xl p-6 text-center shadow-sm">
        <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h3 className="text-xl font-black text-foreground mb-2">Treino Concluído! 🌟</h3>
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
