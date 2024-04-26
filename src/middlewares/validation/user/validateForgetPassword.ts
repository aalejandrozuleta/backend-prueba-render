import { body, validationResult, ValidationChain } from "express-validator";

const userForgetPassword: ValidationChain[] = [
  body("code")
    .notEmpty()
    .withMessage("El código de seguridad es requerido")
    .isLength({ min: 6, max: 6 })
    .withMessage("El código es de 6 caracteres"),

  body("password_user")
    .notEmpty()
    .withMessage("La contraseña del usuario es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .isLength({ max: 100 })
    .withMessage("La contraseña debe tener como máximo 100 caracteres")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),
];

const validateUser = (date: any) => {
  const errors = validationResult(date);

  if (!errors.isEmpty()) {
    return errors.array();
  }
};

export { userForgetPassword, validateUser };
