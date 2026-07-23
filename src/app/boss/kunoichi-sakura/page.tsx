'use client';

import { useState } from 'react';
import { Sparkles, Heart, ChevronLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { sfx } from '@/utils/sfx';

const KATAKANA_TRAPS = [
  { prompt: 'Identifique o Katakana "SHI" (シ):', correct: 'シ', options: ['シ', 'ツ', 'ン', 'ソ'] },
  { prompt: 'Identifique o Katakana "TSU" (ツ):', correct: 'ツ', options: ['ツ', 'シ', 'ソ', 'ン'] },
  { prompt: 'Identifique o Katakana "SO" (ソ):', correct: 'ソ', options: ['ソ', 'ン', 'リ', 'ツ'] },
  { prompt: 'Identifique o Katakana "N" (ン):', correct: 'ン', options: ['ン', 'ソ', 'シ', 'ツ'] },
];

export default function KunoichiBossPage() {
  const { addRyo, takeDamage, hp: globalHp } = useGame();
  const [idx, setIdx] = useState(0);
  const [bossHp, setBossHp] = useState(8);
  const [isVictory, setIsVictory] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const current = KATAKANA_TRAPS[idx] || KATAKANA_TRAPS[0];

  const handleSelect = (choice: string) => {
    if (choice === current.correct) {
      sfx.playSuccess();
      setBossHp(h => Math.max(0, h - 2));
      if (idx + 1 < KATAKANA_TRAPS.length) {
        setIdx(i => i + 1);
      } else {
        setIsVictory(true);
        addRyo(400);
      }
    } else {
      sfx.playDamage();
      takeDamage();
      if (globalHp <= 1) {
        setIsGameOver(true);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#120310] text-foreground flex flex-col items-center justify-between p-4 sm:p-6 font-sans relative overflow-hidden select-none">
      
      {/* HEADER */}
      <div className="w-full flex items-center justify-between border-b border-pink-900/50 pb-4 relative z-20">
        <Link href="/" className="flex items-center gap-1 text-pink-400 hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
          <span className="text-xs font-black uppercase">QG Shinobi</span>
        </Link>

        <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" /> HP: {globalHp}/3
        </div>

        <div className="text-xs font-black text-pink-300 bg-pink-950 px-3 py-1 rounded-full border border-pink-500/50">
          BOSS HP: {bossHp}/8
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-xl w-full mx-auto my-auto flex flex-col items-center text-center relative z-20 space-y-6">
        
        {/* EVENT LABEL */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/60 text-pink-300 text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.3)]">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>CHUVAS DE SAKURA // KUNOICHI SAKURA</span>
        </div>

        {/* BOSS ARTWORK */}
        <div className="w-56 h-56 rounded-3xl border-4 border-pink-500 overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.4)] bg-black">
          <img 
            src="/images/boss/kunoichi.png" 
            alt="Kunoichi Sakura" 
            className="w-full h-full object-cover object-top" 
          />
        </div>

        {isGameOver ? (
          <div className="bg-[#24061a] border-2 border-red-500 rounded-3xl p-6 w-full space-y-4">
            <h2 className="text-3xl font-black text-red-500 uppercase">ILUDIDO PELA KUNOICHI!</h2>
            <p className="text-xs text-gray-300">Você caiu nas armadilhas de Katakanas parecidos (シ vs ツ).</p>
            <Link href="/" className="inline-block bg-red-600 text-white font-black text-xs px-6 py-3 rounded-2xl uppercase">
              VOLTAR AO MAPA
            </Link>
          </div>
        ) : isVictory ? (
          <div className="bg-[#24061a] border-2 border-emerald-500 rounded-3xl p-6 w-full space-y-4">
            <h2 className="text-3xl font-black text-emerald-400 uppercase">ILUSÃO QUEBRADA!</h2>
            <p className="text-xs text-emerald-200">Você dominou a leitura de Katakanas parecidos e ganhou <strong className="text-amber-400">+400 Ryō</strong>!</p>
            <Link href="/" className="inline-block bg-emerald-500 text-black font-black text-xs px-6 py-3 rounded-2xl uppercase">
              COLETAR RECOMPENSA
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="bg-[#24061a] border-2 border-pink-500/60 rounded-3xl p-6">
              <p className="text-xs text-pink-300 font-bold uppercase mb-2">CLONES E ARMADILHAS DE KATAKANA</p>
              <h2 className="text-xl sm:text-2xl font-black text-white">{current.prompt}</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {current.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="bg-[#2e0922] hover:bg-pink-600 text-white font-black text-3xl py-4 rounded-2xl border border-pink-500/50 transition-all active:scale-95 shadow-md"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
