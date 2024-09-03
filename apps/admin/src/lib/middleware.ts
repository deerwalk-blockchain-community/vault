import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = localStorage.getItem('token');
  const { pathname } = request.nextUrl;

  const unprotectedRoutes = ['/login', '/signup'];

  if (!isAuthenticated && !unprotectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
