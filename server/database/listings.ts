import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// Query all listings
export async function getAllListings() {
  const listings = await sql`
    SELECT
      *
    FROM
      listings
  `;
  return listings;
}

// Query single listing
export async function getSingleListing(id: number) {
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
