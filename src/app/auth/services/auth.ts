import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, of, shareReplay, switchMap, map, catchError } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import { jwtDecode } from 'jwt-decode';
import { Student } from '../../models/user.models';
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
  currentUser = signal<Student | null>(null);

  readonly authReady$: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    if (this.isLoggedIn()) {
      this.authReady$ = this.refreshAccessToken().pipe(
        shareReplay(1)
      );
      this.authReady$.subscribe({
        error: () => this.clearSession()
      });
    } else {
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
        email: decoded.email || null
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
  login(data: LoginRequest): Observable<any> {
    return this.http.post<LoginResponse>(API_ENDPOINTS.login, data).pipe(

      tap((res) => {
        this.accessToken = res.data.access;
        sessionStorage.setItem(this.REFRESH_KEY, res.data.refresh);
        this.isLoggedIn.set(true);
      }),

      switchMap(() => this.fetchCurrentUser())
    );
  }

  // ─── Refresh Access Token ─────────────────────────────────────────────────
  refreshAccessToken(): Observable<any> {
    const refresh = sessionStorage.getItem(this.REFRESH_KEY) ?? '';
    return this.http.post<TokenRefreshResponse>(
      API_ENDPOINTS.refreshToken, { refresh }
    ).pipe(
      tap((res) => {
        this.accessToken = res.access;
        this.isLoggedIn.set(true);
      }),
      switchMap(() => this.fetchCurrentUser())
    );
  }

  // ─── Fetch Current User ───────────────────────────────────────────────────
  fetchCurrentUser(): Observable<Student | null> {
    const email = this.getUserFromToken()?.email;
    if (!email) return of(null);
    return this.http.get<any>(API_ENDPOINTS.students).pipe(
      map(res => {
        const students = Array.isArray(res) ? res : (res.results || []);
        return students.find((s: Student) => s.email === email) || null;
      }),
      tap(user => this.currentUser.set(user)),
      catchError(() => {
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
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
