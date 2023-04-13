import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas/tickets-schemas';
import { createTicket, getTicketsByUserId, getTicketTypes } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getTicketsByUserId)
  .get('/types', getTicketTypes)
  .post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
