import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { PaymentInformation } from '@/schemas/payment-schemas';

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
  const paymentInformation = req.body as PaymentInformation;

  try {
    const result = await paymentsService.makePayment(paymentInformation);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
