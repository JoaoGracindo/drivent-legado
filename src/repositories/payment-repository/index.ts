import { prisma } from '@/config';

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

const paymentRepository = {
  getPayment,
};

export default paymentRepository;
