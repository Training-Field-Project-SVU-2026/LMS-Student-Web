import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICourseCardData, ICourseDetail } from '../../components/shared/interfaces/course.model';
import { API_ENDPOINTS } from '../../core/api-endpoints'

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);


  private mapToCourseCard(item: any, type: 'COURSE' | 'PACKAGE'): ICourseCardData {
  return {
    slug: item.slug,
    title: item.title,
    description: item.description,
    image: item.image || null,
    avg_rating: item.avg_rating || 0,
    students_count: item.students_count || item.courses_count || 0,
    instructor_name: item.instructor_name || 'Expert Instructor',
    price: item.price,
    badge: type === 'PACKAGE' ? 'Package' : (item.badge || 'Course')
  };
}
getTopRatedCourses(): Observable<ICourseCardData[]> {
  return this.http.get<any>(API_ENDPOINTS.coursesTopRated).pipe(
    map(res => {

      const dataArray = res.data ? res.data : []; //ternary operator
      return dataArray.map((item: any) => this.mapToCourseCard(item, 'COURSE'));
    })
  );
}


getMyCourses(): Observable<ICourseCardData[]> {
  return this.http.get<any[]>(API_ENDPOINTS.myCourses).pipe(
    map(res => res.map(item => this.mapToCourseCard(item, 'COURSE')))
  );
}

getCourseDetails(slug: string): Observable<ICourseDetail> {
  return this.http.get<any>(API_ENDPOINTS.courseDetails(slug)).pipe(
    map(res => {
      const item = res.data;
      return {
        ...item,

        instructor_bio: item.instructor_bio || 'Expert instructor at our platform.',
        instructor_image: item.instructor_image || 'assets/images/default-avatar.png'
      } as ICourseDetail;
    })
  );
}

getAllCourses(): Observable<ICourseCardData[]> {
  return this.http.get<any>(API_ENDPOINTS.allCourses).pipe(
    map(res => {
      const coursesArray = res.data && res.data.courses ? res.data.courses : [];
      return coursesArray.map((item: any) => this.mapToCourseCard(item, 'COURSE'));
    })
  );
}
getPackages(): Observable<ICourseCardData[]> {
  return this.http.get<any>(API_ENDPOINTS.package).pipe(
    map(res=>{
      const dataArray=(res.data && res.data.packages ) ?res.data.packages:[]

      return dataArray.map((item:any )=> this.mapToCourseCard(item, 'PACKAGE'))
    })
  )
  }
}



