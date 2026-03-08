import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('reCAPTCHA verification API called');
    
    const { token } = await request.json();
    console.log('reCAPTCHA token received:', token ? 'Valid token string' : 'Missing token');

    if (!token) {
      console.log('reCAPTCHA token is missing');
      return NextResponse.json(
        { success: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not defined in environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Calling Google reCAPTCHA verification API...');
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    const response = await fetch(verifyUrl, {
      method: 'POST',
    });

    const data = await response.json();
    console.log('reCAPTCHA verification response:', data);

    return NextResponse.json({
      success: data.success,
      message: data.success ? 'Verification successful' : 'Verification failed',
      score: data['score'], // For v3 reCAPTCHA
      hostname: data['hostname'], // For debugging domain issues
    });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
} 