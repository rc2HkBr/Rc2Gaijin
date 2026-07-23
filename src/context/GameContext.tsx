'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  imageUrl?: string;
  price: number;
  description: string;
}

export const AVATARS: Avatar[] = [
  { 
    id: 'shinobi_sombras', 
    name: 'SHINOBI DAS SOMBRAS', 
    emoji: '🥷', 
    imageUrl: '/images/origens/kanji.png', // Fallback temporário (depois alteraremos para a arte real)
    price: 300,
    description: 'Um mestre furtivo. Aumenta a evasão contra armadilhas de gramática.'
  },
  { 
    id: 'ronin_errante', 
    name: 'RONIN ERRANTE', 
    emoji: '⚔️', 
    imageUrl: '/images/origens/katakana.png', // Fallback temporário
    price: 250,
    description: 'Um guerreiro sem mestre. Focado em força bruta para destruir Kanjis complexos.'
  },
  { 
    id: 'gaijin_aco', 
    name: 'GAIJIN DE AÇO', 
    emoji: '🛡️', 
    imageUrl: '/images/origens/hiragana.png', // Fallback temporário
    price: 200,
    description: 'Estrangeiro equipado com armadura ocidental. Especialista em resistir a ataques longos.'
  },
  { 
    id: 'onna_bugeisha', 
    name: 'ONNA-BUGEISHA', 
    emoji: '🌸', 
    imageUrl: '', // Fica só o emoji enquanto a imagem não gera
    price: 250,
    description: 'Guerreira nobre com naginata. Velocidade implacável na leitura de Katakana.'
  }
];

interface GameContextProps {
  ryo: number;
  addRyo: (amount: number) => void;
  spendRyo: (amount: number) => boolean;
  activeAvatar: Avatar;
  setActiveAvatarId: (id: string) => void;
  unlockedAvatars: string[];
  unlockAvatar: (id: string) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [ryo, setRyo] = useState(1500); 
  const [activeAvatarId, setActiveAvatarId] = useState('shinobi_sombras');
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['shinobi_sombras']);

  useEffect(() => {
    const savedRyo = localStorage.getItem('gaijin_ryo');
    const savedAvatar = localStorage.getItem('gaijin_avatar');
    const savedUnlocked = localStorage.getItem('gaijin_unlocked_avatars');

    if (savedRyo) setRyo(Number(savedRyo));
    if (savedAvatar) setActiveAvatarId(savedAvatar);
    if (savedUnlocked) setUnlockedAvatars(JSON.parse(savedUnlocked));
  }, []);

  useEffect(() => {
    localStorage.setItem('gaijin_ryo', ryo.toString());
    localStorage.setItem('gaijin_avatar', activeAvatarId);
    localStorage.setItem('gaijin_unlocked_avatars', JSON.stringify(unlockedAvatars));
  }, [ryo, activeAvatarId, unlockedAvatars]);

  const addRyo = (amount: number) => setRyo((prev) => prev + amount);
  
  const spendRyo = (amount: number) => {
    if (ryo >= amount) {
      setRyo((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const unlockAvatar = (id: string) => {
    if (!unlockedAvatars.includes(id)) {
      setUnlockedAvatars((prev) => [...prev, id]);
    }
  };

  const activeAvatar = AVATARS.find((a) => a.id === activeAvatarId) || AVATARS[0];

  return (
    <GameContext.Provider 
      value={{ 
        ryo, 
        addRyo, 
        spendRyo, 
        activeAvatar, 
        setActiveAvatarId, 
        unlockedAvatars, 
        unlockAvatar 
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
