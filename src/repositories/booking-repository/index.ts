import { prisma } from '@/config';

async function findUserBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Room: true,
    },
  });
}

async function createBooking(roomId: number, userId: number) {
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

async function changeRoom(roomId: number, bookingId: number) {
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

async function checkIfRoomExists(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId,
    },
  });
}

async function checkRoomAvailability(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId,
    },
  });
}

const bookingRepository = {
  findUserBooking,
  changeRoom,
  checkIfRoomExists,
  checkRoomAvailability,
  createBooking,
};

export default bookingRepository;
