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

const ticketsRepository = {
  postTicket,
};

export default ticketsRepository;
