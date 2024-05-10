//* Importamos los repositorios de usuario y los servicios necesarios
import userRepositories from "../../repositories/userRepositories";
import passwordService from "./utils/passwordService";
import { forgetPasswordDto } from "../../interface/user/forgetPasswordDto";
import { ERROR_MESSAGES } from "./errorMessage";

const UserRepositories = userRepositories();
const PasswordService = passwordService();

export const forgetPassword = async (user: forgetPasswordDto) => {
  try {
    // Buscar el token en la base de datos
    const [results]: any = await UserRepositories.FindToken(user);

    // Verificar si se encontró un token válido
    const rows = results[0];

    if (!rows.length) {
      // Si no se encuentra ningún token, lanzar un error de código incorrecto
      throw new Error(ERROR_MESSAGES.INCORRECT_CODE);
    }

    // Obtener el usuario correspondiente al token
    const dbUser = rows[0];

    // Hashear la nueva contraseña
    const hashedPassword = await PasswordService.hashPassword(
      user.password_user
    );

    // Crear un nuevo objeto de usuario con la contraseña hasheada y el ID del usuario
    const newUser = {
      ...user,
      password_user: hashedPassword,
      id_user: dbUser.id_user,
    };

    // Actualizar la contraseña del usuario
    await UserRepositories.ForgetPassword(newUser);

    // Retornar el objeto del usuario actualizado
    return newUser;
  } catch (error: any) {
    throw error;
  }
}