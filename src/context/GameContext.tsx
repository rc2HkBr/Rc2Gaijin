'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sfx } from '@/utils/sfx';

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
    imageUrl: '/images/avatars/shinobi.png', 
    price: 300,
    description: 'Um mestre furtivo. Aumenta a evasão contra armadilhas de gramática.'
  },
  { 
    id: 'ronin_errante', 
    name: 'RONIN ERRANTE', 
    emoji: '⚔️', 
    imageUrl: '/images/avatars/ronin.png', 
    price: 250,
    description: 'Um guerreiro sem mestre. Focado em força bruta para destruir Kanjis complexos.'
  },
  { 
    id: 'gaijin_aco', 
    name: 'GAIJIN DE AÇO', 
    emoji: '🛡️', 
    imageUrl: '/images/avatars/gaijin.png', 
    price: 200,
    description: 'Estrangeiro equipado com armadura ocidental. Especialista em resistir a ataques longos.'
  },
  { 
    id: 'onna_bugeisha', 
    name: 'ONNA-BUGEISHA', 
    emoji: '🌸', 
    imageUrl: '/images/avatars/onna.png', 
    price: 250,
    description: 'Guerreira nobre com naginata. Velocidade implacável na leitura de Katakana.'
  }
];

interface GameContextProps {
  ryo: number;
  hp: number;
  smokeBombs: number;
  addRyo: (amount: number) => void;
  spendRyo: (amount: number) => boolean;
  activeAvatar: Avatar;
  setActiveAvatarId: (id: string) => void;
  unlockedAvatars: string[];
  unlockAvatar: (id: string) => void;
  healHp: () => boolean;
  takeDamage: () => void;
  buySmokeBomb: () => boolean;
  useSmokeBomb: () => boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [ryo, setRyo] = useState(1500); 
  const [hp, setHp] = useState(3);
  const [smokeBombs, setSmokeBombs] = useState(1);
  const [activeAvatarId, setActiveAvatarId] = useState('shinobi_sombras');
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['shinobi_sombras']);

  useEffect(() => {
    const savedRyo = localStorage.getItem('gaijin_ryo');
    const savedHp = localStorage.getItem('gaijin_hp');
    const savedBombs = localStorage.getItem('gaijin_smoke_bombs');
    const savedAvatar = localStorage.getItem('gaijin_avatar');
    const savedUnlocked = localStorage.getItem('gaijin_unlocked_avatars');

    if (savedRyo) setRyo(Number(savedRyo));
    if (savedHp) setHp(Number(savedHp));
    if (savedBombs) setSmokeBombs(Number(savedBombs));
    if (savedAvatar) setActiveAvatarId(savedAvatar);
    if (savedUnlocked) setUnlockedAvatars(JSON.parse(savedUnlocked));
  }, []);

  useEffect(() => {
    localStorage.setItem('gaijin_ryo', ryo.toString());
    localStorage.setItem('gaijin_hp', hp.toString());
    localStorage.setItem('gaijin_smoke_bombs', smokeBombs.toString());
    localStorage.setItem('gaijin_avatar', activeAvatarId);
    localStorage.setItem('gaijin_unlocked_avatars', JSON.stringify(unlockedAvatars));
  }, [ryo, hp, smokeBombs, activeAvatarId, unlockedAvatars]);

  const addRyo = (amount: number) => {
    setRyo((prev) => prev + amount);
    sfx.playSuccess();
  };
  
  const spendRyo = (amount: number) => {
    if (ryo >= amount) {
      setRyo((prev) => prev - amount);
      sfx.playClick();
      return true;
    }
    sfx.playDamage();
    return false;
  };

  const healHp = () => {
    if (hp >= 3) {
      sfx.playDamage();
      return false; // HP already max
    }
    if (spendRyo(150)) {
      setHp((prev) => Math.min(3, prev + 1));
      sfx.playSuccess();
      return true;
    }
    return false;
  };

  const takeDamage = () => {
    setHp((prev) => Math.max(0, prev - 1));
    sfx.playDamage();
  };

  const buySmokeBomb = () => {
    if (spendRyo(300)) {
      setSmokeBombs((prev) => prev + 1);
      sfx.playSuccess();
      return true;
    }
    return false;
  };

  const useSmokeBomb = () => {
    if (smokeBombs > 0) {
      setSmokeBombs((prev) => prev - 1);
      sfx.playSuccess();
      return true;
    }
    sfx.playDamage();
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
        hp,
        smokeBombs,
        addRyo, 
        spendRyo, 
        activeAvatar, 
        setActiveAvatarId, 
        unlockedAvatars, 
        unlockAvatar,
        healHp,
        takeDamage,
        buySmokeBomb,
        useSmokeBomb
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
