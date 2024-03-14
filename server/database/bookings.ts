import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

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
