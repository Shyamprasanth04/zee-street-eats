import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that are always public (login-related)
const AUTH_ROUTES = ['/signin', '/signup', '/forgot-password', '/reset-password', '/verify-email'];

// Routes that should be protected (require authentication)
const PROTECTED_ROUTES = [
  '/pre-order',
  '/dashboard',
  '/profile',
  '/orders',
  '/api/orders'
];

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
};

// Store rate limit data
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log('Middleware processing path:', pathname);

  // Check if this path should be protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  // If not a protected route, allow access without authentication
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Handle authentication for protected routes below

  // Allow auth routes
  if (AUTH_ROUTES.includes(pathname)) {
    console.log('Allowing auth route:', pathname);
    return NextResponse.next();
  }

  // Get token from cookie
  const token = req.cookies.get('token')?.value;
  console.log('Token present:', !!token);

  if (!token) {
    console.log('No token found, redirecting to signin');
    // Redirect to signin if no token
    const signinUrl = new URL('/signin', req.url);
    signinUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signinUrl);
  }

  // For now, we'll just check if the token exists
  // In a production environment, you should use a proper JWT verification
  // that's compatible with Edge Runtime
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only apply middleware to these paths
    '/pre-order/:path*',
    '/dashboard/:path*',
    '/profile/:path*', 
    '/orders/:path*',
    '/api/orders/:path*',
  ],
}; 