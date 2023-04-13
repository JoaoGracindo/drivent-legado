import { Ticket } from '@prisma/client';

async function postTicket(enrollmentId: number, ticketTypeId: number) {
  return { enrollmentId, ticketTypeId };
}

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

const ticketsRepository = {
  postTicket,
};

export default ticketsRepository;
