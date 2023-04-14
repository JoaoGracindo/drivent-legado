import { prisma } from '@/config';
import { PaymentInput } from '@/schemas/payment-schemas';

async function getPayment(id: number) {
  return await prisma.payment.findUnique({
    where: {
      id,
    },
    include: {
      Ticket: true,
    },
  });
}

async function makePayment(data: PaymentInput) {
  return await prisma.payment.create({
    data,
  });
}

const paymentRepository = {
  getPayment,
  makePayment,
};

export default paymentRepository;
