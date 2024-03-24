import { NextRequest, NextResponse } from 'next/server';
import { createListing, getListings } from '../../../database/listings';

// get listings
export async function GET() {
  const data = await getListings().catch(console.error);
  return NextResponse.json(data);
}

// create listing
export async function POST(request: NextRequest) {
  // read request content
  const body = await request.json();

  try {
    // create db entry
    const listing = await createListing(
      body.name,
      body.type,
      body.address_line_one,
      body.address_line_two,
      body.postal_code,
      body.city,
      body.city_district,
      body.country,
      body.lat,
      body.long,
      body.nearest_station_type,
      body.nearest_station_name,
      body.nearest_station_meter_distance,
      body.description,
    );
    if (listing) {
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Listing created successfully!`,
        }),
      );
    } else {
      // return "failed creating listing" error
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Failed to create listing.`,
        }),
      );
    }
  } catch (error) {
    // return "unknown server" error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
        error: error,
      }),
    );
  }
}
