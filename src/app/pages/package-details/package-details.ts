import { Component, OnInit, inject, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, forkJoin, Observable } from 'rxjs';
import { CourseService } from '../../shared/services/course';
import { AuthService } from '../../auth/services/auth';
import { AlertService } from '../../shared/services/alert';
import { IPackageDetails, IEnrollResponse, IPackageCardData } from '../../components/shared/interfaces/course.model';

import { ImgFallback } from '../../shared/directives/img-fallback';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, ImgFallback],
  templateUrl: './package-details.html',
  styleUrl: './package-details.css',
})
export class PackageDetails implements OnInit {
  private route         = inject(ActivatedRoute);
  private router        = inject(Router);
  private courseService = inject(CourseService);
  private alert         = inject(AlertService);
  private destroyRef    = inject(DestroyRef);

  auth = inject(AuthService);

  packageData: IPackageDetails | null = null;
  packageCardData: IPackageCardData | null = null;
  isLoading = true;
  isBuying  = signal(false);
  isBought  = signal(false);


  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    this.courseService.getPackageDetails(slug).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:  (data) => { this.packageData = data; this.isLoading = false; this.checkIfBought(); },
      error: ()     =>   this.isLoading = false,
    });
  }

  private checkIfBought() {
    if (!this.auth.isLoggedIn() || !this.packageData?.course_slugs?.length) return;

    this.courseService.getMyCourses().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (myCourses) => {
        const mySlugs   = myCourses.map(c => c.slug);
        const allBought = this.packageData!.course_slugs.every(s => mySlugs.includes(s));
        this.isBought.set(allBought);
      },
      error: () => this.isBought.set(false),
    });
  }

  onBuyPackage() {
    if (!this.auth.isLoggedIn()) {
      this.alert.requireLoginToBuyPackage(this.packageData?.slug ?? '');
      return;
    }

    if (this.isBought()) {
      this.alert.alreadyEnrolled(
        this.packageData?.title ?? '',
        () => this.router.navigate(['/user-dashboard'])
      );
      return;
    }

    if (!this.packageData || this.isBuying()) return;

    this.alert.confirmBuyPackage(this.packageData.title, () => {
      this.isBuying.set(true);


      const token$: Observable<unknown> = this.auth.getToken()
        ? of(null)
        : this.auth.refreshAccessToken();

      token$.pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: () => {
          const requests: Observable<IEnrollResponse>[] =
            this.packageData!.courses.map(course =>
              this.courseService.enrollInCourse(course.slug)
            );

          forkJoin(requests).pipe(
            takeUntilDestroyed(this.destroyRef)
          ).subscribe({
            next: () => {
              this.isBuying.set(false);
              this.isBought.set(true);
              localStorage.removeItem('pendingPackageSlug');

              this.alert.packageBuySuccess(
                this.packageData!.title,
                () => this.router.navigate(['/user-dashboard'])
              );
            },
            error: (err) => {
              this.isBuying.set(false);
              const msg = err?.error?.detail || err?.error?.message || '';
              this.alert.enrollError(msg);
            },
          });
        },
        error: () => {
          this.isBuying.set(false);
          this.alert.enrollError('Session expired. Please login again.');
        },
      });
    });
  }
}
