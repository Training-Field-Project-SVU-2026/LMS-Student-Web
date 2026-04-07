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

  myCourses:     ICourseCardData[] = [];
  topRatedCourses: ICourseCardData[] = [];
  isLoadingMore  = false;

  private currentPage     = 1;
  private readonly pageSize = 4;
  totalPages = 1;

  get hasMore(): boolean {
    return this.currentPage <= this.totalPages;
  }

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
    this.courseService.getTopRatedCourses().pipe(
      catchError(() => of([])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => this.topRatedCourses = data.slice(0, 4),
    });
  }

  loadMoreTopRated() {
    if (this.isLoadingMore) return;
    this.isLoadingMore = true;

    this.courseService.getAllCoursesPaged(this.currentPage, this.pageSize).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: ({ courses, totalPages }) => {
        const existingSlugs = new Set(this.topRatedCourses.map(c => c.slug));
        const newCourses    = courses.filter(c => !existingSlugs.has(c.slug));

        this.topRatedCourses = [...this.topRatedCourses, ...newCourses];
        this.totalPages      = totalPages;
        this.currentPage++;
        this.isLoadingMore   = false;
      },
      error: () => this.isLoadingMore = false,
    });
  }

  onCourseClick(slug: string) {
    this.router.navigate(['/course', slug]);
  }
}
