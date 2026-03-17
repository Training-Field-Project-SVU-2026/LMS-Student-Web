import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { ICourseCardData, ICourseDetail } from '../../components/shared/interfaces/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl ;

  private mapToCourseCard(item: any, type: 'COURSE' | 'TRACK'): ICourseCardData {
    return {
      slug: item.slug,
      title: item.title,
      description: item.description,
      image: item.image || null,
      avg_rating: item.avg_rating || 0,
      students_count: item.students_count || item.courses_count || 0,
      instructor_name: item.instructor_name || 'Expert Instructor',
      price: item.price,
      badge: type === 'TRACK' ? 'Learning Track' : (item.badge || 'Course')
    };
  }
 getTopRatedCourses(): Observable<ICourseCardData[]> {
    return this.http.get<any[]>(`${this.baseUrl}courses/topRated/`).pipe(
      map((res: any[]) => res.map(((item: any) => this.mapToCourseCard(item, 'COURSE'))))
    );
  }
//top rated after login
getMyCourses(): Observable<ICourseCardData[]> {
    return this.http.get<any[]>(`${this.baseUrl}courses/myEnrollments/`).pipe(
      map((res: any[]) => res.map((item: any) => this.mapToCourseCard(item, 'COURSE')))
    );
  }
//course details
getCourseDetails(slug: string): Observable<ICourseDetail> {
    return this.http.get<ICourseDetail>(`${this.baseUrl}courses/${slug}/`);
  }
//many course==>explore
getAllCourses(): Observable<ICourseCardData[]> {
    return this.http.get<any>(`${this.baseUrl}courses/all/`).pipe(
      map((res: any) => {
        const data = res.results ? res.results : res;
        return data.map((item: any) => this.mapToCourseCard(item, 'COURSE'));
      })
    );
  }
//package==>explore
 getLearningTracks(): Observable<ICourseCardData[]> {
    return this.http.get<any[]>(`${this.baseUrl}packages/all/`).pipe(
      map((res: any[]) => res.map((item: any) => this.mapToCourseCard(item, 'TRACK')))
    );
  }
}


