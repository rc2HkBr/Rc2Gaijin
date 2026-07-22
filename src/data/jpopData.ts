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
    title: "電脳警察サイバーコップ",
    titleRomaji: "LET'S GO! CYBERCOP",
    artist: "Mika Chiba (Tema de Abertura)",
    youtubeId: "JmD7jW4pDBU", // ID de exemplo (Cybercops Opening). Substitua se necessário!
    difficulty: "Intermediário",
    coverEmoji: "🤖",
    lyrics: [
      {
        id: 1,
        kanji: "君の涙を見たくないから",
        hiragana: "きみのなみだをみたくないから",
        romaji: "Kimi no namida o mitakunai kara",
        translation: "Porque eu não quero ver as suas lágrimas",
        notes: "【君 (きみ)】= Você. 【涙 (なみだ)】= Lágrimas. 【見たくない (みたくない)】= Não quero ver. 【から】= Porque."
      },
      {
        id: 2,
        kanji: "愛する地球を守るため",
        hiragana: "あいするほしをまもるため",
        romaji: "Aisuru hoshi o mamoru tame",
        translation: "Para proteger o planeta que amamos",
        notes: "【愛する (あいする)】= Amar. 【地球 (ほし/ちきゅう)】= Planeta/Terra (frequentemente cantado como 'hoshi' em tokusatsu). 【守る (まもる)】= Proteger. 【ため】= Para o propósito de."
      },
      {
        id: 3,
        kanji: "戦うのさ サイバーコップ",
        hiragana: "たたかうのさ さいばーこっぷ",
        romaji: "Tatakau no sa Cybercop",
        translation: "Nós vamos lutar, Cybercops!",
        notes: "【戦う (たたかう)】= Lutar. 「のさ」 é uma partícula de afirmação forte."
      },
      {
        id: 4,
        kanji: "LET'S GO! 勇気を燃やして",
        hiragana: "LET'S GO! ゆうきをもやして",
        romaji: "LET'S GO! Yuuki o moyashite",
        translation: "VAMOS LÁ! Queimando nossa coragem",
        notes: "【勇気 (ゆうき)】= Coragem. 【燃やして (もやして)】= Queimando.",
        isChorus: true
      },
      {
        id: 5,
        kanji: "未来をこの手につかむまで",
        hiragana: "みらいをこのてにつかむまで",
        romaji: "Mirai o kono te ni tsukamu made",
        translation: "Até agarrarmos o futuro com estas mãos",
        notes: "【未来 (みらい)】= Futuro. 【手 (て)】= Mão. 【つかむ】= Agarrar. 【まで】= Até.",
        isChorus: true
      }
    ]
  }
];
