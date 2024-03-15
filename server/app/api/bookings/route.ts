import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getAllBookings } from '../../../database/bookings';

type BookingParams = {
  params: {
    userId: number;
    optionId: number;
    experience: number;
    remarks: string;
  };
};

export async function GET(request: NextRequest, { params }: BookingParams) {
  const data = await getAllBookings().catch(console.error);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest, { params }: BookingParams) {
  // read request content
  const body = await request.json();

  try {
    const booking = await createBooking(
      body.userId,
      body.optionId,
      body.experience,
      body.remarks,
    ).catch(console.error);
    if (booking[0]) {
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Booking created successfully.`,
        }),
      );
    } else {
      // return 'failed to create booking' error
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Failed to create booking.`,
        }),
      );
    }
  } catch (error) {
    // return unknown server error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
      }),
    );
  }
}
