//* Importamos los repositorios de usuario y los servicios necesarios
import { validateUserDto } from "./../../interface/user/validateUserDto";
import userRepositories from "../../repositories/userRepositories";1
import { EmailService } from "../../helpers/emailService";
import { generateTempCode } from "../../helpers/generateTempCode";
import { ERROR_MESSAGES } from "./errorMessage";

const UserRepositories = userRepositories();
const EmailServices = new EmailService();

export const searchUser = async (user: validateUserDto) => {
  try {
    if (!user) {
      throw new Error("El usuario no puede ser nulo");
    }

    const [results]: any = await UserRepositories.SearchUser(user);
    const rows = results[0];
    const dbUser = rows[0];

    if (!rows.length) {
      throw new Error(ERROR_MESSAGES.CREDENTIALS);
    }

    // Generar código temporal y actualizar usuario
    const { code, expiration } = generateTempCode();
    if (!code || !expiration) {
      throw new Error("Error al generar el código temporal");
    }

    user.code = code;
    user.expiration = expiration;

    const newUser = { ...user, id_user: dbUser.id_user };

    const tokenCreationResult = await UserRepositories.CreateToken(newUser);
    if (!tokenCreationResult) {
      throw new Error("Error al crear el token para el usuario");
    }

    // Enviar correo electrónico con el código de recuperación
    await EmailServices.sendCodeForgetPassword(
      newUser.email_user,
      newUser.code
    );

    // Retorna un objeto con el id y el código
    return { id: newUser.id_user, newUser: user.code };
  } catch (error: any) {
    throw new Error(`Error buscando usuario: ${ERROR_MESSAGES.AUTHENTICATION}`);
  }
};
