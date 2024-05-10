import express, { Router } from "express";
const router: Router = express.Router();
//* -----------registerUser
import { registerUser } from "../controllers/userController/registerController";
import { userValidationRegister } from "../middlewares/validation/user/validateRegisterUser";

//* -----------loginUser
import { userValidationLogin } from "../middlewares/validation/user/validateLoginUser";
import { loginUser } from "../controllers/userController/loginController";

//* -----------validationUser
import { validationUser } from "../controllers/userController/validationUser";
import { userValidationValidation } from "../middlewares/validation/user/validateValidation";

//* -----------forgetPassword
import { forgetPassword } from "../controllers/userController/forgetPassword";
import { userForgetPassword } from "../middlewares/validation/user/validateForgetPassword";

//* -----------changePassword
import { changePassword } from "../controllers/userController/changePassword";
import { userChangePassword } from "../middlewares/validation/user/validateChangePassword";

//* -----------updateInformation
import { updateInformation } from "../controllers/userController/updateInformation";
import { userValidationUpdate } from "../middlewares/validation/user/validateUpdateUser";


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

router.post("/validationUser",userValidationValidation,validationUser);


/**
 * @route PUT / Forget Password
 * @description Olvidar contraseña
 * @access Público
 */

router.put("/forget-password",userForgetPassword,forgetPassword);

/**
 * @route PUT / changePassword
 * @description Cambiar la contraseña
 * @access Público
 */

router.put("/changePassword",userChangePassword,changePassword);

/**
 * @route PUT / updateInformation
 * @description Actualizar la informacion de la cuenta
 * @access Público
 */

router.put("/update-information",userValidationUpdate,updateInformation);

export default router;