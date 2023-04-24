import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await hotelsService.getHotels(userId);
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);

    if (error.name === 'requirePayment') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  if (!req.query.hotelId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const hotelId = Number(req.query.hotelId);

  try {
    const result = hotelsService.getRooms(userId, hotelId);
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);

    if (error.name === 'requirePayment') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
