"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidationLogin = void 0;
const express_validator_1 = require("express-validator");
const userValidationLogin = [
    (0, express_validator_1.body)("email_user")
        .notEmpty()
        .withMessage("El correo electrónico del usuario es requerido")
        .isEmail()
        .withMessage("El correo electrónico no es válido")
        .isLength({ min: 10, max: 60 })
        .withMessage("El correo electrónico debe tener como máximo 60 caracteres"),
    (0, express_validator_1.body)("password_user")
        .notEmpty()
        .withMessage("La contraseña del usuario es requerida")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
        .isLength({ max: 100 })
        .withMessage("La contraseña debe tener como máximo 100 caracteres")
        .matches(/\d/)
        .withMessage("La contraseña debe contener al menos un número"),
];
exports.userValidationLogin = userValidationLogin;
const validateUser = (date) => {
    const errors = (0, express_validator_1.validationResult)(date);
    if (!errors.isEmpty()) {
        return errors.array();
    }
};
exports.validateUser = validateUser;
