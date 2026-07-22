export interface HiraganaCharacter {
  id: string;
  hiragana: string;
  romaji: string;
  group: string;
  exampleWord: string;
  exampleMeaning: string;
  exampleRomaji: string;
  strokeCount: number;
}

export interface HiraganaGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  characters: HiraganaCharacter[];
}

export const HIRAGANA_GROUPS: HiraganaGroup[] = [
  {
    id: "vowels",
    name: "Vogais (あ い う え お)",
    description: "A base da pronúncia da língua japonesa",
    color: "bg-emerald-500",
    characters: [
      { id: "a", hiragana: "あ", romaji: "a", group: "vowels", exampleWord: "あめ", exampleMeaning: "Chuva / Doce", exampleRomaji: "ame", strokeCount: 3 },
      { id: "i", hiragana: "い", romaji: "i", group: "vowels", exampleWord: "いぬ", exampleMeaning: "Cão", exampleRomaji: "inu", strokeCount: 2 },
      { id: "u", hiragana: "う", romaji: "u", group: "vowels", exampleWord: "うみ", exampleMeaning: "Mar", exampleRomaji: "umi", strokeCount: 2 },
      { id: "e", hiragana: "え", romaji: "e", group: "vowels", exampleWord: "えき", exampleMeaning: "Estação", exampleRomaji: "eki", strokeCount: 2 },
      { id: "o", hiragana: "お", romaji: "o", group: "vowels", exampleWord: "おにぎり", exampleMeaning: "Bolinho de arroz", exampleRomaji: "onigiri", strokeCount: 3 }
    ]
  },
  {
    id: "k-group",
    name: "Família K (か き く け こ)",
    description: "Sons consonantes simples de K",
    color: "bg-sky-500",
    characters: [
      { id: "ka", hiragana: "か", romaji: "ka", group: "k-group", exampleWord: "かさ", exampleMeaning: "Guarda-chuva", exampleRomaji: "kasa", strokeCount: 3 },
      { id: "ki", hiragana: "き", romaji: "ki", group: "k-group", exampleWord: "き", exampleMeaning: "Árvore", exampleRomaji: "ki", strokeCount: 4 },
      { id: "ku", hiragana: "く", romaji: "ku", group: "k-group", exampleWord: "くま", exampleMeaning: "Urso", exampleRomaji: "kuma", strokeCount: 1 },
      { id: "ke", hiragana: "け", romaji: "ke", group: "k-group", exampleWord: "けん", exampleMeaning: "Espada", exampleRomaji: "ken", strokeCount: 3 },
      { id: "ko", hiragana: "こ", romaji: "ko", group: "k-group", exampleWord: "こねこ", exampleMeaning: "Gatinho", exampleRomaji: "koneko", strokeCount: 2 }
    ]
  },
  {
    id: "s-group",
    name: "Família S (さ し す せ そ)",
    description: "Sons suaves com especial atenção para 'shi'",
    color: "bg-indigo-500",
    characters: [
      { id: "sa", hiragana: "さ", romaji: "sa", group: "s-group", exampleWord: "さくら", exampleMeaning: "Flor de cerejeira", exampleRomaji: "sakura", strokeCount: 3 },
      { id: "shi", hiragana: "し", romaji: "shi", group: "s-group", exampleWord: "しろ", exampleMeaning: "Branco / Castelo", exampleRomaji: "shiro", strokeCount: 1 },
      { id: "su", hiragana: "す", romaji: "su", group: "s-group", exampleWord: "すし", exampleMeaning: "Sushi", exampleRomaji: "sushi", strokeCount: 2 },
      { id: "se", hiragana: "せ", romaji: "se", group: "s-group", exampleWord: "せんせい", exampleMeaning: "Professor", exampleRomaji: "sensei", strokeCount: 3 },
      { id: "so", hiragana: "そ", romaji: "so", group: "s-group", exampleWord: "そら", exampleMeaning: "Céu", exampleRomaji: "sora", strokeCount: 1 }
    ]
  },
  {
    id: "t-group",
    name: "Família T (た ち つ て と)",
    description: "Sons de T com variações 'chi' e 'tsu'",
    color: "bg-purple-500",
    characters: [
      { id: "ta", hiragana: "た", romaji: "ta", group: "t-group", exampleWord: "たこ", exampleMeaning: "Polvo", exampleRomaji: "tako", strokeCount: 4 },
      { id: "chi", hiragana: "ち", romaji: "chi", group: "t-group", exampleWord: "ちず", exampleMeaning: "Mapa", exampleRomaji: "chizu", strokeCount: 2 },
      { id: "tsu", hiragana: "つ", romaji: "tsu", group: "t-group", exampleWord: "つき", exampleMeaning: "Lua", exampleRomaji: "tsuki", strokeCount: 1 },
      { id: "te", hiragana: "て", romaji: "te", group: "t-group", exampleWord: "てがみ", exampleMeaning: "Carta", exampleRomaji: "tegami", strokeCount: 1 },
      { id: "to", hiragana: "と", romaji: "to", group: "t-group", exampleWord: "とり", exampleMeaning: "Pássaro", exampleRomaji: "tori", strokeCount: 2 }
    ]
  },
  {
    id: "n-group",
    name: "Família N (な に ぬ ね の)",
    description: "Sons nasais e fluidos",
    color: "bg-amber-500",
    characters: [
      { id: "na", hiragana: "な", romaji: "na", group: "n-group", exampleWord: "夏 (なつ)", exampleMeaning: "Verão", exampleRomaji: "natsu", strokeCount: 4 },
      { id: "ni", hiragana: "に", romaji: "ni", group: "n-group", exampleWord: "肉 (にく)", exampleMeaning: "Carne", exampleRomaji: "niku", strokeCount: 3 },
      { id: "nu", hiragana: "ぬ", romaji: "nu", group: "n-group", exampleWord: "犬 (いぬ)", exampleMeaning: "Cão", exampleRomaji: "inu", strokeCount: 2 },
      { id: "ne", hiragana: "ね", romaji: "ne", group: "n-group", exampleWord: "猫 (ねこ)", exampleMeaning: "Gato", exampleRomaji: "neko", strokeCount: 2 },
      { id: "no", hiragana: "の", romaji: "no", group: "n-group", exampleWord: "飲物 (のみもの)", exampleMeaning: "Bebida", exampleRomaji: "nomimono", strokeCount: 1 }
    ]
  },
  {
    id: "h-group",
    name: "Família H (は ひ ふ へ ほ)",
    description: "Sons aspirados com especial atenção para 'fu'",
    color: "bg-rose-500",
    characters: [
      { id: "ha", hiragana: "は", romaji: "ha", group: "h-group", exampleWord: "花 (はな)", exampleMeaning: "Flor", exampleRomaji: "hana", strokeCount: 3 },
      { id: "hi", hiragana: "ひ", romaji: "hi", group: "h-group", exampleWord: "光 (ひかり)", exampleMeaning: "Luz", exampleRomaji: "hikari", strokeCount: 1 },
      { id: "fu", hiragana: "ふ", romaji: "fu", group: "h-group", exampleWord: "船 (ふね)", exampleMeaning: "Barco", exampleRomaji: "fune", strokeCount: 4 },
      { id: "he", hiragana: "へ", romaji: "he", group: "h-group", exampleWord: "部屋 (へや)", exampleMeaning: "Quarto", exampleRomaji: "heya", strokeCount: 1 },
      { id: "ho", hiragana: "ほ", romaji: "ho", group: "h-group", exampleWord: "星 (ほし)", exampleMeaning: "Estrela", exampleRomaji: "hoshi", strokeCount: 4 }
    ]
  },
  {
    id: "m-group",
    name: "Família M (ま み む め も)",
    description: "Sons de M suaves",
    color: "bg-teal-500",
    characters: [
      { id: "ma", hiragana: "ま", romaji: "ma", group: "m-group", exampleWord: "町 (まち)", exampleMeaning: "Cidade", exampleRomaji: "machi", strokeCount: 3 },
      { id: "mi", hiragana: "み", romaji: "mi", group: "m-group", exampleWord: "水 (みず)", exampleMeaning: "Água", exampleRomaji: "mizu", strokeCount: 2 },
      { id: "mu", hiragana: "む", romaji: "mu", group: "m-group", exampleWord: "虫 (むし)", exampleMeaning: "Inseto", exampleRomaji: "mushi", strokeCount: 3 },
      { id: "me", hiragana: "め", romaji: "me", group: "m-group", exampleWord: "目 (め)", exampleMeaning: "Olho", exampleRomaji: "me", strokeCount: 2 },
      { id: "mo", hiragana: "も", romaji: "mo", group: "m-group", exampleWord: "桃 (もも)", exampleMeaning: "Pêssego", exampleRomaji: "momo", strokeCount: 3 }
    ]
  },
  {
    id: "y-group",
    name: "Família Y (や ゆ よ)",
    description: "Semivogais de Y",
    color: "bg-fuchsia-500",
    characters: [
      { id: "ya", hiragana: "や", romaji: "ya", group: "y-group", exampleWord: "山 (やま)", exampleMeaning: "Montanha", exampleRomaji: "yama", strokeCount: 3 },
      { id: "yu", hiragana: "ゆ", romaji: "yu", group: "y-group", exampleWord: "雪 (ゆき)", exampleMeaning: "Neve", exampleRomaji: "yuki", strokeCount: 2 },
      { id: "yo", hiragana: "よ", romaji: "yo", group: "y-group", exampleWord: "夜 (よる)", exampleMeaning: "Noite", exampleRomaji: "yoru", strokeCount: 2 }
    ]
  },
  {
    id: "r-group",
    name: "Família R (ら り る れ ろ)",
    description: "Sons de R com batida leve de língua",
    color: "bg-cyan-500",
    characters: [
      { id: "ra", hiragana: "ら", romaji: "ra", group: "r-group", exampleWord: "ラーメン (らーめん)", exampleMeaning: "Rámen", exampleRomaji: "ramen", strokeCount: 2 },
      { id: "ri", hiragana: "り", romaji: "ri", group: "r-group", exampleWord: "林檎 (りんご)", exampleMeaning: "Maçã", exampleRomaji: "ringo", strokeCount: 2 },
      { id: "ru", hiragana: "る", romaji: "ru", group: "r-group", exampleWord: "留守 (るす)", exampleMeaning: "Ausente", exampleRomaji: "rusu", strokeCount: 1 },
      { id: "re", hiragana: "れ", romaji: "re", group: "r-group", exampleWord: "歴史 (れきし)", exampleMeaning: "História", exampleRomaji: "rekishi", strokeCount: 2 },
      { id: "ro", hiragana: "ろ", romaji: "ro", group: "r-group", exampleWord: "六 (ろく)", exampleMeaning: "Seis", exampleRomaji: "roku", strokeCount: 1 }
    ]
  },
  {
    id: "w-n-group",
    name: "Família W & N (わ を ん)",
    description: "Sons finais e a consoante única 'N'",
    color: "bg-orange-500",
    characters: [
      { id: "wa", hiragana: "わ", romaji: "wa", group: "w-n-group", exampleWord: "川 (かわ)", exampleMeaning: "Rio", exampleRomaji: "kawa", strokeCount: 2 },
      { id: "wo", hiragana: "を", romaji: "wo", group: "w-n-group", exampleWord: "本を飲む (を)", exampleMeaning: "Partícula objeto", exampleRomaji: "wo", strokeCount: 3 },
      { id: "n", hiragana: "ん", romaji: "n", group: "w-n-group", exampleWord: "本 (ほん)", exampleMeaning: "Livro", exampleRomaji: "hon", strokeCount: 1 }
    ]
  },
  {
    id: "dakuon-g-z",
    name: "Dakuon G & Z (が ぎ ぐ げ ご / ざ じ づ ぜ ぞ)",
    description: "Sons sonorizados com tenten (゛)",
    color: "bg-blue-600",
    characters: [
      { id: "ga", hiragana: "が", romaji: "ga", group: "dakuon-g-z", exampleWord: "学校 (がっこう)", exampleMeaning: "Escola", exampleRomaji: "gakkou", strokeCount: 5 },
      { id: "gi", hiragana: "ぎ", romaji: "gi", group: "dakuon-g-z", exampleWord: "銀行 (ぎんこう)", exampleMeaning: "Banco", exampleRomaji: "ginkou", strokeCount: 6 },
      { id: "gu", hiragana: "ぐ", romaji: "gu", group: "dakuon-g-z", exampleWord: "軍手 (ぐんて)", exampleMeaning: "Luva", exampleRomaji: "gunte", strokeCount: 3 },
      { id: "ge", hiragana: "げ", romaji: "ge", group: "dakuon-g-z", exampleWord: "ゲーム (げーむ)", exampleMeaning: "Jogo", exampleRomaji: "geemu", strokeCount: 5 },
      { id: "go", hiragana: "ご", romaji: "go", group: "dakuon-g-z", exampleWord: "ご飯 (ごはん)", exampleMeaning: "Arroz / Refeição", exampleRomaji: "gohan", strokeCount: 4 },
      { id: "za", hiragana: "ざ", romaji: "za", group: "dakuon-g-z", exampleWord: "雑誌 (ざっし)", exampleMeaning: "Revista", exampleRomaji: "zasshi", strokeCount: 5 },
      { id: "ji", hiragana: "じ", romaji: "ji", group: "dakuon-g-z", exampleWord: "時間 (じかん)", exampleMeaning: "Tempo / Hora", exampleRomaji: "jikan", strokeCount: 3 },
      { id: "zu", hiragana: "ず", romaji: "zu", group: "dakuon-g-z", exampleWord: "地図 (ちず)", exampleMeaning: "Mapa", exampleRomaji: "chizu", strokeCount: 4 },
      { id: "ze", hiragana: "ぜ", romaji: "ze", group: "dakuon-g-z", exampleWord: "全部 (ぜんぶ)", exampleMeaning: "Tudo", exampleRomaji: "zenbu", strokeCount: 5 },
      { id: "zo", hiragana: "ぞ", romaji: "zo", group: "dakuon-g-z", exampleWord: "象 (ぞう)", exampleMeaning: "Elefante", exampleRomaji: "zou", strokeCount: 3 }
    ]
  },
  {
    id: "dakuon-d-b-p",
    name: "Dakuon D, B & P (だ ぢ づ で ど / ば/ぱ...)",
    description: "Sons de D, B e P (handakuon ゜)",
    color: "bg-emerald-600",
    characters: [
      { id: "da", hiragana: "だ", romaji: "da", group: "dakuon-d-b-p", exampleWord: "大学 (だいがく)", exampleMeaning: "Universidade", exampleRomaji: "daigaku", strokeCount: 6 },
      { id: "de", hiragana: "で", romaji: "de", group: "dakuon-d-b-p", exampleWord: "電車 (でんしゃ)", exampleMeaning: "Trem", exampleRomaji: "densha", strokeCount: 3 },
      { id: "do", hiragana: "ど", romaji: "do", group: "dakuon-d-b-p", exampleWord: "ドア (どあ)", exampleMeaning: "Porta", exampleRomaji: "doa", strokeCount: 4 },
      { id: "ba", hiragana: "ば", romaji: "ba", group: "dakuon-d-b-p", exampleWord: "バス (ばす)", exampleMeaning: "Ônibus", exampleRomaji: "basu", strokeCount: 5 },
      { id: "bi", hiragana: "び", romaji: "bi", group: "dakuon-d-b-p", exampleWord: "病院 (びょういん)", exampleMeaning: "Hospital", exampleRomaji: "byouin", strokeCount: 3 },
      { id: "bu", hiragana: "ぶ", romaji: "bu", group: "dakuon-d-b-p", exampleWord: "豚肉 (ぶたにく)", exampleMeaning: "Carne de porco", exampleRomaji: "butaniku", strokeCount: 6 },
      { id: "be", hiragana: "べ", romaji: "be", group: "dakuon-d-b-p", exampleWord: "勉強 (べんきょう)", exampleMeaning: "Estudo", exampleRomaji: "benkyou", strokeCount: 3 },
      { id: "bo", hiragana: "ぼ", romaji: "bo", group: "dakuon-d-b-p", exampleWord: "帽子 (ぼうし)", exampleMeaning: "Chapéu", exampleRomaji: "boushi", strokeCount: 6 },
      { id: "pa", hiragana: "ぱ", romaji: "pa", group: "dakuon-d-b-p", exampleWord: "パン (ぱん)", exampleMeaning: "Pão", exampleRomaji: "pan", strokeCount: 4 },
      { id: "pi", hiragana: "ぴ", romaji: "pi", group: "dakuon-d-b-p", exampleWord: "ピアノ (ぴあの)", exampleMeaning: "Piano", exampleRomaji: "piano", strokeCount: 2 },
      { id: "pu", hiragana: "ぷ", romaji: "pu", group: "dakuon-d-b-p", exampleWord: "プール (ぷーる)", exampleMeaning: "Piscina", exampleRomaji: "puuru", strokeCount: 5 },
      { id: "pe", hiragana: "ぺ", romaji: "ぺ", group: "dakuon-d-b-p", exampleWord: "ペン (ぺん)", exampleMeaning: "Caneta", exampleRomaji: "pen", strokeCount: 2 },
      { id: "po", hiragana: "ぽ", romaji: "po", group: "dakuon-d-b-p", exampleWord: "ポケット (ぽけっと)", exampleMeaning: "Bolso", exampleRomaji: "poketto", strokeCount: 5 }
    ]
  }
];

export const ALL_HIRAGANA_CHARACTERS: HiraganaCharacter[] = HIRAGANA_GROUPS.flatMap(g => g.characters);
