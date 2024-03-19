// The otp-verify api compares the password typed by the user with the actual password.
// it will not log in the user, it will just check if the password is correct.

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { getSingleUserByUsername } from '../../../../../database/users';

export async function POST(request: NextRequest) {
  // read api request body
  const body = await request.json();

  // try-catch block for catching unexpected server errors.
  try {
    // check if api request has username in it.
    if (body.username) {
      // query for the username in database
      const user = await getSingleUserByUsername(body.username).catch(
        console.error,
      );
      if (user) {
        // store user's hashed password in variable.
        const hashedOtp = user.password_hash;

        // compare typedOtp from api request with hashedOtp from database
        const isOtpCorrect = await bcrypt
          .compare(body.typedOtp, hashedOtp)
          .catch(console.error);

        if (isOtpCorrect) {
          // return SUCCESS.
          return new NextResponse(
            JSON.stringify({
              success: true,
              message: `OTP is correct.`,
            }),
          );
        } else {
          // return "incorrect OTP" error.
          return new NextResponse(
            JSON.stringify({
              success: false,
              message: `OTP is incorrect.`,
            }),
          );
        }
      } else {
        // return "user not found in database" error.
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: `Username not found in database.`,
          }),
        );
      }
    } else {
      // return "no username provided" error.
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `No username provided in API request.`,
        }),
      );
    }
  } catch (error) {
    // return "unknown server error".
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
      }),
    );
  }
}
