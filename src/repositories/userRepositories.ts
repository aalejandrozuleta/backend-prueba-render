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
    console.log(user);
    
    return db.query(query, values);
  },
});
