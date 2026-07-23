'use client';

import { ChevronLeft, ScrollText, Feather, Sword, Anchor } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrigensPage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none font-sans relative z-10 overflow-x-hidden">
      
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
            BIBLIOTECA NINJA
          </span>
        </div>
      </div>

      {/* HERO BANNER */}
      <div className="w-full bg-[#1a2332] border-b-4 border-primary p-12 flex flex-col items-center text-center shadow-[0_0_20px_rgba(255,140,0,0.2)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <ScrollText className="w-16 h-16 text-primary mb-4 relative z-10 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]" />
        <h2 className="text-4xl sm:text-6xl font-pixel text-white mb-4 uppercase drop-shadow-[0_0_8px_rgba(255,140,0,0.8)] leading-none relative z-10">
          A ORIGEM DOS SÍMBOLOS
        </h2>
        <p className="text-gray-300 font-sans relative z-10 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Assustado com tantos traços diferentes? Não se preocupe! Toda a escrita japonesa nasceu de uma história fascinante de adaptação. Conheça a lenda.
        </p>
      </div>

      {/* STORYTELLING CONTAINER */}
      <div className="w-full max-w-4xl px-4 sm:px-8 py-16 flex flex-col gap-24 relative z-10">
        
        {/* PARTE 1: KANJI */}
        <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-orange-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border-4 border-orange-500 rounded-xl overflow-hidden shadow-[8px_8px_0_#c2410c] bg-black aspect-[4/3]">
              <Image src="/images/origens/kanji.png" alt="A Chegada do Kanji" fill className="object-cover" />
            </div>
            {/* Tag */}
            <div className="absolute -bottom-4 -right-4 bg-orange-600 text-white font-pixel px-4 py-2 text-xl uppercase shadow-[4px_4px_0_#7c2d12] flex items-center gap-2">
              <Anchor className="w-5 h-5" /> Kanji
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <h3 className="text-3xl font-pixel text-orange-500 mb-4 uppercase drop-shadow-sm">A Semente Estrangeira</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Há muito tempo, os japoneses apenas <strong>falavam</strong>. Eles não tinham um sistema próprio para escrever suas histórias e leis.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              A solução? Eles "pegaram emprestado" os complexos ideogramas da China, os <strong>Kanjis</strong>. O problema é que a gramática chinesa e a japonesa eram completamente diferentes!
            </p>
            <div className="bg-orange-950/30 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-200 text-sm italic">
                "Usar os kanjis para escrever japonês era como tentar usar uma armadura feita para um gigante: pesada e desajeitada."
              </p>
            </div>
          </div>
        </section>

        {/* PARTE 2: HIRAGANA */}
        <section className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-pink-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border-4 border-pink-400 rounded-xl overflow-hidden shadow-[8px_8px_0_#be185d] bg-black aspect-[4/3]">
              <Image src="/images/origens/hiragana.png" alt="A Criação do Hiragana" fill className="object-cover" />
            </div>
            {/* Tag */}
            <div className="absolute -bottom-4 -left-4 bg-pink-500 text-white font-pixel px-4 py-2 text-xl uppercase shadow-[4px_4px_0_#831843] flex items-center gap-2">
              <Feather className="w-5 h-5" /> Hiragana
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <h3 className="text-3xl font-pixel text-pink-400 mb-4 uppercase drop-shadow-sm">A Arte Suave da Corte</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              No Período Heian, a escrita em Kanji oficial era exclusiva dos homens do governo. As mulheres nobres da corte, no entanto, queriam escrever diários e belos poemas românticos.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Com seus pincéis macios, elas começaram a <strong>simplificar</strong> os rígidos kanjis inteiros, escrevendo-os rapidamente com linhas cursivas e redondas. Nascia o <strong>Hiragana</strong>.
            </p>
            <div className="bg-pink-950/30 border-l-4 border-pink-400 p-4 rounded-r-lg">
              <p className="text-pink-200 text-sm italic">
                Hoje, usamos o Hiragana (estas letras cheias de curvas) para escrever a gramática nativa japonesa e dar fluidez à frase.
              </p>
            </div>
          </div>
        </section>

        {/* PARTE 3: KATAKANA */}
        <section className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-emerald-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border-4 border-emerald-400 rounded-xl overflow-hidden shadow-[8px_8px_0_#047857] bg-black aspect-[4/3]">
              <Image src="/images/origens/katakana.png" alt="O Katakana dos Monges" fill className="object-cover" />
            </div>
            {/* Tag */}
            <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white font-pixel px-4 py-2 text-xl uppercase shadow-[4px_4px_0_#064e3b] flex items-center gap-2">
              <Sword className="w-5 h-5" /> Katakana
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col">
            <h3 className="text-3xl font-pixel text-emerald-400 mb-4 uppercase drop-shadow-sm">A Lâmina Afiada</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Do outro lado do Japão, os monges budistas enfrentavam um problema: eles precisavam fazer anotações rápidas enquanto ouviam as palestras de seus mestres. 
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Sem tempo para desenhar as curvas do hiragana ou os detalhes dos kanjis, eles começaram a pegar <strong>apenas um pedaço ou traço reto</strong> de um Kanji. Por isso as letras do <strong>Katakana</strong> parecem cortes de espadas!
            </p>
            <div className="bg-emerald-950/30 border-l-4 border-emerald-400 p-4 rounded-r-lg">
              <p className="text-emerald-200 text-sm italic">
                Afiado e marcante, o Katakana hoje é usado para dar ênfase, escrever onomatopeias e principalmente nomes estrangeiros (como o seu!).
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* FOOTER CTA */}
      <div className="w-full bg-[#111] border-t-4 border-primary py-16 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <h3 className="text-2xl sm:text-4xl font-pixel text-white mb-6 uppercase">
          E ENTÃO, VOCÊ ESTÁ PRONTO?
        </h3>
        <p className="text-gray-400 mb-8 max-w-xl text-lg">
          Agora que você entende o motivo de existirem os 3 sistemas, não há motivo para temer. Vamos focar no começo da jornada.
        </p>
        <Link 
          href="/lesson?group=vowels"
          className="bg-primary text-black font-pixel text-2xl sm:text-3xl px-12 py-6 uppercase shadow-[6px_6px_0_#000] border-2 border-white hover:brightness-110 active:translate-y-2 active:shadow-none transition-all flex items-center gap-4"
        >
          <Feather className="w-8 h-8" />
          INICIAR O TREINO
        </Link>
      </div>

    </div>
  );
}
