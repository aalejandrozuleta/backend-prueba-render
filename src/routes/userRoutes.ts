import express, { Router } from "express";
const router: Router = express.Router();
//* -----------registerUser
import { registerUser } from "../controllers/userController/registerController";
import { userValidationRegister } from "../middlewares/user/validateRegisterUser";

//* -----------loginUser
import { userValidationLogin } from "../middlewares/user/validateLoginUser";
import { loginUser } from "../controllers/userController/loginController";

/**
 * @route POST /register
 * @description Registrar un nuevo usuario
 * @access Público
 */
router.post("/register", userValidationRegister, registerUser);

/**
 * @route POST /login
 * @description Iniciar sesión
 * @access Público
 */

router.post("/login", userValidationLogin,loginUser);

export default router;
