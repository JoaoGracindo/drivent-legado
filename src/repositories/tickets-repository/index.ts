import { prisma } from '@/config';

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      Enrollment: {
        connect: {
          id: enrollmentId,
        },
      },
      TicketType: {
        connect: {
          id: ticketTypeId,
        },
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTypes() {
  return await prisma.ticketType.findMany();
}

async function findTicketsWithTicketType(enrollmentId: number) {
  return prisma.ticket.findMany({
    where: {
      enrollmentId,
    },
  });
}

const ticketsRepository = {
  postTicket,
  getTypes,
  findTicketsWithTicketType,
};

export default ticketsRepository;
