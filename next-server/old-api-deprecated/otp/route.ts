import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  getSingleUserByUsername,
  updateUserLastLogin,
} from '../../database/users';

// validate otp
export async function POST(request: NextRequest) {
  // read request
  const body = await request.json();

  // query user profile
  const user = await getSingleUserByUsername(body.username).catch(
    console.error,
  );
  // extract current password (hashed)
  const hashedOtp = user[0].password_hash;

  // check if user exists
  if (user[0]) {
    // compare hashed password with typed password
    const isOtpValid = await bcrypt
      .compare(body.typedOtp, hashedOtp)
      .catch(console.error);
    console.log('OTP valid?:', isOtpValid);
    // check if password is correct
    if (!isOtpValid) {
      //return invalid otp response
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Invalid OTP.`,
        }),
      );
    } else {
      // should create a session here!!!!!
      // call function to update last login
      await updateUserLastLogin(body.username).catch(console.error);
      // return success
      return new NextResponse(
        JSON.stringify({
          success: true,
          userId: user[0].id,
          message: `Correct OTP`,
        }),
      );
    }
  }
  // user not found
  return new NextResponse(
    JSON.stringify({
      success: false,
      message: `User not found!`,
    }),
  );
}
