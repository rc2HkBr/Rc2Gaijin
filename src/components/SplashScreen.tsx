'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Começa a desaparecer após 2.5 segundos
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // Remove do DOM após a animação de fade (3s no total)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Efeito de Scanlines em cima do logo */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
      
      {/* Container do Logo */}
      <div className="relative animate-pulse flex flex-col items-center">
        {/* A imagem do criador. Usando <img> normal para evitar problemas de otimização se o next/image não estiver configurado perfeitamente */}
        <img 
          src="/logorc2.png" 
          alt="RC2 Gaijin Logo" 
          className="w-48 sm:w-64 h-auto object-contain drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]"
          style={{ imageRendering: 'pixelated' }}
        />
        
        <p className="text-secondary font-pixel text-xl uppercase tracking-[0.3em] mt-8 drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]">
          SYSTEM INITIALIZING...
        </p>
      </div>

      {/* Progress Bar Falsa para dar estilo Arcade */}
      <div className="absolute bottom-20 w-64 h-2 border-2 border-border p-[1px]">
        <div className="h-full bg-secondary w-full origin-left animate-[scale-x_2s_ease-out_forwards]"></div>
      </div>

    </div>
  );
}
