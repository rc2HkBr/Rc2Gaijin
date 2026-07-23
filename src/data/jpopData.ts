export interface JPopLyricLine {
  id: number;
  time?: number; // Opcional, pois removemos o auto-scroll
  kanji: string;
  hiragana: string;
  romaji: string;
  translation: string;
  notes: string;
  isChorus?: boolean;
  isEnglish?: boolean;
}

export interface JPopSong {
  id: string;
  title: string;
  titleRomaji: string;
  artist: string;
  youtubeId: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  coverEmoji: string;
  lyrics: JPopLyricLine[];
}

export const JPOP_SONGS: JPopSong[] = [
  {
    id: "cybercops",
    title: "Shooting Star (Cybercops ED)",
    titleRomaji: "Shooting Star",
    artist: "Mika Chiba",
    youtubeId: "tdoSMesBcaU",
    difficulty: "Intermediário",
    coverEmoji: "🌟",
    lyrics: [
      {
        id: 1,
        kanji: "星も見えない夜に",
        hiragana: "ほしもみえないよるに",
        romaji: "Hoshi mo mienai yoru ni",
        translation: "Na noite em que nem as estrelas podem ser vistas",
        notes: "【星 (ほし)】= Estrela. 【見えない (みえない)】= Não pode ser visto. 【夜 (よる)】= Noite."
      },
      {
        id: 2,
        kanji: "君はひざかかえ",
        hiragana: "きみはひざかかえ",
        romaji: "Kimi wa hiza kaka'e",
        translation: "Você abraça seus joelhos",
        notes: "【君 (きみ)】= Você. 【ひざ】= Joelhos. 【かかえ (抱える)】= Abraçar/Segurar."
      },
      {
        id: 3,
        kanji: "ひとり震えてた lonely night",
        hiragana: "ひとりふるえてた lonely night",
        romaji: "Hitori furueteta lonely night",
        translation: "Tremendo sozinho, noite solitária",
        notes: "【ひとり (一人)】= Sozinho. 【震えてた (ふるえてた)】= Estava tremendo."
      },
      {
        id: 4,
        kanji: "いつか夢見た未来",
        hiragana: "いつかゆめみたみらい",
        romaji: "Itsuka yume mita mirai",
        translation: "O futuro que sonhamos algum dia",
        notes: "【いつか】= Algum dia. 【夢見た (ゆめみた)】= Sonhado. 【未来 (みらい)】= Futuro."
      },
      {
        id: 5,
        kanji: "見失ったまま 涙こぼしたね",
        hiragana: "みうしなったまま なみだこぼしたね",
        romaji: "Miushinatta mama namida koboshita ne",
        translation: "Você derramou lágrimas enquanto o perdia de vista, não é?",
        notes: "【見失った (みうしなった)】= Perdeu de vista. 【まま】= O estado de as coisas continuarem como estão. 【涙 (なみだ)】= Lágrimas. 【こぼした】= Derramou."
      },
      {
        id: 6,
        kanji: "守りたい",
        hiragana: "まもりたい",
        romaji: "Mamoritai",
        translation: "Eu quero proteger",
        notes: "【守る (まもる)】= Proteger. O sufixo '〜たい' indica desejo ('quero').",
        isChorus: true
      },
      {
        id: 7,
        kanji: "この腕の中で my love",
        hiragana: "このうでのなかで my love",
        romaji: "Kono ude no naka de my love",
        translation: "Dentro destes braços, meu amor",
        notes: "【この】= Este. 【腕 (うで)】= Braço. 【中 (なか)】= Dentro/meio.",
        isChorus: true,
        isEnglish: true
      },
      {
        id: 8,
        kanji: "守りたい",
        hiragana: "まもりたい",
        romaji: "Mamoritai",
        translation: "Eu quero proteger",
        notes: "【守る (まもる)】= Proteger.",
        isChorus: true
      },
      {
        id: 9,
        kanji: "悲しみから永遠に",
        hiragana: "かなしみからえいえんに",
        romaji: "Kanashimi kara eien ni",
        translation: "Da tristeza, para sempre",
        notes: "【悲しみ (かなしみ)】= Tristeza. 【から】= De/A partir de. 【永遠に (えいえんに)】= Para sempre.",
        isChorus: true
      }
    ]
  },
  {
    id: "plastic-love",
    title: "Plastic Love",
    titleRomaji: "Plastic Love",
    artist: "Mariya Takeuchi (竹内まりや)",
    youtubeId: "u6y5NSiRPOw",
    difficulty: "Avançado",
    coverEmoji: "💖",
    lyrics: [
      {
        id: 1,
        kanji: "突然のキスや 熱いまなざしで",
        hiragana: "とつぜんのキスや あついまなざしで",
        romaji: "Totsuzen no kisu ya atsui manazashi de",
        translation: "Com beijos repentinos e olhares intensos",
        notes: "【突然 (とつぜん)】= Repentino/De repente. 【キス】= Beijo (do inglês 'kiss'). 【熱い (あつい)】= Quente/Intenso. 【まなざし (眼差し)】= Olhar fixo/Olhar."
      },
      {
        id: 2,
        kanji: "恋のプログラムを 狂わせないでね",
        hiragana: "こいのプログラムを くるわせないでね",
        romaji: "Koi no puroguramu wo kuruwase nai de ne",
        translation: "Não bagunce o programa do amor, certo?",
        notes: "【恋 (こい)】= Amor/Paixão. 【プログラム】= Programa (do inglês). 【狂わせる (くるわせる)】= Enlouquecer/Bagunçar. 【〜ないで】= Não faça (pedido negativo)."
      },
      {
        id: 3,
        kanji: "出逢いと別れ 上手に打ち明ける",
        hiragana: "であいとわかれ じょうずにうちあける",
        romaji: "Deai to wakare jouzu ni uchiakeru",
        translation: "Encontros e despedidas, habilmente revelados",
        notes: "【出逢い (であい)】= Encontro. 【別れ (わかれ)】= Separação/Despedida. 【上手に (じょうずに)】= Habilmente. 【打ち明ける (うちあける)】= Revelar/Confessar."
      },
      {
        id: 4,
        kanji: "I'm just playing games",
        hiragana: "I'm just playing games",
        romaji: "I'm just playing games",
        translation: "Eu estou apenas jogando jogos",
        notes: "Frase em inglês dentro da música. Mostra a mistura cultural do J-Pop dos anos 80.",
        isEnglish: true
      },
      {
        id: 5,
        kanji: "I know that's plastic love",
        hiragana: "I know that's plastic love",
        romaji: "I know that's plastic love",
        translation: "Eu sei que isso é amor de plástico",
        notes: "O refrão em inglês. 'Plastic Love' = Amor Artificial/Superficial. Uma metáfora sobre proteger o coração fingindo não se importar.",
        isChorus: true,
        isEnglish: true
      },
      {
        id: 6,
        kanji: "Dance with me 今夜は",
        hiragana: "Dance with me こんやは",
        romaji: "Dance with me konya wa",
        translation: "Dance comigo esta noite",
        notes: "【今夜 (こんや)】= Esta noite. Mistura de inglês e japonês muito comum no City Pop dos anos 80.",
        isChorus: true,
        isEnglish: true
      }
    ]
  }
];
