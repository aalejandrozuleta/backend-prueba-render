import bcrypt from "bcrypt";

export default () => ({
  hashPassword: (password: string) => {
    return bcrypt.hash(password, 10);
  },

  comparePassword: (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
  },
});