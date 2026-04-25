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
