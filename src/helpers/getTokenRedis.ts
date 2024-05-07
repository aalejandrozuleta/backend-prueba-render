import { client } from "../config/redisConfig";

const getTokenFromRedis = async (id_user:string)=> {
  try {
    const userId = await client.get(id_user);
    return userId;
  } catch (error:any) {
    throw error;
  }
};

export default getTokenFromRedis;
