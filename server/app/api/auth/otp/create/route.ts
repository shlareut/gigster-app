// The otp-create api will (1) generate an otp, (2) hash the otp, (3) update the user's password with the hashed otp.
// sending the otp will be handled by a different api.

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  getSingleUserByUsername,
  updateUserPassword,
} from '../../../../../database/users';
import generateOtp from '../../../../../utils/otpGenerator';

export async function POST(request: NextRequest) {
  // TESTING HARDCODED
  const otp = '123456';
  const sms = {
    success: true,
  };

  // read api request body
  const body = await request.json();

  // generate otp
  // disabled for testing purposes
  // const otp = generateOtp();

  // hash generated otp
  const otpHash = await bcrypt.hash(otp, 12).catch(console.error);

  try {
    // check if api requests has username in it
    if (body.username) {
      // query for the username in database
      const user = await getSingleUserByUsername(body.username).catch(
        console.error,
      );
      if (user) {
        // update the user's password with new otp.
        const updatedUser = await updateUserPassword(
          body.username,
          otpHash,
        ).catch(console.error);
        if (updatedUser) {
          // return SUCCESS.
          return new NextResponse(
            JSON.stringify({
              success: true,
              message: `New OTP created successfully.`,
            }),
          );
        } else {
          // return "failed to update password" error.
          return new NextResponse(
            JSON.stringify({
              success: false,
              message: `Failed to update user password.`,
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
    // return "unknown server" error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
      }),
    );
  }
}
