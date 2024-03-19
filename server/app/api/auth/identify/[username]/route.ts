// The identify api checks whether a given username exists in the database.
// It's used to distinguish new from existing users during the authentication process.

// FOLDER STRUCTURE, soll OTP ein eigener VERIFY folder sein, same level wie auth?

import { NextRequest, NextResponse } from 'next/server';
import { getSingleUserByUsername } from '../../../../../database/users';

type UserParams = {
  params: {
    username: string;
  };
};

export async function GET(request: NextRequest, { params }: UserParams) {
  // match user input with regex for phone format
  if (!/^\+\d+$/.test(params.username)) {
    return new NextResponse(
      // return "wrong format" error
      JSON.stringify({
        success: false,
        message: `Only international phone number format allowed, e.g. +123456789 (a plus sign (+) followed by digits).`,
        value: params.username,
      }),
    );
  }

  // query username from database if format is correct
  const user = await getSingleUserByUsername(params.username).catch(
    console.error,
  );
  if (!user) {
    return new NextResponse(
      // return "new" if username was not found.
      JSON.stringify({
        success: true,
        newUser: true,
        message: `New user identified.`,
        value: user,
      }),
    );
  }
  // return "exists" if username was found.
  return new NextResponse(
    JSON.stringify({
      success: true,
      newUser: false,
      message: `Existing user identified.`,
      value: user,
    }),
  );
}
