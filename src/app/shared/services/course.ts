import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, defaultIfEmpty, map } from 'rxjs';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import {
  IBaseCourse,
  ICourseCardData,
  IAllCoursesResponse,
  ICourseDetailRequest,
  ICourseDetailResponse,
  IPackagesResponse,
  IEnrollResponse,
  IMyEnrollmentsResponse,
} from '../../components/shared/interfaces/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);


  private mapToCourseCard(
    item: IBaseCourse,
    type: 'COURSE' | 'PACKAGE'
  ): ICourseCardData {
    return {
      slug: item.slug,
      title: item.title,
      description: item.description,
      image: item.image || 'images/1_a2tAChY8UgAZvBYh5Kqwkw.jpg',
      avg_rating: item.avg_rating || 0,
      students_count: item.students_count || item.courses_count || 0,
      instructor_name: item.instructor_name || 'Expert Instructor',
      price: item.price || '0',

    };
  }

  // ───── Top Rated Courses ─────
  getTopRatedCourses(): Observable<ICourseCardData[]> {
    return this.http.get<any>(API_ENDPOINTS.coursesTopRated).pipe(
      map(res => {
        const items = Array.isArray(res.data) ? res.data : (res.data?.courses || []);
        return items.map((item: any) => this.mapToCourseCard(item, 'COURSE'));
      })
    );
  }
  // ───── My Courses ─────
  getMyCourses(): Observable<ICourseCardData[]> {
    return this.http.get<IMyEnrollmentsResponse>(API_ENDPOINTS.myCourses).pipe(
      map(res => {
        const enrollments = res.data?.courses || [];
        return enrollments.map((item: any) => {
          const courseInfo = item.course ? item.course : item;
          return this.mapToCourseCard(courseInfo, 'COURSE');
        });
      }),
      defaultIfEmpty([])
    );
  }

  // ───── Enroll in Course (POST) ─────
  enrollInCourse(slug: string, courseId?: number): Observable<IEnrollResponse> {
    const url = API_ENDPOINTS.enroll(slug);
    const payload = courseId != null ? { course: courseId } : {};
    return this.http.post<IEnrollResponse>(url, payload);
  }

  // ───── All Courses ─────
  getAllCourses(): Observable<ICourseCardData[]> {
    return this.http.get<any>(API_ENDPOINTS.allCourses).pipe(
      map(res => {
        const items =
          // old DRF-style pagination: results
          Array.isArray(res?.results) ? res.results :
            // nested `data.results` style
            Array.isArray(res?.data?.results) ? res.data.results :
              // data array directly
              Array.isArray(res?.data) ? res.data :
                // `data.courses` field (as used by myEnrollments in this app)
                Array.isArray(res?.data?.courses) ? res.data.courses :
                  // fallback same root as list
                  Array.isArray(res?.courses) ? res.courses :
                    [];

        return items.map((item: any) => this.mapToCourseCard(item, 'COURSE'));
      })
    );
  }

  // ───── Course Details ─────
  getCourseDetails(slug: string): Observable<ICourseDetailRequest> {
    return this.http.get<ICourseDetailResponse>(API_ENDPOINTS.courseDetails(slug)).pipe(
      map(res => {
        const item = res.data;
        return {
          ...item,
          instructor_bio: item.instructor_bio || 'Expert instructor...',
          instructor_image: item.instructor_image || 'assets/images/default-avatar.png',
        } as ICourseDetailRequest;
      })
    );
  }

  // ───── Packages ─────
  getPackages(): Observable<ICourseCardData[]> {
    return this.http.get<IPackagesResponse>(API_ENDPOINTS.package).pipe(
      map(res => {
        const packagesArray = res.data?.packages || [];
        return packagesArray.map(pkg => ({
          slug: pkg.slug,
          title: pkg.title,
          description: pkg.description,
          image: pkg.image || null,
          avg_rating: pkg.avg_rating || 0,
          students_count: pkg.courses_count,
          instructor_name: pkg.instructor_name,
          price: pkg.price,

        } as ICourseCardData));
      })
    );
  }
}
