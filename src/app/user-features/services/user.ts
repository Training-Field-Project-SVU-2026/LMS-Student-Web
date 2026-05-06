import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CourseRatingResponse, EnrolledCourse, EnrollmentResponse } from '../models/course.model';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { ICourseDetailRequest } from '../../components/shared/interfaces/course.model';

@Injectable({
  providedIn: 'root',
})
export class User {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  selectedCourse = signal<ICourseDetailRequest | null>(null);

  setSelectedCourse(course: ICourseDetailRequest) {
    this.selectedCourse.set(course);
  }
  private coursesSubject = new BehaviorSubject<EnrolledCourse[]>([]);
  courses$ = this.coursesSubject.asObservable();
 getMyEnrollments(page: number = 1, pageSize: number = 12): Observable<EnrollmentResponse> {
  return this.http.get<EnrollmentResponse>(
    `${this.baseUrl}api/courses/myEnrollments/`,
    {
      params: {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }
  ).pipe(
    map(res => {
      res.data.courses.sort((a, b) =>
        new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime()
      );
      return res;
    })
  );
}


  rateCourse(slug: string, rate: number): Observable<CourseRatingResponse> {
    return this.http.post<CourseRatingResponse>(
      `${this.baseUrl}api/courses/rate/${slug}/`,
      { rate }

    );
  }

  downloadImage(url: string, filename: string) {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch(console.error);
  }
}
