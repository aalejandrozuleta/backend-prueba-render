export interface registerUserDto {
  name_user: string;
  lastName_user: string;
  country_user: string;
  phone_user: string;
  email_user: string;
  password_user: string;
  user_type:  'Usuario' | 'Comerciante';
}
