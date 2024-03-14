import { NextRequest, NextResponse } from 'next/server';
import { getOptionsByListingId } from '../../../../../database/options';

type ListingParams = {
  params: {
    listingId: number;
  };
};

export async function GET(request: NextRequest, { params }: ListingParams) {
  const data = await getOptionsByListingId(params.listingId).catch(
    console.error,
  );
  return NextResponse.json(data);
}
