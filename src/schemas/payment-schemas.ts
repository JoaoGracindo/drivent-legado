import { Payment } from '@prisma/client';
import Joi from 'joi';

export const paymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string()
      .pattern(/^([1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'date')
      .required(),
    cvv: Joi.number().required(),
  }),
});

export type PaymentInput = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

export type PaymentInformation = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};
