export interface KaishiCard {
  id: string;
  kanji: string;
  furigana: string;
  romaji: string;
  meaning: string;
  pitchAccent: string;
  sentence: string;
  sentenceFurigana: string;
  sentenceTranslation: string;
}

export const KAISHI_DECK: KaishiCard[] = [
  {
    id: "k_1",
    kanji: "格好",
    furigana: "かっこう",
    romaji: "kakkou",
    meaning: "Forma, Aparência",
    pitchAccent: "カッコー (LHHH)",
    sentence: "あの人は格好がいいです。",
    sentenceFurigana: "あの ひと は かっこう が いい です。",
    sentenceTranslation: "Aquela pessoa tem uma boa aparência."
  },
  {
    id: "k_2",
    kanji: "集まる",
    furigana: "あつまる",
    romaji: "atsumaru",
    meaning: "Agrupar-se, Reunir-se",
    pitchAccent: "アツマル (LHHH)",
    sentence: "広場にたくさんの人が集まりました。",
    sentenceFurigana: "ひろば に たくさん の ひと が あつまりました。",
    sentenceTranslation: "Muitas pessoas se reuniram na praça."
  },
  {
    id: "k_3",
    kanji: "数",
    furigana: "かず",
    romaji: "kazu",
    meaning: "Número, Quantidade",
    pitchAccent: "カズ (HL)",
    sentence: "グラスの数が足りません。",
    sentenceFurigana: "グラス の かず が たりません。",
    sentenceTranslation: "Não há copos suficientes (O número de copos não é suficiente)."
  },
  {
    id: "k_4",
    kanji: "世界",
    furigana: "せかい",
    romaji: "sekai",
    meaning: "Mundo",
    pitchAccent: "セカイ (HLL)",
    sentence: "世界は広い。",
    sentenceFurigana: "せかい は ひろい。",
    sentenceTranslation: "O mundo é vasto."
  },
  {
    id: "k_5",
    kanji: "約束",
    furigana: "やくそく",
    romaji: "yakusoku",
    meaning: "Promessa",
    pitchAccent: "ヤクソク (LHHH)",
    sentence: "友達と約束をした。",
    sentenceFurigana: "ともだち と やくそく を した。",
    sentenceTranslation: "Fiz uma promessa com meu amigo."
  }
];
