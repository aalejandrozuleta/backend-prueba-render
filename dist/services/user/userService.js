"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//* Importamos los repositorios de usuario y los servicios necesarios
const userRepositories_1 = __importDefault(require("../../repositories/userRepositories"));
const passwordService_1 = __importDefault(require("./microService/passwordService"));
const lockService_1 = require("./microService/lockService");
const emailService_1 = require("./microService/emailService");
const generateTempCode_1 = require("./microService/generateTempCode");
const authService_1 = require("./microService/authService");
// Definimos los mensajes de error como constantes
const ERROR_MESSAGES = {
    AUTHENTICATION: "Error de autenticación. Por favor, intente de nuevo.",
    CREDENTIALS: "AuthenticationError: Credenciales incorrectas",
    ACCOUNT_LOCKED: "AccountLockedError: La cuenta está bloqueada temporalmente. Intente nuevamente más tarde.",
    INCORRECT_CODE: "AuthenticationError: Código incorrecto",
    INTERNAL_ERROR: "Error interno en el servidor",
};
exports.default = () => {
    const UserRepositories = (0, userRepositories_1.default)();
    const PasswordService = (0, passwordService_1.default)();
    const EmailServices = new emailService_1.EmailService();
    return {
        // Función para crear un nuevo usuario
        createUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
            // Hash de la contraseña antes de almacenarla en la base de datos
            const hashedPassword = yield PasswordService.hashPassword(user.password_user);
            const newUser = Object.assign(Object.assign({}, user), { password_user: hashedPassword });
            // Crear el usuario en la base de datos
            const createdUser = yield UserRepositories.CreateUser(newUser);
            // enviar correo de bienvenida
            yield EmailServices.sendWelcomeEmail(user.email_user);
            return {
                createdUser,
            };
        }),
        // Función para autenticar a un usuario y generar un token de acceso
        loginUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Check account lock before calling the user repository
                if (yield (0, lockService_1.isAccountLocked)(user)) {
                    throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
                }
                const [results] = yield UserRepositories.LoginUser(user);
                const rows = results[0];
                if (!rows.length) {
                    // Si no se encuentra ningún usuario, lanzar un error de autenticación
                    throw new Error(ERROR_MESSAGES.CREDENTIALS);
                }
                const dbUser = rows[0];
                // Handle incorrect password
                if (!(yield PasswordService.comparePassword(user.password_user, dbUser.password_user))) {
                    // Call handleIncorrectPassword to handle incorrect password attempts
                    yield (0, lockService_1.handleIncorrectPassword)(user);
                    // After handling incorrect password, check again if the account is locked
                    if (yield (0, lockService_1.isAccountLocked)(user)) {
                        throw new Error(ERROR_MESSAGES.ACCOUNT_LOCKED);
                    }
                }
                yield UserRepositories.ResetLoginAttempts({
                    email_user: user.email_user,
                });
                // Generar un token de acceso para el usuario autenticado
                const token = (0, authService_1.generateToken)(dbUser.id_user);
                return { user: dbUser, token };
            }
            catch (error) {
                throw error;
            }
        }),
        searchUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!user) {
                    throw new Error("El usuario no puede ser nulo");
                }
                const [results] = yield UserRepositories.SearchUser(user);
                const rows = results[0];
                const dbUser = rows[0];
                if (!rows.length) {
                    throw new Error(ERROR_MESSAGES.CREDENTIALS);
                }
                // Generar código temporal y actualizar usuario
                const { code, expiration } = (0, generateTempCode_1.generateTempCode)();
                if (!code || !expiration) {
                    throw new Error("Error al generar el código temporal");
                }
                user.code = code;
                user.expiration = expiration;
                const newUser = Object.assign(Object.assign({}, user), { id_user: dbUser.id_user });
                const tokenCreationResult = yield UserRepositories.CreateToken(newUser);
                if (!tokenCreationResult) {
                    throw new Error("Error al crear el token para el usuario");
                }
                // Enviar correo electrónico con el código de recuperación
                yield EmailServices.sendCodeForgetPassword(newUser.email_user, newUser.code);
                // Retorna un objeto con el id y el código
                return { id: newUser.id_user, newUser: user.code };
            }
            catch (error) {
                throw new Error(`Error buscando usuario: ${ERROR_MESSAGES.AUTHENTICATION}`);
            }
        }),
        forgetPassword: (user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Buscar el token en la base de datos
                const [results] = yield UserRepositories.FindToken(user);
                // Verificar si se encontró un token válido
                const rows = results[0];
                if (!rows.length) {
                    // Si no se encuentra ningún token, lanzar un error de código incorrecto
                    throw new Error(ERROR_MESSAGES.INCORRECT_CODE);
                }
                // Obtener el usuario correspondiente al token
                const dbUser = rows[0];
                // Hashear la nueva contraseña
                const hashedPassword = yield PasswordService.hashPassword(user.password_user);
                // Crear un nuevo objeto de usuario con la contraseña hasheada y el ID del usuario
                const newUser = Object.assign(Object.assign({}, user), { password_user: hashedPassword, id_user: dbUser.id_user });
                // Actualizar la contraseña del usuario
                yield UserRepositories.ForgetPassword(newUser);
                // Retornar el objeto del usuario actualizado
                return newUser;
            }
            catch (error) {
                throw error;
            }
        }),
    };
};
