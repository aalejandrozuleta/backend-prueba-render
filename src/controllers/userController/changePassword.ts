import { changePasswordDto } from "../../interface/user/changePasswordDto";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import userService from "../../services/user/userService";
import getTokenFromRedis from "../../helpers/getTokenRedis";


export const changePassword = async (req: Request, res: Response) => {
  const userData: changePasswordDto = req.body;
  const token = req.cookies.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const isToken = await getTokenFromRedis(token);
  
  try {
    if (!isToken) {
      // Manejar el caso donde el token no se encuentra en Redis
      return res.status(401).json({ error: 'Token no encontrado en Redis' });
    }

    await userService().changePassword(userData, isToken);
    res.status(200).json({
      mensaje: "Contraseña cambiada con éxito",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
