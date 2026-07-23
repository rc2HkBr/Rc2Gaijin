'use client';

import { Coins, ChevronLeft, Heart, ShieldAlert, Sparkles, Flame } from 'lucide-react';
import { useGame, AVATARS } from '@/context/GameContext';
import { useState } from 'react';
import Link from 'next/link';

export default function DojoShopPage() {
  const { 
    ryo, 
    hp, 
    smokeBombs, 
    unlockedAvatars, 
    unlockAvatar, 
    activeAvatar, 
    setActiveAvatarId, 
    spendRyo,
    healHp,
    buySmokeBomb 
  } = useGame();
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const showFeedback = (success: string, error?: string) => {
    if (error) {
      setErrorMsg(error);
      setSuccessMsg('');
    } else {
      setSuccessMsg(success);
      setErrorMsg('');
    }
    setTimeout(() => { setErrorMsg(''); setSuccessMsg(''); }, 3000);
  };

  const handleBuyOrEquipAvatar = (id: string, price: number) => {
    if (unlockedAvatars.includes(id)) {
      setActiveAvatarId(id);
      showFeedback('PERSONAGEM EQUIPADO!');
    } else {
      if (spendRyo(price)) {
        unlockAvatar(id);
        setActiveAvatarId(id);
        showFeedback('PERSONAGEM ADQUIRIDO E EQUIPADO!');
      } else {
        showFeedback('', 'MOEDAS RYŌ INSUFICIENTES!');
      }
    }
  };

  const handleBuyPotion = () => {
    if (hp >= 3) {
      showFeedback('', 'SEU HP JÁ ESTÁ NO MÁXIMO (3/3)!');
      return;
    }
    if (healHp()) {
      showFeedback('POÇÃO DE CURA USADA! +1 HP RECUPERADO.');
    } else {
      showFeedback('', 'MOEDAS RYŌ INSUFICIENTES (REQUER 150 RYŌ)!');
    }
  };

  const handleBuySmokeBomb = () => {
    if (buySmokeBomb()) {
      showFeedback('BOMBA DE FUMAÇA COMPRADA! FOGUEIRA PROTEGIDA.');
    } else {
      showFeedback('', 'MOEDAS RYŌ INSUFICIENTES (REQUER 300 RYŌ)!');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#07030d] text-foreground flex flex-col items-center select-none pb-28 font-sans">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-lg">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-purple-400">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-black text-purple-300 uppercase tracking-wide mr-4">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-purple-900/60 mx-2"></div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            SHURIKEN SHOP
          </span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 font-black text-lg text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
            <Coins className="w-5 h-5" />
            <span>¥ {ryo} RYŌ</span>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="h-10 mt-3 flex items-center justify-center font-bold text-sm">
        {errorMsg && <p className="bg-red-950/80 border border-red-500 text-red-300 px-4 py-1.5 rounded-xl uppercase animate-pulse">{errorMsg}</p>}
        {successMsg && <p className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 px-4 py-1.5 rounded-xl uppercase animate-pulse">{successMsg}</p>}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto px-4 sm:px-8 mt-2 relative z-10">
        
        {/* 1. SEÇÃO DE CONSUMÍVEIS DE SOBREVIVÊNCIA */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b border-purple-900/40 pb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              ITENS DE SOBREVIVÊNCIA & PROTEÇÃO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* ITEM: POÇÃO DE CURA */}
            <div className="bg-[#120721] border-2 border-emerald-500/60 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  🧪
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-lg text-white">Poção de Cura</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/50">
                      HP atual: {hp}/3
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-medium mt-1">
                    Recupera +1 ponto de vida (HP) perdido em testes ou desafios.
                  </p>
                  <span className="inline-block text-amber-400 font-black text-sm mt-2">
                    Preço: ¥ 150 Ryō
                  </span>
                </div>
              </div>

              <button 
                onClick={handleBuyPotion}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs px-5 py-3 rounded-2xl transition-transform hover:scale-105 shrink-0 uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.6)]"
              >
                COMPRAR & USAR
              </button>
            </div>

            {/* ITEM: BOMBA DE FUMAÇA */}
            <div className="bg-[#120721] border-2 border-orange-500/60 rounded-3xl p-5 flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(249,115,22,0.15)] hover:border-orange-400 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-orange-950 border-2 border-orange-400 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                  💨
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-lg text-white">Bomba de Fumaça</h3>
                    <span className="text-xs font-bold text-orange-400 bg-orange-950 px-2 py-0.5 rounded border border-orange-500/50">
                      Possuídos: {smokeBombs}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 font-medium mt-1">
                    Permite pular 1 dia de estudo sem perder sua Fogueira da Ofensiva!
                  </p>
                  <span className="inline-block text-amber-400 font-black text-sm mt-2">
                    Preço: ¥ 300 Ryō
                  </span>
                </div>
              </div>

              <button 
                onClick={handleBuySmokeBomb}
                className="bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-xs px-5 py-3 rounded-2xl transition-transform hover:scale-105 shrink-0 uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.6)]"
              >
                COMPRAR ITEM
              </button>
            </div>

          </div>
        </section>

        {/* 2. SEÇÃO DE AVATARES E SKINS */}
        <section>
          <div className="flex items-center gap-2 mb-4 border-b border-purple-900/40 pb-2">
            <Coins className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              AVATARES E SKINS DE SHINOBI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AVATARS.map((item) => {
              const isUnlocked = unlockedAvatars.includes(item.id);
              const isEquipped = activeAvatar.id === item.id;

              return (
                <div 
                  key={item.id} 
                  className={`bg-[#0e071a] p-4 rounded-3xl transition-transform hover:-translate-y-1 flex flex-col border-2 ${
                    isEquipped ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-purple-900/50'
                  }`}
                >
                  {/* Icon / Image Area */}
                  <div className="h-44 bg-black/70 rounded-2xl mb-3 flex items-center justify-center border border-purple-800/40 relative overflow-hidden p-2 group">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" 
                      />
                    ) : (
                      <span className="text-6xl">{item.emoji}</span>
                    )}
                    
                    {isEquipped && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-black font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-widest shadow-md">
                        EQUIPADO
                      </div>
                    )}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-black text-white leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mb-3 leading-relaxed h-12">
                      {item.description}
                    </p>
                    
                    {/* Price */}
                    <div className="text-amber-400 font-black text-base mb-3 flex items-center gap-1">
                      ¥ {item.price} RYŌ
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-auto">
                      {isEquipped ? (
                        <button disabled className="w-full bg-gray-900 text-gray-500 py-2.5 rounded-xl font-bold text-xs uppercase cursor-default border border-gray-800">
                          EM USO
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleBuyOrEquipAvatar(item.id, item.price)}
                          className={`w-full py-2.5 rounded-xl font-extrabold text-xs uppercase transition-all shadow-md ${
                            isUnlocked 
                              ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                              : 'bg-amber-500 hover:bg-amber-400 text-black'
                          }`}
                        >
                          {isUnlocked ? 'EQUIPAR' : 'DESBLOQUEAR'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
