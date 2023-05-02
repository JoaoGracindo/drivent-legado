import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  if (!roomId || isNaN(roomId)) return res.sendStatus(httpStatus.NOT_FOUND);

  try {
    const bookingId = await bookingService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function changeRoom(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  const bookingId = Number(req.params.bookingId);

  if (!roomId || isNaN(roomId) || !bookingId || isNaN(bookingId)) return res.sendStatus(httpStatus.NOT_FOUND);

  try {
    const bookingId = await bookingService.changeRoom(userId, roomId);
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
