import { body, validationResult, ValidationChain } from "express-validator";

const userChangePassword: ValidationChain[] = [
  body("password_user")
    .notEmpty()
    .withMessage("La contraseña del usuario es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .isLength({ max: 100 })
    .withMessage("La contraseña debe tener como máximo 100 caracteres")
    .matches(/\d/)
    .withMessage("La contraseña debe contener al menos un número"),
    body("newPassword")
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

export { userChangePassword, validateUser };
