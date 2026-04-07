import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EnrolledCourse, EnrollmentResponse } from '../models/course.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {




  
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getMyEnrollments(): Observable<EnrolledCourse[]> {
    // The auth interceptor automatically attaches the Bearer token — no manual header needed.
    return this.http
      .get<EnrollmentResponse>(`${this.baseUrl}api/courses/myEnrollments/`)
      .pipe(map((res) => res.data.courses));
  }

}
