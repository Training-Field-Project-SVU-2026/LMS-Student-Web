
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  old_password: string;
  new_password: string;
}

export interface LogoutRequest {
  refresh: string;
}

export interface LogoutResponse {
  refresh: string;
}

export interface Student {
  first_name:  string;   // "Public"
  last_name:   string;   // "Account"
  email:       string;   // "abdallahalqiran76@gmail.com"
  slug:        string;   // "public-3872f200"
  is_verified: boolean;  // true
  image:       string | null; 
}

export interface StudentUpdateRequest {
  first_name: string;
  last_name:  string;
}