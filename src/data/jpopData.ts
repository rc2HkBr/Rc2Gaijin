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
  }
];
