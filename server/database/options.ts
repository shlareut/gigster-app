import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// define type
export type Option = {
  id: number;
  name: string;
  price: number;
  currency: string;
  description: string;
  listing_id: number;
};

// query all options
export async function getAllOptions(): Promise<Option[]> {
  const options = await sql<Option[]>`
    SELECT
      *
    FROM
      options
  `;
  return options;
}

// query options by listing id
export async function getOptionsByListingId(id: number): Promise<Option[]> {
  const options = await sql<Option[]>`
    SELECT
      *
    FROM
      options
    WHERE
      listing_id = ${id}
  `;
  return options;
}

// create option
export async function createOption(
  name: string,
  price: number,
  currency: string,
  description: string,
  listing_id: number,
): Promise<Option[]> {
  const option = await sql<Option[]>`
  INSERT INTO options(
    name,
    price,
    currency,
    description,
    listing_id
  )
  VALUES(
    ${name},
    ${price},
    ${currency},
    ${description},
    ${listing_id}
  )
  RETURNING
  id,
  name
  `;
  return option;
}
