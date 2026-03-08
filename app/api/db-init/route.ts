import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Check if we can connect to the database
    await prisma.$queryRaw`SELECT 1`;
    
    // Get the SQL script
    const sqlPath = path.join(process.cwd(), 'schema.sql');
    
    if (!fs.existsSync(sqlPath)) {
      return NextResponse.json({
        status: 'error',
        message: 'Schema file not found',
        path: sqlPath
      }, { status: 404 });
    }
    
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL script
    try {
      // Split the script into individual statements and execute them
      const statements = sql.split(';').filter(stmt => stmt.trim());
      
      for (const stmt of statements) {
        if (stmt.trim()) {
          await prisma.$executeRawUnsafe(stmt);
        }
      }
      
      return NextResponse.json({
        status: 'success',
        message: 'Database schema initialized successfully',
        statements: statements.length
      });
    } catch (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Failed to execute SQL script',
        error: error instanceof Error ? error.message : String(error),
        databaseUrl: process.env.DATABASE_URL ? 
          `${process.env.DATABASE_URL.split('@')[0].split('://')[0]}://*****@${process.env.DATABASE_URL.split('@')[1]}` : 
          'Not provided'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error),
      databaseUrl: process.env.DATABASE_URL ? 
        `${process.env.DATABASE_URL.split('@')[0].split('://')[0]}://*****@${process.env.DATABASE_URL.split('@')[1]}` : 
        'Not provided'
    }, { status: 500 });
  }
} 