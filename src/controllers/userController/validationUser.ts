import { validateUserDto } from "../../interface/user/validateUserDto";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { searchUser } from "../../services/user/searchUser";

export const validationUserController = async (req: Request, res: Response) => {
  const userData: validateUserDto = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    await searchUser(userData);
    res.status(201).json({
      mensaje: "Correo enviado con éxito",
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
