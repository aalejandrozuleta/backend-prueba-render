import db from "../config/bdConfig";

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

  GetLockedUntil: async (user:{email_user: string})=>{
    const query = "CALL GetLockedUntil(?)";
    const values = [user.email_user];

    return db.query(query, values);
  },

  LockAccount: async (user:{email_user: string})=>{
    const query = "CALL LockAccount(?)";
    const values = [user.email_user];

    return db.query(query, values);
  },

  ResetLoginAttempts: async (user:{email_user: string})=>{
    const query = "CALL ResetLoginAttempts(?)";
    const values = [user.email_user];

    return db.query(query, values);
  },

  LoginUser: async (user:{email_user: string}) =>{
    const query = "CALL LoginUser(?)";
    const values = [user.email_user];
    return db.query(query, values);
  }
});
