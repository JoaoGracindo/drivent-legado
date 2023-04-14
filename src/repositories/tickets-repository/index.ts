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
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTypeById(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    select: {
      TicketType: {
        select: {
          price: true,
        },
      },
    },
    rejectOnNotFound: true,
  });
}

async function updateStatus(id: number) {
  prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id,
    },
  });
}

async function getPaymentByTicketId(id: number) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
    select: {
      Payment: true,
      Enrollment: true,
    },
    rejectOnNotFound: true,
  });
}

const ticketsRepository = {
  postTicket,
  getTypes,
  findTicketsWithTicketType,
  getTypeById,
  updateStatus,
  getPaymentByTicketId,
};

export default ticketsRepository;
