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
const bdConfig_1 = __importDefault(require("../config/bdConfig"));
exports.default = () => ({
    CreateUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL CreateUser(?, ?, ?, ?, ?, ?, ?)";
        const values = [
            user.name_user,
            user.lastName_user,
            user.country_user,
            user.phone_user,
            user.email_user,
            user.password_user,
            user.user_type,
        ];
        return bdConfig_1.default.query(query, values);
    }),
    GetLockedUntil: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL GetLockedUntil(?)";
        const values = [user.email_user];
        return bdConfig_1.default.query(query, values);
    }),
    LockAccount: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL LockAccount(?)";
        const values = [user.email_user];
        return bdConfig_1.default.query(query, values);
    }),
    ResetLoginAttempts: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL ResetLoginAttempts(?)";
        const values = [user.email_user];
        return bdConfig_1.default.query(query, values);
    }),
    LoginUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL LoginUser(?)";
        const values = [user.email_user];
        return bdConfig_1.default.query(query, values);
    }),
    SearchUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL SearchUser(?,?)";
        const values = [user.email_user, user.phone_user];
        return bdConfig_1.default.query(query, values);
    }),
    CreateToken: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL CreateToken (?, ?, ?)";
        const values = [user.code, user.id_user, user.expiration];
        return bdConfig_1.default.query(query, values);
    }),
    FindToken: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL FindToken (?)";
        const values = [user.code];
        return bdConfig_1.default.query(query, values);
    }),
    ForgetPassword: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const query = "CALL ForgetPassword(?,?)";
        const values = [user.id_user, user.password_user];
        return bdConfig_1.default.query(query, values);
    }),
});
