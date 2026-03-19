import { environment } from '../../environments/environment';

const BASE_URL = environment.baseUrl;

export const API_ENDPOINTS = {

  // ── Auth ──────────────────────────────────────────────────────────────────
  login:          `${BASE_URL}api/auth/login/`,
  register:       `${BASE_URL}api/auth/register/`,
  logout:         `${BASE_URL}api/auth/logout/`,
  verifyEmail:    `${BASE_URL}api/auth/verify-email/`,
  forgotPassword: `${BASE_URL}api/auth/forgot-password/`,
  changePassword: `${BASE_URL}api/auth/change-password/`,
  resetPassword:  `${BASE_URL}api/auth/reset-password/`,
  resendOtp:      `${BASE_URL}api/auth/resend-otp/`,
  refreshToken:   `${BASE_URL}api/auth/token/refresh/`,

  // ── Students ──────────────────────────────────────────────────────────────
 
  students:       `${BASE_URL}api/students/`,
  studentBySlug:  (slug: string) => `${BASE_URL}api/students/${slug}/`,

};