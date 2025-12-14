export default interface User {
  id?: number;
  username?: string; 
  name?: string;
  email?: string;
  profile_photo_url?: string | null; 
  bio?: string | null; 
  total_points?: number;
  is_verified?: boolean;
  verification_type?: "register" | "passwordReset" | null;
  sub?: string | null;
};

