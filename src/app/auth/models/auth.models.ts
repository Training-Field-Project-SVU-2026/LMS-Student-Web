export interface RegisterRequest {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  student: {
    first_name: string
    last_name: string
    email: string
    role: string
    slug: string
    is_active: boolean
    is_verified: boolean
  }
}

export interface VerifyEmailRequest {
  otp: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  access: string
  refresh: string
  user: {
    first_name: string
    last_name: string
    email: string
    role: string
    slug: string
  }
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  otp: string
  new_password: string
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

export interface LogoutRequest {
  refresh: string
}