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
exports.forgetPassword = void 0;
const express_validator_1 = require("express-validator");
const userService_1 = __importDefault(require("../../services/user/userService"));
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDataForget = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        yield (0, userService_1.default)().forgetPassword(userDataForget);
        res.status(201).json({
            mensaje: "Contraseña restablecida con éxito",
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
exports.forgetPassword = forgetPassword;
