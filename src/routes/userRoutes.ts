import express, { Router } from 'express';
const router: Router = express.Router();
//* -----------registerUser
import { registerUser } from '../controllers/userController/registerController';
import { userValidationRules } from '../middlewares/user/validateRegisterUser';

/**
 * @route POST /register
 * @description Registrar un nuevo usuario
 * @access Público
 */
router.post('/register',userValidationRules, registerUser);


export default router;