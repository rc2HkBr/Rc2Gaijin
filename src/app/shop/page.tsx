'use client';

import { ShoppingBag, Coins, Lock, CheckCircle, Palette } from 'lucide-react';
import { useGame, AVATARS } from '@/context/GameContext';
import { useState } from 'react';

export default function ShopPage() {
  const { ryo, unlockedAvatars, unlockAvatar, activeAvatar, setActiveAvatarId, spendRyo } = useGame();
  const [activeTab, setActiveTab] = useState<'avatars' | 'themes'>('avatars');
  const [errorMsg, setErrorMsg] = useState('');

  const handleBuyOrEquipAvatar = (id: string, price: number) => {
    setErrorMsg('');
    if (unlockedAvatars.includes(id)) {
      // Já tem, então equipa
      setActiveAvatarId(id);
    } else {
      // Tentar comprar
      if (spendRyo(price)) {
        unlockAvatar(id);
        setActiveAvatarId(id);
      } else {
        setErrorMsg('Ryō insuficiente para comprar este item!');
        setTimeout(() => setErrorMsg(''), 3000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center pb-24 pt-6 w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="w-full mb-8 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4" /> Loja do Ferreiro
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Mercado Ninja</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Gaste seus Ryō ganhos nas missões para personalizar seu Perfil e o visual do aplicativo!
        </p>
      </div>

      {/* Saldo Atual */}
      <div className="bg-surface border-2 border-amber-200 rounded-3xl p-6 shadow-sm mb-10 w-full max-w-md flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Seu Saldo Atual</span>
        <div className="flex items-center gap-3 text-4xl font-black text-amber-500">
          <Coins className="w-10 h-10 fill-amber-500" />
          {ryo} <span className="text-xl text-amber-600/60 mt-2">Ryō</span>
        </div>
        {errorMsg && (
          <div className="mt-4 text-sm font-bold text-red-500 bg-red-50 px-4 py-2 rounded-xl animate-pulse">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex w-full max-w-sm bg-surface p-1 rounded-2xl border-2 border-border mb-8 shadow-sm">
        <button
          onClick={() => setActiveTab('avatars')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'avatars' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary'
          }`}
        >
          Avatares Premium
        </button>
        <button
          onClick={() => setActiveTab('themes')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'themes' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary'
          }`}
        >
          Cores do Tema
        </button>
      </div>

      {/* Tab Content: Avatares */}
      {activeTab === 'avatars' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {AVATARS.map((avatar) => {
            const isUnlocked = unlockedAvatars.includes(avatar.id);
            const isEquipped = activeAvatar.id === avatar.id;

            return (
              <div 
                key={avatar.id} 
                className={`bg-surface border-2 rounded-3xl p-5 flex flex-col items-center text-center transition-all ${
                  isEquipped ? 'border-primary shadow-lg ring-4 ring-primary/20 scale-105' : 
                  isUnlocked ? 'border-emerald-500/50 hover:border-emerald-500' : 'border-border hover:border-amber-300'
                }`}
              >
                <div className="text-6xl mb-4 drop-shadow-md">{avatar.emoji}</div>
                <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">{avatar.name}</h3>
                
                {/* Status / Button */}
                <div className="mt-auto pt-4 w-full">
                  {isEquipped ? (
                    <button disabled className="w-full bg-primary/10 text-primary font-black py-2 rounded-xl flex items-center justify-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4" /> Equipado
                    </button>
                  ) : isUnlocked ? (
                    <button 
                      onClick={() => handleBuyOrEquipAvatar(avatar.id, avatar.price)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-2 rounded-xl text-sm transition-colors shadow-md active:translate-y-1"
                    >
                      Equipar
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleBuyOrEquipAvatar(avatar.id, avatar.price)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black py-2 rounded-xl flex items-center justify-center gap-1.5 text-sm transition-colors shadow-md active:translate-y-1"
                    >
                      <Coins className="w-4 h-4 fill-white" /> {avatar.price}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab Content: Themes (Em Breve) */}
      {activeTab === 'themes' && (
        <div className="w-full bg-surface border-2 border-dashed border-border rounded-3xl p-12 flex flex-col items-center justify-center text-center">
          <Palette className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-black text-gray-400 mb-2">Em Construção</h2>
          <p className="text-gray-500 max-w-sm">
            O ferreiro ainda está misturando as tintas! Em breve você poderá comprar temas como "Dark Sakura" ou "Neon Tokyo".
          </p>
        </div>
      )}
    </div>
  );
}
