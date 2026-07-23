import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Para MVP, estamos buscando o primeiro usuário (Gaijin Player)
    let user = await prisma.user.findFirst();

    if (!user) {
      user = await prisma.user.create({ data: { name: 'Gaijin Player' } });
    }

    // Busca o count de palavras salvas
    const savedWordsCount = await prisma.userSavedWord.count({
      where: { userId: user.id }
    });

    // Busca as aulas agendadas (status PAID e datas futuras)
    const upcomingBookings = await prisma.booking.findMany({
      where: { 
        studentId: user.id,
        status: 'PAID',
        schedule: {
          date: { gte: new Date() }
        }
      },
      include: {
        schedule: {
          include: {
            teacher: true
          }
        }
      },
      orderBy: {
        schedule: {
          date: 'asc'
        }
      }
    });

    return NextResponse.json({
      user: {
        name: user.name,
        xp: user.xp,
        level: user.level,
      },
      savedWordsCount,
      upcomingBookings
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to load dashboard data' }, { status: 500 });
  }
}
