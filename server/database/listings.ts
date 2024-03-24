import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// type definition
export type Listing = {
  id: number;
  name: string;
  type: string;
  city_district: string;
  city: string;
  nearest_station_type: string;
  nearest_station_name: string;
  nearest_station_meter_distance: number;
  min_price: number;
  currency: string;
  options_count: number;
  is_published: boolean;
};

// query all listings
export async function getListings(): Promise<Listing[]> {
  const listings = await sql<Listing[]>`
    select
      listings.id as id,
      listings.name as name,
      listings.type as type,
      listings.city_district as district,
      listings.city as city,
      listings.nearest_station_type as nearest_station_type,
      listings.nearest_station_name as nearest_station_name,
      listings.nearest_station_meter_distance as nearest_station_distance,
      min(options.price) as min_price,
      min(options.currency) as currency,
      count(options.id) as options_count,
      listings.is_published as is_published
    from listings
      left join options on listings.id = options.listing_id
      group by listings.id
  `;
  return listings;
}

// // Query all listings
// export async function getAllListings() {
//   const listings = await sql`
//     SELECT
//       *
//     FROM
//       listings
//   `;
//   return listings;
// }

// query single listing by id
export async function getSingleListing(id: number): Promise<Listing> {
  const [listing = <Listing>{}] = await sql<Listing[]>`
    SELECT
      *
    FROM
      listings
    WHERE
      id = ${id}
  `;
  return listing;
}

// create listing
export async function createListing(
  name: string,
  type: string,
  address_line_one: string,
  address_line_two: string,
  postal_code: string,
  city: string,
  city_district: string,
  country: string,
  lat: number,
  long: number,
  nearest_station_type: string,
  nearest_station_name: string,
  nearest_station_meter_distance: number,
  description: string,
): Promise<Listing> {
  const [listing = <Listing>{}] = await sql<Listing[]>`
    INSERT INTO
      listings (
        name,
        type,
        address_line_one,
        address_line_two,
        postal_code,
        city,
        city_district,
        country,
        lat,
        long,
        nearest_station_type,
        nearest_station_name,
        nearest_station_meter_distance,
        description
      )
    VALUES (
      ${name},
      ${type},
      ${address_line_one},
      ${address_line_two},
      ${postal_code},
      ${city},
      ${city_district},
      ${country},
      ${lat},
      ${long},
      ${nearest_station_type},
      ${nearest_station_name},
      ${nearest_station_meter_distance},
      ${description}
    )
    RETURNING
    id,
    name
  `;
  return listing;
}
