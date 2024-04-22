"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidationForgetPassword = void 0;
const express_validator_1 = require("express-validator");
const userValidationForgetPassword = [
    (0, express_validator_1.body)("email_user")
        .notEmpty()
        .withMessage("El correo electrónico del usuario es requerido")
        .isEmail()
        .withMessage("El correo electrónico no es válido")
        .isLength({ min: 10, max: 60 })
        .withMessage("El correo electrónico debe tener como máximo 60 caracteres"),
    (0, express_validator_1.body)("phone_user")
        .notEmpty()
        .withMessage("El teléfono del usuario es requerido")
        .isNumeric()
        .withMessage("El teléfono del usuario solo debe contener números")
        .isLength({ max: 10 })
        .withMessage("El teléfono del usuario debe tener como máximo 10 dígitos"),
];
exports.userValidationForgetPassword = userValidationForgetPassword;
const validateUser = (date) => {
    const errors = (0, express_validator_1.validationResult)(date);
    if (!errors.isEmpty()) {
        return errors.array();
    }
};
exports.validateUser = validateUser;
