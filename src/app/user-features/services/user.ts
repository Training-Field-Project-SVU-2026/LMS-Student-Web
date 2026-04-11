import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EnrolledCourse, EnrollmentResponse, IRateCourseRequest, IRateCourseResponse } from '../models/course.model';
import { map, Observable , BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
private coursesSubject = new BehaviorSubject<EnrolledCourse[]>([]);
courses$ = this.coursesSubject.asObservable();
 getMyEnrollments(): void {
  this.http.get<EnrollmentResponse>(`${this.baseUrl}api/courses/myEnrollments/`)
    .pipe(
      map(res => {
        let courses = res.data.courses;

        courses.sort((a, b) => {
          const dateA = new Date(a.enrolled_at).getTime();
          const dateB = new Date(b.enrolled_at).getTime();
          return dateB - dateA;
        });

        return courses;
      })
    )
    .subscribe(courses => {
      this.coursesSubject.next(courses); 
    });
}
  rateCourse(slug: string, body: IRateCourseRequest) {
    return this.http.post<IRateCourseResponse>(
      `${this.baseUrl}api/courses/rate/${slug}/`,
      body
    ).pipe(
      map(res => res.data)
    );
  }

}
