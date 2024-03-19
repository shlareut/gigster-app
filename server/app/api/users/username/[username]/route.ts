import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  createUser,
  getSingleUserByUsername,
  updateUserPassword,
} from '../../../../../database/users';

type UserParams = {
  params: {
    username: string;
    firstName?: string;
    lastName?: string;
  };
};

// query single user by username
export async function GET(request: NextRequest, { params }: UserParams) {
  const user = await getSingleUserByUsername(params.username).catch(
    console.error,
  );
  if (user) {
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: `User found.`,
        value: user,
      }),
    );
  } else {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `User not found.`,
      }),
    );
  }
}

// create single user by username, firstName, lastName
export async function POST(request: NextRequest, { params }: UserParams) {
  // TESTING HARDCODED
  const otp = '123456';
  const sms = {
    success: true,
  };

  // real OTP generation
  // disabled for testing purposes
  // const otp = generateOtp();

  // read request
  const body = await request.json();

  // encrypt otp
  const otpHash = await bcrypt.hash(otp, 12).catch(console.error);

  try {
    // real sms sending
    // disabled for testing purposes
    // const sms = await sendOTP(username, otp).catch(console.error);

    // check if sms was sent successfully
    if (sms.success) {
      // try to fetch existing user with same username
      const user = await getSingleUserByUsername(params.username).catch(
        console.error,
      );

      // check if this username exists already
      if (user[0]) {
        // if user exists, update password with new otp
        await updateUserPassword(params.username, otpHash).catch(console.error);

        // return server response "user password updated"
        return new NextResponse(
          JSON.stringify({
            success: true,
            existing_user: true,
            message: `User exists: Password updated.`,
          }),
        );
      } else {
        // user is new -> create user
        await createUser(
          params.username,
          otpHash,
          body.firstName,
          body.lastName,
        ).catch(console.error);

        // return "user created response"
        return new NextResponse(
          JSON.stringify({
            success: true,
            existing_user: false,
            message: `User created!`,
          }),
        );
      }
    } else {
      // if sms sending failed, return error
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Error sending sms.`,
        }),
      );
    }
  } catch (error) {
    // if sms sending failed, return error
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
      }),
    );
  }
}
