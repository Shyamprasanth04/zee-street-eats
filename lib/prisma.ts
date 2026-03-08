import { PrismaClient } from '@prisma/client'

// Add better error handling for connection issues
const prismaClientSingleton = () => {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
      errorFormat: 'pretty',
    })
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error)
    // Return a minimal client that will throw clear errors when used
    return new PrismaClient({
      log: ['error', 'warn'],
      errorFormat: 'pretty',
    })
  }
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = global as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helpful function to test database connection
export async function testDatabaseConnection() {
  try {
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, error: null }
  } catch (error) {
    console.error('Database connection test failed:', error)
    return { 
      connected: false, 
      error: error instanceof Error ? error.message : String(error)  
    }
  }
} 