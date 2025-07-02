import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // To delete a cookie, set it with an empty value and an expiration date in the past.
    (await cookies()).set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0), // Set expiration to a past date
    });

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}