import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Pass through cleanly to Next.js so the in-page custom luxury Atelier Authentication Form renders
  // without triggering the browser's raw HTTP Basic Auth dialog
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
