import { validationResult } from "express-validator";
import { registerUserDto } from "../../interface/user/registerUserDto";
import { Request, Response } from "express";
import  createUser  from "../../services/user/createUser";

export const registerUserController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData: registerUserDto = req.body;

  try {
    await createUser(userData);
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error: any) {
    // Si ocurre un error, maneja diferentes tipos de errores
    if (error.code === "USER_ALREADY_EXISTS") {
      // Si el usuario ya existe, devuelve un mensaje de error específico
      res.status(400).json({ error: "User already exists" });
    } else if (error.code === "VALIDATION_ERROR") {
      // Si hay errores de validación, devuelve un mensaje de error con los detalles de la validación
      res.status(400).json({ error: error.message });
    } else {
      // Para otros errores, devuelve un mensaje genérico de error interno del servidor
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
};
