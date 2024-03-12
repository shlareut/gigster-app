import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '../../../database/sessions';

export async function GET(request: NextRequest) {
  // checking if the sessionToken cookie exists
  const sessionTokenCookie = cookies().get('sessionToken');
  if (!sessionTokenCookie) {
    // return error message if no cookie
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'No cookie found!',
      }),
    );
  } else {
    // query session from db
    const session = await deleteSession(sessionTokenCookie.value).catch(
      console.error,
    );

    // check if db entry is there
    if (!session) {
      // return error message if no session in db
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'No session in db',
          session,
        }),
      );
    } else {
      // return success message if session in db
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: 'Session deleted!',
          session,
        }),
      );
    }
  }
}
