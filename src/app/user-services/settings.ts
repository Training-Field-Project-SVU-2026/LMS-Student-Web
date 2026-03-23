import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Student,
  StudentUpdateRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LogoutRequest,
  LogoutResponse,
} from '../models/user.models';
import { API_ENDPOINTS } from '../core/api-endpoints';
import { AuthService } from '../auth/services/auth';

@Injectable({ providedIn: 'root' })
export class Settings {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getProfile(slug: string): Observable<Student> {
    return this.http.get<Student>(API_ENDPOINTS.studentBySlug(slug));
  }

  updateProfile(slug: string, data: StudentUpdateRequest): Observable<Student> {
    return this.http.put<Student>(API_ENDPOINTS.studentBySlug(slug), data);
  }

  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(
      API_ENDPOINTS.changePassword, data
    );
  }

  logout(): void {
    this.auth.logout();
  }


}