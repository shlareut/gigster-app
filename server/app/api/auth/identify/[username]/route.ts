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
  // query username from database
  const user = await getSingleUserByUsername(params.username).catch(
    console.error,
  );
  if (user) {
    // return "exists" if username was found.
    return new NextResponse(
      JSON.stringify({
        success: true,
        newUser: false,
        message: `Existing user identified.`,
        value: user,
      }),
    );
  } else {
  }
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
