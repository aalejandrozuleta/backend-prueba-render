"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;
    if (!secret) {
        throw new Error('JWT secret key not found in environment variables.');
    }
    if (!expiresIn) {
        throw new Error('JWT expiration time not found in environment variables.');
    }
    return jsonwebtoken_1.default.sign({ id: userId }, secret, { expiresIn });
};
exports.generateToken = generateToken;
