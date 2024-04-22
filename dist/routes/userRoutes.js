"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//* -----------registerUser
const registerController_1 = require("../controllers/userController/registerController");
const validateRegisterUser_1 = require("../middlewares/user/validateRegisterUser");
//* -----------loginUser
const validateLoginUser_1 = require("../middlewares/user/validateLoginUser");
const loginController_1 = require("../controllers/userController/loginController");
//* -----------validationUser
const validationUser_1 = require("../controllers/userController/validationUser");
const validateForgetPassword_1 = require("../middlewares/user/validateForgetPassword");
//* -----------forgetPassword
const forgetPassword_1 = require("../controllers/userController/forgetPassword");
/**
 * @route POST /register
 * @description Registrar un nuevo usuario
 * @access Público
 */
router.post("/register", validateRegisterUser_1.userValidationRegister, registerController_1.registerUser);
/**
 * @route POST /login
 * @description Iniciar sesión
 * @access Público
 */
router.post("/login", validateLoginUser_1.userValidationLogin, loginController_1.loginUser);
/**
 * @route POST / validationUser
 * @description Olvidar contraseña
 * @access Público
 */
router.post("/validationUser", validateForgetPassword_1.userValidationForgetPassword, validationUser_1.validationUser);
/**
 * @route PUT / Forget Password
 * @description Olvidar contraseña
 * @access Público
 */
router.put("/forget-password", forgetPassword_1.forgetPassword);
exports.default = router;
