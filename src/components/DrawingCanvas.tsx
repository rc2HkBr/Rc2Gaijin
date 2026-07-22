'use client';

import { useRef, useState, useEffect } from 'react';
import { RotateCcw, Volume2, Check } from 'lucide-react';
import { playJapaneseAudio } from '@/utils/audio';

interface DrawingCanvasProps {
  hiragana: string;
  romaji: string;
  onSuccess: () => void;
}

export default function DrawingCanvas({ hiragana, romaji, onSuccess }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [inputRomaji, setInputRomaji] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    clearCanvas();
  }, [hiragana]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    setError(false);
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
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#ff4b4b'; // Primary red stroke color

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setError(false);
  };

  const handleVerify = () => {
    const cleanInput = inputRomaji.trim().toLowerCase();
    if (cleanInput === romaji.toLowerCase() && hasDrawn) {
      playJapaneseAudio(hiragana);
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto bg-surface border-2 border-border rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between w-full mb-3">
        <span className="text-xs uppercase font-bold tracking-wider text-gray-400">Teste de Escrita</span>
        <button
          type="button"
          onClick={() => playJapaneseAudio(hiragana)}
          className="p-2 rounded-xl bg-secondary/10 hover:bg-secondary/20 text-secondary transition-colors"
          title="Ouvir som"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      <p className="text-foreground font-semibold mb-2 text-center text-sm sm:text-base">
        Desenhe o ideograma para <span className="text-primary font-bold text-lg">"{romaji}"</span>:
      </p>

      {/* Canvas Area with Watermark Guide */}
      <div className="relative w-64 h-64 border-2 border-dashed border-border rounded-2xl bg-background overflow-hidden flex items-center justify-center shadow-inner my-2">
        {/* Visual Watermark Guide */}
        <span className="absolute select-none text-9xl font-bold text-gray-300/30 dark:text-gray-600/30 pointer-events-none">
          {hiragana}
        </span>

        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="absolute inset-0 cursor-crosshair touch-none z-10"
        />
      </div>

      <div className="flex items-center justify-between w-full max-w-xs mt-2 mb-4">
        <button
          type="button"
          onClick={clearCanvas}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors font-bold"
        >
          <RotateCcw className="w-4 h-4" /> Limpar desenho
        </button>
        <span className="text-xs text-gray-400">{hasDrawn ? 'Desenho registrado' : 'Use a tela para desenhar'}</span>
      </div>

      {/* Romaji confirmation input for dual reinforcement */}
      <div className="w-full space-y-3">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">Confirme o som em Romaji:</label>
          <input
            type="text"
            value={inputRomaji}
            onChange={(e) => setInputRomaji(e.target.value)}
            placeholder={`Digite "${romaji}"`}
            className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-center text-lg outline-none transition-colors ${
              error ? 'border-red-500 bg-red-500/10 text-red-600' : 'border-border bg-background focus:border-primary'
            }`}
          />
        </div>

        {error && (
          <p className="text-xs font-bold text-red-500 text-center">
            Desenhe no quadro e digite o romaji correto ({romaji}) para prosseguir!
          </p>
        )}

        <button
          type="button"
          onClick={handleVerify}
          className="w-full bg-success hover:bg-success-dark text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider border-b-4 border-black/20 active:border-b-0 active:translate-y-1 transition-all"
        >
          <Check className="w-5 h-5" /> Validar Escrita
        </button>
      </div>
    </div>
  );
}
