"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTempCode = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateTempCode() {
    const code = crypto_1.default.randomBytes(3).toString('hex');
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 300); // 5 minutos después
    return { code, expiration };
}
exports.generateTempCode = generateTempCode;
