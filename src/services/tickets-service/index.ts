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

const ticketsService = {
  postTicket,
};

export default ticketsService;
