// src/app/shared/services/course.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = '/api/courses/topRated';

  constructor(private http: HttpClient) {}

  getTopRated(limit: number = 5): Observable<any> {
  
    return of([
      { id: 1, title: 'Angular Basics', imageUrl: 'url1', rating: 4.8, studentsCount: 1200 },
      { id: 2, title: 'React Advanced', imageUrl: 'url2', rating: 4.7, studentsCount: 980 },
      { id: 3, title: 'Vue 3 Complete', imageUrl: 'url3', rating: 4.9, studentsCount: 750 },
      { id: 4, title: 'Node.js Mastery', imageUrl: 'url4', rating: 4.6, studentsCount: 1500 }
    ]);
  }
}
