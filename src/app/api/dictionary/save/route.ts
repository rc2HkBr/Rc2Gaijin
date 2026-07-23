import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { wordId } = await req.json();

    if (!wordId) {
      return NextResponse.json({ error: 'Missing wordId' }, { status: 400 });
    }

    // Temporary mock user ID for MVP
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({ data: { name: 'Gaijin Player' } });
    }

    // Check if already saved
    const existing = await prisma.userSavedWord.findFirst({
      where: { userId: user.id, wordId }
    });

    if (existing) {
      return NextResponse.json({ message: 'Already saved' });
    }

    // Save word
    await prisma.userSavedWord.create({
      data: {
        userId: user.id,
        wordId: wordId,
        nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
      }
    });

    return NextResponse.json({ success: true, message: 'Selado no Grimório!' });
  } catch (error) {
    console.error('Save word error:', error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
