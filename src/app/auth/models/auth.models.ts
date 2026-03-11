
export interface RegisterRequest {
  first_name: string;
  last_name:  string;
  email:      string;
  password:   string;
}

export interface RegisterResponse {
  message: string;
 
}

// ── Verify Email ---->OTP after register─────────
export interface VerifyEmailRequest {
  email: string;
  otp:   string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  message: string;
}
export interface LoginRequest {
  email:    string;
  password: string;
}

export interface LoginResponse {
email:string;
password:string;
access:string;
refresh:string;
}

export interface LogoutRequest {
  refresh: string;
}

export interface LogoutResponse {
  Refresh : string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  otp:string;   
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  refresh: string;
  access: string;
}
// user--->Settings
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}
export interface ChangePasswordResponse {
  message: string;
}
