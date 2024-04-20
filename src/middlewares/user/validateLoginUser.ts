import { body, validationResult, ValidationChain } from "express-validator";

const userValidationLogin: ValidationChain[] = [
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

export { userValidationLogin, validateUser };
