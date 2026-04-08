import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseService } from '../../shared/services/course';
import { AuthService } from '../../auth/services/auth';
import { AlertService } from '../../shared/services/alert';
import { ICourseDetailRequest } from '../../components/shared/interfaces/course.model';
import { ImgFallback } from '../../shared/directives/img-fallback';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, ImgFallback],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private alert = inject(AlertService);
  private destroyRef = inject(DestroyRef);

  auth = inject(AuthService);

  courseDetail: ICourseDetailRequest | null = null;

  isLoading = true;
  isEnrolling = signal(false);
  isEnrolled = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.loadCourseData(slug);
  }

  private loadCourseData(slug: string) {
    this.isLoading = true;

    this.courseService.getCourseDetails(slug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.courseDetail = data;
        this.isLoading = false;


        this.checkIfEnrolled(slug);
      },
      error: () => this.isLoading = false,
    });
  }

  private checkIfEnrolled(slug: string) {
    if (!this.auth.isLoggedIn()) {
      this.isEnrolled.set(false);
      return;
    }

    this.courseService.getMyCourses().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (courses) => {
        const enrolled = courses.some(c => c.slug === slug);
        this.isEnrolled.set(enrolled);
      },
      error: () => this.isEnrolled.set(false),
    });
  }

  onEnroll() {
    if (!this.auth.isLoggedIn()) {
      this.alert.requireLoginToEnroll(this.courseDetail?.slug ?? '');
      return;
    }

    if (this.isEnrolled()) {
      this.alert.alreadyEnrolled(
        this.courseDetail?.title ?? '',
        () => this.router.navigate(['/my-courses'])
      );
      return;
    }

    if (!this.courseDetail || this.isEnrolling()) return;

    this.isEnrolling.set(true);

    this.courseService.enrollInCourse(this.courseDetail.slug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.isEnrolling.set(false);
        this.isEnrolled.set(true);

        localStorage.removeItem('pendingCourseSlug');

        this.alert.enrollSuccess(
          this.courseDetail!.title,
          () => this.router.navigate(['/my-courses'])
        );
      },
      error: (err: any) => {
        this.isEnrolling.set(false);

        const detail = (err?.error?.detail || err?.error?.message || '').toLowerCase();

        if (err.status === 400 && detail.includes('already')) {
          this.isEnrolled.set(true);
          return;
        }

        if (err.status === 401) {
          this.auth.logout();
          this.alert.requireLogin('Session expired. Please login again.');
          return;
        }

        if (err.status === 401) {
          this.alert.requireLoginToEnroll(this.courseDetail?.slug ?? '');
          return;
        }

        this.alert.enrollError(detail);
      },
    });
  }
}