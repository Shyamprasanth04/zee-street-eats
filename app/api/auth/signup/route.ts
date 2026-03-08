import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import { verifyCsrf } from '@/lib/csrf'
import { sign } from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    console.log('Starting signup process...')
    
    // Verify CSRF token
    if (!verifyCsrf(req)) {
      console.log('CSRF verification failed')
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    const body = await req.json()
    console.log('Received signup data:', { ...body, password: '[REDACTED]' })

    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password })
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    console.log('Checking for existing user...')
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('User already exists')
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    console.log('Hashing password...')
    const hashedPassword = await hash(password, 12)

    // Generate verification token
    const verificationToken = crypto.randomUUID()
    console.log('Generated verification token')

    // Create user with verification token
    console.log('Creating user...')
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifyToken: verificationToken,
        isVerified: false,
      },
    })
    console.log('User created successfully')

    try {
      // Send verification email
      console.log('Sending verification email...')
      await sendVerificationEmail(email, verificationToken)
      console.log('Verification email sent')
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError)
      // Continue even if email fails
    }

    // Create response
    const response = NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )

    // Set session cookie
    const token = sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error('Detailed signup error:', error)
    // Log the full error object
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
      console.error('Error message:', error.message)
    }
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
} 