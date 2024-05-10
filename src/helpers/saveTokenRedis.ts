import jwt from 'jsonwebtoken';
import { client } from "../config/redisConfig";

export const saveTokenToRedis = async (token: string) => {
  try {
    const decodedToken:any = jwt.decode(token, { complete: true });
    if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken['payload']['iat']) {
      throw new Error('Invalid token');
    }

    const iat = decodedToken['payload']['iat'];
    const stringToken = token.toString();
    const expirationSeconds = parseInt(process.env.REDIS_EXPIRATION_SECONDS || '3600');

    const result = await client.set(String(iat), stringToken, { EX: expirationSeconds });

    if (!result) {
      throw new Error('Error guardando token en Redis');
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error; // Re-lanzar el error para el controlador
  }
};