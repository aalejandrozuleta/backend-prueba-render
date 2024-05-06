import { client } from "../config/redisConfig";

const verifyTokenInRedis = async (userId: string, token: string): Promise<boolean> => {
  const storedToken = await client.get(userId);
  return token === storedToken;
};

export default verifyTokenInRedis;