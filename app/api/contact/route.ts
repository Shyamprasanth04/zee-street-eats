import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store the contact message in the database
    // Note: This assumes you have a ContactMessage model in your Prisma schema
    // If not, you'll need to add it or modify this to fit your database structure
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          subject,
          message,
          status: 'NEW'
        }
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // If there's a database error but it's just that the model doesn't exist,
      // we'll still return success to the user but log the issue
      console.log('Contact message received (not stored in DB):', { name, email, subject });
    }

    // In a real application, you would also want to send an email notification here
    // For example, using nodemailer or a service like SendGrid
    
    // Example (commented out as it requires setup):
    /*
    await sendEmail({
      to: 'info@zeesstreeteats.com',
      subject: `New Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    */

    // Return a success response
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 