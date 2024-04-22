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
exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const userService_1 = __importDefault(require("../../services/user/userService"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { token } = yield (0, userService_1.default)().loginUser(userData);
        // Configuración de la cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });
        res.status(201).json({
            mensaje: "Usuario iniciado con éxito",
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.loginUser = loginUser;
