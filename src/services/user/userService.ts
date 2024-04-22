//* Importamos los repositorios de usuario y los servicios necesarios
import userRepositories from "../../repositories/userRepositories";
import passwordService from "./microService/passwordService";
import {
  handleIncorrectPassword,
  isAccountLocked,
} from "./microService/lockService";
import { EmailService } from "./microService/emailService";
import { generateTempCode } from "./microService/generateTempCode";
import { generateToken } from "./microService/authService";

//* DTO
import { registerUserDto } from "./../../dto/user/registerUserDto";
import { loginUserDto } from "./../../dto/user/loginUserDto";
import { validateUserDto } from "../../dto/user/validateUserDto";
import { forgetPasswordDto } from "./../../dto/user/forgetPasswordDto";

// Definimos los mensajes de error como constantes
const ERROR_MESSAGES = {
  AUTHENTICATION: "Error de autenticación. Por favor, intente de nuevo.",
  CREDENTIALS: "AuthenticationError: Credenciales incorrectas",
  ACCOUNT_LOCKED:
    "AccountLockedError: La cuenta está bloqueada temporalmente. Intente nuevamente más tarde.",
  INCORRECT_CODE: "AuthenticationError: Código incorrecto",
  INTERNAL_ERROR: "Error interno en el servidor",
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
        throw error;
      }
    },

    searchUser: async (user: validateUserDto) => {
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
    },

    forgetPassword: async (user: forgetPasswordDto) => {
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
        const hashedPassword = await PasswordService.hashPassword(user.password_user);
    
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
    },
    
  };
};
