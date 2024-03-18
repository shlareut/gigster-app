import { Sql } from 'postgres';
import publicTransportLocations from '../utils/geodata/vienna_all_stations.json';

export async function up(sql: Sql) {
  for (const item of publicTransportLocations) {
    await sql`
      INSERT INTO
      public_transport_locations (
          lat,
          long,
          station_city,
          station_name,
          station_type
        )
      VALUES
        (
          ${item.lat},
          ${item.long},
          ${item.station_city},
          ${item.station_name},
          ${item.station_type}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const item of publicTransportLocations) {
    await sql`
      DELETE FROM public_transport_locations
    `;
  }
}
