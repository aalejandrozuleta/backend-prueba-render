import pool from "./mysqlConfig";
import {checkRedisConnection} from "./redisConfig"; // Importa el cliente Redis

const checkDatabaseConnection = async () => {
  try {
    console.log("Intentando conectar a la base de datos MySQL...");
    const mysqlConnection = await pool.getConnection();
    console.log("Conexión a la base de datos MySQL exitosa.");
    mysqlConnection.release();

    console.log("Intentando conectar a Redis...");
    // Verifica si el cliente Redis está conectado

    await checkRedisConnection();
    
  } catch (error) {
    console.error("Error al conectar:", error);
    throw error; // Re-lanza el error para manejo adicional si es necesario
  }
};

export default checkDatabaseConnection;
