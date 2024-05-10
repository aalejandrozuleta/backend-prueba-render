export interface updateInformationDto {
  id_user: string;
  name_user: string;
  lastName_user: string;
  country_user: string;
  phone_user: string;
  user_type:  'Usuario' | 'Comerciante';
}