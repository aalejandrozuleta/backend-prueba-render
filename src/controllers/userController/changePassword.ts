import { changePasswordDto } from './../../dto/user/changePasswordDto';
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import userService from "../../services/user/userService";

export const changePassword = async (req: Request, res: Response) => {
  const userData: changePasswordDto = req.body;
  const token = req.cookies.jwt;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await userService().changePassword(userData,token);
    res.status(200).json({
      mensaje: "Contraseña cambiada con éxito", 
    });
  } catch (error:any) {
    res.status(500).json({
      error: error.message,
    });
  }
}