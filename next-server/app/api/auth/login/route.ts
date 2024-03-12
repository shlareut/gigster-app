// The login api does three things given a username: (1) generate a session token, (2) store the session token in the database, (3) set a cookie with the session token.
// should trigger when otp validation passed

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSession, getSession } from '../../../../database/sessions';
import {
  getSingleUserByUsername,
  updateUserLastLogin,
} from '../../../../database/users';
import generateSessionToken from '../../../../utils/sessionTokenGenerator';

// create a session // log in user
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
      if (user[0]) {
        // generate session token if user was found.
        const sessionToken = generateSessionToken();
        if (sessionToken) {
          const userId = user[0].id;
          // create session entry in database.
          const createdSession = await createSession(
            userId,
            sessionToken,
          ).catch(console.error);
          if (createdSession) {
            // set cookie.
            cookies().set({
              name: 'sessionToken',
              value: sessionToken,
              httpOnly: true,
              maxAge: 60 * 60 * 24,
            });
            // check if the cookie was successfully set
            const sessionTokenCookie = cookies().get('sessionToken');
            if (sessionTokenCookie) {
              // set login timestamp
              const loginTimeStamp = await updateUserLastLogin(
                body.username,
              ).catch(console.error);
              if (loginTimeStamp) {
                // return SUCCESS!
                return new NextResponse(
                  JSON.stringify({
                    success: true,
                    message: `Login successful.`,
                  }),
                );
              } else {
                // return "login timestamp creation failed" error.
                return new NextResponse(
                  JSON.stringify({
                    success: false,
                    message: `Failed to create login timestamp.`,
                  }),
                );
              }
            } else {
              // return "failed to set cookie" error.
              return new NextResponse(
                JSON.stringify({
                  success: false,
                  message: `Failed to set cookie.`,
                }),
              );
            }
          } else {
            // return "failed to create session in database" error.
            return new NextResponse(
              JSON.stringify({
                success: false,
                message: `Failed to store token in database.`,
              }),
            );
          }
        } else {
          // return "failed to generate token" error.
          return new NextResponse(
            JSON.stringify({
              success: false,
              message: `Failed to generate token.`,
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
      // return "no username provided in api request" error.
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `No username provided in API request.`,
        }),
      );
    }
  } catch (error) {
    // return "unexpected sever error".
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Server error.`,
      }),
    );
  }
}

// check for a session // if user is logged in
export async function GET() {
  // check for the cookie in general
  const sessionTokenCookie = cookies().get('sessionToken');

  try {
    if (sessionTokenCookie) {
      // check if the cookie has a session token value
      const cookieSession = sessionTokenCookie.value;
      if (cookieSession) {
        // query session from database
        const databaseSession = await getSession(cookieSession).catch(
          console.error,
        );
        if (databaseSession[0]) {
          // check if session expired.
          const sessionExpiryDateTime = databaseSession[0].expiry_timestamp;
          const currentDateTime = new Date();
          if (currentDateTime < sessionExpiryDateTime) {
            // return SUCCESS.
            return new NextResponse(
              JSON.stringify({
                success: true,
                message: `Session found.`,
                userId: databaseSession[0].user_id,
              }),
            );
          } else {
            // return "session expired" error.
            return new NextResponse(
              JSON.stringify({
                success: false,
                message: `Session token expired.`,
              }),
            );
          }
        } else {
          // return "session not found in database" error.
          return new NextResponse(
            JSON.stringify({
              success: false,
              message: `Session token not found in database`,
            }),
          );
        }
      } else {
        // return "no session token inside cookie" error.
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: `Session token not found in cookie.`,
          }),
        );
      }
    } else {
      // return "no cookie found" error.
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `Cookie not found.`,
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
