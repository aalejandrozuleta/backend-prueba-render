import { client } from "../config/redisConfig";

export const deleteTokenFromRedis = async (token: string) => {
  try {
    // Eliminar el token de la base de datos Redis
    await client.del(token);
    console.log('Token eliminado de Redis:', token);
  } catch (error: any) {
    console.error('Error al eliminar el token de Redis:', error.message);
    throw error;
  }
};
