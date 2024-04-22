import { forgetPasswordDto } from "../../dto/user/forgetPasswordDto";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import userService from "../../services/user/userService";

export const forgetPassword = async (req: Request, res: Response) => {
  const userDataForget: forgetPasswordDto = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    await userService().forgetPassword(userDataForget);
    res.status(201).json({
      mensaje: "Contraseña restablecida con éxito", 
    });
  } catch (error:any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
