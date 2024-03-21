import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// Create new booking
export async function createBooking(
  user_id: number,
  option_id: number,
  experience: number,
  remarks: string,
) {
  const booking = await sql`
    INSERT INTO
      bookings (
        user_id,
        option_id,
        experience,
        remarks
      )
    VALUES
      (
        ${user_id},
        ${option_id},
        ${experience},
        ${remarks}
      )
    RETURNING
      id,
      user_id,
      option_id
  `;
  return booking;
}

// Query all bookings
export async function getAllBookings() {
  const bookings = await sql`
    SELECT
      *
    FROM
      bookings
  `;
  return bookings;
}

// Query bookings by user id
export async function getBookingsByUserId(id: number) {
  const bookings = await sql`
    SELECT
      bookings.id as id,
      bookings.status as status,
      bookings.experience as experience,
      bookings.remarks as remarks,
      bookings.user_id as user_id,
      bookings.booking_timestamp as timestamp,
      TO_CHAR(bookings.booking_timestamp, 'DD Mon YYYY') as date,
      options.name as option_name,
      options.price as option_price,
      options.currency as option_currency,
      listings.id as listing_id,
      listings.name as listing_name,
      listings.type as listing_type
    FROM
      bookings
      JOIN options on bookings.option_id = options.id
      JOIN listings on listings.id = options.listing_id
    WHERE
      user_id = ${id}
  `;
  return bookings;
}

// update booking experience and remarks by booking id
export async function updateUserPassword(
  id: number,
  experience: number,
  remarks: string,
) {
  const [updatedBooking] = await sql`
    UPDATE bookings
    SET
      experience = ${experience},
      remarks = ${remarks}
    WHERE
      id = ${id}
    RETURNING
      id,
      experience,
      remarks;
  `;
  return updatedBooking || null;
}
