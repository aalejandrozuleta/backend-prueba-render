import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import checkDatabaseConnection from "./dbHealthCheck";
import cookieParser from 'cookie-parser';
import helmet from "helmet";


// Cargar las variables de entorno desde .env
dotenv.config();

const app = express();

// Configuración de cookies
app.use(cookieParser());

// Habilitar CORS para todas las rutas
app.use(cors({
  origin: true,
  credentials: true,
}));

// Habilitar el manejo de JSON
app.use(express.json());

// Habilitar helmet
app.use(helmet());

// Deshabilitar a¿las huellas digitales
app.disable('x-powered-by')


checkDatabaseConnection()
  .then(() => {
    const PORT: string | number = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "No se pudo iniciar el servidor debido a un error en la base de datos:",
      error
    );
  });
export default app;
