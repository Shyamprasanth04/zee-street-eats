import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventId, vendorId, items, specialInstructions, pickupTime } = body;

    // Validate required fields
    if (!name || !email || !phone || !eventId || !vendorId || !pickupTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the pre-order
    const preOrder = await prisma.preOrder.create({
      data: {
        name,
        email,
        phone,
        eventId,
        vendorId,
        items: items || [],
        specialInstructions: specialInstructions || '',
        pickupTime: new Date(pickupTime),
        status: 'PENDING'
      }
    });

    return NextResponse.json({ success: true, preOrder });
  } catch (error) {
    console.error('Pre-order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create pre-order' },
      { status: 500 }
    );
  }
} 