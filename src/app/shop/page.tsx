'use client';

import { Coins, Sparkles, ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-pixel text-primary uppercase mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-sm font-pixel text-secondary uppercase tracking-widest mt-1">
            SHURIKEN SHOP
          </span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 font-pixel text-xl text-primary drop-shadow-[0_0_5px_rgba(255,140,0,0.5)]">
            <Coins className="w-5 h-5 text-primary" />
            <span>{ryo} RC COINS</span>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="h-8 mt-4 flex items-center justify-center font-pixel text-xl">
        {errorMsg && <p className="text-red-500 uppercase animate-pulse drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">{errorMsg}</p>}
        {successMsg && <p className="text-success uppercase animate-pulse drop-shadow-[0_0_5px_rgba(57,255,20,0.8)]">{successMsg}</p>}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto px-4 sm:px-8 mt-2 relative z-10">
        
        {/* HERO BANNER (Ningu Drone Mastery) */}
        <div className="bg-[#1a2332] border-4 border-[#2c3e50] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Scroll Texture / Background Details */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col max-w-xl text-left">
            <h2 className="text-4xl sm:text-5xl font-pixel text-primary mb-2 uppercase drop-shadow-[0_0_8px_rgba(255,140,0,0.8)] leading-none">
              NINGU DRONE MASTERY!
            </h2>
            <p className="text-xl text-secondary font-pixel uppercase tracking-wider mb-6 drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]">
              EMBRACE THE PATH OF TECHNO-SHINOBI.
            </p>
            <div>
              <button className="bg-primary hover:bg-primary-dark text-[#111] px-6 py-2 border-2 border-[#fff] font-pixel text-2xl uppercase shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-all">
                SHOP NOW!
              </button>
            </div>
          </div>

          <div className="hidden md:flex relative z-10 items-center justify-center w-64 h-40">
            {/* Imagem ilustrativa para simular a arte do banner original */}
            <div className="text-6xl absolute -left-10 drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">🥷</div>
            <div className="text-5xl absolute top-0 drop-shadow-[0_0_10px_rgba(255,140,0,0.5)]">🚁</div>
            <div className="text-6xl absolute -right-10 top-10 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">🤖</div>
          </div>
        </div>

        {/* ITEM GRID (Arcade Cards) */}
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AVATARS.map((item) => {
              const isUnlocked = unlockedAvatars.includes(item.id);
              const isEquipped = activeAvatar.id === item.id;

              return (
                <div 
                  key={item.id} 
                  className={`bg-surface-dark p-4 transition-transform hover:-translate-y-1 shadow-[4px_4px_0_#000] flex flex-col border-[3px] ${
                    isEquipped ? 'border-success' : 'border-border'
                  }`}
                >
                  {/* Icon Area */}
                  <div className="h-40 bg-black mb-3 flex items-center justify-center border-2 border-border relative overflow-hidden p-2 group">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain filter group-hover:brightness-125 transition-all" />
                    ) : (
                      <span className="text-6xl drop-shadow-[0_0_10px_rgba(0,210,255,0.5)]">{item.emoji}</span>
                    )}
                    
                    {/* Retro Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-secondary"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-secondary"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-secondary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-secondary"></div>

                    {isEquipped && (
                      <div className="absolute top-2 right-2 bg-success text-[#000] font-pixel text-xs px-2 py-1 uppercase border border-white">
                        EQPD
                      </div>
                    )}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-pixel text-secondary leading-tight mb-1 drop-shadow-[0_0_2px_rgba(0,210,255,0.5)]">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-sans mb-3 line-clamp-3 leading-relaxed h-12">
                      {item.description}
                    </p>
                    
                    {/* Price */}
                    <div className="text-primary font-pixel text-xl mb-3 flex items-center gap-1 drop-shadow-[0_0_2px_rgba(255,140,0,0.5)]">
                      {item.price} YEN / RC
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-auto">
                      {isEquipped ? (
                        <button disabled className="w-full bg-[#111] text-gray-500 py-2 border-2 border-[#333] font-pixel text-lg uppercase">
                          EQUIPPED
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleBuyOrEquip(item.id, item.price)}
                          className={`w-full py-2 border-2 border-white font-pixel text-xl uppercase transition-all shadow-[3px_3px_0_#000] active:translate-y-1 active:shadow-none hover:brightness-110 ${
                            isUnlocked 
                              ? 'bg-secondary text-[#000]' 
                              : 'bg-primary text-[#000]'
                          }`}
                        >
                          {isUnlocked ? 'EQUIP ITEM' : 'ADD TO INVENTRY!'}
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
