'use client';

import { Store, Coins, Sparkles, ChevronLeft } from 'lucide-react';
import { useGame, AVATARS } from '@/context/GameContext';
import { useState } from 'react';
import Link from 'next/link';

export default function DojoShopPage() {
  const { ryo, unlockedAvatars, unlockAvatar, activeAvatar, setActiveAvatarId, spendRyo } = useGame();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleBuyOrEquip = (id: string, price: number) => {
    setErrorMsg('');
    setSuccessMsg('');
    
    if (unlockedAvatars.includes(id)) {
      setActiveAvatarId(id);
      setSuccessMsg('ITEM EQUIPADO!');
    } else {
      if (spendRyo(price)) {
        unlockAvatar(id);
        setActiveAvatarId(id);
        setSuccessMsg('ITEM ADQUIRIDO!');
      } else {
        setErrorMsg('RC COINS INSUFICIENTES!');
      }
    }
    setTimeout(() => { setErrorMsg(''); setSuccessMsg(''); }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24">
      
      {/* HEADER NAVBAR (Duolingo Style) */}
      <div className="w-full h-16 bg-white border-b-2 border-border flex items-center px-4 sm:px-8 top-0 sticky z-40">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4">
           <ChevronLeft className="w-6 h-6 text-gray-light" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-xl font-black tracking-widest text-primary uppercase mr-4">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-nav-text">
            DOJO SHOP
          </span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-gold">
            <Coins className="w-5 h-5 fill-gold stroke-gold" />
            <span className="text-lg">{ryo}</span>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="h-8 mt-4 flex items-center justify-center">
        {errorMsg && <p className="text-primary text-sm font-bold uppercase animate-bounce">{errorMsg}</p>}
        {successMsg && <p className="text-success text-sm font-bold uppercase animate-bounce">{successMsg}</p>}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto px-4 sm:px-8 mt-4">
        
        {/* HERO BANNER (Dojo Mastery) */}
        <div className="bg-gradient-to-b from-success to-white rounded-3xl p-8 sm:py-14 sm:px-10 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col items-center max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-black text-success-dark mb-4 lowercase tracking-tight">
              treinamento ninja
            </h2>
            <p className="text-lg text-gray-text font-medium leading-relaxed mb-8">
              Aprimore suas habilidades e expanda seu arsenal no dojo. Desbloqueie novos equipamentos e personagens para sua jornada de aprendizado.
            </p>
            <div className="flex gap-4">
              <button className="bg-success text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide shadow-[0_4px_0_#4BB200] hover:translate-y-1 hover:shadow-none transition-all active:shadow-none active:translate-y-1">
                Ver Missões
              </button>
            </div>
          </div>
        </div>

        {/* ITEM GRID (Gamified Cards) */}
        <div className="mt-8">
          <h3 className="text-[11px] font-black uppercase tracking-[2px] text-nav-text mb-6 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-border after:ml-4">
            ARSENAL DO DOJO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AVATARS.map((item) => {
              const isUnlocked = unlockedAvatars.includes(item.id);
              const isEquipped = activeAvatar.id === item.id;

              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl p-5 transition-transform hover:-translate-y-1 shadow-[0_4px_0_#E5E5E5] flex flex-col ${
                    isEquipped ? 'border-2 border-secondary' : 'border-2 border-border'
                  }`}
                >
                  {/* Icon Area */}
                  <div className="h-32 bg-background rounded-xl mb-4 flex items-center justify-center border-2 border-border relative overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-7xl drop-shadow-sm">{item.emoji}</span>
                    )}
                    {isEquipped && (
                      <div className="absolute top-2 right-2 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                        Equipado
                      </div>
                    )}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-text leading-tight mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-light text-sm font-medium mb-4 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Price and Button */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-gold font-bold text-lg flex items-center gap-1">
                        <Coins className="w-4 h-4" /> {item.price}
                      </div>
                      
                      {isEquipped ? (
                        <button disabled className="bg-background text-nav-text px-4 py-2 rounded-lg font-bold uppercase text-sm border-2 border-border">
                          ATIVO
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleBuyOrEquip(item.id, item.price)}
                          className={`px-4 py-2 rounded-lg font-bold uppercase text-sm tracking-wide transition-all shadow-[0_4px_0_#4BB200] hover:translate-y-1 hover:shadow-none ${
                            isUnlocked 
                              ? 'bg-secondary text-white shadow-[0_4px_0_#1899D6]' 
                              : 'bg-success text-white shadow-[0_4px_0_#4BB200]'
                          }`}
                        >
                          {isUnlocked ? 'EQUIPAR' : 'COMPRAR'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
