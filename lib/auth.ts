import { randomBytes } from 'crypto';
import { sign, verify } from 'jsonwebtoken';

export const generateToken = (): string => {
  return randomBytes(32).toString('hex');
};

export const generateJWT = (payload: any): string => {
  return sign(payload, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '1d',
  });
};

export const verifyJWT = (token: string): any => {
  try {
    return verify(token, process.env.JWT_SECRET || 'your-secret-key');
  } catch (error) {
    return null;
  }
};

export const generateCSRFToken = (): string => {
  return randomBytes(32).toString('hex');
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hashedPassword);
}; 