import { prisma } from '@/config';

async function getAll() {
  return await prisma.hotel.findMany();
}

async function getRoomsByHotelId(id: number) {
  return await prisma.hotel.findMany({
    where: {
      id,
    },
    include: {
      Rooms: true,
    },
  });
}

async function checkIdValidity(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      Enrollment: {
        select: {
          Ticket: {
            select: {
              status: true,
              TicketType: {
                select: {
                  includesHotel: true,
                  isRemote: true,
                },
              },
            },
          },
        },
      },
    },
    rejectOnNotFound: true,
  });
}

const hotelRepository = {
  getAll,
  getRoomsByHotelId,
  checkIdValidity,
};

export default hotelRepository;
