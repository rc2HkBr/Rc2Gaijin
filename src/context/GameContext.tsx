'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
}

// Transformamos a lista de Avatares no "Ningu Arsenal"
export const AVATARS: Avatar[] = [
  { 
    id: 'kitsune_drone', 
    name: 'KITSUNE DRONE V2', 
    emoji: '🦊', 
    price: 150,
    description: 'Um drone de vigilância tático e furtivo com câmera de alta resolução.'
  },
  { 
    id: 'mecha_shuriken', 
    name: 'MECHA SHURIKEN X-1', 
    emoji: '❄️', // Shuriken representation 
    price: 130,
    description: 'Um shuriken autônomo com múltiplos modos de ataque e rastreamento.'
  },
  { 
    id: 'cyber_kunai', 
    name: 'CYBER KUNAI REMOTE', 
    emoji: '🗡️', 
    price: 150,
    description: 'Um dispositivo de controle remoto versátil para controlar drones e mechas à distância.'
  },
  { 
    id: 'onimaru_mech', 
    name: 'ONIMARU BATTLE MECH', 
    emoji: '🤖', 
    price: 130,
    description: 'Um mecha bípede pesado para combate direto e defesa.'
  },
  { 
    id: 'ninja_scroll', 
    name: 'NINJA SCROLL UPGRADE', 
    emoji: '📜', 
    price: 130,
    description: 'Um pergaminho de aprimoramento que desbloqueia novas habilidades.'
  },
  { 
    id: 'shinobi_cam', 
    name: 'SHINOBI CAM SYSTEM', 
    emoji: '📹', 
    price: 130,
    description: 'Um sistema de câmera avançado para reconhecimento e coleta de informações.'
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
  const [activeAvatarId, setActiveAvatarId] = useState('kitsune_drone');
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['kitsune_drone']);

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
