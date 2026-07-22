export interface JPopLyricLine {
  id: number;
  kanji: string;
  hiragana: string;
  romaji: string;
  translation: string;
  notes: string; // Explicação do Mestre sobre Kanjis e gramática
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
      // === VERSO 1 ===
      {
        id: 1,
        kanji: "星も見えない夜に",
        hiragana: "ほしもみえないよるに",
        romaji: "Hoshi mo mienai yoru ni",
        translation: "Na noite em que nem as estrelas são visíveis",
        notes: "【星 (ほし)】= Estrela. 【見えない (みえない)】= Não consegue ver (forma negativa de 見える). 【夜 (よる)】= Noite. A partícula 「も」 enfatiza 'nem mesmo'."
      },
      {
        id: 2,
        kanji: "君はひざかかえ",
        hiragana: "きみはひざかかえ",
        romaji: "Kimi wa hiza kaka'e",
        translation: "Você abraçava os joelhos",
        notes: "【君 (きみ)】= Você (informal/íntimo). 【ひざ】= Joelhos (em Hiragana puro). 【かかえ】= Forma de 抱える (abraçar/segurar). A partícula 「は」 marca o sujeito."
      },
      {
        id: 3,
        kanji: "ひとり震えてた lonely night",
        hiragana: "ひとりふるえてた lonely night",
        romaji: "Hitori furueteta lonely night",
        translation: "Tremendo sozinho(a) numa noite solitária",
        notes: "【ひとり】= Sozinho(a). 【震えてた (ふるえてた)】= Estava tremendo (forma passada contínua de 震える). Mistura com inglês 'lonely night' é comum no J-Pop."
      },
      {
        id: 4,
        kanji: "いつか夢見た未来",
        hiragana: "いつかゆめみたみらい",
        romaji: "Itsuka yume mita mirai",
        translation: "O futuro que um dia sonhamos",
        notes: "【いつか】= Um dia/algum dia. 【夢見た (ゆめみた)】= Sonhei/Sonhamos (passado de 夢見る = sonhar). 【未来 (みらい)】= Futuro. Este é um Kanji muito importante!"
      },
      {
        id: 5,
        kanji: "見失ったまま 涙こぼしたね",
        hiragana: "みうしなったまま なみだこぼしたね",
        romaji: "Miushinatta mama namida koboshita ne",
        translation: "Perdendo de vista, você derramou lágrimas, não é?",
        notes: "【見失った (みうしなった)】= Perdeu de vista (passado de 見失う). 【まま】= No estado em que. 【涙 (なみだ)】= Lágrimas. 【こぼした】= Derramou. 「ね」 busca concordância."
      },
      // === PRÉ-REFRÃO ===
      {
        id: 6,
        kanji: "守りたい",
        hiragana: "まもりたい",
        romaji: "Mamoritai",
        translation: "Eu quero proteger",
        notes: "【守りたい (まもりたい)】= Quero proteger. Vem de 守る (まもる = proteger) + たい (desejo). A forma 〜たい é essencial para expressar 'querer fazer algo'."
      },
      {
        id: 7,
        kanji: "この腕の中で my love",
        hiragana: "このうでのなかで my love",
        romaji: "Kono ude no naka de my love",
        translation: "Dentro destes braços, meu amor",
        notes: "【この】= Este/Esta. 【腕 (うで)】= Braço. 【中 (なか)】= Dentro. 【で】= Partícula de local de ação. Estrutura: この + [Noun] + の中で = 'dentro deste [Noun]'."
      },
      {
        id: 8,
        kanji: "守りたい",
        hiragana: "まもりたい",
        romaji: "Mamoritai",
        translation: "Eu quero proteger",
        notes: "Repetição do verso anterior para ênfase emocional. 【守る (まもる)】é um dos verbos mais importantes no japonês!"
      },
      {
        id: 9,
        kanji: "悲しみから永遠に",
        hiragana: "かなしみからえいえんに",
        romaji: "Kanashimi kara eien ni",
        translation: "Da tristeza, para sempre",
        notes: "【悲しみ (かなしみ)】= Tristeza (substantivo de 悲しい = triste). 【から】= De/Desde (partícula de origem). 【永遠に (えいえんに)】= Para sempre/Eternamente. Kanji poderoso!"
      },
      // === REFRÃO ===
      {
        id: 10,
        kanji: "I want to be the shooting star",
        hiragana: "I want to be the shooting star",
        romaji: "I want to be the shooting star",
        translation: "Eu quero ser a estrela cadente",
        notes: "Linha em inglês! No J-Pop, frases em inglês são usadas para dar impacto emocional ao refrão. 'Shooting star' = 流れ星 (なれぼし).",
        isEnglish: true,
        isChorus: true
      },
      {
        id: 11,
        kanji: "君の願いを叶える",
        hiragana: "きみのねがいをかなえる",
        romaji: "Kimi no negai wo kanaeru",
        translation: "Para realizar o seu desejo",
        notes: "【君の (きみの)】= Seu/Sua (de você). 【願い (ねがい)】= Desejo/Pedido. 【叶える (かなえる)】= Realizar/Concretizar. A partícula 「を」 marca o objeto direto.",
        isChorus: true
      },
      {
        id: 12,
        kanji: "流れ星になりたい",
        hiragana: "ながれぼしになりたい",
        romaji: "Nagareboshi ni naritai",
        translation: "Quero me tornar uma estrela cadente",
        notes: "【流れ星 (ながれぼし)】= Estrela cadente (流れ = fluir + 星 = estrela). 【になりたい】= Quero me tornar (なる + たい). Este é o título da música!",
        isChorus: true
      },
      {
        id: 13,
        kanji: "この世界中で一番大切な人",
        hiragana: "このせかいじゅうでいちばんたいせつなひと",
        romaji: "Kono sekaijuu de ichiban taisetsu na hito",
        translation: "A pessoa mais importante do mundo inteiro",
        notes: "【世界中 (せかいじゅう)】= O mundo inteiro. 【一番 (いちばん)】= O mais/número um. 【大切な (たいせつな)】= Importante/Precioso (adjetivo な). 【人 (ひと)】= Pessoa.",
        isChorus: true
      },
      {
        id: 14,
        kanji: "それは君さ",
        hiragana: "それはきみさ",
        romaji: "Sore wa kimi sa",
        translation: "Essa pessoa é você!",
        notes: "【それ】= Isso/Essa (pronome demonstrativo). 【は】= Partícula de tópico. 【君 (きみ)】= Você. 「さ」 é uma partícula final masculina que dá ênfase/convicção.",
        isChorus: true
      },
      // === VERSO 2 ===
      {
        id: 15,
        kanji: "みんな誰か傷つけ",
        hiragana: "みんなだれかきずつけ",
        romaji: "Minna dareka kizutsuke",
        translation: "Todos machucam alguém",
        notes: "【みんな】= Todos/Todo mundo. 【誰か (だれか)】= Alguém. 【傷つけ (きずつけ)】= Machucar (forma de 傷つける). 【傷 (きず)】= Ferida — radical importante!"
      },
      {
        id: 16,
        kanji: "そして傷ついて",
        hiragana: "そしてきずついて",
        romaji: "Soshite kizutsuite",
        translation: "E se machucam também",
        notes: "【そして】= E então/E também. 【傷ついて (きずついて)】= Sendo machucado (forma て de 傷つく = ser machucado). Note: 傷つける (machucar outro) vs 傷つく (ser machucado)."
      },
      {
        id: 17,
        kanji: "大人になってく lonely heart",
        hiragana: "おとなになってく lonely heart",
        romaji: "Otona ni natteku lonely heart",
        translation: "Vão se tornando adultos, coração solitário",
        notes: "【大人 (おとな)】= Adulto. 【になってく】= Vai se tornando (contração de なっていく = ir se tornando). Mostra o processo gradual de crescer."
      },
      {
        id: 18,
        kanji: "もしも明日が見えず",
        hiragana: "もしもあしたがみえず",
        romaji: "Moshimo ashita ga miezu",
        translation: "Se por acaso não conseguir ver o amanhã",
        notes: "【もしも】= Se por acaso (condicional enfático). 【明日 (あした)】= Amanhã. 【見えず (みえず)】= Sem conseguir ver (forma negativa clássica de 見える). Forma literária/poética."
      },
      {
        id: 19,
        kanji: "くじけそうな時 ふり向いてほしい",
        hiragana: "くじけそうなとき ふりむいてほしい",
        romaji: "Kujikesou na toki furimuite hoshii",
        translation: "Quando estiver prestes a desistir, quero que olhe para trás",
        notes: "【くじけそう】= Parece que vai desistir (〜そう = parece que). 【時 (とき)】= Quando/Momento. 【ふり向いて (ふりむいて)】= Olhe para trás (て form). 【ほしい】= Quero que (você faça)."
      },
      {
        id: 20,
        kanji: "伝えたい",
        hiragana: "つたえたい",
        romaji: "Tsutaetai",
        translation: "Quero transmitir/contar",
        notes: "【伝えたい (つたえたい)】= Quero transmitir/contar (伝える + たい). Mesmo padrão de 守りたい (mamoritai). A forma 〜たい expressa desejo pessoal."
      },
      {
        id: 21,
        kanji: "熱いこの想い my love",
        hiragana: "あついこのおもい my love",
        romaji: "Atsui kono omoi my love",
        translation: "Este sentimento ardente, meu amor",
        notes: "【熱い (あつい)】= Quente/Ardente. 【想い (おもい)】= Sentimento/Pensamento (escrita mais emocional que 思い). 【この】= Este. Ordem inversa para ênfase poética."
      },
      {
        id: 22,
        kanji: "見つめたい",
        hiragana: "みつめたい",
        romaji: "Mitsumetai",
        translation: "Quero te olhar fixamente",
        notes: "【見つめたい (みつめたい)】= Quero olhar fixamente (見つめる + たい). 見つめる é mais intenso que 見る (ver). Implica olhar nos olhos com carinho."
      },
      {
        id: 23,
        kanji: "いつもそばで永遠に",
        hiragana: "いつもそばでえいえんに",
        romaji: "Itsumo soba de eien ni",
        translation: "Sempre ao seu lado, para sempre",
        notes: "【いつも】= Sempre. 【そば】= Lado/Ao lado. 【で】= Partícula de local. 【永遠に (えいえんに)】= Para sempre. Compara com verso 9: mesma estrutura final!"
      },
      // === REFRÃO 2 ===
      {
        id: 24,
        kanji: "I want to be the shooting star",
        hiragana: "I want to be the shooting star",
        romaji: "I want to be the shooting star",
        translation: "Eu quero ser a estrela cadente",
        notes: "Repetição do refrão em inglês.",
        isEnglish: true,
        isChorus: true
      },
      {
        id: 25,
        kanji: "溢れる夢を乗せてく",
        hiragana: "あふれるゆめをのせてく",
        romaji: "Afureru yume wo noseteku",
        translation: "Carregando sonhos que transbordam",
        notes: "【溢れる (あふれる)】= Transbordar. 【夢 (ゆめ)】= Sonho. 【乗せてく (のせてく)】= Ir carregando (contração de 乗せていく). Imagem de uma estrela cadente levando sonhos!",
        isChorus: true
      },
      {
        id: 26,
        kanji: "流れ星になりたい",
        hiragana: "ながれぼしになりたい",
        romaji: "Nagareboshi ni naritai",
        translation: "Quero me tornar uma estrela cadente",
        notes: "Repetição do refrão principal. 【流れ星】é composto: 流れ (fluxo) + 星 (estrela) = estrela que flui pelo céu.",
        isChorus: true
      },
      {
        id: 27,
        kanji: "この世界中で一番澄んだ瞳の",
        hiragana: "このせかいじゅうでいちばんすんだひとみの",
        romaji: "Kono sekaijuu de ichiban sunda hitomi no",
        translation: "De olhos mais límpidos do mundo inteiro",
        notes: "【澄んだ (すんだ)】= Límpido/Claro (passado de 澄む = clarear). 【瞳 (ひとみ)】= Olhos/Pupilas (mais poético que 目). A partícula 「の」 conecta ao verso seguinte.",
        isChorus: true
      },
      {
        id: 28,
        kanji: "君が好きさ",
        hiragana: "きみがすきさ",
        romaji: "Kimi ga suki sa",
        translation: "Eu gosto de você!",
        notes: "【君が (きみが)】= Você (com が marcando o alvo do sentimento). 【好き (すき)】= Gostar/Amar. 「さ」 partícula de ênfase masculina. Declaração de amor no J-Pop!",
        isChorus: true
      },
      // === REFRÃO FINAL ===
      {
        id: 29,
        kanji: "I want to be the shooting star",
        hiragana: "I want to be the shooting star",
        romaji: "I want to be the shooting star",
        translation: "Eu quero ser a estrela cadente",
        notes: "Refrão final — repetição para fechar com impacto.",
        isEnglish: true,
        isChorus: true
      },
      {
        id: 30,
        kanji: "君の願いを叶える",
        hiragana: "きみのねがいをかなえる",
        romaji: "Kimi no negai wo kanaeru",
        translation: "Para realizar o seu desejo",
        notes: "Repetição. 【願い (ねがい)】vem do verbo 願う (ねがう = desejar). 【叶える (かなえる)】= Realizar/Concretizar um sonho ou desejo.",
        isChorus: true
      },
      {
        id: 31,
        kanji: "流れ星になりたい",
        hiragana: "ながれぼしになりたい",
        romaji: "Nagareboshi ni naritai",
        translation: "Quero me tornar uma estrela cadente",
        notes: "O título e coração da música. O desejo de se transformar em algo mágico para proteger quem ama.",
        isChorus: true
      },
      {
        id: 32,
        kanji: "この世界中で一番大切な人",
        hiragana: "このせかいじゅうでいちばんたいせつなひと",
        romaji: "Kono sekaijuu de ichiban taisetsu na hito",
        translation: "A pessoa mais importante do mundo inteiro",
        notes: "Verso-chave! 【大切 (たいせつ)】= Importante/Precioso. Estrutura superlativa: 一番 + Adjetivo + な + Substantivo = 'O mais [adj] [subst]'.",
        isChorus: true
      },
      {
        id: 33,
        kanji: "それは君さ",
        hiragana: "それはきみさ",
        romaji: "Sore wa kimi sa",
        translation: "Essa pessoa é você!",
        notes: "Encerramento perfeito. A música inteira é uma declaração: 'a pessoa mais importante do mundo é VOCÊ'. 「さ」 = certeza absoluta.",
        isChorus: true
      }
    ]
  }
];
