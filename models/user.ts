export default interface User  {
  id?: number ;
  username?: string;
  email: string; 
  profile_photo_url?: string; 
  bio?: string ;
  total_points?: number; 
  is_verified: boolean;
  verification_type?: "register" | "passwordReset" ;
  sub?: string;
  name?: string ;
};