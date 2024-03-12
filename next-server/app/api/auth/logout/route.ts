// The logout api does one thing: deleting a session cookie.

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// delete a session cookie / log out user
export async function GET() {
  try {
    // check for the cookie in general
    const sessionTokenCookie = cookies().get('sessionToken');
    if (sessionTokenCookie) {
      cookies().delete('sessionToken');
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `Logout successful.`,
        }),
      );
    } else {
      // return "no cookie found" error.
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `No cookie found.`,
        }),
      );
    }
  } catch (error) {
    // return "unknown server error"
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
      }),
    );
  }
}
