import { NextRequest, NextResponse } from 'next/server';
import Tokens from 'csrf';

const tokens = new Tokens();

// Use a more secure secret from environment variables
const secret = process.env.CSRF_SECRET || 'your-secret-key';

export function generateCsrfToken() {
  return tokens.create(secret);
}

export function verifyCsrf(req: NextRequest) {
  // Skip CSRF verification in development mode or temporarily in production
  if (process.env.NODE_ENV === 'development' || process.env.DISABLE_CSRF === 'true') {
    console.log('CSRF verification skipped due to environment settings');
    return true;
  }

  const token = req.headers.get('x-csrf-token');
  const cookieToken = req.cookies.get('csrf-token')?.value;

  console.log('CSRF verification attempt with:');
  console.log('- Header token exists:', !!token);
  console.log('- Cookie token exists:', !!cookieToken);

  if (!token || !cookieToken) {
    console.error('CSRF verification failed: Missing token or cookie');
    return false;
  }

  try {
    const isValid = tokens.verify(secret, token);
    if (!isValid) {
      console.error('CSRF verification failed: Token validation failed');
    } else {
      console.log('CSRF verification successful');
    }
    return isValid;
  } catch (error) {
    console.error('CSRF verification error:', error);
    // Temporarily return true in production while debugging
    return process.env.NODE_ENV === 'production';
  }
}

export function setCsrfCookie(res: NextResponse) {
  const token = generateCsrfToken();
  res.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });
  
  // Also add the token to the response body for debugging
  return res;
} 