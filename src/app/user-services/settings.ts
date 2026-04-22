import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Student,
  StudentUpdateRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '../models/user.models';
import { API_ENDPOINTS } from '../core/api-endpoints';
import { AuthService } from '../auth/services/auth';

interface ApiResponse<T> {
  success: boolean;
  status:  number;
  message: string;
  data:    T;
}

@Injectable({ providedIn: 'root' })
export class Settings {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // ─── GET /students/:slug/ ─────────────────────────────────────────────────
  getProfile(slug: string): Observable<Student> {
    return this.http.get<ApiResponse<Student>>(API_ENDPOINTS.studentBySlug(slug)).pipe(
      map(res => res.data ?? (res as any))
    );
  }

  // ─── PUT /students/:slug/ ─────────────────────────────────────────────────
  updateProfile(slug: string, data: StudentUpdateRequest): Observable<Student> {
    return this.http.put<ApiResponse<Student>>(API_ENDPOINTS.studentBySlug(slug), data).pipe(
      map(res => (res && res.data) ? res.data : (res as any))
    );
  }


  // ─── POST /auth/change-password/ ─────────────────────────────────────────
  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(API_ENDPOINTS.changePassword, data);
  }

  logout(): void {
    this.auth.logout();
  }
}