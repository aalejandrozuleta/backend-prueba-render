import { body, validationResult, ValidationChain } from "express-validator";

const createCompanyValidation: ValidationChain[] = [
  body("company_name")
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido")
    .isLength({ min: 4 })
    .withMessage("El nombre de la empresa debe tener al menos 4 caracteres")
    .isLength({ max: 40 })
    .withMessage("El nombre de la empresa debe tener como máximo 40 caracteres"),
  
  body("company_description")
   .notEmpty()
   .withMessage("La descripción de la empresa es requerida")
   .isLength({ min: 20 })
   .withMessage("La descripción de la empresa debe tener al menos 20 caracteres")
   .isLength({ max: 200 })
   .withMessage("La descripción de la empresa debe tener como máximo 200 caracteres"),
  body("company_address")
   .notEmpty()
   .withMessage("La dirección de la empresa es requerida")
   .isLength({ min: 5 })
   .withMessage("La dirección de la empresa debe tener al menos 5 caracteres")
   .isLength({ max: 250 })
   .withMessage("La dirección de la empresa debe tener como máximo 250 caracteres"),
    body("company_phone")
     .notEmpty()
     .withMessage("El número de teléfono de la empresa es requerido")
     .isNumeric()
     .withMessage("El número de teléfono de la empresa solo debe contener números")
     .isLength({min: 10, max: 10})
     .withMessage("El número de teléfono de la empresa debe tener 10 dígitos"),
];

const validateUser = (date: any) => {
  const errors = validationResult(date);

  if (!errors.isEmpty()) {
    return errors.array();
  }
};

export { createCompanyValidation, validateUser };