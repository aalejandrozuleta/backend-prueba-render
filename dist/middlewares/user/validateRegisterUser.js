"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userValidationRegister = void 0;
const express_validator_1 = require("express-validator");
const userValidationRegister = [
    (0, express_validator_1.body)("name_user")
        .notEmpty()
        .withMessage("El nombre del usuario es requerido")
        .isAlpha()
        .withMessage("El nombre del usuario solo debe contener letras")
        .isLength({ min: 4, max: 40 })
        .withMessage("El nombre del usuario debe tener como máximo 40 caracteres"),
    (0, express_validator_1.body)("lastName_user")
        .isLength({ min: 4, max: 40 })
        .withMessage("El apellido del usuario debe tener como máximo 40 caracteres"),
    (0, express_validator_1.body)("country_user")
        .isLength({ min: 5, max: 40 })
        .withMessage("El país del usuario debe tener como máximo 40 caracteres"),
    (0, express_validator_1.body)("phone_user")
        .notEmpty()
        .withMessage("El teléfono del usuario es requerido")
        .isNumeric()
        .withMessage("El teléfono del usuario solo debe contener números")
        .isLength({ max: 10 })
        .withMessage("El teléfono del usuario debe tener como máximo 10 dígitos"),
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
    (0, express_validator_1.body)("user_type")
        .optional()
        .isIn(["Usuario", "Comerciante"])
        .withMessage("El tipo de usuario debe ser 'Usuario' o 'Comerciante'"),
];
exports.userValidationRegister = userValidationRegister;
const validateUser = (date) => {
    console.log('funciono');
    console.log(date);
    const errors = (0, express_validator_1.validationResult)(date);
    console.log(errors);
    if (!errors.isEmpty()) {
        return errors.array();
    }
};
exports.validateUser = validateUser;
