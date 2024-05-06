import jwt from 'jsonwebtoken';
const JWT_SECRET = 'bV2uQmx7eV9wRjJnZVZuM3hNcFh6ZlF3'; 

export function generateJWT(data: any): string {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '5m' });
}

