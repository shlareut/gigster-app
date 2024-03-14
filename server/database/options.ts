import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// Query all options
export async function getAllOptions() {
  const options = await sql`
    SELECT
      *
    FROM
      options
  `;
  return options;
}

// Query options by listing id
export async function getOptionsByListingId(id: number) {
  const options = await sql`
    SELECT
      *
    FROM
      options
    WHERE
      listing_id = ${id}
  `;
  return options;
}
