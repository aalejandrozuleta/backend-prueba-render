import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

const userValidationRules: ValidationChain[] = [
  body("name_user")
    .notEmpty()
    .withMessage("El nombre del usuario es requerido")
    .isAlpha()
    .withMessage("El nombre del usuario solo debe contener letras")
    .isLength({ min: 4, max: 40 })
    .withMessage("El nombre del usuario debe tener como máximo 40 caracteres"),

  body("lastName_user")
    .isLength({ min: 4, max: 40 })
    .withMessage(
      "El apellido del usuario debe tener como máximo 40 caracteres"
    ),

  body("country_user")
    .isLength({ min: 5, max: 40 })
    .withMessage("El país del usuario debe tener como máximo 40 caracteres"),

  body("phone_user")
    .notEmpty()
    .withMessage("El teléfono del usuario es requerido")
    .isNumeric()
    .withMessage("El teléfono del usuario solo debe contener números")
    .isLength({ max: 10 })
    .withMessage("El teléfono del usuario debe tener como máximo 10 dígitos"),

  body("email_user")
    .notEmpty()
    .withMessage("El correo electrónico del usuario es requerido")
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .isLength({ min:10, max: 60 })
    .withMessage("El correo electrónico debe tener como máximo 60 caracteres"),

  body("password_user")
    .notEmpty()
    .withMessage("La contraseña del usuario es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .isLength({ max: 100 })
    .withMessage("La contraseña debe tener como máximo 100 caracteres")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),

  body("user_type")
    .optional()
    .isIn(["Usuario", "Comerciante"])
    .withMessage("El tipo de usuario debe ser 'Usuario' o 'Comerciante'"),
];

const validateUser = (date:any) => {
  console.log('funciono');
  console.log(date);
  
  
  const errors = validationResult(date);
  console.log(errors);
  
  if (!errors.isEmpty()) {
    return errors.array();
  }
};

export { userValidationRules, validateUser };
