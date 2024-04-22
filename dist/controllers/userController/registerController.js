"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const userService_1 = __importDefault(require("../../services/user/userService"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    try {
        yield (0, userService_1.default)().createUser(userData);
        res.status(200).json({
            message: "User created successfully",
        });
    }
    catch (error) {
        // Si ocurre un error, maneja diferentes tipos de errores
        if (error.code === "USER_ALREADY_EXISTS") {
            // Si el usuario ya existe, devuelve un mensaje de error específico
            res.status(400).json({ error: "User already exists" });
        }
        else if (error.code === "VALIDATION_ERROR") {
            // Si hay errores de validación, devuelve un mensaje de error con los detalles de la validación
            res.status(400).json({ error: error.message });
        }
        else {
            // Para otros errores, devuelve un mensaje genérico de error interno del servidor
            console.error("Error creating user:", error);
            res.status(500).send("Internal Server Error");
        }
    }
});
exports.registerUser = registerUser;
