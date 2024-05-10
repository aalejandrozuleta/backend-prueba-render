import { registerUserDto } from "../../interface/user/registerUserDto";
import userRepositories from "../../repositories/userRepositories";
import passwordService from "./utils/passwordService";
import { EmailService } from "../../helpers/emailService";

const UserRepositories = userRepositories();
const PasswordService = passwordService();
const EmailServices = new EmailService();

const createUser = async (user: registerUserDto) => {
  // Hash de la contraseña antes de almacenarla en la base de datos
  const hashedPassword = await PasswordService.hashPassword(user.password_user);
  const newUser = { ...user, password_user: hashedPassword };
  // Crear el usuario en la base de datos
  const createdUser = await UserRepositories.CreateUser(newUser);
  // enviar correo de bienvenida
  await EmailServices.sendWelcomeEmail(user.email_user);

  return {
    createdUser,
  };
};

export default createUser;
