'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export const AVATARS: Avatar[] = [
  { id: 'ninja_padrao', name: 'Aprendiz Ninja', emoji: '🥷', price: 0 },
  { id: 'samurai', name: 'Samurai Errante', emoji: '🗡️', price: 500 },
  { id: 'sapo', name: 'Sábio dos Sapos', emoji: '🐸', price: 1500 },
  { id: 'kitsune', name: 'Raposa Mística', emoji: '🦊', price: 3000 },
  { id: 'dragao', name: 'Dragão Ascendente', emoji: '🐉', price: 10000 },
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
  // Inicializamos com valores padrão e depois lemos do localStorage se possível
  const [ryo, setRyo] = useState(1500); // Começa com 1500 para testes da loja
  const [activeAvatarId, setActiveAvatarId] = useState('ninja_padrao');
  const [unlockedAvatars, setUnlockedAvatars] = useState<string[]>(['ninja_padrao']);

  // Carregar do localStorage
  useEffect(() => {
    const savedRyo = localStorage.getItem('gaijin_ryo');
    const savedAvatar = localStorage.getItem('gaijin_avatar');
    const savedUnlocked = localStorage.getItem('gaijin_unlocked_avatars');

    if (savedRyo) setRyo(Number(savedRyo));
    if (savedAvatar) setActiveAvatarId(savedAvatar);
    if (savedUnlocked) setUnlockedAvatars(JSON.parse(savedUnlocked));
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('gaijin_ryo', ryo.toString());
    localStorage.setItem('gaijin_avatar', activeAvatarId);
    localStorage.setItem('gaijin_unlocked_avatars', JSON.stringify(unlockedAvatars));
  }, [ryo, activeAvatarId, unlockedAvatars]);

  const addRyo = (amount: number) => setRyo((prev) => prev + amount);
  
  const spendRyo = (amount: number) => {
    if (ryo >= amount) {
      setRyo((prev) => prev - amount);
      return true; // Sucesso
    }
    return false; // Saldo insuficiente
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
