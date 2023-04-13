import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';

export async function postTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const { id: enrollmentId } = enrollment;
  const result = await ticketsRepository.postTicket(enrollmentId, ticketTypeId);

  return result;
}

export async function getUserTickets(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const tickets = await ticketsRepository.findTicketsWithTicketType(enrollment.id);
  if (!tickets) throw notFoundError();

  return tickets;
}

const ticketsService = {
  postTicket,
  getUserTickets,
};

export default ticketsService;
