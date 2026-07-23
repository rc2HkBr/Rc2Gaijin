import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get('teacherId');

  try {
    const schedules = await prisma.schedule.findMany({
      where: teacherId ? { teacherId } : undefined,
      include: {
        teacher: true,
        bookings: true
      },
      orderBy: { date: 'asc' }
    });
    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load schedules' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { teacherId, date } = await req.json();

    const schedule = await prisma.schedule.create({
      data: {
        teacherId,
        date: new Date(date)
      },
      include: { teacher: true }
    });
    
    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 });
  }
}
