import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Call the external Fake Store API
    const apiResponse = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!apiResponse.ok) {
      // Forward the error from the external API
      const errorText = await apiResponse.text();
      return NextResponse.json(
        { message: errorText || 'Authentication failed' },
        { status: apiResponse.status }
      );
    }

    const data = await apiResponse.json();
    const token = data.token;

    if (token) {
      // Set the token in a secure, HTTP-Only cookie
      (await cookies()).set('token', token, {
        httpOnly: true, // The cookie cannot be accessed by client-side JS
        secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
        path: '/', // The cookie is available for all paths
        maxAge: 60 * 60 * 24, // 1 day in seconds
      });

      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Token not found' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ message: 'An internal error occurred' }, { status: 500 });
  }
}