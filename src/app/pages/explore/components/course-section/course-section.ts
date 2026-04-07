import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from '../../../../components/shared/card/card';
import { CourseService } from '../../../../shared/services/course';
import { ICourseCardData } from '../../../../components/shared/interfaces/course.model';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [Card, RouterLink, CommonModule],
  templateUrl: './course-section.html',
  styleUrl: './course-section.css',
})
export class CourseSection implements OnInit {
  private courseService = inject(CourseService);
  private destroyRef    = inject(DestroyRef);

  learningTracks: ICourseCardData[] = [];
  manyCourses:    ICourseCardData[] = [];

  // ── Pagination ──
  currentPage  = 1;
  pageSize     = 8;
  totalPages   = 1;
  isLoadingMore = false;

  get hasMore(): boolean {
    return this.currentPage < this.totalPages;
  }

  ngOnInit() {
    // Packages
    this.courseService.getPackages().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:  (data) => this.learningTracks = data.slice(0, 6),
      error: (err)  => console.error('Tracks Error:', err),
    });

    // Courses first page
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getAllCoursesPaged(this.currentPage, this.pageSize).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: ({ courses, totalPages }) => {
        this.manyCourses  = [...this.manyCourses, ...courses]; // append
        this.totalPages   = totalPages;
        this.isLoadingMore = false;
      },
      error: () => this.isLoadingMore = false,
    });
  }

  loadMore() {
    if (!this.hasMore || this.isLoadingMore) return;
    this.currentPage++;
    this.isLoadingMore = true;
    this.loadCourses();
  }

  updateToDefault(event: Event) {
    (event.target as HTMLImageElement).src = 'images/default_image.jpeg';
  }
}
