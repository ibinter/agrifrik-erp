import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = [
  '/login',
  '/inscription',
  '/mot-de-passe-oublie',
];

const PUBLIC_PREFIXES = [
  '/api/',
  '/_next/',
  '/(auth)/',
];

const PUBLIC_FILES = [
  '/favicon.ico',
  '/manifest.json',
  '/sw.js',
  '/logo.png',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public files
  if (PUBLIC_FILES.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow public path prefixes
  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Allow exact public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow static assets (images, fonts, etc.)
  if (
    pathname.startsWith('/_next/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|otf|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const session = request.cookies.get('agrifrik_session');

  // Protect /superadmin/* — require session (role check done client-side in layout)
  if (pathname.startsWith('/superadmin')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Protect all ERP routes — anything not already allowed above
  // The (erp) group in Next.js App Router resolves to paths without the group segment
  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, manifest.json, sw.js, logo.png
     * - api routes are handled inside the matcher but allowed above
     */
    '/((?!_next/static|_next/image|favicon\\.ico|manifest\\.json|sw\\.js|logo\\.png).*)',
  ],
};
