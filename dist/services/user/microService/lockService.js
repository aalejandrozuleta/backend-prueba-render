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
exports.handleIncorrectPassword = exports.isAccountLocked = void 0;
// Importamos los repositorios de usuario
const userRepositories_1 = __importDefault(require("../../../repositories/userRepositories"));
const UserRepositories = (0, userRepositories_1.default)();
// Función para obtener la fecha hasta la cual la cuenta está bloqueada
const getLockedUntil = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const recordFail = yield UserRepositories.GetLockedUntil({
        email_user: user.email_user,
    });
    if (recordFail &&
        recordFail.length > 0 &&
        recordFail[0][0][0] &&
        recordFail[0][0][0].locked_until) {
        return new Date(recordFail[0][0][0].locked_until);
    }
    return null;
});
// Función para verificar si la cuenta del usuario está bloqueada
const isAccountLocked = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lockedUntil = yield getLockedUntil(user);
        // Verificamos si la cuenta sigue bloqueada
        return lockedUntil ? new Date() < lockedUntil : false;
    }
    catch (error) {
        // En caso de error, lo registramos y lo lanzamos
        console.error("Error al revisar el bloqueo:", error);
        throw error;
    }
});
exports.isAccountLocked = isAccountLocked;
// Función para manejar intentos de contraseña incorrecta
const handleIncorrectPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Bloqueamos la cuenta del usuario
        yield UserRepositories.LockAccount({ email_user: user.email_user });
        // Verificamos si la cuenta está bloqueada
        const isLocked = yield (0, exports.isAccountLocked)({ email_user: user.email_user });
        // Si la cuenta está bloqueada
        if (isLocked) {
            yield getLockedUntil(user);
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
    }
    catch (error) {
        // En caso de error, lo registramos y lo lanzamos
        console.error("Error al manejar la contraseña incorrecta:", error);
        throw error;
    }
});
exports.handleIncorrectPassword = handleIncorrectPassword;
