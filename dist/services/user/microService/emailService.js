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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const OAuth2 = googleapis_1.google.auth.OAuth2;
class EmailService {
    constructor() {
        this.oauth2Client = new OAuth2('379288522865-gm4t610m5cio5tod19rkpb1g4fk8f9rm.apps.googleusercontent.com', // ID de cliente
        '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', // secreto de cliente
        'https://developers.google.com/oauthplayground' // URL de redirección
        );
        this.oauth2Client.setCredentials({
            refresh_token: '1//04_prYk8lPkTzCgYIARAAGAQSNgF-L9IrL_TwU32HBxnNACx6HXghnnhldagKRvhgaCeuPL_vfNubkTXqZpeYBs_ZMeMyamGeJQ' // Tu token de actualización
        });
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'gdgagues@gmail.com', // Reemplaza con tu correo electrónico
                clientId: '379288522865-gm4t610m5cio5tod19rkpb1g4fk8f9rm.apps.googleusercontent.com', // ID de cliente
                clientSecret: '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', // secreto de cliente
                refreshToken: '1//04_prYk8lPkTzCgYIARAAGAQSNgF-L9IrL_TwU32HBxnNACx6HXghnnhldagKRvhgaCeuPL_vfNubkTXqZpeYBs_ZMeMyamGeJQ', // Tu token de actualización
                accessToken: this.oauth2Client.getAccessToken()
            }
        });
    }
    sendWelcomeEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: 'gdgagues@gmail.com',
                to: userEmail,
                subject: 'Bienvenido a nuestra página web', // Asunto del correo
                text: 'Gracias por registrarte en nuestra página web. ¡Esperamos que disfrutes de tu estancia!' // Cuerpo del correo
            };
            try {
                const info = yield this.transporter.sendMail(mailOptions);
                console.log('Email enviado: ' + info.response);
            }
            catch (error) {
                console.error('Hubo un error al enviar el correo electrónico: ', error);
            }
        });
    }
    sendCodeForgetPassword(userEmail, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: 'gdgagues@gmail.com',
                to: userEmail,
                subject: 'Código de recuperación de contraseña', // Asunto del correo
                text: `Hemos detectado que deseas cambiar la contraseña de tu cuenta, Coloca este código código ${code}`
            };
            try {
                const info = yield this.transporter.sendMail(mailOptions);
                console.log('Email enviado: ' + info.response);
            }
            catch (error) {
                console.error('Hubo un error al enviar el correo electrónico: ', error);
            }
        });
    }
}
exports.EmailService = EmailService;
