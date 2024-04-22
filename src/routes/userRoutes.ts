import express, { Router } from "express";
const router: Router = express.Router();
//* -----------registerUser
import { registerUser } from "../controllers/userController/registerController";
import { userValidationRegister } from "../middlewares/user/validateRegisterUser";

//* -----------loginUser
import { userValidationLogin } from "../middlewares/user/validateLoginUser";
import { loginUser } from "../controllers/userController/loginController";

//* -----------validationUser
import { validationUser } from "../controllers/userController/validationUser";
import { userValidationForgetPassword } from "../middlewares/user/validateForgetPassword";

//* -----------forgetPassword
import { forgetPassword } from "../controllers/userController/forgetPassword";


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

/**
 * @route POST / validationUser
 * @description Olvidar contraseña
 * @access Público
 */

router.post("/validationUser",userValidationForgetPassword,validationUser);


/**
 * @route PUT / Forget Password
 * @description Olvidar contraseña
 * @access Público
 */

router.put("/forget-password",forgetPassword);

export default router;
