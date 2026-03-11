import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import { AuthModule } from '../auth-module';
import { LoginResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class Auth {


  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(data:any){
    return this.http.post(
      `${this.baseUrl}${API_ENDPOINTS.register}`,
      data
    );
  }

  login(data:any){
    return this.http.post<LoginResponse>(
      `${this.baseUrl}${API_ENDPOINTS.login}`,
      data
    );
  }

  forgotPassword(email:string){
    return this.http.post(
      `${this.baseUrl}${API_ENDPOINTS.forgotPassword}`,
      {email}
    );
  }

  resetPassword(data:any){
    return this.http.post(
      `${this.baseUrl}${API_ENDPOINTS.resetPassword}`,
      data
    );
  }


}