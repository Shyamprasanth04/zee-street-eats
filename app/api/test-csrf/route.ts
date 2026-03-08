import { NextRequest, NextResponse } from 'next/server';
import { generateCsrfToken } from '@/lib/csrf';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Generate a new token
    const token = generateCsrfToken();
    
    // Get existing csrf token cookie if any
    const existingToken = req.cookies.get('csrf-token')?.value;
    
    // Create response
    const response = NextResponse.json({
      status: 'ok',
      message: 'CSRF check',
      tokenGenerated: token ? true : false,
      tokenLength: token ? token.length : 0,
      existingCookie: existingToken ? true : false,
      existingCookieLength: existingToken ? existingToken.length : 0,
      csrfSecret: process.env.CSRF_SECRET ? 'provided' : 'missing',
      disableCsrf: process.env.DISABLE_CSRF || 'not set',
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
    
    // Set a new cookie with the token
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });
    
    return response;
  } catch (error) {
    console.error('CSRF test error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'CSRF test failed',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 