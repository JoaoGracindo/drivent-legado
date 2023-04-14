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

export async function makePayment(paymentInformation: PaymentInformation) {
  const { ticketId, cardData } = paymentInformation;
  const cardLastDigits = cardData.number.toString().slice(-4);

  const {
    TicketType: { price },
  } = await ticketsRepository.getTypeById(ticketId);
  if (!price) throw notFoundError();

  const data = {
    ticketId,
    cardIssuer: cardData.issuer,
    cardLastDigits,
    value: price,
  } as PaymentInput;

  const result = await paymentRepository.makePayment(data);

  ticketsRepository.updateStatus(data.ticketId);

  return result;
}

const paymentsService = {
  getPayment,
  makePayment,
};

export default paymentsService;
