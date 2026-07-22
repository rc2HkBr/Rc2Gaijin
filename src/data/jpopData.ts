export interface JPopLyricLine {
  id: number;
  time: number; // Tempo em segundos em que a linha começa
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
    id: "nagareboshi",
    title: "流れ星 〜Shooting Star〜",
    titleRomaji: "Nagareboshi ~Shooting Star~",
    artist: "HOME MADE 家族",
    youtubeId: "KMxvK2zKC0I",
    difficulty: "Intermediário",
    coverEmoji: "🌟",
    lyrics: [
      {
        id: 1,
        time: 14.5, // 0:14
        kanji: "星も見えない夜に",
        hiragana: "ほしもみえないよるに",
        romaji: "Hoshi mo mienai yoru ni",
        translation: "Na noite em que nem as estrelas são visíveis",
        notes: "【星 (ほし)】= Estrela. 【見えない (みえない)】= Não consegue ver. 【夜 (よる)】= Noite. A partícula 「も」 enfatiza 'nem mesmo'."
      },
      {
        id: 2,
        time: 21.5, // 0:21
        kanji: "君はひざかかえ",
        hiragana: "きみはひざかかえ",
        romaji: "Kimi wa hiza kaka'e",
        translation: "Você abraçava os joelhos",
        notes: "【君 (きみ)】= Você. 【ひざ】= Joelhos. 【かかえ】= Abraçar/segurar."
      },
      {
        id: 3,
        time: 25.0, // 0:25
        kanji: "ひとり震えてた lonely night",
        hiragana: "ひとりふるえてた lonely night",
        romaji: "Hitori furueteta lonely night",
        translation: "Tremendo sozinho(a) numa noite solitária",
        notes: "【ひとり】= Sozinho. 【震えてた (ふるえてた)】= Estava tremendo."
      },
      {
        id: 4,
        time: 29.5, // 0:29
        kanji: "いつか夢見た未来",
        hiragana: "いつかゆめみたみらい",
        romaji: "Itsuka yume mita mirai",
        translation: "O futuro que um dia sonhamos",
        notes: "【いつか】= Um dia. 【夢見た (ゆめみた)】= Sonhei. 【未来 (みらい)】= Futuro."
      },
      {
        id: 5,
        time: 36.0, // 0:36
        kanji: "見失ったまま 涙こぼしたね",
        hiragana: "みうしなったまま なみだこぼしたね",
        romaji: "Miushinatta mama namida koboshita ne",
        translation: "Perdendo de vista, você derramou lágrimas, não é?",
        notes: "【見失った (みうしなった)】= Perdeu de vista. 【涙 (なみだ)】= Lágrimas."
      },
      // PRÉ-REFRÃO
      {
        id: 6,
        time: 44.0, // 0:44
        kanji: "守りたい",
        hiragana: "まもりたい",
        romaji: "Mamoritai",
        translation: "Eu quero proteger",
        notes: "【守りたい (まもりたい)】= Quero proteger. Vem de 守る (まもる = proteger) + たい (desejo)."
      },
      {
        id: 7,
        time: 47.0, // 0:47
        kanji: "この腕の中で my love",
        hiragana: "このうでのなかで my love",
        romaji: "Kono ude no naka de my love",
        translation: "Dentro destes braços, meu amor",
        notes: "【この】= Este. 【腕 (うで)】= Braço. 【中 (なか)】= Dentro."
      },
      {
        id: 8,
        time: 51.0, // 0:51
        kanji: "守りたい",
        hiragana: "まもりたい",
        romaji: "Mamoritai",
        translation: "Eu quero proteger",
        notes: "Repetição do verbo 守る (まもる) para ênfase."
      },
      {
        id: 9,
        time: 54.0, // 0:54
        kanji: "悲しみから永遠に",
        hiragana: "かなしみからえいえんに",
        romaji: "Kanashimi kara eien ni",
        translation: "Da tristeza, para sempre",
        notes: "【悲しみ (かなしみ)】= Tristeza. 【永遠に (えいえんに)】= Para sempre."
      },
      // REFRÃO
      {
        id: 10,
        time: 58.0, // 0:58
        kanji: "I want to be the shooting star",
        hiragana: "I want to be the shooting star",
        romaji: "I want to be the shooting star",
        translation: "Eu quero ser a estrela cadente",
        notes: "Refrão em inglês. 'Shooting star' = 流れ星 (ながれぼし).",
        isEnglish: true,
        isChorus: true
      },
      {
        id: 11,
        time: 62.0, // 1:02
        kanji: "君の願いを叶える",
        hiragana: "きみのねがいをかなえる",
        romaji: "Kimi no negai wo kanaeru",
        translation: "Para realizar o seu desejo",
        notes: "【願い (ねがい)】= Desejo. 【叶える (かなえる)】= Realizar.",
        isChorus: true
      },
      {
        id: 12,
        time: 66.0, // 1:06
        kanji: "流れ星になりたい",
        hiragana: "ながれぼしになりたい",
        romaji: "Nagareboshi ni naritai",
        translation: "Quero me tornar uma estrela cadente",
        notes: "【流れ星 (ながれぼし)】= Estrela cadente. 【になりたい】= Quero me tornar (なる + たい).",
        isChorus: true
      },
      {
        id: 13,
        time: 69.5, // 1:09
        kanji: "この世界中で一番大切な人",
        hiragana: "このせかいじゅうでいちばんたいせつなひと",
        romaji: "Kono sekaijuu de ichiban taisetsu na hito",
        translation: "A pessoa mais importante do mundo inteiro",
        notes: "【世界中 (せかいじゅう)】= Mundo inteiro. 【一番 (いちばん)】= O mais. 【大切 (たいせつ)】= Importante. 【人 (ひと)】= Pessoa.",
        isChorus: true
      },
      {
        id: 14,
        time: 75.0, // 1:15
        kanji: "それは君さ",
        hiragana: "それはきみさ",
        romaji: "Sore wa kimi sa",
        translation: "Essa pessoa é você!",
        notes: "【それ】= Isso/Essa. 【君 (きみ)】= Você. 「さ」 é uma partícula masculina de convicção.",
        isChorus: true
      },
      // VERSO 2
      {
        id: 15,
        time: 88.0, // 1:28
        kanji: "みんな誰か傷つけ",
        hiragana: "みんなだれかきずつけ",
        romaji: "Minna dareka kizutsuke",
        translation: "Todos machucam alguém",
        notes: "【みんな】= Todos. 【誰か (だれか)】= Alguém. 【傷つけ (きずつけ)】= Machucar (傷つける)."
      },
      {
        id: 16,
        time: 95.0, // 1:35
        kanji: "そして傷ついて",
        hiragana: "そしてきずついて",
        romaji: "Soshite kizutsuite",
        translation: "E se machucam também",
        notes: "【そして】= E. 【傷ついて (きずついて)】= Ser machucado (傷つく)."
      },
      {
        id: 17,
        time: 99.0, // 1:39
        kanji: "大人になってく lonely heart",
        hiragana: "おとなになってく lonely heart",
        romaji: "Otona ni natteku lonely heart",
        translation: "Vão se tornando adultos, coração solitário",
        notes: "【大人 (おとな)】= Adulto. 【になってく】= Vai se tornando."
      },
      {
        id: 18,
        time: 104.0, // 1:44
        kanji: "もしも明日が見えず",
        hiragana: "もしもあしたがみえず",
        romaji: "Moshimo ashita ga miezu",
        translation: "Se por acaso não conseguir ver o amanhã",
        notes: "【もしも】= Se por acaso. 【明日 (あした)】= Amanhã. 【見えず】= Sem conseguir ver."
      },
      {
        id: 19,
        time: 110.0, // 1:50
        kanji: "くじけそうな時 ふり向いてほしい",
        hiragana: "くじけそうなとき ふりむいてほしい",
        romaji: "Kujikesou na toki furimuite hoshii",
        translation: "Quando estiver prestes a desistir, quero que olhe para trás",
        notes: "【くじけそう】= Parece que vai desistir. 【時 (とき)】= Quando. 【ほしい】= Quero que faça."
      },
      // PRÉ-REFRÃO 2
      {
        id: 20,
        time: 118.0, // 1:58
        kanji: "伝えたい",
        hiragana: "つたえたい",
        romaji: "Tsutaetai",
        translation: "Quero transmitir/contar",
        notes: "【伝えたい (つたえたい)】= Quero transmitir (伝える + たい)."
      },
      {
        id: 21,
        time: 121.0, // 2:01
        kanji: "熱いこの想い my love",
        hiragana: "あついこのおもい my love",
        romaji: "Atsui kono omoi my love",
        translation: "Este sentimento ardente, meu amor",
        notes: "【熱い (あつい)】= Quente/Ardente. 【想い (おもい)】= Sentimento."
      },
      {
        id: 22,
        time: 125.0, // 2:05
        kanji: "見つめたい",
        hiragana: "みつめたい",
        romaji: "Mitsumetai",
        translation: "Quero te olhar fixamente",
        notes: "【見つめたい (みつめたい)】= Quero olhar fixamente (見つめる + たい)."
      },
      {
        id: 23,
        time: 128.0, // 2:08
        kanji: "いつもそばで永遠に",
        hiragana: "いつもそばでえいえんに",
        romaji: "Itsumo soba de eien ni",
        translation: "Sempre ao seu lado, para sempre",
        notes: "【いつも】= Sempre. 【そば】= Ao lado. 【永遠に (えいえんに)】= Para sempre."
      },
      // REFRÃO 2
      {
        id: 24,
        time: 132.0, // 2:12
        kanji: "I want to be the shooting star",
        hiragana: "I want to be the shooting star",
        romaji: "I want to be the shooting star",
        translation: "Eu quero ser a estrela cadente",
        notes: "Refrão em inglês.",
        isEnglish: true,
        isChorus: true
      },
      {
        id: 25,
        time: 135.5, // 2:15
        kanji: "溢れる夢を乗せてく",
        hiragana: "あふれるゆめをのせてく",
        romaji: "Afureru yume wo noseteku",
        translation: "Carregando sonhos que transbordam",
        notes: "【溢れる (あふれる)】= Transbordar. 【夢 (ゆめ)】= Sonho. 【乗せてく (のせてく)】= Ir carregando.",
        isChorus: true
      },
      {
        id: 26,
        time: 139.0, // 2:19
        kanji: "流れ星になりたい",
        hiragana: "ながれぼしになりたい",
        romaji: "Nagareboshi ni naritai",
        translation: "Quero me tornar uma estrela cadente",
        notes: "Repetição do refrão principal.",
        isChorus: true
      },
      {
        id: 27,
        time: 143.5, // 2:23
        kanji: "この世界中で一番澄んだ瞳の",
        hiragana: "このせかいじゅうでいちばんすんだひとみの",
        romaji: "Kono sekaijuu de ichiban sunda hitomi no",
        translation: "De olhos mais límpidos do mundo inteiro",
        notes: "【澄んだ (すんだ)】= Límpido/Claro. 【瞳 (ひとみ)】= Olhos/Pupilas.",
        isChorus: true
      },
      {
        id: 28,
        time: 149.0, // 2:29
        kanji: "君が好きさ",
        hiragana: "きみがすきさ",
        romaji: "Kimi ga suki sa",
        translation: "Eu gosto de você!",
        notes: "【好き (すき)】= Gostar/Amar. Declaração de amor!",
        isChorus: true
      },
      // REFRÃO FINAL
      {
        id: 29,
        time: 153.0, // 2:33
        kanji: "I want to be the shooting star",
        hiragana: "I want to be the shooting star",
        romaji: "I want to be the shooting star",
        translation: "Eu quero ser a estrela cadente",
        notes: "Refrão final.",
        isEnglish: true,
        isChorus: true
      },
      {
        id: 30,
        time: 157.0, // 2:37
        kanji: "君の願いを叶える",
        hiragana: "きみのねがいをかなえる",
        romaji: "Kimi no negai wo kanaeru",
        translation: "Para realizar o seu desejo",
        notes: "Repetição.",
        isChorus: true
      },
      {
        id: 31,
        time: 161.0, // 2:41
        kanji: "流れ星になりたい",
        hiragana: "ながれぼしになりたい",
        romaji: "Nagareboshi ni naritai",
        translation: "Quero me tornar uma estrela cadente",
        notes: "O desejo de se transformar em estrela.",
        isChorus: true
      },
      {
        id: 32,
        time: 164.5, // 2:44
        kanji: "この世界中で一番大切な人",
        hiragana: "このせかいじゅうでいちばんたいせつなひと",
        romaji: "Kono sekaijuu de ichiban taisetsu na hito",
        translation: "A pessoa mais importante do mundo inteiro",
        notes: "A pessoa mais importante.",
        isChorus: true
      },
      {
        id: 33,
        time: 170.0, // 2:50
        kanji: "それは君さ",
        hiragana: "それはきみさ",
        romaji: "Sore wa kimi sa",
        translation: "Essa pessoa é você!",
        notes: "Encerramento perfeito.",
        isChorus: true
      }
    ]
  }
];
