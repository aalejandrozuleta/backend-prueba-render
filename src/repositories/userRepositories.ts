import db from "../config/mysqlConfig";

export default () => ({
  CreateUser: async (user: {
    name_user: string;
    lastName_user: string;
    country_user: string;
    phone_user: string;
    user_type: string;
    email_user: string;
    password_user: string;
  }) => {
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

    return db.query(query, values);
  },

  GetLockedUntil: async (user: { email_user: string }) => {
    const query = "CALL GetLockedUntil(?)";
    const values = [user.email_user];

    return db.query(query, values);
  },

  LockAccount: async (user: { email_user: string }) => {
    const query = "CALL LockAccount(?)";
    const values = [user.email_user];

    return db.query(query, values);
  },

  ResetLoginAttempts: async (user: { email_user: string }) => {
    const query = "CALL ResetLoginAttempts(?)";
    const values = [user.email_user];

    return db.query(query, values);
  },

  LoginUser: async (user: { email_user: string }) => {
    const query = "CALL LoginUser(?)";
    const values = [user.email_user];
    return db.query(query, values);
  },

  SearchUser: async (user: { email_user: string; phone_user: string }) => {
    const query = "CALL SearchUser(?,?)";
    const values = [user.email_user, user.phone_user];
    return db.query(query, values);
  },

  CreateToken: async (user: {
    id_user: number;
    code: string;
    expiration: Date;
  }) => {
    const query = "CALL CreateToken (?, ?, ?)";
    const values = [user.code, user.id_user, user.expiration];
    return db.query(query, values);
  },

  FindToken: async (user: { id_user: number; code: string }) => {
    const query = "CALL FindToken (?)";
    const values = [user.code];
    return db.query(query, values);
  },

  ForgetPassword: async (user: { id_user: number; password_user: string }) => {
    const query = "CALL ForgetPassword(?,?)";
    const values = [user.id_user, user.password_user];
    return db.query(query, values);
  },

  FindUserId: async (user: { id_user: number }) => {
    const query = "CALL FindUserById(?)";
    const values = [user];
    return db.query(query, values);
  },

  ChangePassword: async (user: { id_user: number; newPassword: string }) => {
    const query = "CALL ChangePassword (?,?)";
    const values = [user.id_user, user.newPassword];
    return db.query(query, values);
  },

  UpdateInformation: async (user: {
    id_user: string;
    name_user: string;
    lastName_user: string;
    country_user: string;
    phone_user: string;
    user_type: string;
  }) => {
    const query = "CALL EditUser(?,?,?,?,?,?)";
    const values = [
      user.id_user,
      user.name_user,
      user.lastName_user,
      user.country_user,
      user.phone_user,
      user.user_type,
    ];
    return db.query(query, values);
  },
});
