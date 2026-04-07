import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Card } from '../../../../components/shared/card/card';
import { CourseService } from '../../../../shared/services/course';
import { AuthService } from '../../../../auth/services/auth';
import { AlertService } from '../../../../shared/services/alert';
import { ICourseCardData } from '../../../../components/shared/interfaces/course.model';

@Component({
  selector: 'app-featured-courses',
  standalone: true,
  imports: [Card, CommonModule],
  templateUrl: './featured-courses.html',
  styleUrl: './featured-courses.css',
})
export class FeaturedCourses implements OnInit {
  private courseService = inject(CourseService);
  private alertService  = inject(AlertService);
  private auth          = inject(AuthService);
  private router        = inject(Router);
  private destroyRef    = inject(DestroyRef);

  courses:       ICourseCardData[] = [];
  isLoadingMore  = false;

  private currentPage     = 1;
  private readonly pageSize = 4;
  totalPages = 1;

  get hasMore(): boolean {
    return this.currentPage <= this.totalPages;
  }

  ngOnInit() {
    //  top rated
    this.courseService.getTopRatedCourses().pipe(
      catchError(() => of([])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => this.courses = data.slice(0, 4),
    });
  }

  loadMore() {
    if (this.isLoadingMore) return;
    this.isLoadingMore = true;

    this.courseService.getAllCoursesPaged(this.currentPage, this.pageSize).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: ({ courses, totalPages }) => {
        const existingSlugs = new Set(this.courses.map(c => c.slug));
        const newCourses    = courses.filter(c => !existingSlugs.has(c.slug));

        this.courses      = [...this.courses, ...newCourses];
        this.totalPages   = totalPages;
        this.currentPage++;
        this.isLoadingMore = false;
      },
      error: () => this.isLoadingMore = false,
    });
  }

  onCourseClick(slug: string) {
    this.router.navigate(['/course', slug]);
  }

  onViewAllCourses() {
    this.router.navigate(['/explore']);
  }
}
