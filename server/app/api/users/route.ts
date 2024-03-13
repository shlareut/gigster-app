import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '../../../database/users';

export async function GET() {
  const data = await getAllUsers().catch(console.error);
  return NextResponse.json(data);
}
