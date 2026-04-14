import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { Card } from '../../../../components/shared/card/card';
import { CourseService } from '../../../../shared/services/course';
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
  private router        = inject(Router);
  private destroyRef    = inject(DestroyRef);

  courses: ICourseCardData[] = [];

  ngOnInit() {
    this.courseService.getTopRatedCourses(8).pipe(
      catchError(() => of([])),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => this.courses = data
    });
  }

  onCourseClick(slug: string) {
    this.router.navigate(['/course', slug]);
  }

  onViewAllCourses() {
    this.router.navigate(['/explore']);
  }
}
