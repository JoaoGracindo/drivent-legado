import { notFoundError, requirePayment } from '@/errors';
import hotelRepository from '@/repositories/hotels-repository';

async function validateRequest(userId: number) {
  const userValidity = await hotelRepository.checkIdValidity(userId);
  if (!userValidity) throw notFoundError();

  const ticketType = userValidity.Enrollment[0].Ticket[0].TicketType;
  const status = userValidity.Enrollment[0].Ticket[0].status;
  if (ticketType.includesHotel === false || ticketType.isRemote === true || status === 'RESERVED')
    throw requirePayment();
}

export async function getHotels(userId: number) {
  validateRequest(userId);

  const hotelList = await hotelRepository.getAll();
  return hotelList;
}

export async function getRooms(userId: number, hotelId: number) {
  validateRequest(userId);

  const hotelRooms = await hotelRepository.getRoomsByHotelId(hotelId);
  if (hotelRooms === null) throw notFoundError();

  return hotelRooms;
}

const hotelsService = {
  getRooms,
  getHotels,
};

export default hotelsService;
