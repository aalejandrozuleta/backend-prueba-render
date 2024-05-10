import { updateInformationDto } from './../../interface/user/updateInformationDto';
import userService from "../../services/user/userService";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import getTokenFromRedis from '../../helpers/getTokenRedis';

export const updateInformation = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const token = req.cookies.userId;
  const userData: updateInformationDto = req.body;
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const isToken = await getTokenFromRedis(token);
    
    if (!isToken) {
      // Manejar el caso donde el token no se encuentra en Redis
      return res.status(401).json({ error: "Token no disponible" });
    }

    await userService().updateInformation(userData, isToken);

    res.status(200).json({ message: "Información actualizada exitosamente" });
  } catch (error:any) {
    res.status(500).json({
      error: error.message,
    });
  }
}



