import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export class EmailService {
  private transporter: nodemailer.Transporter;
  private oauth2Client: any;

  constructor() {
    this.oauth2Client = new OAuth2(
      '379288522865-gm4t610m5cio5tod19rkpb1g4fk8f9rm.apps.googleusercontent.com', // ID de cliente
      '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', // secreto de cliente
      'https://developers.google.com/oauthplayground' // URL de redirección
    );

    this.oauth2Client.setCredentials({
      refresh_token: '1//04_prYk8lPkTzCgYIARAAGAQSNgF-L9IrL_TwU32HBxnNACx6HXghnnhldagKRvhgaCeuPL_vfNubkTXqZpeYBs_ZMeMyamGeJQ' // Tu token de actualización
    });

    this.transporter = nodemailer.createTransport({
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

  async sendWelcomeEmail(userEmail: string) {
    const mailOptions = {
      from: 'gdgagues@gmail.com', 
      to: userEmail, 
      subject: 'Bienvenido a nuestra página web', // Asunto del correo
      text: 'Gracias por registrarte en nuestra página web. ¡Esperamos que disfrutes de tu estancia!' // Cuerpo del correo
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: ' + info.response);
    } catch (error) {
      console.error('Hubo un error al enviar el correo electrónico: ', error);
    }
  }

  async sendCodeForgetPassword(userEmail:string,code:string) {
    const mailOptions = {
      from: 'gdgagues@gmail.com', 
      to: userEmail, 
      subject: 'Código de recuperación de contraseña', // Asunto del correo
      text: `Hemos detectado que deseas cambiar la contraseña de tu cuenta, Coloca este código código ${code}` 
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: ' + info.response);
    } catch (error) {
      console.error('Hubo un error al enviar el correo electrónico: ', error);
    }
  }

  async sendChangePassword(userEmail:string) {
    const mailOptions = {
      from: 'gdgagues@gmail.com', 
      to: userEmail, 
      subject: 'Cambio de contraseña', // Asunto del correo
      text: `El cambio de contraseña a sido exitoso` 
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: ' + info.response);
    } catch (error) {
      console.error('Hubo un error al enviar el correo electrónico: ', error);
    }
  }

  async sendWelcomeCompany (companyEmail: string) {
    const mailOptions = {
      from: 'gdgagues@gmail.com', 
      to: companyEmail, 
      subject: 'Empresa creada', // Asunto del correo
      text: `Se ah creado la empresa con éxito, felicitaciones` 
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email enviado: ' + info.response);
    } catch (error) {
      console.error('Hubo un error al enviar el correo electrónico: ', error);
    }
  }
}