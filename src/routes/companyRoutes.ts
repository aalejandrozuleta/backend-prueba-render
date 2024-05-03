import express, { Router } from "express";
const router: Router = express.Router();
//* --------- validation
import { createCompanyValidation } from "../middlewares/validation/company/validateCreateCompany";
//* --------- Controller
import { createCompany } from "../controllers/company/createCompany";

/**
 * @route POST / CreateCompany
 * @description Crea una nueva empresa
 * @access Privado / Comerciantes
 */

router.post("/createCompany", createCompanyValidation, createCompany);

export default router;
