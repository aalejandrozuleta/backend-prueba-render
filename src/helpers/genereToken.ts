import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId: string, email: string, user_type: string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error('JWT secret key not found in environment variables.');
  }

  if (!expiresIn) {
    throw new Error('JWT expiration time not found in environment variables.');
  }

  // No es necesario incluir el iat manualmente, jwt.sign lo añadirá automáticamente
  return jwt.sign({ id: userId, email: email, typeUser: user_type }, secret, { expiresIn });
};