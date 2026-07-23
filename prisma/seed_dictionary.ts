import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('🔄 Inicializando Seed do Banco Kanji (MOD.04)...')

  // 1. Configurar FTS5 (Full-Text Search) no SQLite
  console.log('⚡ Configurando tabela virtual FTS5 para buscas ultra-rápidas...')
  try {
    await prisma.$executeRawUnsafe(`
      CREATE VIRTUAL TABLE IF NOT EXISTS DictionaryEntry_fts USING fts5(
        id UNINDEXED, 
        kanji, 
        reading, 
        romaji, 
        meaningPt
      );
    `)
    
    // Triggers to keep FTS in sync with DictionaryEntry
    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER IF NOT EXISTS DictionaryEntry_ai AFTER INSERT ON DictionaryEntry BEGIN
        INSERT INTO DictionaryEntry_fts(id, kanji, reading, romaji, meaningPt) 
        VALUES (new.id, new.kanji, new.reading, new.romaji, new.meaningPt);
      END;
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER IF NOT EXISTS DictionaryEntry_ad AFTER DELETE ON DictionaryEntry BEGIN
        DELETE FROM DictionaryEntry_fts WHERE id = old.id;
      END;
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TRIGGER IF NOT EXISTS DictionaryEntry_au AFTER UPDATE ON DictionaryEntry BEGIN
        DELETE FROM DictionaryEntry_fts WHERE id = old.id;
        INSERT INTO DictionaryEntry_fts(id, kanji, reading, romaji, meaningPt) 
        VALUES (new.id, new.kanji, new.reading, new.romaji, new.meaningPt);
      END;
    `)
    console.log('✅ FTS5 configurado com sucesso.')
  } catch (error) {
    console.warn('Aviso: Falha ao criar FTS5 (possível em certos provedores). Prosseguindo.', error)
  }

  // 2. Mock Data: N5 Vocabulary (Amostra Inicial)
  const mockVocab = [
    { kanji: '食べる', reading: 'たべる', romaji: 'taberu', meaningPt: 'comer', jlptLevel: 5, isCommon: true },
    { kanji: '飲む', reading: 'のむ', romaji: 'nomu', meaningPt: 'beber', jlptLevel: 5, isCommon: true },
    { kanji: '行く', reading: 'いく', romaji: 'iku', meaningPt: 'ir', jlptLevel: 5, isCommon: true },
    { kanji: '見る', reading: 'みる', romaji: 'miru', meaningPt: 'ver; assistir', jlptLevel: 5, isCommon: true },
    { kanji: '来る', reading: 'くる', romaji: 'kuru', meaningPt: 'vir', jlptLevel: 5, isCommon: true },
    { kanji: '私', reading: 'わたし', romaji: 'watashi', meaningPt: 'eu', jlptLevel: 5, isCommon: true },
    { kanji: '今日', reading: 'きょう', romaji: 'kyou', meaningPt: 'hoje', jlptLevel: 5, isCommon: true },
    { kanji: '明日', reading: 'あした', romaji: 'ashita', meaningPt: 'amanhã', jlptLevel: 5, isCommon: true },
    { kanji: null, reading: 'おいしい', romaji: 'oishii', meaningPt: 'delicioso', jlptLevel: 5, isCommon: true },
    { kanji: '大きい', reading: 'おおきい', romaji: 'ookii', meaningPt: 'grande', jlptLevel: 5, isCommon: true },
  ]

  console.log('📥 Inserindo vocabulário JLPT N5 mock...')
  let count = 0;
  for (const word of mockVocab) {
    const existing = await prisma.dictionaryEntry.findFirst({
      where: { reading: word.reading }
    })
    
    if (!existing) {
      await prisma.dictionaryEntry.create({
        data: word
      })
      count++;
    }
  }

  console.log(`✅ Seed concluída! ${count} palavras inseridas.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
