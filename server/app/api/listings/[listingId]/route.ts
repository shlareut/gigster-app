import { NextRequest, NextResponse } from 'next/server';
import { getSingleListing } from '../../../../database/listings';

type ListingParams = {
  params: {
    listingId: number;
  };
};

export async function GET(request: NextRequest, { params }: ListingParams) {
  const data = await getSingleListing(params.listingId).catch(console.error);
  return NextResponse.json(data);
}
