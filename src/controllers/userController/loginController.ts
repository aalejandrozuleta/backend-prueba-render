import { validationResult } from "express-validator";
import { loginUserDto } from "../../interface/user/loginUserDto";
import { Request, Response } from "express";
import { saveTokenToRedis } from "../../helpers/saveTokenRedis";
import { loginUser } from "../../services/user/loginUser";

export const loginUserController = async (req: Request, res: Response) => {
  const userData: loginUserDto = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { token } = await loginUser(userData);
    
    // Guarda el token en Redis utilizando el iat como clave
    await saveTokenToRedis(token);
    res.status(201).json({
      mensaje: "Usuario iniciado con éxito",
      toke: token
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};