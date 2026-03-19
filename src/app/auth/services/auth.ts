import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import { jwtDecode } from 'jwt-decode';
import {
  LoginRequest, LoginResponse,
  ForgotPasswordRequest, ForgotPasswordResponse,
  ResetPasswordRequest, ResetPasswordResponse,
  RegisterRequest, RegisterResponse,
  VerifyEmailRequest, VerifyEmailResponse,
  ResendOtpRequest, ResendOtpResponse,
  TokenRefreshRequest, TokenRefreshResponse,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accessToken: string | null = null;

  private readonly REFRESH_KEY = 'r_tok';

  isLoggedIn = signal<boolean>(!!sessionStorage.getItem(this.REFRESH_KEY));

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.refreshAccessToken().subscribe({
        error: () => this.clearSession()
      });
    }
  }


  // ─── Get username from Token ─────────────────────────────────
  getUserFromToken() {
    const token = localStorage.getItem('access_token');

    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);

      return {
        username:
          decoded.first_name ||
          decoded.username ||
          decoded.email ||
          'User',
      };

    } catch (error) {
      return null;
    }
  }

  // ─── Register ─────────────────────────────────────────
  register(data: RegisterRequest): Observable<RegisterResponse> {

    return this.http.post<RegisterResponse>(API_ENDPOINTS.register, data);
  }

  // ─── Verify Email ──────────────────────────────────────
  verifyEmail(data: VerifyEmailRequest): Observable<VerifyEmailResponse> {
    return this.http.post<VerifyEmailResponse>(API_ENDPOINTS.verifyEmail, data);
  }

  // ─── Resend OTP ────────────────────────────────────────
  resendOtp(data: ResendOtpRequest): Observable<ResendOtpResponse> {
    return this.http.post<ResendOtpResponse>(API_ENDPOINTS.resendOtp, data);
  }

  // ─── Login ─────────────────────────────────────────────
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.login, data).pipe(
      tap((res) => {
        this.accessToken = res.access;

        localStorage.setItem('access_token', res.access); // هنا بس
        sessionStorage.setItem(this.REFRESH_KEY, res.refresh);

        this.isLoggedIn.set(true);
      })
    );
  }

  // ─── Refresh Access Token ──────────────────────────────
  refreshAccessToken(): Observable<TokenRefreshResponse> {
    const refresh = sessionStorage.getItem(this.REFRESH_KEY) ?? '';
    return this.http.post<TokenRefreshResponse>(
      API_ENDPOINTS.refreshToken, { refresh }
    ).pipe(
      tap((res) => {
        this.accessToken = res.access;
        localStorage.setItem('access_token', res.access);

        this.isLoggedIn.set(true);
      })
    );
  }

  // ─── Forgot Password ───────────────────────────────────
  forgotPassword(email: string): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      API_ENDPOINTS.forgotPassword, { email }
    );
  }

  // ─── Reset Password ────────────────────────────────────
  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      API_ENDPOINTS.resetPassword, data
    );
  }

  // ─── Logout ──────────────────────
  logout(): void {
    const refresh = sessionStorage.getItem(this.REFRESH_KEY) ?? '';
    this.http.post(API_ENDPOINTS.logout, { refresh }).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  // getToken(): string | null {
  //   return this.accessToken;
  // }

  getToken(): string | null {
    return this.accessToken || localStorage.getItem('access_token');
  }

  private clearSession(): void {
    this.accessToken = null;
    sessionStorage.removeItem(this.REFRESH_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }
}


