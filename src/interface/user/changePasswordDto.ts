export interface changePasswordDto {
  token:any;
  id_user: number;
  password_user: string;
  newPassword: string;
}