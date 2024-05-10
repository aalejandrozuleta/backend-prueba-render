import { client } from "../config/redisConfig";

export const deleteTokenFromRedis = async (iat:string) => {
  try {
    // Eliminar el token de la base de datos Redis
    await client.del(iat);
    console.log('Token eliminado de Redis:', iat);
  } catch (error: any) {
    console.error('Error al eliminar el token de Redis:', error.message);
    throw error;
  }
};
