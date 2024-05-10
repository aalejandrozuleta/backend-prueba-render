import { forgetPasswordDto } from "../../interface/user/forgetPasswordDto";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { forgetPassword } from "../../services/user/forgetPassword";

export const forgetPasswordController = async (req: Request, res: Response) => {
  const userDataForget: forgetPasswordDto = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await forgetPassword(userDataForget);
    res.status(201).json({
      mensaje: "Contraseña restablecida con éxito",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};