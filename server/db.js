import dotenv from 'dotenv';
// db.js
import postgres from 'postgres';

dotenv.config();

export const sql = postgres();

export async function getProducts() {
  const products = await sql`
    SELECT
      id,
      title,
      image
    FROM
      products
  `;
  return products;
}
