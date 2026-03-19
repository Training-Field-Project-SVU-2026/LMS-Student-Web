import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, shareReplay } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import { jwtDecode } from 'jwt-decode';
import {
  LoginRequest, LoginResponse,
  ResetPasswordRequest, ResetPasswordResponse,
  RegisterRequest, RegisterResponse,
  VerifyEmailRequest, VerifyEmailResponse,
  ResendOtpRequest, ResendOtpResponse,
  TokenRefreshResponse,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accessToken: string | null = null;
  private readonly REFRESH_KEY = 'r_tok';

  isLoggedIn = signal<boolean>(!!sessionStorage.getItem(this.REFRESH_KEY));

  /**
   * ✅ KEY FIX: Shared observable that completes once the startup token
   * refresh finishes. Any component that needs an authenticated token
   * (e.g. Profile) should switchMap/concatMap off this before calling APIs.
   *
   * shareReplay(1) means:
   *  - The HTTP refresh is made only ONCE, regardless of how many components subscribe.
   *  - Late subscribers (components that mount after refresh is done) get the
   *    cached result immediately instead of waiting.
   */
  readonly authReady$: Observable<TokenRefreshResponse | null>;

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.authReady$ = this.refreshAccessToken().pipe(
        shareReplay(1)
      );
      // Subscribe once to handle session cleanup on failure.
      this.authReady$.subscribe({
        error: () => this.clearSession()
      });
    } else {
      // Not logged in — resolve immediately so components don't hang.
      this.authReady$ = of(null).pipe(shareReplay(1));
    }
  }

  // ─── Get user info from the current in-memory token ─────────────────────
  getUserFromToken() {
    const token = this.getToken();
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
    } catch {
      return null;
    }
  }

  // ─── Register ────────────────────────────────────────────────────────────
  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(API_ENDPOINTS.register, data);
  }

  // ─── Verify Email ─────────────────────────────────────────────────────────
  verifyEmail(data: VerifyEmailRequest): Observable<VerifyEmailResponse> {
    return this.http.post<VerifyEmailResponse>(API_ENDPOINTS.verifyEmail, data);
  }

  // ─── Resend OTP ───────────────────────────────────────────────────────────
  resendOtp(data: ResendOtpRequest): Observable<ResendOtpResponse> {
    return this.http.post<ResendOtpResponse>(API_ENDPOINTS.resendOtp, data);
  }

  // ─── Login ────────────────────────────────────────────────────────────────
  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.login, data).pipe(
      tap((res) => {
        this.accessToken = res.access;
        sessionStorage.setItem(this.REFRESH_KEY, res.refresh);
        this.isLoggedIn.set(true);
      })
    );
  }

  // ─── Refresh Access Token ─────────────────────────────────────────────────
  refreshAccessToken(): Observable<TokenRefreshResponse> {
    const refresh = sessionStorage.getItem(this.REFRESH_KEY) ?? '';
    return this.http.post<TokenRefreshResponse>(
      API_ENDPOINTS.refreshToken, { refresh }
    ).pipe(
      tap((res) => {
        this.accessToken = res.access;
        this.isLoggedIn.set(true);
      })
    );
  }

  // ─── Forgot Password ──────────────────────────────────────────────────────
  forgotPassword(email: string): Observable<any> {
    return this.http.post(API_ENDPOINTS.forgotPassword, { email });
  }

  // ─── Reset Password ───────────────────────────────────────────────────────
  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      API_ENDPOINTS.resetPassword, data
    );
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  logout(): void {
    const refresh = sessionStorage.getItem(this.REFRESH_KEY) ?? '';
    this.http.post(API_ENDPOINTS.logout, { refresh }).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession(),
    });
  }

  getToken(): string | null {
    return this.accessToken;
  }

  private clearSession(): void {
    this.accessToken = null;
    sessionStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem('access_token'); // clear any legacy token
    this.isLoggedIn.set(false);
    this.router.navigate(['/auth/login']);
  }
}