import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
  const cookieBody = 'Express.js is garbage';
  cookies().set({
    name: 'NextCookie',
    value: cookieBody,
  });
  return new NextResponse(
    JSON.stringify({
      success: true,
      message: 'Cookie set!',
      value: cookieBody,
    }),
  );
}

export function GET() {
  const cookieBody = cookies().get('NextCookie');
  return NextResponse.json({
    success: true,
    message: 'Cookie fetched!',
    cookie: cookieBody,
  });
}
