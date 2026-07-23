import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { scheduleId, studentId, paymentMethod } = await req.json();

    // 1. Fetch Schedule & Teacher
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { teacher: true }
    });

    if (!schedule || schedule.isBooked) {
      return NextResponse.json({ error: 'Schedule unavailable' }, { status: 400 });
    }

    // 2. Mock Mercado Pago Checkout & Split Logic
    const platformFee = 20.0;
    const teacherAmount = schedule.teacher.price - platformFee;

    console.log(`[MOCK MP SPLIT] Processing payment for ${schedule.teacher.name}`);
    console.log(`[MOCK MP SPLIT] Platform fee: R$ ${platformFee.toFixed(2)}`);
    console.log(`[MOCK MP SPLIT] Teacher transfer to mpAccountId (${schedule.teacher.mpAccountId}): R$ ${teacherAmount.toFixed(2)}`);

    // In a real implementation:
    // const preference = await new Preference(mp).create({
    //   items: [{ title: 'Aula de Japonês', unit_price: schedule.teacher.price, quantity: 1 }],
    //   marketplace_fee: platformFee,
    //   // ... transferring to schedule.teacher.mpAccountId
    // });

    // 3. Create Booking
    let user = await prisma.user.findUnique({ where: { id: studentId } });
    if (!user) {
      // Create a temporary user if it doesn't exist
      user = await prisma.user.create({ data: { name: 'Gaijin Player' } });
    }

    const booking = await prisma.booking.create({
      data: {
        scheduleId: schedule.id,
        studentId: user.id,
        status: 'PAID', // In reality, this would be PENDING until webhook confirmation
        meetLink: 'https://meet.google.com/mock-link-123'
      }
    });

    // 4. Mark schedule as booked
    await prisma.schedule.update({
      where: { id: schedule.id },
      data: { isBooked: true }
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: 'Pagamento concluído e aula reservada com sucesso!',
      checkoutUrl: 'mock-checkout-success' // In reality, preference.init_point
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
  }
}
