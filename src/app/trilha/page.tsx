'use client';

import { Mountain, Target, CheckCircle, Lock, PlayCircle, Coins, Award } from 'lucide-react';
import Link from 'next/link';

export default function TrilhaMasterPage() {
  // Simulação de progresso do aluno (em um app real isso viria do banco de dados/estado global)
  const currentExercises = 142;
  const totalExercises = 1000;
  const progressPercentage = Math.min((currentExercises / totalExercises) * 100, 100);

  const milestones = [
    { target: 100, title: "Despertar Shinobi", reward: "100 Ryō", icon: <Coins className="w-5 h-5 text-amber-500" /> },
    { target: 250, title: "Foco Absoluto", reward: "Medalha de Bronze", icon: <Award className="w-5 h-5 text-orange-500" /> },
    { target: 500, title: "Mente Inabalável", reward: "500 Ryō", icon: <Coins className="w-5 h-5 text-amber-500" /> },
    { target: 750, title: "Visão de Águia", reward: "Medalha de Prata", icon: <Award className="w-5 h-5 text-gray-400" /> },
    { target: 1000, title: "Domínio do Mestre", reward: "Desbloqueia J-Pop Learning", icon: <PlayCircle className="w-5 h-5 text-primary" /> },
  ];

  return (
    <div className="flex flex-col items-center pb-24 pt-6 w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="w-full mb-10 text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs uppercase tracking-wider">
          <Mountain className="w-4 h-4" /> Desafio dos 90 Dias
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">Trilha do Mestre</h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          O caminho para a fluência exige disciplina. Complete 1000 exercícios em até 3 meses para atingir o Domínio do Mestre e desbloquear recursos exclusivos!
        </p>
      </div>

      {/* Progress Card */}
      <div className="w-full bg-surface border-2 border-border p-6 sm:p-8 rounded-3xl shadow-xl mb-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-xl font-black text-foreground flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Seu Progresso Atual
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Missão em Andamento</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-primary">{currentExercises}</span>
              <span className="text-xl font-bold text-gray-400"> / 1000</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner mt-4 relative">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-1000 ease-out flex items-center justify-end px-2"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-400">
            <span>0%</span>
            <span>{Math.round(progressPercentage)}% Concluído</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Milestones / Checkpoints */}
      <div className="w-full relative">
        {/* Vertical Line */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 z-0"></div>

        <div className="space-y-6">
          {milestones.map((milestone, index) => {
            const isCompleted = currentExercises >= milestone.target;
            const isNext = !isCompleted && currentExercises < milestone.target && (index === 0 || currentExercises >= milestones[index - 1].target);
            
            return (
              <div key={milestone.target} className={`relative z-10 flex items-center ${index % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'} gap-6 w-full group`}>
                
                {/* Desktop Empty Space for alternating layout */}
                <div className="hidden sm:block sm:flex-1"></div>

                {/* Milestone Node */}
                <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-200 text-white shadow-lg shadow-emerald-500/30' 
                      : isNext
                        ? 'bg-primary border-blue-200 text-white animate-pulse shadow-lg shadow-primary/30'
                        : 'bg-surface border-border text-gray-300'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : isNext ? <Target className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 ml-16 sm:ml-0 ${index % 2 === 0 ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}>
                  <div className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isCompleted 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : isNext
                        ? 'bg-surface border-primary shadow-md'
                        : 'bg-gray-50 border-border opacity-70 grayscale'
                  }`}>
                    <div className={`text-xs font-black uppercase tracking-widest mb-1 ${isCompleted ? 'text-emerald-500' : isNext ? 'text-primary' : 'text-gray-400'}`}>
                      Alvo: {milestone.target} Ex.
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{milestone.title}</h3>
                    
                    <div className={`flex items-center gap-2 text-sm font-semibold ${index % 2 === 0 ? 'sm:justify-end' : 'sm:justify-start'} ${isCompleted ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {milestone.icon}
                      Recompensa: {milestone.reward}
                    </div>

                    {/* J-Pop Unlock Special CTA */}
                    {milestone.target === 1000 && isCompleted && (
                      <div className={`mt-4 ${index % 2 === 0 ? 'flex sm:justify-end' : 'flex sm:justify-start'}`}>
                        <Link href="/jpop" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl font-bold text-sm transition-transform active:scale-95 shadow-md">
                          <PlayCircle className="w-4 h-4" /> Acessar J-Pop Learning
                        </Link>
                      </div>
                    )}
                    {milestone.target === 1000 && !isCompleted && (
                      <div className="mt-4">
                        {/* Como simulamos o estado "não completo" mas queremos que o usuário teste a funcionalidade, vamos deixar um link de "preview" discreto */}
                        <Link href="/jpop" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:underline opacity-50">
                          [Preview Dev] Forçar Desbloqueio
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
