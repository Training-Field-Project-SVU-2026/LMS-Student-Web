import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { CourseService } from '../../shared/services/course';
import { AuthService } from '../../auth/services/auth';
import { ICourseCardData } from '../../components/shared/interfaces/course.model';
import { Card } from '../../components/shared/card/card';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [Card, CommonModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {

  private courseService = inject(CourseService);
  private router        = inject(Router);
  private auth          = inject(AuthService);
  private destroyRef    = inject(DestroyRef);

  myCourses: ICourseCardData[] = [];
  topRatedCourses: ICourseCardData[] = [];

  ngOnInit() {
    this.auth.authReady$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.loadMyCourses();
      this.loadTopRated();
    });
  }

  private loadMyCourses() {
    this.courseService.getMyCourses().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:  (data) => this.myCourses = data,
      error: ()     => this.myCourses = [],
    });
  }

  private loadTopRated() {
    this.courseService.getTopRatedCourses(4).pipe(
      catchError(() => of([])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => this.topRatedCourses = data,
    });
  }

  onCourseClick(slug: string) {
    this.router.navigate(['/course', slug]);
  }
}
