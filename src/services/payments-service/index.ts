import paymentRepository from '@/repositories/payment-repository';
import { notFoundError, unauthorizedError } from '@/errors';
import { PaymentInformation, PaymentInput } from '@/schemas/payment-schemas';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getPayment(ticketId: number, userId: number) {
  const {
    Payment: [payment],
    Enrollment: { userId: userEnrollmentId },
  } = await ticketsRepository.getPaymentByTicketId(ticketId);

  if (userId !== userEnrollmentId) throw unauthorizedError();

  return payment;
}

export async function makePayment(paymentInformation: PaymentInformation, userId: number) {
  const { ticketId, cardData } = paymentInformation;

  const cardLastDigits = cardData.number.toString().slice(-4);

  const {
    TicketType: { price },
    Enrollment: { userId: ticketUserId },
  } = await ticketsRepository.getTypeById(ticketId);

  if (!price) throw notFoundError();

  if (userId !== ticketUserId) throw unauthorizedError();

  const data = {
    ticketId,
    cardIssuer: cardData.issuer,
    cardLastDigits,
    value: price,
  } as PaymentInput;

  const result = await paymentRepository.makePayment(data);

  await ticketsRepository.updateStatus(data.ticketId);

  return result;
}

const paymentsService = {
  getPayment,
  makePayment,
};

export default paymentsService;
