import { body, validationResult, ValidationChain } from "express-validator";

const userValidationValidation: ValidationChain[] = [
  body("email_user")
    .notEmpty()
    .withMessage("El correo electrónico del usuario es requerido")
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .isLength({ min: 10, max: 60 })
    .withMessage("El correo electrónico debe tener como máximo 60 caracteres"),

  body("phone_user")
    .notEmpty()
    .withMessage("El teléfono del usuario es requerido")
    .isNumeric()
    .withMessage("El teléfono del usuario solo debe contener números")
    .isLength({ max: 10 })
    .withMessage("El teléfono del usuario debe tener como máximo 10 dígitos"),
];

const validateUser = (date: any) => {
  const errors = validationResult(date);

  if (!errors.isEmpty()) {
    return errors.array();
  }
};

export { userValidationValidation, validateUser };
