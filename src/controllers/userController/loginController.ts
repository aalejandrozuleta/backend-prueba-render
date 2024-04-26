import { validationResult } from "express-validator";
import userService from "../../services/user/userService";
import { loginUserDto } from "../../interface/user/loginUserDto";
import { Request, Response } from "express";

export const loginUser = async (req: Request, res: Response) => {
  const userData: loginUserDto = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { token } = await userService().loginUser(userData);
    // Configuración de la cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    });
    res.status(201).json({
      mensaje: "Usuario iniciado con éxito",
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
