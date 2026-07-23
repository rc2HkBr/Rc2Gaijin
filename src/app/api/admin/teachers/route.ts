import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load teachers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, bio, specialty, price, mpAccountId, imageUrl } = body;

    const teacher = await prisma.teacher.create({
      data: {
        name,
        bio,
        specialty,
        price: Number(price) || 60.0,
        mpAccountId,
        imageUrl: imageUrl || '/images/avatars/default.png'
      }
    });
    
    return NextResponse.json(teacher);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create teacher' }, { status: 500 });
  }
}
