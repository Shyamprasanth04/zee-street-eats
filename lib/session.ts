import { cookies } from 'next/headers';
import { generateJWT, verifyJWT } from './auth';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const createSession = async (userId: string) => {
  const token = generateJWT({ userId, timestamp: Date.now() });
  
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  return token;
};

export const validateSession = async () => {
  const session = cookies().get('session');
  if (!session) return null;

  try {
    const decoded = verifyJWT(session.value);
    if (!decoded) return null;

    const { userId, timestamp } = decoded;
    const now = Date.now();

    // Check if session has expired
    if (now - timestamp > SESSION_DURATION) {
      await destroySession();
      return null;
    }

    // Check for inactivity timeout
    if (now - timestamp > INACTIVITY_TIMEOUT) {
      await destroySession();
      return null;
    }

    // Update session timestamp
    await createSession(userId);
    return userId;
  } catch (error) {
    await destroySession();
    return null;
  }
};

export const destroySession = async () => {
  cookies().delete('session');
};

export const getSessionUser = async () => {
  const userId = await validateSession();
  if (!userId) return null;

  // Fetch user from database
  const { prisma } = await import('./prisma');
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
  });
}; 