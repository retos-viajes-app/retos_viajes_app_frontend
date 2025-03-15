export default interface User  {
  id?: number ;
  username: string; // Debe tener entre 3 y 20 caracteres
  email: string; // Email válido
  profile_photo_url?: string; // Puede ser una URL o estar ausente
  bio?: string ; // Máximo 150 caracteres
  total_points: number; // Por defecto es 0
  is_verified: boolean;
  verification_type?: "register" | "passwordReset" ;
  sub?: string;
  name?: string ;
};