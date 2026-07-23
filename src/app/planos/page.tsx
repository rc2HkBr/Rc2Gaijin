'use client';

import { ChevronLeft, CheckCircle2, Shield, Crown, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-2xl font-pixel text-primary uppercase mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-sm font-pixel text-secondary uppercase tracking-widest mt-1">
            ACADEMIA NINJA
          </span>
        </div>
      </div>

      {/* PRICING CONTAINER */}
      <div className="w-full max-w-6xl px-4 sm:px-8 mt-6 flex flex-col gap-10 relative z-10">
        
        {/* Banner Intro */}
        <div className="bg-[#1a2332] border-4 border-secondary p-8 flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,210,255,0.3)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <Crown className="w-12 h-12 text-secondary mb-3 relative z-10 drop-shadow-[0_0_5px_rgba(0,210,255,0.8)]" />
          <h2 className="text-3xl sm:text-5xl font-pixel text-white mb-4 uppercase drop-shadow-[0_0_8px_rgba(0,210,255,0.8)] leading-none relative z-10">
            ESCOLHA SEU CAMINHO
          </h2>
          <p className="text-gray-300 font-sans relative z-10 text-lg max-w-2xl mx-auto">
            Da sobrevivência básica à fluência absoluta. Desbloqueie seu verdadeiro potencial shinobi.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TIER 1: GENIN */}
          <div className="bg-surface-dark border-4 border-orange-700/50 p-6 flex flex-col relative shadow-[4px_4px_0_#9a3412] transition-transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-700"></div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-pixel text-2xl text-orange-500 uppercase drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">
                Nível Genin
              </h3>
              <Shield className="w-8 h-8 text-orange-700" />
            </div>
            <div className="mb-6 border-b border-orange-900/50 pb-6">
              <span className="text-5xl font-black text-white font-pixel">$4</span>
              <span className="text-orange-500 font-bold ml-2">/ mês</span>
            </div>
            <ul className="flex-1 space-y-4 text-sm text-gray-300 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Acesso às missões de Hiragana e Katakana (Fases 1 e 2).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Exercícios interativos e minigames com limite de Vidas (Corações).</span>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <XCircleIcon className="w-5 h-5 text-red-900 shrink-0" />
                <span className="line-through">Livre de anúncios.</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-[#111] border-2 border-orange-700 text-orange-500 font-pixel text-xl uppercase shadow-[4px_4px_0_#9a3412] hover:bg-orange-950 active:translate-y-1 active:shadow-none transition-all">
              COMEÇAR BÁSICO
            </button>
          </div>

          {/* TIER 2: CHUNIN (RECOMENDADO) */}
          <div className="bg-surface-dark border-4 border-secondary p-8 flex flex-col relative shadow-[0_0_30px_rgba(0,210,255,0.2)] transform lg:scale-105 z-10">
            <div className="absolute top-0 left-0 w-full bg-secondary text-black font-pixel text-center text-sm py-1 uppercase tracking-widest animate-pulse">
              Mais Popular (Recomendado)
            </div>
            <div className="flex justify-between items-center mt-4 mb-4">
              <h3 className="font-pixel text-3xl text-secondary uppercase drop-shadow-[0_0_5px_rgba(0,210,255,0.5)]">
                Nível Chunin
              </h3>
              <Zap className="w-10 h-10 text-secondary fill-secondary/20" />
            </div>
            <div className="mb-6 border-b border-secondary/30 pb-6">
              <span className="text-6xl font-black text-white font-pixel">$10</span>
              <span className="text-secondary font-bold ml-2">/ mês</span>
            </div>
            <ul className="flex-1 space-y-4 text-sm text-gray-200 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <span><strong className="text-white">Vidas infinitas e Zero Anúncios.</strong> Nunca seja interrompido pelo Fantasma da Memória.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <span><strong className="text-white">Fase 3 Desbloqueada:</strong> Acesso ao deck completo de 1.500 palavras (Kaishi 1.5k).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <span><strong className="text-white">Modo Offline:</strong> Dicionário japonês sem internet e pesquisa de radicais.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <span>Plano gramatical progressivo estruturado na nuvem.</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-secondary text-[#000] border-2 border-white font-pixel text-2xl uppercase shadow-[4px_4px_0_#000] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all">
              TORNAR-SE VIP
            </button>
          </div>

          {/* TIER 3: JONIN */}
          <div className="bg-surface-dark border-4 border-amber-500 p-6 flex flex-col relative shadow-[4px_4px_0_#f59e0b] transition-transform hover:-translate-y-2">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-pixel text-2xl text-amber-500 uppercase drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                Mestre Jonin
              </h3>
              <Crown className="w-8 h-8 text-amber-500" />
            </div>
            <div className="mb-6 border-b border-amber-900/50 pb-6">
              <span className="text-5xl font-black text-white font-pixel">$23</span>
              <span className="text-amber-500 font-bold ml-2">/ mês</span>
            </div>
            <ul className="flex-1 space-y-4 text-sm text-gray-300 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span><strong className="text-white">Tudo do Chunin, mais:</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span><strong className="text-amber-400">Interação com Nativos:</strong> Correção de áudios e textos por uma comunidade japonesa.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span><strong>Aulas Expressas:</strong> Drops diários de vocabulário via notificação push.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span><strong>Módulo Conversação Real:</strong> Simuladores de diálogo para viagem e dia a dia.</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-[#111] border-2 border-amber-500 text-amber-500 font-pixel text-xl uppercase shadow-[4px_4px_0_#f59e0b] hover:bg-amber-950 active:translate-y-1 active:shadow-none transition-all">
              VIRAR MESTRE
            </button>
          </div>

        </div>

        {/* PROMO BANNER */}
        <div className="bg-primary/10 border-2 border-primary border-dashed p-6 flex flex-col sm:flex-row items-center justify-between mt-8 relative z-10 shadow-[0_0_15px_rgba(255,140,0,0.2)]">
           <div className="flex items-center gap-4 mb-4 sm:mb-0">
             <Sparkles className="w-12 h-12 text-primary animate-pulse" />
             <div>
               <h4 className="text-2xl font-pixel text-primary uppercase">TEST DRIVE VIP</h4>
               <p className="text-gray-300 text-sm">Acesse todo o conteúdo premium Chunin (VIP) por 30 dias!</p>
             </div>
           </div>
           <button className="w-full sm:w-auto bg-primary text-[#000] font-pixel text-xl px-8 py-3 uppercase shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none hover:bg-primary-dark transition-all">
             TESTAR POR US$ 1
           </button>
        </div>

      </div>
    </div>
  );
}

// Ícone Auxiliar (Missing na importação principal)
function XCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}
