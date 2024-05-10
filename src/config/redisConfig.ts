import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config();


const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 14351,
    }
});

const checkRedisConnection = async () => {
    try {
      await client.connect();
      console.log("Conexión a la base de datos Redis exitosa.");
    } catch (error) {
      console.error('Error al conectar con Redis:', error);
    }
  };
export {client,checkRedisConnection};
