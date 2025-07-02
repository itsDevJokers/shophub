
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose'; // Use decodeJwt for reading the payload

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Decode the token to get the payload without verifying the signature
    const payload = decodeJwt(token);

    // The user ID is in the 'sub' field of the payload
    const user = {
      id: payload.sub,
      username: payload.user,
    };

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}