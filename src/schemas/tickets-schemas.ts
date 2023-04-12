import Joi from 'joi';

export const ticketSchema = Joi.object<Ticket>({
  ticketTypeId: Joi.number().required(),
});

export type Ticket = {
  ticketTypeId: number;
};
