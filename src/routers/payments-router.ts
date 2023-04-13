import { Router } from 'express';
import { getPayment, postPayment } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

export const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayment).post('/process', postPayment);

export default paymentsRouter;
