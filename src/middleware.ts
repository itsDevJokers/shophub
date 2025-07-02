import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // If no token exists, redirect to the login page.
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If a token exists, allow the request to proceed.
  return NextResponse.next();
}

// UPDATE THIS MATCHER
export const config = {
  matcher: [
    '/cart/:path*',        // Protect the cart page
    '/profile/:path*',      // Protect a potential profile page
    '/order/success',     // Protect the order confirmation page
  ],
};