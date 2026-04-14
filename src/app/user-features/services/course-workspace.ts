import { Injectable } from '@angular/core';
import { ICourseWorkspaceHeader, IMaterialsResponse } from '../models/courseWorkspace.model';
import { Observable } from 'rxjs';
import { CourseService } from '../../shared/services/course';
import { User } from '../services/user';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CourseWorkspaceService {
  constructor(private userService: User, private courseService: CourseService, private http: HttpClient) { }
  getCourseWorkspaceData(slug: string): Observable<ICourseWorkspaceHeader> {

    this.userService.getMyEnrollments();

    return combineLatest([
      this.courseService.getCourseDetails(slug),
      this.userService.courses$,
    ]).pipe(
      map(([courseDetail, enrolledCourses]) => {

        const enrolled = enrolledCourses.find(c => c.slug === slug);

        return {
          ...courseDetail,
          progress: enrolled?.progress ?? 0,
        } as ICourseWorkspaceHeader;
      })
    );
  }


  materials(courseSlug: string): Observable<IMaterialsResponse> {
    return this.http.get<IMaterialsResponse>(
      `${environment.baseUrl}api/materials/?course=${courseSlug}`
    );
  }



}
