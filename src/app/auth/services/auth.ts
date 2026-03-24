import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, shareReplay, switchMap, catchError, map } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import { Student } from '../../models/user.models';
import {
  LoginRequest, LoginResponse,
  ResetPasswordRequest, ResetPasswordResponse,
  RegisterRequest, RegisterResponse,
  VerifyEmailRequest, VerifyEmailResponse,
  ResendOtpRequest, ResendOtpResponse,
  TokenRefreshResponse,
} from '../models/auth.models';

// Shape the backend always returns: { success, status, message, data: T }
interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private accessToken: string | null = null;
  private readonly REFRESH_KEY = 'refresh_token';
  private readonly SLUG_KEY = 'user_slug';

  isLoggedIn = signal<boolean>(!!localStorage.getItem(this.REFRESH_KEY));
  currentUser = signal<Student | null>(null);

  readonly authReady$: Observable<Student | null>;

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.authReady$ = this.refreshAccessToken().pipe(
        switchMap(() => this.fetchCurrentUser()),
        catchError((err) => {
          console.warn('[Auth] Boot init failed', err);
          return of(null);
        }),
        shareReplay(1)
      );
      this.authReady$.subscribe();
    } else {
      this.authReady$ = of(null).pipe(shareReplay(1));
    }
  }

  // ─── Register ─────────────────────────────────────────────────────────────
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
  login(data: LoginRequest): Observable<Student | null> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.login, data).pipe(
      tap((res) => {
        this.accessToken = res.data.access;
        localStorage.setItem(this.REFRESH_KEY, res.data.refresh);
        localStorage.setItem(this.SLUG_KEY, res.data.user.slug);
        this.isLoggedIn.set(true);
      }),
      switchMap(() => this.fetchCurrentUser())
    );
  }

  // ─── Refresh Access Token ─────────────────────────────────────────────────
  refreshAccessToken(): Observable<TokenRefreshResponse> {
    const refresh = localStorage.getItem(this.REFRESH_KEY) ?? '';
    return this.http.post<TokenRefreshResponse>(
      API_ENDPOINTS.refreshToken, { refresh }
    ).pipe(
      tap((res) => {
        this.accessToken = res.access;
        this.isLoggedIn.set(true);
      })
    );
  }

  // ─── Fetch Current User ───────────────────────────────────────────────────
  // Backend returns: { success, status, message, data: Student }
  // We unwrap .data and set the signal
  fetchCurrentUser(): Observable<Student | null> {
    const slug = localStorage.getItem(this.SLUG_KEY);
    if (!slug) {
      console.warn('[Auth] No slug in localStorage');
      return of(null);
    }

    return this.http.get<ApiResponse<Student>>(API_ENDPOINTS.studentBySlug(slug)).pipe(
      map(res => {
        // Handle both wrapped { data: Student } and plain Student (safety net)
        const user: Student = (res as any)?.data ?? res;
        console.log('[Auth] currentUser set to:', user);
        this.currentUser.set(user);
        return user;
      }),
      catchError((err) => {
        console.error('[Auth] fetchCurrentUser failed:', err);
        this.currentUser.set(null);
        return of(null);
      })
    );
  }

  // ─── Forgot Password ──────────────────────────────────────────────────────
  forgotPassword(email: string): Observable<any> {
    return this.http.post(API_ENDPOINTS.forgotPassword, { email });
  }

  // ─── Reset Password ───────────────────────────────────────────────────────
  resetPassword(data: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(API_ENDPOINTS.resetPassword, data);
  }

  // ─── Logout ───────────────────────────────────────────────────────────────
  logout(): void {
    const refresh = localStorage.getItem(this.REFRESH_KEY) ?? '';
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
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.SLUG_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/home']);
  }
}