// changePassword
import { changePassword } from "./../../services/user/changePassword";
import { changePasswordDto } from "../../interface/user/changePasswordDto";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { deleteTokenFromRedis } from "../../helpers/deleteTokenFromRedis";

export const changePasswordController = async (req: Request, res: Response) => {
  const userData: changePasswordDto = req.body;
  userData.token = req.body.token;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const iat = userData.token.iat.toString();

  try {
    await changePassword(userData);
    res.status(200).json({
      mensaje: "Contraseña cambiada con éxito",
    });

    // Borrar el token de la base de datos después de un cambio exitoso de contraseña
    await deleteTokenFromRedis(iat);
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
