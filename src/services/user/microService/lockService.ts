// Importamos los repositorios de usuario
import userRepositories from "../../../repositories/userRepositories";
const UserRepositories = userRepositories();

// Función para obtener la fecha hasta la cual la cuenta está bloqueada
const getLockedUntil = async (user: { email_user: string }) => {
  const recordFail: any = await UserRepositories.GetLockedUntil({
    email_user: user.email_user,
  });
  if (
    recordFail &&
    recordFail.length > 0 &&
    recordFail[0][0][0] &&
    recordFail[0][0][0].locked_until
  ) {
    return new Date(recordFail[0][0][0].locked_until);
  }
  return null;
};

// Función para verificar si la cuenta del usuario está bloqueada
export const isAccountLocked = async (user: { email_user: string }) => {
  try {
    const lockedUntil = await getLockedUntil(user);
    // Verificamos si la cuenta sigue bloqueada
    return lockedUntil ? new Date() < lockedUntil : false;
  } catch (error: any) {
    // En caso de error, lo registramos y lo lanzamos
    console.error("Error al revisar el bloqueo:", error);
    throw error;
  }
};

// Función para manejar intentos de contraseña incorrecta
export const handleIncorrectPassword = async (user: { email_user: string }) => {
  try {
    // Bloqueamos la cuenta del usuario
    await UserRepositories.LockAccount({ email_user: user.email_user });
    // Verificamos si la cuenta está bloqueada
    const isLocked = await isAccountLocked({ email_user: user.email_user });

    // Si la cuenta está bloqueada
    if (isLocked) {
      await getLockedUntil(user);
      return {
        code: "AccountLockedError",
        message: "La cuenta está bloqueada temporalmente.",
      };
    }
    // Si la contraseña es incorrecta
    throw {
      code: "AuthenticationError",
      message: "Contraseña incorrecta",
    };
  } catch (error: any) {
    // En caso de error, lo registramos y lo lanzamos
    console.error("Error al manejar la contraseña incorrecta:", error);
    throw error;
  }
};
