'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getTeachersWithSchedules() {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        schedules: {
          where: {
            isBooked: false,
            date: {
              gt: new Date() // Only future schedules
            }
          },
          orderBy: {
            date: 'asc'
          }
        }
      },
      orderBy: {
        price: 'asc' // Simplest sorting
      }
    });
    return { success: true, data: teachers };
  } catch (error: any) {
    console.error('Error fetching teachers:', error);
    return { success: false, error: 'Erro ao buscar professores.' };
  }
}

export async function createBooking(scheduleId: string, studentEmail: string, studentName: string) {
  try {
    // 1. Verify schedule is still available
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId }
    });

    if (!schedule || schedule.isBooked) {
      return { success: false, error: 'Horário não está mais disponível.' };
    }

    // 2. Transaction to book it and create the booking record
    const booking = await prisma.$transaction(async (tx) => {
      // Mark as booked
      await tx.schedule.update({
        where: { id: scheduleId },
        data: { isBooked: true }
      });

      // Create booking
      // Using studentEmail as studentId for now
      return await tx.booking.create({
        data: {
          scheduleId,
          studentId: studentEmail,
          status: 'PENDING',
          // meetLink could be generated here in the future
        }
      });
    });

    revalidatePath('/aulas');
    revalidatePath('/perfil');
    
    return { success: true, booking };
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return { success: false, error: 'Erro ao criar agendamento.' };
  }
}

export async function getStudentBookings(email: string) {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        studentId: email
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
    return { success: true, data: bookings };
  } catch (error: any) {
    console.error('Error fetching student bookings:', error);
    return { success: false, error: 'Erro ao buscar aulas.' };
  }
}

export async function getTeacherBookings(teacherId: string) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId }
    });

    if (!teacher) {
      return { success: false, error: 'Professor não encontrado.' };
    }

    const bookings = await prisma.booking.findMany({
      where: {
        schedule: {
          teacherId: teacherId
        }
      },
      include: {
        schedule: true
      },
      orderBy: {
        schedule: {
          date: 'asc'
        }
      }
    });
    
    return { success: true, data: { teacher, bookings } };
  } catch (error: any) {
    console.error('Error fetching teacher bookings:', error);
    return { success: false, error: 'Erro ao buscar aulas.' };
  }
}
