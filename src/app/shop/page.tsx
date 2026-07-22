'use client';

import { Star, MousePointer2 } from 'lucide-react';
import { useGame, AVATARS } from '@/context/GameContext';
import { useState } from 'react';
import Link from 'next/link';

export default function ArcadeShopPage() {
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
        setSuccessMsg('ITEM ADQUIRIDO E EQUIPADO!');
      } else {
        setErrorMsg('RC COINS INSUFICIENTES!');
      }
    }
    setTimeout(() => { setErrorMsg(''); setSuccessMsg(''); }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f1626] font-pixel text-[#d1f5ff] p-4 sm:p-8 flex flex-col items-center select-none">
      
      {/* HEADER LOGO */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-4xl sm:text-6xl font-black tracking-widest text-[#ff8c00] drop-shadow-[0_4px_0_rgba(204,112,0,1)] uppercase">
          GAIJIN RC2
        </h1>
        <h2 className="text-2xl sm:text-3xl text-[#00d2ff] tracking-[0.3em] font-sans font-bold mt-1">
          外人RC2
        </h2>
        <div className="h-1 w-48 bg-[#00d2ff] mt-2 shadow-[0_0_10px_#00d2ff]"></div>
      </div>

      {/* TOP NAVIGATION LINKS */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 text-[#d1f5ff] uppercase text-sm sm:text-lg">
        <Link href="/" className="flex items-center gap-2 hover:text-[#ff8c00] transition-colors">
          <Star className="w-4 h-4 text-gray-500" /> HOME
        </Link>
        <span className="flex items-center gap-2 text-gray-500">
          <Star className="w-4 h-4 text-gray-500" /> SHURIKEN SHOP
        </span>
        <span className="flex items-center gap-2 text-[#ff8c00] border-b-2 border-[#ff8c00]">
          <Star className="w-4 h-4 text-[#ff8c00]" /> NINGU ARSENAL
        </span>
        <span className="flex items-center gap-2 text-gray-500">
          <Star className="w-4 h-4 text-gray-500" /> SUPPORT
        </span>
        <span className="flex items-center gap-2 text-gray-500">
          <Star className="w-4 h-4 text-gray-500" /> CYBER BLOG
        </span>
      </div>

      {/* MESSAGES */}
      <div className="h-8 mb-4 flex items-center justify-center">
        {errorMsg && <p className="text-red-500 text-xl font-bold animate-pulse uppercase">{errorMsg}</p>}
        {successMsg && <p className="text-[#39ff14] text-xl font-bold animate-bounce uppercase">{successMsg}</p>}
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col xl:flex-row gap-6 w-full max-w-7xl mx-auto">
        
        {/* LEFT COLUMN: HERO + GRID */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* HERO BANNER (NINGU DRONE MASTERY) */}
          <div className="bg-[#1a2639] border-4 border-[#2e4360] p-6 relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-900/20 rounded-full blur-3xl mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00d2ff]/20 rounded-full blur-3xl mix-blend-screen"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Character */}
              <div className="text-8xl drop-shadow-[0_0_15px_#00d2ff]">🥷</div>
              
              {/* Center Text */}
              <div className="flex-1 text-center">
                <h2 className="text-3xl sm:text-5xl text-[#ff8c00] mb-2 uppercase drop-shadow-[2px_2px_0_#cc7000]">
                  NINGU DRONE MASTERY!
                </h2>
                <p className="text-lg sm:text-xl text-[#00d2ff] uppercase mb-6">
                  EMBRACE THE PATH OF TECHNO-SHINOBI.
                </p>
                <button className="bg-gradient-to-b from-[#ff8c00] to-[#cc7000] text-[#0f1626] border-2 border-[#ffb347] px-8 py-3 text-xl uppercase tracking-wider hover:brightness-110 active:translate-y-1 shadow-[4px_4px_0_#0f1626]">
                  SHOP NOW!
                </button>
              </div>

              {/* Right Character/Scene */}
              <div className="text-8xl flex gap-2 drop-shadow-[0_0_15px_#ff4b4b]">
                🤖🚁
              </div>
            </div>
          </div>

          {/* ITEM GRID (2x4 on Large Screens, 2x2 on Mobile) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {AVATARS.map((item) => {
              const isUnlocked = unlockedAvatars.includes(item.id);
              const isEquipped = activeAvatar.id === item.id;

              return (
                <div 
                  key={item.id} 
                  className={`bg-[#1a2639] border-4 flex flex-col p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] relative group transition-all ${
                    isEquipped ? 'border-[#39ff14] shadow-[0_0_15px_#39ff14]' : 'border-[#2e4360] hover:border-[#ff8c00]'
                  }`}
                >
                  {/* Icon Area */}
                  <div className="h-32 bg-[#0f1626]/50 mb-4 flex items-center justify-center border-2 border-[#2e4360] group-hover:bg-[#0f1626] overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    ) : (
                      <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform">{item.emoji}</span>
                    )}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-[#ff8c00] leading-tight mb-2 uppercase break-words">
                      {item.name}
                    </h3>
                    <p className="text-[#00d2ff] text-xs font-sans mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    
                    {/* Price and Button */}
                    <div className="mt-auto">
                      <div className="text-[#39ff14] text-lg mb-2 uppercase">
                        {item.price} <span className="text-sm">Yen / RC Coins</span>
                      </div>
                      
                      {isEquipped ? (
                        <button disabled className="w-full bg-[#39ff14]/20 text-[#39ff14] border-2 border-[#39ff14] py-2 uppercase text-sm tracking-wider opacity-70">
                          EQUIPADO
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleBuyOrEquip(item.id, item.price)}
                          className="w-full bg-gradient-to-b from-[#ff8c00] to-[#cc7000] text-[#0f1626] border-2 border-[#ffb347] py-2 uppercase text-sm font-bold tracking-wider hover:brightness-110 active:translate-y-1 shadow-[2px_2px_0_#0f1626]"
                        >
                          {isUnlocked ? 'EQUIPAR ITEM!' : 'ADD TO INVENTRY!'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* RIGHT COLUMN: INVENTORY SIDEBAR */}
        <div className="w-full xl:w-72 bg-[#1a2639] border-4 border-[#2e4360] p-4 flex flex-col items-center">
          
          <div className="w-full bg-[#0f1626] border-2 border-[#ff8c00] text-[#ff8c00] p-2 text-center mb-6 shadow-[0_0_10px_#ff8c00]">
            <p className="text-sm uppercase">Your Balance</p>
            <p className="text-3xl">{ryo} RC Coins</p>
          </div>

          <h3 className="text-[#00d2ff] uppercase text-xl mb-4 border-b-2 border-[#00d2ff] w-full text-center pb-2">
            Inventory
          </h3>
          
          <div className="flex-1 w-full flex flex-col gap-4 items-center overflow-y-auto">
            {/* Shelf Item (Scrolls) */}
            <div className="w-4/5 h-16 bg-[#2e4360] rounded-sm relative flex items-center justify-center">
               <span className="text-4xl absolute -top-4">📜</span>
               <div className="w-full h-2 bg-[#0f1626] absolute bottom-2"></div>
            </div>
            <div className="w-4/5 h-16 bg-[#2e4360] rounded-sm relative flex items-center justify-center mt-4">
               <span className="text-4xl absolute -top-4">📜</span>
               <div className="w-full h-2 bg-[#0f1626] absolute bottom-2"></div>
            </div>
            
            {/* Shelf Item (Kunai) */}
            <div className="w-4/5 h-32 bg-[#2e4360] rounded-sm relative flex items-center justify-center mt-4">
               <span className="text-6xl rotate-90">🗡️</span>
               <div className="w-2 h-full bg-[#0f1626] absolute left-4"></div>
            </div>
          </div>
          
          {/* Pixel Mouse Pointer representation */}
          <div className="self-end mt-4 animate-bounce">
            <MousePointer2 className="w-8 h-8 fill-white stroke-black" />
          </div>
        </div>

      </div>
    </div>
  );
}
