import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    // If no query, return the top common words
    const topWords = await prisma.dictionaryEntry.findMany({
      where: { isCommon: true },
      take: 20,
      orderBy: { jlptLevel: 'desc' }
    });
    return NextResponse.json(topWords);
  }

  try {
    // Basic sanitization for FTS5 syntax
    const sanitizedQuery = q.replace(/[^a-zA-Z0-9ぁ-んァ-ン一-龥]/g, '');
    
    if (!sanitizedQuery) {
      return NextResponse.json([]);
    }

    // Append * for prefix matching
    const matchQuery = `${sanitizedQuery}*`;

    // Query SQLite FTS5 table
    const ftsResults = await prisma.$queryRaw<any[]>`
      SELECT * FROM DictionaryEntry
      WHERE id IN (
        SELECT id FROM DictionaryEntry_fts 
        WHERE DictionaryEntry_fts MATCH ${matchQuery}
      )
      LIMIT 20
    `;

    return NextResponse.json(ftsResults);
  } catch (error) {
    console.error('Dictionary search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
