import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/tickets-schemas';
import { createTicket, getTicketTypes } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/')
  .get('/types', getTicketTypes)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
