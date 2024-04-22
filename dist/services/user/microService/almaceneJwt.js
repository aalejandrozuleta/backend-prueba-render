"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'bV2uQmx7eV9wRjJnZVZuM3hNcFh6ZlF3';
function generateJWT(data) {
    return jsonwebtoken_1.default.sign(data, JWT_SECRET, { expiresIn: '5m' });
}
exports.generateJWT = generateJWT;
