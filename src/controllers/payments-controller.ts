import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  const id = Number(ticketId);
  if (isNaN(id)) return res.sendStatus(httpStatus.NOT_FOUND);

  const { userId } = req;

  try {
    const result = await paymentsService.getPayment(id, userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const paymentInformation = req.body;
  const { userId } = req;
  const ticketId = Number(paymentInformation.ticketId);

  try {
    const result = await paymentsService.getPayment(ticketId, userId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
