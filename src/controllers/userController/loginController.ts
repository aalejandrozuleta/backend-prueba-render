import { validationResult } from "express-validator";
import userService from "../../services/user/userService";
import { loginUserDto } from "../../interface/user/loginUserDto";
import { Request, Response } from "express";
import saveTokenToRedis from "../../helpers/saveTokenRedis";

export const loginUser = async (req: Request, res: Response) => {
  const userData: loginUserDto = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { user,token } = await userService().loginUser(userData);
    
    await saveTokenToRedis(user.id_user, token);
    res.status(201).json({
      mensaje: "Usuario iniciado con éxito",
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error guardando token de sesión' });
  }
};
