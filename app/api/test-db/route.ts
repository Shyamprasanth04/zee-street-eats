import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await testDatabaseConnection();
  
  if (result.connected) {
    return NextResponse.json({
      status: 'ok',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } else {
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: result.error,
      env: {
        // Show redacted version of environment variables to help debug
        dbUrlProvided: !!process.env.DATABASE_URL,
        dbUrlStart: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 10) + '...' : 'not provided',
        nodeEnv: process.env.NODE_ENV,
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 