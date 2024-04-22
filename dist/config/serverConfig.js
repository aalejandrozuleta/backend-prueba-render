"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbHealthCheck_1 = __importDefault(require("./dbHealthCheck"));
// Cargar las variables de entorno desde .env
dotenv_1.default.config();
const app = (0, express_1.default)();
// Habilitar CORS para todas las rutas
app.use((0, cors_1.default)());
// Habilitar el manejo de JSON
app.use(express_1.default.json());
(0, dbHealthCheck_1.default)()
    .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch((error) => {
    console.error("No se pudo iniciar el servidor debido a un error en la base de datos:", error);
});
exports.default = app;
