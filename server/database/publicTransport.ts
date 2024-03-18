import postgres from 'postgres';
import { setEnvironment } from '../utils/config.js';

setEnvironment();
const sql = postgres();

// Query nearest station based on lat long
export async function getNearestStation(lat: number, long: number) {
  const station = await sql`
    SELECT
    ROUND(6371 * 1000 * 2 * ASIN(
        SQRT(
            POWER(SIN((${lat} - lat) * PI() / 180 / 2), 2) +
            COS(lat * PI() / 180) * COS(${lat} * PI() / 180) *
            POWER(SIN((${long} - long) * PI() / 180 / 2), 2)
        ))
    ) AS distance_in_meters, *
FROM
    public_transport_locations
ORDER BY
    distance_in_meters ASC
LIMIT 1
  `;
  return station;
}
