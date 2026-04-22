import { Injectable } from '@angular/core';
import { ICourseWorkspaceHeader, IMaterialsResponse, IQuestion, IQuestionsResponse, IQuizCourse, IQuizCourseResponse, IQuizResult, IQuizResultsResponse, ISubmitQuizRequest, ISubmitQuizResponse } from '../models/courseWorkspace.model';
import { Observable } from 'rxjs';
import { CourseService } from '../../shared/services/course';
import { User } from '../services/user';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
<<<<<<< HEAD
import { ICourseDetailRequest } from '../../components/shared/interfaces/course.model';
import { signal } from '@angular/core';
=======
import { API_ENDPOINTS } from '../../core/api-endpoints';

>>>>>>> 3caeacfff563ff1ae678ef4d8f53ed1b96403e6d

@Injectable({
  providedIn: 'root',
})
export class CourseWorkspaceService {
  constructor(private userService: User, private courseService: CourseService, private http: HttpClient) { }


  selectedCourse = signal<ICourseDetailRequest | null>(null);

  setSelectedCourse(course: ICourseDetailRequest) {
    this.selectedCourse.set(course);
  }
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


getQuizzes(courseSlug:string): Observable<IQuizCourse[]>{
  return this.http.get<IQuizCourseResponse>(API_ENDPOINTS.quiz(courseSlug)).pipe(
    map(res => res.data.quizzes)
  );
}
getQuizQuestions(quizSlug: string): Observable<IQuestion[]> {
  return this.http.get<IQuestionsResponse>(API_ENDPOINTS.quizQuestions(quizSlug)).pipe(
    map(res => res.data.questions ?? res.data.quizzes ?? [])
  );
}
submitQuiz(quizSlug: string, body: ISubmitQuizRequest) {
  return this.http.post<ISubmitQuizResponse>(
    API_ENDPOINTS.submitQuizAnswers(quizSlug),
    body
  );
}
// getLatestQuizResult(quizSlug: string): Observable<IQuizResult[]> {
//   return this.http.get<IQuizResultsResponse>(API_ENDPOINTS.quizResults(slug)).pipe(
//     map(res => res.data)
//   );
// }
}
