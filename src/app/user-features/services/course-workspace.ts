import { Injectable } from '@angular/core';
import { ICourseWorkspaceHeader } from '../models/courseWorkspace.model';
import { Observable } from 'rxjs';
import { CourseService } from '../../shared/services/course';
import { User } from '../services/user';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CourseWorkspaceService {
  constructor(private userService: User, private courseService: CourseService) {}
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
          progress:      enrolled?.progress     ?? 0,
        } as ICourseWorkspaceHeader;
      })
    );
  }
}
