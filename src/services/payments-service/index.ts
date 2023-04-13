import paymentRepository from '@/repositories/payment-repository';
import enrollmentsRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';

export async function getPayment(paymentId: number, userId: number) {
  const payment = await paymentRepository.getPayment(paymentId);

  if (!payment) throw notFoundError();

  const {
    Ticket: { enrollmentId },
  } = payment;

  const { id: userEnrollmentId } = await enrollmentsRepository.findWithAddressByUserId(userId);

  if (enrollmentId !== userEnrollmentId) throw unauthorizedError();

  return payment;
}

const paymentsService = {
  getPayment,
};

export default paymentsService;
