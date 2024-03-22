import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, updateUserAvatar } from '../../../database/users';

export async function GET() {
  const data = await getAllUsers().catch(console.error);
  return NextResponse.json(data);
}

// update avatar of a particular user
export async function PUT(request: NextRequest) {
  // read request content
  const body = await request.json();

  // make db entry
  try {
    const updatedUser = await updateUserAvatar(body.userId, body.avatarUrl);
    if (updatedUser) {
      // return SUCCESS
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: `SUCCESS`,
        }),
      );
    } else {
      // return ERROR
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: `ERROR`,
        }),
      );
    }
  } catch (error) {
    console.error;
  }
}
