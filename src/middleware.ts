import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Use environment variables or fallback to secure defaults
    const expectedUser = process.env.ADMIN_USER || 'abraham';
    const expectedPwd = process.env.ADMIN_PASSWORD || 'Vault2026!';

    if (user === expectedUser && pwd === expectedPwd) {
      return NextResponse.next();
    }
  }

  // If auth fails or is not provided, trigger the browser's native login prompt
  return new NextResponse('Authentication Required for Client Vault', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Abraham Collection Secure Vault"',
    },
  });
}

// Only run this middleware on the /admin route and its sub-routes
export const config = {
  matcher: ['/admin/:path*'],
};
