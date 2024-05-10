import { client } from "../config/redisConfig";

const getTokenFromRedis = async (iat: string) => {
  try {
    const token = await client.get(String(iat));
    return token;
  } catch (error: any) {
    throw error;
  }
};

export default getTokenFromRedis;