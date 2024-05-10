//* Importamos los repositorios de usuario y los servicios necesarios
import userRepositories from "../../repositories/userRepositories";
import passwordService from "./utils/passwordService";
import { handleIncorrectPassword, isAccountLocked } from "./utils/lockService";
import { generateToken } from "../../helpers/genereToken";
import { loginUserDto } from "../../interface/user/loginUserDto";
import { ERROR_MESSAGES } from "./errorMessage";

const UserRepositories = userRepositories();
const PasswordService = passwordService();

export const loginUser = async (user: loginUserDto) => {
  try {
    // Check account lock before calling the user repository
    if (await isAccountLocked(user)) {
      throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
    }
    const [results]: any = await UserRepositories.LoginUser(user);
    const rows = results[0];
    if (!rows.length) {
      // Si no se encuentra ningún usuario, lanzar un error de autenticación
      throw new Error(ERROR_MESSAGES.CREDENTIALS);
    }
    const dbUser = rows[0];
    // Handle incorrect password
    if (
      !(await PasswordService.comparePassword(
        user.password_user,
        dbUser.password_user
      ))
    ) {
      // Call handleIncorrectPassword to handle incorrect password attempts
      await handleIncorrectPassword(user);
      // After handling incorrect password, check again if the account is locked
      if (await isAccountLocked(user)) {
        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
      }
    }
    await UserRepositories.ResetLoginAttempts({
      email_user: user.email_user,
    });
    // Generar un token de acceso para el usuario autenticado
    const token = generateToken(
      dbUser.id_user,
      user.email_user,
      dbUser.user_type
    );
    return { user: dbUser, token };
  } catch (error: any) {
    throw error;
  }
};
