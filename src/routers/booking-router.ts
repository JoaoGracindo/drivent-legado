import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { changeRoom, createBooking, getBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBooking).post('/', createBooking).put('/:bookingId', changeRoom);

export { bookingRouter };
