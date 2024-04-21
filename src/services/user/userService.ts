// Importamos los repositorios de usuario y los servicios necesarios
import userRepositories from "../../repositories/userRepositories";
import passwordService from "./microService/passwordService";
import {
  handleIncorrectPassword,
  isAccountLocked,
} from "./microService/lockService";
import { generateToken } from "./microService/authService";
import { registerUserDto } from "./../../dto/user/registerUserDto";
import { loginUserDto } from "./../../dto/user/loginUserDto";
import { EmailService } from "./microService/emailService";


// Definimos los mensajes de error como constantes
const ERROR_MESSAGES = {
  AUTHENTICATION: "Error de autenticación. Por favor, intente de nuevo.",
  CREDENTIALS: "AuthenticationError: Credenciales incorrectas",
  ACCOUNT_LOCKED:
    "AccountLockedError: La cuenta está bloqueada temporalmente. Intente nuevamente más tarde.",
};

export default () => {
  const UserRepositories = userRepositories();
  const PasswordService = passwordService();
  const EmailServices = new EmailService();

  return {
    // Función para crear un nuevo usuario
    createUser: async (user: registerUserDto) => {
      // Hash de la contraseña antes de almacenarla en la base de datos
      const hashedPassword = await PasswordService.hashPassword(
        user.password_user
      );
      const newUser = { ...user, password_user: hashedPassword };
      // Crear el usuario en la base de datos
      const createdUser = await UserRepositories.CreateUser(newUser);
      // enviar correo de bienvenida
      await EmailServices.sendWelcomeEmail(user.email_user);

      return {
        createdUser,
      };
    },

    // Función para autenticar a un usuario y generar un token de acceso
    loginUser: async (user: loginUserDto) => {
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
        const token = generateToken(dbUser.id_user);
        return { user: dbUser, token };
      } catch (error: any) {
        throw  error;
      }
    },
  };
};
