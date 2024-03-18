import { useSearchParams } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { getNearestStation } from '../../../database/publicTransport';

// test distance api
export async function POST(request: NextRequest) {
  // read request
  const body = await request.json();

  const lat = body.lat;
  const long = body.long;
  // const lat = searchParams.get('lat');
  // const long = searchParams.get('long');
  // const lat = 16.37702655422268;
  // const long = 48.21869973514605;
  const data = await getNearestStation(Number(lat), Number(long)).catch(
    console.error,
  );
  return NextResponse.json(data);
}
