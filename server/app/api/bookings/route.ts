import { NextRequest, NextResponse } from 'next/server';
import {
  createBooking,
  getAllBookings,
  updateBookingDetails,
  updateBookingStatus,
} from '../../../database/bookings';

type BookingParams = {
  params: {
    userId: number;
    optionId: number;
    experience: number;
    remarks: string;
  };
};

// query all bookings (this query is global, user-specific booking query can be found in user api)
export async function GET(request: NextRequest, { params }: BookingParams) {
  const data = await getAllBookings().catch(console.error);
  return NextResponse.json(data);
}

// create new booking for a particular user
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
    if (booking) {
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

// update existing booking's remarks and experience
export async function PUT(request: NextRequest, { params }: BookingParams) {
  // read request content
  const body = await request.json();

  try {
    const updatedBooking = await updateBookingDetails(
      body.bookingId,
      body.experience,
      body.remarks,
    ).catch(console.error);
    if (updatedBooking) {
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Booking updated successfully.`,
          bookingId: body.id,
        }),
      );
    } else {
      // return "something went wrong"
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Booking update failed.`,
          bookingId: body.id,
        }),
      );
    }
  } catch (error) {
    // return "unknown server" error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
        bookingId: body.id,
      }),
    );
  }
}

// cancel existing booking
export async function PATCH(request: NextRequest, { params }: BookingParams) {
  // read request content
  const body = await request.json();

  try {
    const updatedBooking = await updateBookingStatus(
      body.bookingId,
      body.status,
    ).catch(console.error);
    if (updatedBooking) {
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Booking status updated successfully.`,
          bookingId: body.id,
        }),
      );
    } else {
      // return "something went wrong"
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Booking status update failed.`,
          bookingId: body.id,
        }),
      );
    }
  } catch (error) {
    // return "unknown server" error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
        bookingId: body.id,
      }),
    );
  }
}
