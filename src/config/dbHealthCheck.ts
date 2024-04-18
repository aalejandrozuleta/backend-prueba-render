import pool from './bdConfig';

const checkDatabaseConnection = async () => {
  try {
    console.log('Intentando conectar a la base de datos...');
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa.');
    connection.release();
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;  // Re-lanza el error para manejo adicional si es necesario
  }
};

export default checkDatabaseConnection;
