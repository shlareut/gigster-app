// The otp-create api will (1) generate an otp, (2) hash the otp, (3) update the user's password with the hashed otp.
// sending the otp will be handled by a different api.

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import {
  getSingleUserByUsername,
  updateUserPassword,
} from '../../../../../database/users';
import generateOtp from '../../../../../utils/otpGenerator';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  // // TESTING HARDCODED
  // const otp = '123456';
  // const sms = {
  //   success: true,
  // };

  // read api request body
  const body = await request.json();

  // generate otp
  const otp = generateOtp();

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
          // send OTP via SMS
          try {
            const message = await client.messages
              .create({
                body: `Your final project OTP is ${otp}.`,
                from: '+16078004729',
                to: `${body.username}`,
              })
              .catch(console.error);
            // return SUCCESS.
            return new NextResponse(
              JSON.stringify({
                success: true,
                message: `New OTP created successfully.`,
              }),
            );
          } catch (error) {
            // return "failed to send OTP" error.
            return new NextResponse(
              JSON.stringify({
                success: false,
                message: `Failed to send OTP.`,
                error: error,
              }),
            );
          }
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
