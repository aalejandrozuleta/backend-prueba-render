import express, { Router } from "express";
const router: Router = express.Router();
import { jwtAuthMiddleware } from "../middlewares/logic/jwtAuth";

//* -----------registerUser
import { registerUserController } from "../controllers/userController/registerController";
import { userValidationRegister } from "../middlewares/validation/user/validateRegisterUser";

//* -----------loginUserController
import { userValidationLogin } from "../middlewares/validation/user/validateLoginUser";
import { loginUserController } from "../controllers/userController/loginController";

//* -----------validationUser
import { validationUserController } from "../controllers/userController/validationUser";
import { userValidationValidation } from "../middlewares/validation/user/validateValidation";

//* -----------forgetPassword
import { forgetPasswordController } from "../controllers/userController/forgetPassword";
import { userForgetPassword } from "../middlewares/validation/user/validateForgetPassword";

//* -----------changePassword
import { changePasswordController } from "../controllers/userController/changePassword";
import { userChangePassword } from "../middlewares/validation/user/validateChangePassword";


/**
 * @route POST /register
 * @description Registrar un nuevo usuario
 * @access Público
 */
router.post("/register", userValidationRegister, registerUserController);

/**
 * @route POST /login
 * @description Iniciar sesión
 * @access Público
 */

router.post("/login", userValidationLogin,loginUserController);

/**
 * @route POST / validationUser
 * @description Olvidar contraseña
 * @access Público
 */

router.post("/validationUser",userValidationValidation,validationUserController);


/**
 * @route PUT / Forget Password
 * @description Olvidar contraseña
 * @access Público
 */

router.put("/forget-password",userForgetPassword,forgetPasswordController);

/**
 * @route PUT / changePassword
 * @description Cambiar la contraseña
 * @access Público
 */

router.put("/changePassword",jwtAuthMiddleware,userChangePassword,changePasswordController);

export default router;
