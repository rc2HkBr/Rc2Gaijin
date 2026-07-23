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

// Sprites de Games Clássicos
export const AVATARS: Avatar[] = [
  { 
    id: 'mewtwo', 
    name: 'MEWTWO (PROJETO X)', 
    emoji: '', 
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
    price: 300,
    description: 'Um clone genético criado para ser a arma definitiva no ciberespaço.'
  },
  { 
    id: 'gengar', 
    name: 'GENGAR (SHADOW)', 
    emoji: '', 
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
    price: 250,
    description: 'Uma entidade sombria que rouba dados atravessando as paredes do firewall.'
  },
  { 
    id: 'scyther', 
    name: 'SCYTHER (NINJA BUG)', 
    emoji: '', 
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png',
    price: 200,
    description: 'Velocidade extrema e lâminas cortantes. Perfeito para infiltração de sistemas.'
  },
  { 
    id: 'blastoise', 
    name: 'BLASTOISE (MECHA)', 
    emoji: '', 
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
    price: 250,
    description: 'Armadura pesada e canhões de dados de alto impacto.'
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
  const [activeAvatarId, setActiveAvatarId] = useState('ninja_classico');
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['ninja_classico']);

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
