
export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;

}

// ── Verify Email ---->OTP after register─────────
export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface VerifyEmailResponse {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  message: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    access: string;
    refresh: string;
    user: {
      first_name: string;
      last_name: string;
      email: string;
      role: string;
      slug: string;
    };
  };
}



export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  otp: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  otp: string;
  new_password: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  refresh: string;
  access: string;
}
