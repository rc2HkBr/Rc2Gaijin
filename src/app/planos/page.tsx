'use client';

import { ChevronLeft, CheckCircle2, Shield, Crown, Sparkles, Zap, Volume2, ShieldCheck, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full bg-[#07030d] text-foreground flex flex-col items-center select-none pb-28 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-[#0e071a] border-b border-purple-900/50 flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-lg">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-cyan-400">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-black text-cyan-300 uppercase mr-4 tracking-wide">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-purple-900/60 mx-2"></div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            PLANOS VIP & ACADEMIA
          </span>
        </div>
      </div>

      {/* PRICING CONTAINER */}
      <div className="w-full max-w-6xl px-4 sm:px-8 mt-6 flex flex-col gap-10 relative z-10">
        
        {/* Banner Intro */}
        <div className="bg-[#0b1424] border-2 border-cyan-500/80 p-8 rounded-3xl flex flex-col items-center text-center shadow-[0_0_30px_rgba(6,182,212,0.2)] relative overflow-hidden">
          <Crown className="w-12 h-12 text-cyan-400 mb-3 relative z-10 animate-bounce" />
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 uppercase tracking-wide">
            DESBLOQUEIE O POTENCIAL NINJA
          </h2>
          <p className="text-cyan-200 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            Vidas infinitas, sem anúncios e com áudios de pronúncia humana nativa para você atingir a fluência em japonês.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TIER 1: GENIN (GRÁTIS) */}
          <div className="bg-[#0e071a] border-2 border-orange-700/50 rounded-3xl p-6 flex flex-col relative shadow-lg hover:border-orange-500 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-orange-400 uppercase">
                Genin (Grátis)
              </h3>
              <Shield className="w-7 h-7 text-orange-600" />
            </div>
            <div className="mb-6 border-b border-purple-900/50 pb-6">
              <span className="text-5xl font-black text-white">R$ 0</span>
              <span className="text-orange-400 font-bold ml-2">/ mês</span>
            </div>
            <ul className="flex-1 space-y-4 text-sm text-gray-300 mb-8 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                <span>Acesso básico a Hiragana e Katakana.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                <span>Limite de 3 Vidas (HP) por dia.</span>
              </li>
              <li className="flex items-start gap-2 text-gray-500">
                <XCircleIcon className="w-5 h-5 text-red-900 shrink-0" />
                <span className="line-through">Livre de anúncios.</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-gray-900 border border-gray-800 text-gray-400 font-black text-sm uppercase rounded-2xl cursor-default">
              PLANO ATUAL
            </button>
          </div>

          {/* TIER 2: CHUNIN VIP (RECOMENDADO) */}
          <div className="bg-[#061724] border-2 border-cyan-400 rounded-3xl p-8 flex flex-col relative shadow-[0_0_35px_rgba(6,182,212,0.3)] transform lg:scale-105 z-10">
            <div className="absolute top-0 left-0 w-full bg-cyan-400 text-black font-black text-center text-xs py-1.5 uppercase tracking-widest rounded-t-2xl">
              🔥 MAIS POPULAR (BENEFÍCIOS IMEDIATOS)
            </div>
            <div className="flex justify-between items-center mt-4 mb-4">
              <h3 className="text-3xl font-black text-cyan-300 uppercase">
                Chunin VIP
              </h3>
              <Zap className="w-9 h-9 text-cyan-400 fill-cyan-400" />
            </div>
            <div className="mb-6 border-b border-cyan-500/40 pb-6">
              <span className="text-6xl font-black text-white">R$ 29</span>
              <span className="text-cyan-300 font-bold ml-2">/ mês</span>
            </div>
            <ul className="flex-1 space-y-4 text-sm text-gray-100 mb-8 font-medium">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Vidas Infinitas (HP Sem Limite):</strong> Erre quantas vezes quiser sem parar seu treino.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HeartHandshake className="w-5 h-5 text-cyan-400 shrink-0" />
                <span><strong className="text-white">100% Sem Anúncios:</strong> Navegação limpa e sem interrupções.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Volume2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span><strong className="text-white">Deck Kaishi 1.5k com Áudio Nativo:</strong> 1.500 palavras com voz humana de falantes nativos.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>Modo de Estudo Offline e Pesquisa de Radicais.</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-base uppercase rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
              ASSINAR CHUNIN VIP
            </button>
          </div>

          {/* TIER 3: JONIN MESTRE */}
          <div className="bg-[#0e071a] border-2 border-amber-500/70 rounded-3xl p-6 flex flex-col relative shadow-lg hover:border-amber-400 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-amber-400 uppercase">
                Mestre Jonin
              </h3>
              <Crown className="w-7 h-7 text-amber-400" />
            </div>
            <div className="mb-6 border-b border-purple-900/50 pb-6">
              <span className="text-5xl font-black text-white">R$ 59</span>
              <span className="text-amber-400 font-bold ml-2">/ mês</span>
            </div>
            <ul className="flex-1 space-y-4 text-sm text-gray-300 mb-8 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong className="text-white">Tudo do plano Chunin VIP, mais:</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Criação livre de Decks Customizados de Flashcards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Simulador de conversação real de viagens e entrevistas.</span>
              </li>
            </ul>
            <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm uppercase rounded-2xl transition-all shadow-md">
              VIRAR MESTRE JONIN
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

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
  );
}
