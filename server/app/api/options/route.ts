import { NextRequest, NextResponse } from 'next/server';
import { createOption, getAllOptions } from '../../../database/options';

// query all options
export async function GET() {
  const options = await getAllOptions().catch(console.error);
  return NextResponse.json(options);
}

// create option for a listing
export async function POST(request: NextRequest) {
  // read request content
  const body = await request.json();
  try {
    const option = await createOption(
      body.name,
      body.price,
      body.currency,
      body.description,
      body.listing_id,
    );
    if (option) {
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Option created successfully!`,
        }),
      );
    } else {
      // return 'failed to create' error
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Failed to create option`,
        }),
      );
    }
  } catch (error) {
    // return error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
        error: error,
      }),
    );
  }
}
