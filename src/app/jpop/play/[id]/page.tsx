'use client';

import { useState } from 'react';
import { Music, ChevronDown, ChevronUp, Sparkles, ChevronLeft, Terminal, Disc3, Radio, Eye, EyeOff, CheckCircle2, HelpCircle } from 'lucide-react';
import { JPOP_SONGS, JPopLyricLine } from '@/data/jpopData';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { sfx } from '@/utils/sfx';

/* ── CRT Overlay (pink/blue) ── */
const KaraokeCRT = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,255,0.08) 2px, rgba(255,0,255,0.08) 4px)',
    }} />
  </div>
);

function LyricLineCard({ 
  line, 
  showFuriganaGlobal, 
  isClozeMode 
}: { 
  line: JPopLyricLine; 
  showFuriganaGlobal: boolean; 
  isClozeMode: boolean; 
}) {
  const { addRyo } = useGame();
  const [showNotes, setShowNotes] = useState(false);
  const [showHiragana, setShowHiragana] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  // Cloze Mode State
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const borderColor = line.isChorus ? 'border-pink-500/60' : line.isEnglish ? 'border-cyan-500/60' : 'border-purple-900/60';
  const glowColor = line.isChorus ? 'shadow-[0_0_15px_rgba(255,0,128,0.15)]' : '';

  const handleCheckAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Check against hiragana or romaji
    const cleanInput = userInput.trim().toLowerCase();
    const cleanHiragana = line.hiragana.toLowerCase();
    const cleanRomaji = line.romaji.toLowerCase();

    if (cleanHiragana.includes(cleanInput) || cleanRomaji.includes(cleanInput)) {
      setIsCorrect(true);
      setIsAnswered(true);
      addRyo(50);
      sfx.playSuccess();
    } else {
      setIsCorrect(false);
      setIsAnswered(true);
      sfx.playDamage();
    }
  };

  return (
    <div className={`w-full bg-[#0a0312] border-2 ${borderColor} ${glowColor} p-4 sm:p-6 rounded-3xl transition-all duration-300 relative overflow-hidden group hover:border-pink-500/80`}>
      <KaraokeCRT />

      {/* Line Number & Badges */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-pink-400/80 font-bold uppercase tracking-wider">
            L.{String(line.id).padStart(2, '0')}
          </span>
          {line.isChorus && (
            <span className="bg-pink-950 text-pink-300 border border-pink-500/50 px-2 py-0.5 font-bold text-[10px] uppercase rounded">
              ♪ REFRÃO
            </span>
          )}
          {line.isEnglish && (
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/50 px-2 py-0.5 font-bold text-[10px] uppercase rounded">
              ENG
            </span>
          )}
        </div>
        
        <div className="flex gap-1.5 font-mono text-xs">
          {[
            { key: 'kana', state: showHiragana, set: setShowHiragana, color: 'emerald' },
            { key: 'abc', state: showRomaji, set: setShowRomaji, color: 'cyan' },
            { key: 'pt', state: showTranslation, set: setShowTranslation, color: 'purple' },
          ].map(({ key, state, set }) => (
            <button
              key={key}
              onClick={() => { set(!state); sfx.playClick(); }}
              className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-all uppercase ${
                state
                  ? 'bg-purple-900/60 text-purple-200 border-purple-400'
                  : 'bg-black text-gray-600 border-gray-800'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* KANJI COM FURIGANA TOGGLE OU MODO CLOZE */}
      <div className="mb-4 relative z-10">
        {showFuriganaGlobal ? (
          <div className="text-xl sm:text-3xl font-sans font-black text-white leading-relaxed tracking-wide">
            <ruby>
              {line.kanji}
              <rt className="text-emerald-400 text-xs sm:text-sm font-mono font-bold">{line.hiragana}</rt>
            </ruby>
          </div>
        ) : isClozeMode && !isCorrect ? (
          <div className="text-xl sm:text-2xl font-black text-amber-300 bg-amber-950/40 p-3 rounded-2xl border border-amber-500/40">
            {line.kanji.slice(0, Math.floor(line.kanji.length / 2))}
            <span className="text-amber-400 underline decoration-wavy px-2">[ ___ Oculto ___ ]</span>
          </div>
        ) : (
          <p className="text-xl sm:text-3xl font-sans font-black text-white leading-snug tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            {line.kanji}
          </p>
        )}
      </div>

      {/* INPUT MODO TRANSCRIÇÃO (CLOZE) */}
      {isClozeMode && (
        <div className="mb-4 bg-purple-950/40 border border-purple-500/50 p-3 rounded-2xl relative z-10">
          <form onSubmit={handleCheckAnswer} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full relative">
              <input 
                type="text" 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                placeholder="Digite a palavra que você ouviu (Hiragana ou Romaji)..."
                className="w-full bg-black border border-purple-800 text-white px-3 py-2 text-xs rounded-xl focus:outline-none focus:border-pink-500"
              />
            </div>
            <button 
              type="submit"
              className="w-full sm:w-auto bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all uppercase tracking-wider shrink-0"
            >
              Verificar (+50 Ryō)
            </button>
          </form>

          {isAnswered && (
            <div className={`mt-2 text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Resposta Correta! +50 Ryō adicionados!
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4" /> Tente novamente! Dica: {line.romaji}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Layers de Leitura */}
      <div className="space-y-1.5 mb-3 bg-black/80 border border-purple-900/40 p-3 rounded-2xl font-sans relative z-10">
        {showHiragana && (
          <p className="text-sm sm:text-base font-bold text-emerald-400 leading-relaxed flex items-center gap-2">
            <span className="text-gray-600 text-[10px] font-mono shrink-0">KANA</span> {line.hiragana}
          </p>
        )}
        {showRomaji && (
          <p className="text-sm sm:text-base font-bold text-cyan-400 flex items-center gap-2">
            <span className="text-gray-600 text-[10px] font-mono shrink-0">ROM</span> {line.romaji}
          </p>
        )}
        {showTranslation && (
          <p className="text-xs sm:text-sm font-medium text-gray-300 flex items-start gap-2">
            <span className="text-gray-600 text-[10px] font-mono mt-0.5 shrink-0">PT</span> {line.translation}
          </p>
        )}
      </div>

      {/* Sensei Notes Toggle */}
      {!line.isEnglish && (
        <button
          onClick={() => { setShowNotes(!showNotes); sfx.playClick(); }}
          className="w-full flex items-center justify-between bg-black/60 border border-purple-900/50 px-3 py-2 rounded-xl text-xs font-mono text-pink-400 hover:text-pink-300 transition-colors relative z-10"
        >
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            {showNotes ? '> OCULTAR NOTAS DO SENSEI' : '> NOTAS DE GRAMÁTICA E VOCABULÁRIO'}
          </span>
          {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}

      {showNotes && !line.isEnglish && (
        <div className="mt-2 bg-pink-950/30 border border-pink-700/50 p-4 rounded-2xl text-xs text-pink-200 font-sans leading-relaxed relative z-10">
          <p className="whitespace-pre-wrap">{line.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function JPopPlayerPage({ params }: { params: { id: string } }) {
  const song = JPOP_SONGS.find(s => s.id === params.id) || JPOP_SONGS[0];

  const [showFuriganaGlobal, setShowFuriganaGlobal] = useState(false);
  const [isClozeMode, setIsClozeMode] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#07000d] text-foreground flex flex-col items-center select-none pb-24 font-sans relative overflow-hidden">
      <KaraokeCRT />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/20 via-transparent to-purple-950/20 pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="w-full h-14 bg-black/90 border-b border-pink-900/50 flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-lg">
        <Link href="/jpop" className="flex items-center hover:text-pink-400 transition-colors mr-3 text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Disc3 className="w-5 h-5 text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="font-black text-sm text-pink-400 uppercase tracking-wider">CYBER KARAOKE</span>
        </div>
        
        {/* TOOLBAR FOR FURIGANA & CLOZE MODE */}
        <div className="flex items-center gap-2">
          {/* FURIGANA TOGGLE */}
          <button
            onClick={() => { setShowFuriganaGlobal(!showFuriganaGlobal); sfx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all ${
              showFuriganaGlobal 
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' 
                : 'bg-black text-gray-400 border-gray-800 hover:border-emerald-500'
            }`}
          >
            {showFuriganaGlobal ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            Furigana
          </button>

          {/* CLOZE / TRANSCRIÇÃO TOGGLE */}
          <button
            onClick={() => { setIsClozeMode(!isClozeMode); sfx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all ${
              isClozeMode 
                ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                : 'bg-black text-gray-400 border-gray-800 hover:border-amber-500'
            }`}
          >
            🎤 Modo Desafio
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6 w-full max-w-4xl mx-auto px-4 relative z-10">

        {/* ── Song Header ── */}
        <div className="w-full mb-6 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-pink-500/40 bg-pink-950/40 text-pink-300 font-bold text-xs uppercase tracking-widest rounded-xl">
            <Music className="w-3.5 h-3.5 text-pink-400" /> TOCANDO AGORA
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,0,128,0.5)] leading-tight">
            {song.title}
          </h1>
          <p className="text-cyan-400 font-black text-base uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">
            {song.artist}
          </p>
        </div>

        {/* ── YouTube Player ── */}
        <div className="w-full aspect-video border-2 border-pink-600/50 rounded-3xl shadow-[0_0_30px_rgba(255,0,128,0.2)] mb-8 relative bg-black overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${song.youtubeId}?rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full relative z-0"
          />
        </div>

        {/* ── Lyrics List ── */}
        <div className="w-full space-y-4">
          {song.lyrics.map((line) => (
            <LyricLineCard 
              key={line.id} 
              line={line} 
              showFuriganaGlobal={showFuriganaGlobal}
              isClozeMode={isClozeMode}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
