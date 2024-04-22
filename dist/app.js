"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Assuming that these modules have default exports
const serverConfig_1 = __importDefault(require("./config/serverConfig"));
// Import routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
// Use routes
serverConfig_1.default.use('/api/users', userRoutes_1.default);
serverConfig_1.default.use('/api/products', productRoutes_1.default);
// Error handling
serverConfig_1.default.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});
