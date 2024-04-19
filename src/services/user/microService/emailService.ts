import bcrypt from "bcrypt";

export default () => ({
  hashEmail: (email: string) => {
    return bcrypt.hash(email, 10);
  },

  compareEmail: (email: string, hash: string) => {
    return bcrypt.compare(email, hash);
  },
});