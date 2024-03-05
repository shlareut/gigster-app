// db.js
import postgres from 'postgres';
import { setEnvironment } from './utils/config.js';

setEnvironment();

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
export async function getAllListings() {
  const listings = await sql`
    SELECT
      *
    FROM
      listings
  `;
  return listings;
}

// Query single venue
export async function getSingleListing(id) {
  const listings = await sql`
    SELECT
      *
    FROM
      listings
    WHERE
      id = ${id}
  `;
  return listings;
}

export async function getSingleUserByUsername(username) {
  const user = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user;
}

export async function createUser(username, password_hash) {
  const user = await sql`
    INSERT INTO
      users (username, password_hash)
    VALUES
      (
        ${username},
        ${password_hash}
      )
    RETURNING
      id,
      username
  `;
  return user;
}

export async function updateUserPassword(username, password_hash) {
  const updatedUser = await sql`
    UPDATE users
    SET
      password_hash = ${password_hash}
    WHERE
      username = ${username}
    RETURNING
      id,
      username;
  `;
  return updatedUser[0];
}

// Create new venue
// export async function createVenue(
//   venue_name,
//   venue_type,
//   address_line_one,
//   address_line_two,
//   postal_code,
//   city,
//   city_district,
//   country,
//   description,
// ) {
//   const newVenue = await sql`
//     INSERT INTO
//       venues (
//         venue_name,
//         venue_type,
//         address_line_one,
//         address_line_two,
//         postal_code,
//         city,
//         city_district,
//         country,
//         description,
//       )
//     VALUES
//       (
//         ${venue_name},
//         ${venue_type},
//         ${address_line_one},
//         ${address_line_two},
//         ${postal_code},
//         ${city},
//         ${city_district},
//         ${country},
//         ${description}
//       )
//   `;
//   return newVenue;
// }
