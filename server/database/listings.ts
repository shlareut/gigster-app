import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// NEW QUERY TO GET ALL LISTINGS
export async function getListings() {
  const listings = await sql`
    select
      listings.id as id,
      listings.name as name,
      listings.type as type,
      listings.city_district as district,
      listings.city as city,
      listings.nearest_station as nearest_station,
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
