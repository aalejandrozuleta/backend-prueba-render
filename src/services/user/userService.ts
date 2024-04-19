import { registerUserDto } from './../../dto/user/registerUserDto';
import userRepositories from "../../repositories/userRepositories"
import passwordService from './microService/passwordService';
import emailService from './microService/emailService';


export default () => {
  const UserRepositories = userRepositories();
  const PasswordService = passwordService();
  const EmailService = emailService();

  return {
    createUser: async (user:registerUserDto) => {
      const hashedPassword = await PasswordService.hashPassword(user.password_user);
      const hashedEmail = await EmailService.hashEmail(user.email_user);
      const newUser = { ...user,email_user:hashedEmail,password_user: hashedPassword };
      const createdUser = await UserRepositories.CreateUser(newUser);
      return {
        createdUser
      }
    }
  }
}