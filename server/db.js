import dotenv from 'dotenv';
// db.js
import postgres from 'postgres';

dotenv.config();

export const sql = postgres();

// export async function getProducts() {
//   const products = await sql`
//     SELECT
//       id,
//       title,
//       image
//     FROM
//       products
//   `;
//   return products;
// }

// new db query

// Query venues
export async function getVenues() {
  const venues = await sql`
    SELECT
      *
    FROM
      venues
  `;
  return venues;
}

// Query single venue
export async function getVenue(id) {
  const venues = await sql`
    SELECT
      *
    FROM
      venues
    WHERE
      id = ${id}
  `;
  return venues;
}

// Create new venue
export async function createVenue(
  venue_name,
  venue_type,
  address_line_one,
  address_line_two,
  postal_code,
  city,
  city_district,
  country,
  description,
) {
  const newVenue = await sql`
    INSERT INTO
      venues (
        venue_name,
        venue_type,
        address_line_one,
        address_line_two,
        postal_code,
        city,
        city_district,
        country,
        description,
      )
    VALUES
      (
        ${venue_name},
        ${venue_type},
        ${address_line_one},
        ${address_line_two},
        ${postal_code},
        ${city},
        ${city_district},
        ${country},
        ${description}
      )
  `;
  return newVenue;
}
