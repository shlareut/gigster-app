import { NextRequest, NextResponse } from 'next/server';
import { getSingleUserById } from '../../../../../database/users';

type UserParams = {
  params: {
    userId: number;
  };
};

export async function GET(request: NextRequest, { params }: UserParams) {
  const data = await getSingleUserById(params.userId).catch(console.error);
  return NextResponse.json(data);
}
