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

// Transformamos a lista de Avatares no "Dojo Clássico"
export const AVATARS: Avatar[] = [
  { 
    id: 'ninja_classico', 
    name: 'Ninja Tradicional', 
    emoji: '🥷', 
    imageUrl: '/images/shop/ninja_classico.png',
    price: 150,
    description: 'Um mestre nas artes da furtividade e infiltração.'
  },
  { 
    id: 'samurai_honrado', 
    name: 'Samurai Honrado', 
    emoji: '🗡️', 
    imageUrl: '/images/shop/samurai_honrado.png',
    price: 130,
    description: 'Guerreiro nobre treinado no caminho da espada e da disciplina.'
  },
  { 
    id: 'lutadora_karate', 
    name: 'Mestra de Karate', 
    emoji: '🥋', 
    imageUrl: '/images/shop/lutadora_karate.png',
    price: 150,
    description: 'Especialista em combate corpo a corpo e golpes de alto impacto.'
  },
  { 
    id: 'shuriken_aco', 
    name: 'Shuriken de Aço', 
    emoji: '❄️', 
    imageUrl: '/images/shop/shuriken_aco.png',
    price: 130,
    description: 'Arma de arremesso clássica, balanceada para precisão perfeita.'
  },
  { 
    id: 'pergaminho_sabedoria', 
    name: 'Pergaminho Antigo', 
    emoji: '📜', 
    price: 130,
    description: 'Contém técnicas ancestrais seladas há séculos.'
  },
  { 
    id: 'mascara_oni', 
    name: 'Máscara de Oni', 
    emoji: '👹', 
    price: 130,
    description: 'Artefato que intimida inimigos e protege o usuário.'
  },
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
