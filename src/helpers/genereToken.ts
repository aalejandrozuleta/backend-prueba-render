import jwt from 'jsonwebtoken';

export const generateToken = (userId: string,email:string,user_type:string): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;
  
  if (!secret) {
    throw new Error('JWT secret key not found in environment variables.');
  }

  if (!expiresIn) {
    throw new Error('JWT expiration time not found in environment variables.');
  }

  return jwt.sign({ id: userId, email: email, typeUser:user_type }, secret, { expiresIn });
};
