//* Importamos los repositorios de usuario y los servicios necesarios
import userRepositories from "../../repositories/userRepositories";
import passwordService from "./utils/passwordService";
import { EmailService } from "../../helpers/emailService";
import { changePasswordDto } from "../../interface/user/changePasswordDto";

const UserRepositories = userRepositories();
const PasswordService = passwordService();
const EmailServices = new EmailService();

export const changePassword = async (user: changePasswordDto) => {
  const idUser = user.token.id;
  const emailUser = user.token.email;

  try {
    const [results]: any = await UserRepositories.FindUserId(idUser);
    const dbUser = results[0][0];

    if (
      !(await PasswordService.comparePassword(
        user.password_user,
        dbUser.password_user
      ))
    ) {
      throw new Error("La contraseña actual es incorrecta.");
    }

    // Comprueba si la nueva contraseña es igual a la contraseña actual antes de hashearla
    if (user.newPassword === user.password_user) {
      throw new Error(
        "La nueva contraseña no debe ser igual a la contraseña actual."
      );
    }

    const newPasswordHash = await PasswordService.hashPassword(
      user.newPassword
    );

    const newUser = { id_user: idUser, newPassword: newPasswordHash };

    await UserRepositories.ChangePassword(newUser);

    await EmailServices.sendChangePassword(emailUser);

    return { message: "Contraseña actualizada con éxito." };
  } catch (error: any) {
    throw error;
  }
};
