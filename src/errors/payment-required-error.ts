import { ApplicationError } from '@/protocols';

export function requirePayment(): ApplicationError {
  return {
    name: 'requirePayment',
    message: 'Payment is required',
  };
}
