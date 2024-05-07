import { client } from "../config/redisConfig";

const saveTokenToRedis = async (userId: string, token: string) => {
  try {
    // Asegurar tipos de cadena para las claves
    const stringUserId = userId.toString();
    const stringToken = token.toString();

    // Asegurar tiempo de expiración numérico
    const expirationSeconds = parseInt('3600'); 

    const result = await client.set(stringUserId, stringToken, { EX: expirationSeconds });

    if (!result) {
      throw new Error('Error guardando token en Redis');
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error; // Re-lanzar el error para el controlador
  }
};

export default saveTokenToRedis;
