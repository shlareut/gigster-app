import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  createSession,
  getAllSessions,
  getSession,
} from '../../../database/sessions';
import generateSessionToken from '../../../utils/sessionTokenGenerator';

// type SessionParams = {
//   params: {
//     token: string;
//   };
// };

// export async function GET() {
//   const data = await getAllSessions().catch(console.error);
//   return NextResponse.json(data);
// }

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
    const session = await getSession(sessionTokenCookie.value).catch(
      console.error,
    );

    // check if db entry is there
    if (session.length === 0) {
      // return error message if no session in db
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'No session in db',
          session: session,
        }),
      );
    } else {
      // return success message if session in db
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: 'Session found',
          userId: session[0].user_id,
          session: session,
        }),
      );
    }
  }
}

export async function POST(request: NextRequest) {
  // read request
  const body = await request.json();

  // generate session token
  const sessionToken = generateSessionToken();

  // make db entry
  const data = await createSession(body.userId, sessionToken).catch(
    console.error,
  );
  if (data) {
    // if success, set cookie
    cookies().set({
      name: 'sessionToken',
      value: sessionToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    // return success message
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Cookie set!',
        value: sessionToken,
      }),
    );
  } else {
    // else, return error message
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Cookie not set!',
      }),
    );
  }
}
