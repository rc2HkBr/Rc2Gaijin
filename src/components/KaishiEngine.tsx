'use client';

import { useState, useRef, useEffect } from 'react';
import { KAISHI_DECK } from '@/data/kaishiData';
import { X, Check, Zap, Heart, Coins, PenTool, RefreshCw, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { sfx } from '@/utils/sfx';

export default function KaishiEngine() {
  const { addRyo, ryo: globalRyo } = useGame();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [ryo, setRyo] = useState(0);
  const [hearts, setHearts] = useState(3);
  
  // Tracing Canvas State
  const [showCanvas, setShowCanvas] = useState(false);
  const [showKakijun, setShowKakijun] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentCard = KAISHI_DECK[index] || KAISHI_DECK[0];
  const isFinished = index >= KAISHI_DECK.length || hearts <= 0;

  useEffect(() => {
    // Reset canvas on card change
    clearCanvas();
  }, [index]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#f59e0b'; // Glowing Amber stroke

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleReveal = () => {
    setRevealed(true);
    sfx.playClick();
  };

  const handleScore = (quality: 'wrong' | 'correct' | 'critical') => {
    if (quality === 'wrong') {
      setHearts(h => h - 1);
      sfx.playDamage();
    } else if (quality === 'correct') {
      setScore(s => s + 20);
      setRyo(r => r + 10);
      addRyo(10);
      sfx.playSuccess();
    } else if (quality === 'critical') {
      setScore(s => s + 40);
      setRyo(r => r + 20);
      addRyo(20);
      sfx.playSuccess();
    }
    
    setRevealed(false);
    setShowCanvas(false);
    setShowKakijun(false);
    setIndex(i => i + 1);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#07030d] text-foreground flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full font-sans">
        <h2 className="text-3xl font-black mb-6 text-white">
          {hearts > 0 ? '🎉 Missão de Kanji Concluída!' : '💀 Missão Falhou...'}
        </h2>
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-[#120721] border-2 border-purple-500/50 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase font-black tracking-wider block">XP Ganho</span>
            <span className="text-2xl font-black text-purple-300">+{score} XP</span>
          </div>
          <div className="bg-[#120721] border-2 border-amber-500/50 p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-gray-400 uppercase font-black tracking-wider block">Moedas (Ryō)</span>
            <span className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
              <Coins className="w-5 h-5 text-amber-400" /> +{ryo}
            </span>
          </div>
        </div>
        <Link href="/" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 rounded-2xl uppercase text-base shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all">
          Retornar ao QG
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07030d] text-foreground flex flex-col items-center p-4 sm:p-6 max-w-2xl mx-auto w-full font-sans">
      
      {/* HUD Local */}
      <div className="w-full flex items-center justify-between mb-6 border-b border-purple-900/40 pb-3">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">
          <X className="w-7 h-7" />
        </Link>
        <div className="flex gap-4 font-black text-sm">
          <div className="flex items-center gap-1.5 text-red-400">
            <Heart className="w-5 h-5 fill-red-500 text-red-500" /> {hearts}/3
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Coins className="w-5 h-5" /> ¥ {globalRyo}
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-between text-xs font-black text-amber-400 mb-2 uppercase tracking-widest">
        <span>FORJA DE KANJI // KAKIJUN</span>
        <span>{index + 1} / {KAISHI_DECK.length}</span>
      </div>

      {/* Main Card Container */}
      <div className="w-full flex-1 bg-[#0f071e] border-2 border-amber-500/50 rounded-3xl p-5 sm:p-8 flex flex-col items-center justify-center text-center relative shadow-[0_0_30px_rgba(245,158,11,0.15)] mb-6">
        
        {/* Toggle Canvas Drawing & Stroke Order Buttons */}
        <div className="w-full flex items-center justify-between gap-2 mb-4">
          <button 
            onClick={() => { setShowKakijun(!showKakijun); sfx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all ${
              showKakijun ? 'bg-purple-600 text-white border-purple-400' : 'bg-black text-purple-400 border-purple-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Traços (Kakijun)
          </button>

          <button 
            onClick={() => { setShowCanvas(!showCanvas); sfx.playClick(); }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all ${
              showCanvas ? 'bg-amber-500 text-black border-amber-400' : 'bg-black text-amber-400 border-amber-900'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" /> Praticar Escrita
          </button>
        </div>

        {/* Kakijun Stroke Order Info Box */}
        {showKakijun && (
          <div className="w-full bg-purple-950/80 border border-purple-500/50 p-3 rounded-2xl mb-4 text-left font-mono text-xs text-purple-200 animate-fade-in">
            <span className="font-bold text-purple-300 block mb-1">✍️ REGRA DE ORDEM DOS TRAÇOS (KAKIJUN):</span>
            <p>1. De cima para baixo, da esquerda para a direita.</p>
            <p>2. Traços horizontais antes dos verticais de cruzamento.</p>
          </div>
        )}

        {/* Kanji & Canvas Area */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center bg-black/80 rounded-3xl border-2 border-amber-500/40 my-2 overflow-hidden">
          
          {/* Kanji Template Model Watermark */}
          <h1 className="text-7xl sm:text-9xl font-black text-amber-400/90 select-none drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            {currentCard.kanji}
          </h1>

          {/* Interactive Touch/Mouse Canvas Overlay */}
          {showCanvas && (
            <canvas 
              ref={canvasRef}
              width={256}
              height={256}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
              className="absolute inset-0 z-20 cursor-crosshair touch-none bg-transparent"
            />
          )}
        </div>

        {/* Clear Canvas Controls */}
        {showCanvas && (
          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={() => { clearCanvas(); sfx.playClick(); }} 
              className="bg-gray-900 border border-gray-700 text-gray-300 px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-gray-800"
            >
              <RefreshCw className="w-3 h-3" /> Limpar
            </button>
            {hasDrawn && (
              <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Traço em Progresso
              </span>
            )}
          </div>
        )}
        
        {/* Revealed Meanings */}
        {revealed ? (
          <div className="w-full space-y-4 mt-4 animate-fade-in">
            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-400">{currentCard.furigana}</p>
              <p className="text-2xl font-black text-amber-400">{currentCard.meaning}</p>
            </div>
            
            <div className="bg-black/60 rounded-2xl p-3 border border-purple-900/60 text-left">
              <span className="text-[10px] uppercase font-black text-purple-400 mb-1 block">Ataque Crítico (Pitch Accent)</span>
              <p className="font-bold text-white text-base">{currentCard.pitchAccent}</p>
            </div>

            <div className="bg-black/60 rounded-2xl p-3 border border-purple-900/60 text-left">
              <span className="text-[10px] uppercase font-black text-cyan-400 mb-1 block">Frase de Exemplo</span>
              <p className="font-bold text-white mb-1 text-sm">{currentCard.sentence}</p>
              <p className="text-xs text-gray-400">{currentCard.sentenceTranslation}</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-gray-400 text-sm font-medium">
            Qual a leitura e o significado deste Kanji?
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-auto">
        {!revealed ? (
          <button
            onClick={handleReveal}
            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 rounded-2xl text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all"
          >
            REVELAR RESPOSTA
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-3 w-full">
            <button
              onClick={() => handleScore('wrong')}
              className="flex flex-col items-center justify-center bg-black border-2 border-red-500 hover:bg-red-950/40 text-red-400 font-black py-3 rounded-2xl transition-colors"
            >
              <X className="w-5 h-5 mb-1" />
              <span className="text-xs">Errei</span>
            </button>
            <button
              onClick={() => handleScore('correct')}
              className="flex flex-col items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-black font-black py-3 rounded-2xl shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all"
            >
              <Check className="w-5 h-5 mb-1" />
              <span className="text-xs">Acertei</span>
            </button>
            <button
              onClick={() => handleScore('critical')}
              className="flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-500 text-white font-black py-3 rounded-2xl shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
            >
              <Zap className="w-5 h-5 mb-1 fill-white" />
              <span className="text-xs">Crítico!</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
