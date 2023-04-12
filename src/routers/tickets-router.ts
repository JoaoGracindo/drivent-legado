import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/').get('/types').post('/');

export { ticketsRouter };
