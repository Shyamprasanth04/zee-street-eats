import { NextRequest, NextResponse } from 'next/server'
import { verifyCsrf } from '@/lib/csrf'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  console.log('Signin API called');
  
  try {
    // Verify CSRF token
    if (!verifyCsrf(req)) {
      console.error('CSRF verification failed');
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    console.log('CSRF verification passed');
    
    // Get request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log('Request body parsed');
    } catch (e) {
      console.error('Error parsing request body:', e);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const { email, password } = requestBody;
    
    if (!email || !password) {
      console.error('Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Checking credentials for:', email);

    // Find user by email
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
      console.log('User lookup complete');
    } catch (e) {
      console.error('Database error looking up user:', e);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    let isValid;
    try {
      isValid = await compare(password, user.password);
      console.log('Password comparison complete, result:', isValid);
    } catch (e) {
      console.error('Error comparing passwords:', e);
      return NextResponse.json(
        { error: 'Authentication error' },
        { status: 500 }
      );
    }

    if (!isValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    let token;
    try {
      token = sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
        { expiresIn: '7d' }
      );
      console.log('JWT token generated for user:', user.id);
    } catch (e) {
      console.error('Error generating JWT:', e);
      return NextResponse.json(
        { error: 'Authentication service error' },
        { status: 500 }
      );
    }

    // Create response with token
    const response = NextResponse.json(
      { message: 'Sign in successful' },
      { status: 200 }
    )

    // Set JWT cookie with additional options
    try {
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      console.log('Token cookie set successfully');
    } catch (e) {
      console.error('Error setting cookie:', e);
      // Continue anyway since the token is already in the response
    }

    return response
  } catch (error) {
    console.error('Sign in error:', error)
    return NextResponse.json(
      { error: 'Something went wrong', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 