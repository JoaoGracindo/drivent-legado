import { prisma } from '@/config';

export async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
    select: {
      id: true,
    },
  });
}

export async function changeRoom(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      roomId,
    },
    select: {
      id: true,
    },
  });
}
