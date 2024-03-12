// The sign up api creates a new user account with an interim password. It does not send the password to the user and it does not create a session.

import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '../../../../database/users';

// create a new user
export async function POST(request: NextRequest) {
  // read api request body
  const body = await request.json();

  // TESTING HARDCODED
  const otp = '123456';

  try {
    // check if user details are provided in api call.
    if (body.username && body.firstName && body.lastName) {
      // generate interim otp
      // const otp = generateOtp();
      if (otp) {
        // hash interim otp.
        const otpHash = await bcrypt.hash(otp, 12).catch(console.error);
        if (otpHash) {
          // create user in database.
          const createdUser = await createUser(
            body.username,
            otpHash,
            body.firstName,
            body.lastName,
          ).catch(console.error);
          if (createdUser) {
            // return SUCCESS
            return new NextResponse(
              JSON.stringify({
                success: true,
                message: `Sign-up successful.`,
              }),
            );
          } else {
            // return "user creation failed" error.
            return new NextResponse(
              JSON.stringify({
                success: false,
                message: `User creation failed.`,
              }),
            );
          }
        } else {
          // return "otp encryption failed" error.
          return new NextResponse(
            JSON.stringify({
              success: false,
              message: `OTP encryption failed.`,
            }),
          );
        }
      } else {
        // return "otp generation failed" error.
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: `OTP generation failed.`,
          }),
        );
      }
    } else {
      // return "missing details" error.
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Missing details in api request.`,
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
