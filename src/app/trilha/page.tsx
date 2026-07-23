'use client';

import { Mountain, Play, ChevronLeft, BookOpen, XCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Dados do Curso (Módulos do Usuário)
const COURSE_MODULES = [
  {
    id: 1,
    title: "O Despertar Visual",
    subtitle: "Memorização com Mnemônicos",
    shortDesc: "A base do curso é dominar o formato e o som das letras usando a Associação Visual. Estude por grupos familiares (Família A, KA, SA, TA, NA).",
    fullContent: `
A base do curso é dominar o formato e o som das letras usando a Associação Visual (Flashcards ilustrados). Em vez de decorar linhas soltas, você conectará a letra a uma imagem. Estude por grupos familiares:<br/><br/>
<ul class="list-disc pl-5 space-y-2 text-emerald-400">
  <li><strong class="text-white">Família A:</strong> あ (a - <em>asa</em>/manhã, imagem de um sol nascendo), い (i - <em>inu</em>/cachorro, orelhas de cachorro).</li>
  <li><strong class="text-white">Família KA:</strong> か (ka - <em>kasa</em>/guarda-chuva), き (ki - árvore).</li>
  <li><strong class="text-white">Família SA:</strong> さ (sa - <em>sakana</em>/peixe), し (shi - <em>shinshi</em>/senhor).</li>
  <li><strong class="text-white">Família TA:</strong> た (ta - <em>taiko</em>/tambor), ち (chi - sangue).</li>
  <li><strong class="text-white">Família NA:</strong> な (na - <em>natsu</em>/verão, sol forte), に (ni - <em>nihon</em>/Japão, bandeira).</li>
</ul><br/>
<strong class="text-primary uppercase">Ação:</strong> Após finalizar os 46 caracteres do Hiragana, aplique a mesma técnica visual aos 46 caracteres do Katakana (ex: ア de <em>aisu</em>/sorvete, イ de <em>Igirisu</em>/Inglaterra).
    `,
    emoji: "👁️",
    color: "bg-success",
    shadow: "shadow-[4px_4px_0_#4BB200]",
    hasPractice: true,
  },
  {
    id: 2,
    title: "O Motor de Retenção",
    subtitle: "Domínio do Anki",
    shortDesc: "Para garantir que você nunca mais esqueça os Kanas aprendidos, você utilizará o Anki, o melhor aplicativo de Sistema de Repetição Espaçada.",
    fullContent: `
Para garantir que você nunca mais esqueça os Kanas aprendidos, você utilizará o <strong class="text-white">Anki</strong>, o melhor aplicativo de Sistema de Repetição Espaçada (SRS).<br/><br/>
<ol class="list-decimal pl-5 space-y-2 text-secondary">
  <li><strong class="text-white">Criação de Conta:</strong> Cadastre-se gratuitamente no <strong>AnkiWeb</strong> para salvar seu progresso na nuvem.</li>
  <li><strong class="text-white">Instalação:</strong> Instale o programa no seu computador ou celular e sincronize a conta.</li>
  <li><strong class="text-white">Prática:</strong> Adicione seus flashcards visuais e revise-os todos os dias. O algoritmo mostrará as letras no momento exato em que seu cérebro estiver prestes a esquecê-las.</li>
</ol><br/>
<strong class="text-primary uppercase text-lg">Hack Ninja: Foco no Kana (Kaishi 1.5k)</strong><br/>
<p class="mt-2 text-gray-300">Para focar a sua revisão apenas no som e na leitura, você pode alterar o layout do seu deck Kaishi 1.5k usando o Anki no Computador:</p>
<ol class="list-decimal pl-5 space-y-2 text-primary mt-2">
  <li>Na tela inicial do Anki (PC), clique em <strong>Painel</strong> (Browse).</li>
  <li>Selecione o deck Kaishi 1.5k na lateral esquerda e clique em qualquer carta.</li>
  <li>Clique no botão <strong>Cartões...</strong> (Cards...) para abrir o Editor de Modelos.</li>
  <li>Na caixa referente à Frente (Front Template), apague <code>{{Word}}</code> e coloque:<br/><code class="bg-black text-emerald-400 px-2 py-1 rounded inline-block mt-1">{{Word Furigana}}<br/>{{Word Audio}}</code></li>
  <li>Mantenha o Verso (Back Template) com <code>{{Word Meaning}}</code> e <code>{{Picture}}</code> para conferir a resposta.</li>
</ol>
<p class="mt-2 italic text-gray-400">Assim, a frente da carta mostrará apenas o Hiragana e tocará o áudio! Quando avançar para os Kanjis, basta colocar o <code>{{Word}}</code> de volta.</p>
    `,
    emoji: "🧠",
    color: "bg-secondary",
    shadow: "shadow-[4px_4px_0_#00d2ff]",
    hasPractice: false,
  },
  {
    id: 3,
    title: "Gamificação e Reflexos",
    subtitle: "Treino Rápido em Apps",
    shortDesc: "Ganhe velocidade de leitura e reflexos rápidos para ler mangás usando a tecnologia a seu favor nas horas vagas.",
    fullContent: `
Para complementar o Anki e ganhar velocidade de leitura (reflexos rápidos para ler mangás), use a tecnologia a seu favor nas horas vagas:<br/><br/>
<ul class="list-disc pl-5 space-y-2 text-primary">
  <li><strong class="text-white">Hiragana/Katakana Memory hint:</strong> Aplicativo oficial e gratuito da Fundação Japão. Ele já vem com cards ilustrados e minigames excelentes para forçar sua memória de forma lúdica.</li>
  <li><strong class="text-white">Obenkyou:</strong> App altamente recomendado para treinar o reconhecimento puro de hiragana e katakana através de testes rápidos.</li>
  <li><strong class="text-white">Duolingo:</strong> Útil para criar o hábito de estudar 5 minutos diários, mantendo a motivação por meio de pontuações, níveis e desafios divertidos.</li>
</ul>
    `,
    emoji: "🎮",
    color: "bg-primary",
    shadow: "shadow-[4px_4px_0_#ff8c00]",
    hasPractice: false,
  },
  {
    id: 4,
    title: "Aplicação Prática",
    subtitle: "Cursos Oficiais Gratuitos",
    shortDesc: "Agora que você reconhece as letras, precisa ver como elas formam a gramática e as conversas cotidianas usando materiais oficiais.",
    fullContent: `
Agora que você reconhece as letras, precisa ver como elas formam a gramática e as conversas cotidianas:<br/><br/>
<ul class="list-disc pl-5 space-y-2 text-[#e11d48]">
  <li><strong class="text-white">Plataforma Minato (Fundação Japão):</strong> Inscreva-se no curso <em>Marugoto</em>. É um curso completo, com suporte a estudo independente e módulos iniciais disponíveis em português, ideal para aprender a língua e a cultura ao mesmo tempo.</li>
  <li><strong class="text-white">Irodori:</strong> Focado no idioma para o dia a dia e trabalho no Japão. Oferece materiais em PDF e áudios em MP3 100% gratuitos em português (níveis A1 e A2).</li>
  <li><strong class="text-white">NHK World Japan:</strong> O curso <em>Easy Japanese</em> oferece lições online com áudio que variam do nível iniciante ao intermediário, ensinando frases úteis e gramática básica.</li>
</ul>
    `,
    emoji: "🎓",
    color: "bg-[#e11d48]",
    shadow: "shadow-[4px_4px_0_#be123c]",
    hasPractice: false,
  },
  {
    id: 5,
    title: "O Endgame",
    subtitle: "Transição para Leitura e Kanji",
    shortDesc: "Quando a sua leitura estiver automática, é o momento de dar o salto para os Kanjis e a fluência real (Kaishi 1.5k, Tadoku).",
    fullContent: `
Quando a sua leitura de Hiragana e Katakana estiver automática, é o momento de dar o salto para os Kanjis e a fluência em leitura:<br/><br/>
<ul class="list-disc pl-5 space-y-2 text-[#a855f7]">
  <li><strong class="text-white">Prática de Leitura (Imersão):</strong> Acesse plataformas gratuitas como <strong class="text-white">Tadoku.org</strong> e <strong class="text-white">Yomujp</strong>. Elas disponibilizam livros e textos curtos divididos por níveis de dificuldade, todos com áudio e leitura focada em iniciantes.</li>
  <li><strong class="text-white">A Ponte para o Kanji:</strong> Use o aplicativo <strong class="text-white">Kanji Memory hint</strong> para começar a memorizar os ideogramas básicos através da mesma técnica de associação por imagens que você usou no Kana, ou baixe o app <strong class="text-white">Kanji Study</strong>.</li>
  <li><strong class="text-white">Vocabulário em Massa:</strong> Importe para o seu Anki o deck <strong class="text-white">Kaishi 1.5k</strong> (Vocabulário Básico Japonês em pt-BR), que contém áudio, imagens e frases de exemplo. No início, apoie-se fortemente no <em>furigana</em> (a pronúncia escrita em hiragana em cima do kanji) para absorver novas palavras sem travar nos kanjis complexos.</li>
</ul><br/>
<strong class="text-primary uppercase text-lg">Sua Rotina Ninja de Estudos:</strong><br/>
Para vencer este "jogo", a consistência é a sua principal arma. Estude de <strong class="text-white">5 a 10 novos cartões por dia</strong> no Anki, dedique cerca de 10 minutos para praticar a escrita à mão (focando na ordem correta dos traços para treinar a memória motora), e faça um quiz ou leia um pequeno texto nos finais de semana para consolidar o conhecimento.
    `,
    emoji: "👺",
    color: "bg-[#7E22CE]",
    shadow: "shadow-[4px_4px_0_#9333EA]",
    hasPractice: false,
  }
];

export default function TrilhaMissionsPage() {
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [modalContent, setModalContent] = useState<{title: string, content: string} | null>(null);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center select-none pb-24 font-sans relative z-10">
      
      {/* HEADER ARCADE */}
      <div className="w-full h-12 sm:h-16 bg-surface border-b border-border flex items-center px-4 sm:px-8 top-0 sticky z-40 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity mr-4 text-primary">
           <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <div className="flex items-center">
          <h1 className="text-xl sm:text-2xl font-pixel text-primary uppercase mr-2 sm:mr-4 drop-shadow-[0_0_5px_rgba(255,140,0,0.8)]">
            GAIJIN RC2
          </h1>
          <div className="w-px h-6 bg-border mx-2"></div>
          <span className="text-xs sm:text-sm font-pixel text-secondary uppercase tracking-widest mt-1">
            MANUAL DO NINJA
          </span>
        </div>
      </div>

      {/* MISSION LIST CONTAINER */}
      <div className="w-full max-w-4xl px-4 sm:px-8 mt-6 flex flex-col gap-10 relative z-10">
        
        {/* Banner Intro */}
        <div className="bg-[#1a2332] border-4 border-[#2c3e50] p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_0_15px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
          <Mountain className="w-10 h-10 sm:w-12 sm:h-12 text-secondary mb-3 relative z-10 drop-shadow-[0_0_5px_rgba(0,210,255,0.8)]" />
          <h2 className="text-2xl sm:text-3xl font-pixel text-primary mb-2 uppercase drop-shadow-[0_0_8px_rgba(255,140,0,0.8)] leading-none relative z-10">
            A JORNADA DO HERÓI
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-sans relative z-10 leading-relaxed max-w-2xl">
            Bem-vindo ao Curso Completo de Hiragana e Katakana. Siga este roteiro que une a técnica visual, o poder da tecnologia (Anki) e os melhores recursos oficiais gratuitos.
          </p>
        </div>

        {/* Missions Path */}
        <div className="flex flex-col relative w-full items-center">
          
          {/* Vertical Path Line (Cyber Cable) */}
          <div className="absolute top-10 bottom-10 w-2 bg-[#2c3e50] border-x border-[#1a2332] z-0 shadow-[0_0_10px_rgba(0,0,0,0.8)]"></div>

          {COURSE_MODULES.map((module, index) => {
            const isActive = activeModuleIndex === index;
            
            return (
              <div key={module.id} className="relative z-10 w-full max-w-3xl flex flex-col items-center mb-12 sm:mb-16">
                
                {/* Mission Card */}
                <div 
                  onClick={() => setActiveModuleIndex(index)}
                  className={`w-full bg-surface-dark border-2 sm:border-[3px] p-4 sm:p-5 transition-all flex flex-col sm:flex-row gap-4 sm:gap-6 shadow-[2px_2px_0_#000] sm:shadow-[4px_4px_0_#000] cursor-pointer ${
                    isActive ? 'border-secondary scale-[1.02]' : 'border-border'
                  }`}
                >
                  
                  {/* Character Avatar */}
                  <div className="w-20 h-20 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center border-2 sm:border-[3px] border-border relative overflow-hidden bg-black self-center sm:self-start">
                    <span className="text-4xl sm:text-6xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{module.emoji}</span>
                    
                    {/* Retro Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30"></div>
                  </div>

                  {/* Mission Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                      <div>
                        <h3 className="text-xs sm:text-sm font-pixel text-primary uppercase tracking-widest mb-1 drop-shadow-[0_0_5px_rgba(255,140,0,0.5)]">
                          MÓDULO 0{module.id}
                        </h3>
                        <h2 className="text-xl sm:text-2xl font-pixel text-secondary leading-tight drop-shadow-[0_0_2px_rgba(0,210,255,0.5)]">
                          {module.title}
                        </h2>
                      </div>
                    </div>
                    
                    <p className="text-[10px] sm:text-xs font-bold text-success mb-2 uppercase tracking-wide">{"// "}{module.subtitle}</p>
                    <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mb-4">
                      {module.shortDesc}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalContent({ title: `MÓDULO 0${module.id}: ${module.title}`, content: module.fullContent });
                        }}
                        className={`flex-1 px-4 py-2 text-[#111] font-pixel text-base sm:text-lg uppercase border-2 border-white flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0_#000] active:translate-y-1 active:shadow-none hover:brightness-110 ${module.color}`}
                      >
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#111]" /> ABRIR MANUAL
                      </button>

                      {module.hasPractice && (
                        <Link 
                          href="/lesson?group=vowels" 
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 px-4 py-2 bg-[#111] border-2 border-white text-white font-pixel text-base sm:text-lg uppercase shadow-[2px_2px_0_#000] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" /> PRATICAR
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* MODAL DO MANUAL */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[85vh] bg-surface-dark border-4 border-secondary shadow-[0_0_30px_rgba(0,210,255,0.3)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-secondary p-4 flex justify-between items-center shrink-0">
              <h2 className="text-black font-pixel text-xl sm:text-2xl uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {modalContent.title}
              </h2>
              <button 
                onClick={() => setModalContent(null)}
                className="text-black hover:scale-110 transition-transform"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div 
              className="p-6 overflow-y-auto font-sans text-sm sm:text-base text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: modalContent.content }}
            />
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-[#111] flex justify-end shrink-0">
              <button 
                onClick={() => setModalContent(null)}
                className="px-6 py-2 bg-secondary text-black font-pixel text-lg uppercase shadow-[2px_2px_0_#000] hover:brightness-110 active:translate-y-1 active:shadow-none"
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
