'use client';

import { Mountain, Play, ChevronLeft, BookOpen, XCircle, FileText, Swords, Music, PenTool, Skull, Zap, Video, Gift, Crown, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { sfx } from '@/utils/sfx';

// Trilha Completa Interativa de Prática Shinobi
const TRILHA_MODULES = [
  {
    id: 1,
    title: "Módulo 01: O Despertar do Kana",
    subtitle: "Vogais & Família K — Hiragana Base",
    shortDesc: "Domine os 46 caracteres fundamentais do Hiragana usando mnemônicos visuais e associação gráfica.",
    fullContent: `
<h3 class="text-lg font-black text-cyan-400 mb-2">👁️ Método de Associação Visual:</h3>
<p class="mb-4">Para gravar cada caractere no cérebro de forma indelével, associe o traço a uma imagem:</p>
<ul class="list-disc pl-5 space-y-2 text-emerald-300">
  <li><strong class="text-white">あ (A):</strong> Imagem de uma <em>Asa</em> de anjo sobre o sol.</li>
  <li><strong class="text-white">い (I):</strong> Imagem das orelhas de um <em>Inu</em> (cachorro).</li>
  <li><strong class="text-white">か (KA):</strong> Imagem de um guarda-chuva (<em>Kasa</em>) sob a chuva.</li>
  <li><strong class="text-white">き (KI):</strong> Imagem de uma árvore (<em>Ki</em>).</li>
</ul>
    `,
    emoji: "👁️",
    color: "bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-500/50",
    actions: [
      { label: "🎯 Praticar Vogais (A, I, U, E, O)", href: "/lesson?group=vowels", bg: "bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold" },
      { label: "⚡ Praticar Família K (KA, KI, KU, KE, KO)", href: "/lesson?group=k", bg: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold" },
      { label: "⚔️ Enfrentar Fantasma da Memória", href: "/boss/memory-ghost", bg: "bg-red-600 hover:bg-red-500 text-white font-bold" },
    ]
  },
  {
    id: 2,
    title: "Módulo 02: Katakana & Armadilhas Visuais",
    subtitle: "Clones Graficos — シ vs ツ & ソ vs ン",
    shortDesc: "Aprenda a diferenciar caracteres com traços idênticos no Katakana e evite as ilusões dos chefes.",
    fullContent: `
<h3 class="text-lg font-black text-blue-400 mb-2">⚔️ O Desafio dos Clones:</h3>
<p class="mb-4">No Katakana, a diferença entre o SHI (シ) e o TSU (ツ) está no ângulo dos traços:</p>
<ul class="list-disc pl-5 space-y-2 text-blue-300">
  <li><strong class="text-white">シ (SHI):</strong> Os traços são desenhados de baixo para cima (olhar horizontal).</li>
  <li><strong class="text-white">ツ (TSU):</strong> Os traços caem de cima para baixo (olhar vertical).</li>
</ul>
    `,
    emoji: "🌸",
    color: "bg-blue-500/20 border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    badgeColor: "bg-blue-950 text-blue-300 border-blue-500/50",
    actions: [
      { label: "🌸 Desafiar Kunoichi Sakura (Armadilhas Katakana)", href: "/boss/kunoichi-sakura", bg: "bg-pink-600 hover:bg-pink-500 text-white font-extrabold" },
      { label: "📖 Ver Tabela de Katakana", href: "/lesson?group=vowels", bg: "bg-blue-600 hover:bg-blue-500 text-white font-bold" },
    ]
  },
  {
    id: 3,
    title: "Módulo 03: Cyber Karaoke — Imersão Sonora",
    subtitle: "Aprendizado Lúdico com J-Pop e Anime Hits",
    shortDesc: "Cante seus animes favoritos enquanto treina o ouvido, o furigana e o preenchimento de lacunas sonora.",
    fullContent: `
<h3 class="text-lg font-black text-pink-400 mb-2">🎤 Método de Transcrição Audial:</h3>
<p class="mb-4">Ao ouvir a música com o Modo Desafio ativado, o aplicativo ocultará palavras-chave. Digite a palavra ouvida para fixar o vocabulário real.</p>
    `,
    emoji: "🎤",
    color: "bg-pink-500/20 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]",
    badgeColor: "bg-pink-950 text-pink-300 border-pink-500/50",
    actions: [
      { label: "🎤 Abrir Jukebox Cyber Karaoke", href: "/jpop", bg: "bg-pink-600 hover:bg-pink-500 text-white font-extrabold" },
      { label: "🎵 Praticar Shinunoga E-Wa (Fujii Kaze)", href: "/jpop/play/1", bg: "bg-purple-600 hover:bg-purple-500 text-white font-bold" },
    ]
  },
  {
    id: 4,
    title: "Módulo 04: Banco Kanji & Escrita Kakijun",
    subtitle: "Caligrafia Interativa no Canvas",
    shortDesc: "Aprenda a ordem correta dos traços dos Kanjis (Kakijun) e desenhe na tela do celular por cima da marca d'água.",
    fullContent: `
<h3 class="text-lg font-black text-amber-400 mb-2">✍️ Memória Motora no Canvas:</h3>
<p class="mb-4">Desenhar os ideogramas no quadro interativo ativa a memória cinestésica do cérebro, facilitando a retenção duradoura.</p>
    `,
    emoji: "✍️",
    color: "bg-amber-500/20 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    badgeColor: "bg-amber-950 text-amber-300 border-amber-500/50",
    actions: [
      { label: "✍️ Forjar Kanjis no Canvas Interativo", href: "/kaishi", bg: "bg-amber-500 hover:bg-amber-400 text-black font-extrabold" },
      { label: "📚 Dicionário Visual Kaishi 1.5k", href: "/kaishi", bg: "bg-purple-600 hover:bg-purple-500 text-white font-bold" },
    ]
  },
  {
    id: 5,
    title: "Módulo 05: Invasão do Shogun (Eventos Épicos)",
    subtitle: "Invasão de Fim de Semana — Estilo Katsuhiro Otomo",
    shortDesc: "Enfrente o gigante Shogun Raijin em batalhas de reflexo com chuva intensa, relâmpagos e 4 poses de sprite.",
    fullContent: `
<h3 class="text-lg font-black text-cyan-400 mb-2">⚡ Raids de Tempo Limitado:</h3>
<p class="mb-4">Vença o chefe em até 4.0 segundos por pergunta para coletar **+500 Ryō** e desbloquear itens de sobrevivência na Shuriken Shop.</p>
    `,
    emoji: "⚡",
    color: "bg-cyan-500/20 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-500/50",
    actions: [
      { label: "⚡ Desafiar Shogun Raijin (Estilo Akira)", href: "/boss/shogun-raijin", bg: "bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold" },
      { label: "🛍️ Comprar Poção de Cura na Shuriken Shop", href: "/shop", bg: "bg-emerald-600 hover:bg-emerald-500 text-white font-bold" },
    ]
  },
  {
    id: 6,
    title: "Módulo 06: Aulas ao Vivo & Senseis Nativo",
    subtitle: "Marketplace de Transmissão via Google Meet",
    shortDesc: "Agende 1 hora de conversa particular com professores reais para atingir a fluência absoluta.",
    fullContent: `
<h3 class="text-lg font-black text-purple-400 mb-2">📹 Marketplace de Aulas ao Vivo:</h3>
<p class="mb-4">Escolha seu Sensei (Katsumoto, Yumi, Kenji, Hikari ou Ryu), selecione o horário vago e reserve com split automático de pagamento.</p>
    `,
    emoji: "🎓",
    color: "bg-purple-500/20 border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]",
    badgeColor: "bg-purple-950 text-purple-300 border-purple-500/50",
    actions: [
      { label: "📹 Agendar Aula Particular no Marketplace", href: "/aulas", bg: "bg-purple-600 hover:bg-purple-500 text-white font-extrabold" },
      { label: "💎 Assinar Plano Chunin VIP (Vidas Infinitas)", href: "/planos", bg: "bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold" },
    ]
  }
];

export default function TrilhaMissionsPage() {
  const [modalContent, setModalContent] = useState<{title: string, content: string} | null>(null);

  return (
    <div className="min-h-screen w-full bg-[#06020c] text-foreground flex flex-col items-center select-none pb-28 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-16 bg-[#0c0517] border-b border-purple-900/50 flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-lg">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-cyan-400">
           <ChevronLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-black text-white uppercase mr-4 tracking-wide">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-purple-900/60 mx-2"></div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            TRILHA NINJA DE PRÁTICA
          </span>
        </div>
      </div>

      {/* MISSION LIST CONTAINER */}
      <div className="w-full max-w-4xl px-4 sm:px-6 mt-6 flex flex-col gap-8 relative z-10">
        
        {/* Banner Intro */}
        <div className="bg-gradient-to-r from-[#0d1626] to-[#080d19] border-2 border-cyan-500/60 p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <Mountain className="w-12 h-12 text-cyan-400 mb-3 animate-pulse" />
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 uppercase tracking-wide">
            ROTEIRO COMPLETO DE PRÁTICA INTERATIVA
          </h2>
          <p className="text-xs sm:text-sm text-cyan-200/90 font-medium max-w-2xl leading-relaxed">
            Siga os módulos abaixo em sequência. Cada módulo contém botões diretos para aulas, karaokê, caligrafia em canvas e batalhas de chefes!
          </p>
        </div>

        {/* Missions Path */}
        <div className="flex flex-col relative w-full items-center">
          
          {/* Vertical Cyber Line */}
          <div className="absolute top-10 bottom-10 w-1.5 bg-gradient-to-b from-emerald-500 via-pink-500 to-purple-600 z-0 opacity-40 shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>

          {TRILHA_MODULES.map((module) => (
            <div key={module.id} className="relative z-10 w-full flex flex-col items-center mb-8">
              
              {/* Mission Card */}
              <div 
                className={`w-full bg-[#0a0414] border-2 ${module.color} rounded-3xl p-5 sm:p-6 flex flex-col gap-4 shadow-xl relative overflow-hidden`}
              >
                
                {/* Header info */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-black border border-purple-800/60 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                      {module.emoji}
                    </div>
                    <div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${module.badgeColor} uppercase tracking-widest`}>
                        MÓDULO 0{module.id}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                        {module.title}
                      </h2>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      sfx.playClick();
                      setModalContent({ title: module.title, content: module.fullContent });
                    }}
                    className="bg-black/60 hover:bg-purple-950 border border-purple-800/50 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Manual
                  </button>
                </div>

                {/* Subtitle & Short Desc */}
                <div>
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1">
                    {"// "}{module.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                    {module.shortDesc}
                  </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-2 border-t border-purple-900/40 flex flex-col sm:flex-row gap-2.5">
                  {module.actions.map((act, i) => (
                    <Link
                      key={i}
                      href={act.href}
                      onClick={() => sfx.playClick()}
                      className={`flex-1 text-center text-xs py-3 px-4 rounded-2xl transition-transform hover:scale-[1.02] active:scale-95 shadow-md uppercase tracking-wider ${act.bg}`}
                    >
                      {act.label}
                    </Link>
                  ))}
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* MODAL DO MANUAL */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl max-h-[85vh] bg-[#0c0517] border-2 border-cyan-400 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden animate-fade-in">
            
            {/* Modal Header */}
            <div className="bg-[#031424] p-4 border-b border-cyan-500/50 flex justify-between items-center shrink-0">
              <h2 className="text-white font-black text-base sm:text-lg uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                {modalContent.title}
              </h2>
              <button 
                onClick={() => setModalContent(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div 
              className="p-6 overflow-y-auto font-sans text-xs sm:text-sm text-gray-200 leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: modalContent.content }}
            />
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-purple-900/50 bg-black flex justify-end shrink-0">
              <button 
                onClick={() => setModalContent(null)}
                className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs uppercase rounded-xl transition-all shadow-md"
              >
                ENTENDIDO
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
