import { NextRequest, NextResponse } from 'next/server';
import { getBookingsByUserId } from '../../../../../../database/bookings';

type UserParams = {
  params: {
    userId: number;
  };
};

export async function GET(request: NextRequest, { params }: UserParams) {
  const data = await getBookingsByUserId(params.userId).catch(console.error);
  return NextResponse.json(data);
}
