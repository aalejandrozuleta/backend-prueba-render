import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import checkDatabaseConnection from "./dbHealthCheck";
import cookieParser from 'cookie-parser';

// Cargar las variables de entorno desde .env
dotenv.config();

const app = express();

// Configuración de cookies
app.use(cookieParser());

// Habilitar CORS para todas las rutas
app.use(cors({
  origin: 'https://frontend-prueba-three.vercel.app', // Aquí va la URL de tu sitio web
  methods: ['GET', 'POST', 'PUT'], // Los métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Los encabezados permitidos
}));

// Habilitar el manejo de JSON
app.use(express.json());

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
