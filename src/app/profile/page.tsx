'use client';

import { Shield, Swords, Flame, Coins, Trophy, Star, BookOpen, Clock, Target, Medal } from 'lucide-react';
import Heatmap from '@/components/Heatmap';
import { useGame } from '@/context/GameContext';

export default function ProfilePage() {
  const { ryo, activeAvatar } = useGame();
  
  return (
    <div className="flex flex-col items-center pb-24 w-full max-w-4xl mx-auto">
      {/* Header / Banner */}
      <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-primary via-blue-600 to-purple-700 relative flex flex-col justify-end px-4 sm:px-8 pb-6 shadow-inner">
        {/* Abstract Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 translate-y-16 sm:translate-y-12">
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-surface border-4 border-surface shadow-2xl flex items-center justify-center text-6xl relative">
            {activeAvatar.emoji}
            <div className="absolute -bottom-2 sm:-bottom-3 bg-amber-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border-2 border-surface shadow-md">
              Nível 12
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black text-foreground sm:text-white drop-shadow-sm mt-2 sm:mt-0">Naruto Uzumaki</h1>
            <p className="text-primary sm:text-blue-100 font-bold uppercase tracking-widest text-sm flex items-center gap-1.5 mt-1">
              <Shield className="w-4 h-4" /> {activeAvatar.name}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 mt-20 sm:mt-24 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          <div className="bg-surface border-2 border-border p-4 rounded-3xl flex flex-col items-center justify-center shadow-sm">
            <Swords className="w-8 h-8 text-primary mb-2" />
            <span className="text-2xl font-black text-foreground">12,450</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">XP Total</span>
          </div>
          <div className="bg-surface border-2 border-border p-4 rounded-3xl flex flex-col items-center justify-center shadow-sm">
            <Flame className="w-8 h-8 text-orange-500 mb-2" />
            <span className="text-2xl font-black text-foreground">84</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Dias Seguidos</span>
          </div>
          <div className="bg-surface border-2 border-border p-4 rounded-3xl flex flex-col items-center justify-center shadow-sm">
            <BookOpen className="w-8 h-8 text-emerald-500 mb-2" />
            <span className="text-2xl font-black text-foreground">1,500</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Cartas Dominadas</span>
          </div>
          <div className="bg-surface border-2 border-border p-4 rounded-3xl flex flex-col items-center justify-center shadow-sm">
            <Coins className="w-8 h-8 text-amber-500 mb-2" />
            <span className="text-2xl font-black text-foreground">{ryo}</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Ouro (Ryō)</span>
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="w-full">
          <Heatmap />
        </div>

        {/* Achievements / Badges */}
        <div className="w-full bg-surface border-2 border-border p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-amber-500" />
            <h2 className="text-xl font-black text-foreground">Salão de Conquistas</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center p-4 border-2 border-amber-500/20 bg-amber-500/5 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-3">
                <Medal className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm leading-tight">Mestre Kana</h3>
              <p className="text-[10px] text-gray-500 mt-1">Zerou a Fase 1 e 2 sem perder vida.</p>
            </div>
            
            {/* Badge 2 */}
            <div className="flex flex-col items-center text-center p-4 border-2 border-orange-500/20 bg-orange-500/5 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm leading-tight">Sobrevivente</h3>
              <p className="text-[10px] text-gray-500 mt-1">Manteve a ofensiva por 30 dias seguidos.</p>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center text-center p-4 border-2 border-purple-500/20 bg-purple-500/5 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <Target className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-bold text-foreground text-sm leading-tight">Olhos de Águia</h3>
              <p className="text-[10px] text-gray-500 mt-1">Acertou 100 flashcards perfeitamente.</p>
            </div>

            {/* Badge 4 (Locked) */}
            <div className="flex flex-col items-center text-center p-4 border-2 border-dashed border-gray-300 bg-gray-50 rounded-2xl opacity-50 grayscale">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-500 text-sm leading-tight">Lenda Viva</h3>
              <p className="text-[10px] text-gray-400 mt-1">Zere o Castelo do Shogun (Fase 5).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
