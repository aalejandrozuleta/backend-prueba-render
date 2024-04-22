import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import checkDatabaseConnection from "./dbHealthCheck";

// Cargar las variables de entorno desde .env
dotenv.config();

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

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
