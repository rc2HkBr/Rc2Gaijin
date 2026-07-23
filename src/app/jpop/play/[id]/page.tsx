'use client';

import { useState } from 'react';
import { Music, ChevronDown, ChevronUp, Sparkles, ChevronLeft, Terminal, Disc3, Radio } from 'lucide-react';
import { JPOP_SONGS, JPopLyricLine } from '@/data/jpopData';
import Link from 'next/link';

/* ── CRT Overlay (pink/blue) ── */
const KaraokeCRT = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,255,0.08) 2px, rgba(255,0,255,0.08) 4px)',
    }} />
  </div>
);

function LyricLineCard({ line }: { line: JPopLyricLine }) {
  const [showNotes, setShowNotes] = useState(false);
  const [showHiragana, setShowHiragana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const borderColor = line.isChorus ? 'border-pink-500/60' : line.isEnglish ? 'border-cyan-500/60' : 'border-gray-800/60';
  const glowColor = line.isChorus ? 'shadow-[0_0_15px_rgba(255,0,128,0.1)]' : '';

  return (
    <div className={`w-full bg-black/80 border ${borderColor} ${glowColor} p-4 sm:p-6 transition-all duration-300 relative overflow-hidden group hover:border-pink-500/40`}>
      <KaraokeCRT />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-pink-500/30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-pink-500/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-pink-500/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-pink-500/30" />

      {/* Line Number & Badges & Toggles */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-1 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-gray-600 uppercase tracking-wider">
            L.{String(line.id).padStart(2, '0')}
          </span>
          {line.isChorus && (
            <span className="bg-pink-600/20 text-pink-400 border border-pink-600/40 px-1.5 py-0.5 font-pixel text-[9px] uppercase">
              ♪ CHORUS
            </span>
          )}
          {line.isEnglish && (
            <span className="bg-cyan-600/20 text-cyan-400 border border-cyan-600/40 px-1.5 py-0.5 font-pixel text-[9px] uppercase">
              ENG
            </span>
          )}
        </div>
        <div className="flex gap-1 font-pixel">
          {[
            { key: 'kana', state: showHiragana, set: setShowHiragana, color: 'emerald' },
            { key: 'abc', state: showRomaji, set: setShowRomaji, color: 'cyan' },
            { key: 'pt', state: showTranslation, set: setShowTranslation, color: 'purple' },
          ].map(({ key, state, set, color }) => (
            <button
              key={key}
              onClick={() => set(!state)}
              className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 border transition-all uppercase ${
                state
                  ? `bg-${color}-500/20 text-${color}-400 border-${color}-500/50`
                  : 'bg-black text-gray-700 border-gray-800'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* KANJI (Always visible) */}
      <p className="text-xl sm:text-3xl font-sans font-black text-white mb-3 leading-snug tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10">
        {line.kanji}
      </p>

      {/* Layers */}
      <div className="space-y-1 mb-3 bg-black/60 border border-gray-900 p-3 font-sans relative z-10">
        {showHiragana && (
          <p className="text-sm sm:text-lg font-bold text-emerald-400 leading-relaxed flex items-center gap-2">
            <span className="text-gray-700 text-[10px] font-mono shrink-0">KANA</span> {line.hiragana}
          </p>
        )}
        {showRomaji && (
          <p className="text-sm sm:text-base font-semibold text-cyan-400 flex items-center gap-2">
            <span className="text-gray-700 text-[10px] font-mono shrink-0">ROM.</span> {line.romaji}
          </p>
        )}
        {showTranslation && (
          <p className="text-xs sm:text-sm font-medium text-gray-500 flex items-start gap-2">
            <span className="text-gray-700 text-[10px] font-mono mt-0.5 shrink-0">PT</span> {line.translation}
          </p>
        )}
      </div>

      {/* Sensei Notes Toggle */}
      {!line.isEnglish && (
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="w-full flex items-center justify-between bg-black border border-gray-800 px-3 py-2 text-xs font-mono text-pink-600 hover:text-pink-400 hover:bg-pink-950/20 hover:border-pink-800/50 transition-colors relative z-10"
        >
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            {showNotes ? '> HIDE_DATA' : '> DECRYPT_SENSEI_NOTES'}
          </span>
          {showNotes ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      )}

      {showNotes && !line.isEnglish && (
        <div className="mt-2 bg-pink-950/20 border border-pink-800/40 p-3 text-sm text-pink-200/80 font-sans leading-relaxed relative z-10">
          <p className="font-mono text-pink-500 text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1">
            <Terminal className="w-3 h-3" /> DECRYPTED DATA
          </p>
          <p className="whitespace-pre-wrap">{line.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function JPopPlayerPage({ params }: { params: { id: string } }) {
  const song = JPOP_SONGS.find(s => s.id === params.id) || JPOP_SONGS[0];

  return (
    <div className="min-h-screen w-full bg-[#08000d] text-foreground flex flex-col items-center select-none pb-20 font-mono relative overflow-hidden">
      <KaraokeCRT />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/10 via-transparent to-purple-950/10 pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="w-full h-12 sm:h-14 bg-black/90 border-b border-pink-900/30 flex items-center px-3 sm:px-8 top-0 sticky z-40">
        <Link href="/jpop" className="flex items-center hover:text-pink-400 transition-colors mr-3 text-gray-500">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Disc3 className="w-4 h-4 text-pink-600 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="font-pixel text-xs text-pink-600 uppercase tracking-widest">CYBER KARAOKE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-700">
          <Radio className="w-3 h-3 text-pink-700" />
          <span>AUDIO LINKED</span>
        </div>
      </div>

      <div className="flex flex-col items-center pt-4 sm:pt-6 w-full max-w-4xl mx-auto px-3 sm:px-4 relative z-10">

        {/* ── Song Header ── */}
        <div className="w-full mb-6 sm:mb-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-pink-700/40 bg-pink-950/20 text-pink-500 font-pixel text-[10px] uppercase tracking-widest">
            <Music className="w-3 h-3" /> NOW PLAYING
          </div>
          <h1 className="text-2xl sm:text-4xl font-pixel text-white drop-shadow-[0_0_15px_rgba(255,0,128,0.5)] leading-tight">
            {song.title}
          </h1>
          <p className="text-cyan-400 font-pixel text-sm sm:text-base uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">
            {song.artist}
          </p>
        </div>

        {/* ── YouTube Player ── */}
        <div className="w-full aspect-video border-2 border-pink-900/40 shadow-[0_0_30px_rgba(255,0,128,0.1)] mb-6 sm:mb-8 relative bg-black overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${song.youtubeId}?rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full relative z-0"
          />
        </div>

        {/* ── Instructions ── */}
        <div className="w-full flex items-center bg-black/80 border border-gray-800 p-3 mb-6 gap-2 font-mono text-xs">
          <Terminal className="w-4 h-4 text-pink-600 shrink-0" />
          <p className="text-gray-500">
            Acompanhe os <span className="text-white">Kanjis</span> abaixo. Toggle os layers de <span className="text-emerald-400">KANA</span>, <span className="text-cyan-400">ROM</span> e <span className="text-purple-400">PT</span>.
          </p>
        </div>

        {/* ── Lyrics List ── */}
        <div className="w-full space-y-2 sm:space-y-3">
          {song.lyrics.map((line) => (
            <LyricLineCard key={line.id} line={line} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div className="w-full mt-8 sm:mt-12 mb-4 bg-black/80 border border-emerald-800/50 p-6 sm:p-8 text-center relative overflow-hidden">
          <KaraokeCRT />
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(0,255,100,0.6)]" />
            <h3 className="text-xl sm:text-2xl font-pixel text-emerald-400 mb-1 uppercase tracking-wider">
              DECODE COMPLETE
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-4 font-mono">
              &gt; {song.lyrics.length} data blocks decrypted successfully
            </p>
            <Link
              href="/jpop"
              className="inline-block bg-pink-700 hover:bg-pink-600 text-white font-pixel text-sm sm:text-base py-2 px-6 uppercase tracking-widest border border-pink-400/50 shadow-[0_0_15px_rgba(255,0,128,0.3)] hover:shadow-[0_0_25px_rgba(255,0,128,0.5)] active:scale-95 transition-all"
            >
              ♪ JUKEBOX ♪
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
