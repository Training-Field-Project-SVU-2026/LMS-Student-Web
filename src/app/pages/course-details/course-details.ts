import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, of, switchMapTo } from 'rxjs';
import { CourseService } from '../../shared/services/course';
import { AuthService } from '../../auth/services/auth';
import { AlertService } from '../../shared/services/alert';
import { ICourseDetailRequest } from '../../components/shared/interfaces/course.model';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl:    './course-details.css',
})
export class CourseDetails implements OnInit {
  private route         = inject(ActivatedRoute);
  private router        = inject(Router);
  private courseService = inject(CourseService);
  private alert         = inject(AlertService);
  private destroyRef    = inject(DestroyRef);

  auth = inject(AuthService);

  courseDetail: ICourseDetailRequest | null = null;
  isLoading   = true;
  isEnrolling = false;
  isEnrolled  = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.loadCourseData(slug);

    if (this.auth.isLoggedIn()) this.checkIfEnrolled(slug);
  }

  private loadCourseData(slug: string) {
    this.isLoading = true;
    this.courseService.getCourseDetails(slug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:  (data) => { this.courseDetail = data; this.isLoading = false; },
      error: ()     =>   this.isLoading = false,
    });
  }

  private checkIfEnrolled(slug: string) {
    this.courseService.getMyCourses().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:  (courses) => this.isEnrolled.set(courses.some(c => c.slug === slug)),
      error: ()        => this.isEnrolled.set(false),
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
        () => this.router.navigate(['/user-dashboard'])
      );
      return;
    }

    if (this.isLoading || this.isEnrolling || !this.courseDetail?.slug) return;

    this.isEnrolling = true;

    const doEnroll$ = this.auth.getToken()
      ? of(true)
      : this.auth.refreshAccessToken().pipe(switchMapTo(of(true)));

    doEnroll$.pipe(
      switchMapTo(
        this.courseService.enrollInCourse(this.courseDetail!.slug)
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.isEnrolling = false;
        this.isEnrolled.set(true);
        localStorage.removeItem('pendingCourseSlug');

        this.alert.enrollSuccess(
          this.courseDetail!.title,
          () => this.router.navigate(['/user-dashboard'])
        );
      },
      error: (err: any) => {
        this.isEnrolling = false;

        const detail = err?.error?.detail || err?.error?.message || '';
        const alreadyEnrolled =
          err.status === 400 && detail.toLowerCase().includes('already');

        if (alreadyEnrolled) {
          this.isEnrolled.set(true);
          this.alert.alreadyEnrolled(
            this.courseDetail?.title ?? '',
            () => this.router.navigate(['/user-dashboard'])
          );
          return;
        }

        this.alert.enrollError(detail);
      },
    });
  }
}
