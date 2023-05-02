import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

async function getBooking(userId: number) {
  const booking = await bookingRepository.findUserBooking(userId);
  if (booking === null) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const roomExists = await bookingRepository.checkIfRoomExists(roomId);
  if (roomExists === null) throw notFoundError();

  const roomIsAvailable = await bookingRepository.checkRoomAvailability(roomId);
  if (roomIsAvailable !== null) throw new Error();

  const booking = await bookingRepository.createBooking(roomId, userId);
  return booking;
}

async function changeRoom(bookingId: number, roomId: number) {
  const roomExists = await bookingRepository.checkIfRoomExists(roomId);
  if (roomExists === null) throw notFoundError();

  const roomIsAvailable = await bookingRepository.checkRoomAvailability(roomId);
  if (roomIsAvailable !== null) throw new Error();

  const booking = await bookingRepository.changeRoom(roomId, bookingId);
  return booking;
}

const bookingService = {
  changeRoom,
  createBooking,
  getBooking,
};

export default bookingService;
