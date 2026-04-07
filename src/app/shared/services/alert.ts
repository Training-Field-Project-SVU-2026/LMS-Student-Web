import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) { }

  private baseConfig = {
    confirmButtonColor: 'var(--primary)',
    cancelButtonColor: 'var(--disabled-button)',
    customClass: {
      popup: 'swal-popup'
    }
  };

  requireLogin(message: string = 'You need to login first!', redirectUrl?: string) {
    Swal.fire({
      ...this.baseConfig,
      icon: 'info',
      title: 'Login Required',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Login Now',
      cancelButtonText: 'Later'
    }).then((result) => {
      if (result.isConfirmed) {
        const destination = redirectUrl ?? this.router.url;
        localStorage.setItem('redirectUrl', destination);
        this.router.navigate(['/auth/login']);
      }
    });
  }

  success(message: string) {
    Swal.fire({
      ...this.baseConfig,
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

  error(message: string) {
    Swal.fire({
      ...this.baseConfig,
      icon: 'error',
      title: 'Error',
      text: message
    });
  }
  requireLoginToEnroll(courseSlug: string) {
    localStorage.setItem('pendingCourseSlug', courseSlug);
    Swal.fire({
      ...this.baseConfig,
      icon:               'info',
      title:              'Login Required',
      text:               'Please login to enroll in this course',
      showCancelButton:   true,
      confirmButtonText:  'Login Now',
      cancelButtonText:   'Later',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  alreadyEnrolled(courseTitle: string, onConfirm: () => void) {
    Swal.fire({
      ...this.baseConfig,
      icon:               'info',
      title:              'Already Enrolled',
      text:               `You're already enrolled in "${courseTitle}"`,
      confirmButtonText:  'Go to My Courses',
    }).then((result) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  enrollSuccess(courseTitle: string, onConfirm: () => void) {
    Swal.fire({
      ...this.baseConfig,
      icon:               'success',
      title:              'Enrolled Successfully! 🎉',
      text:               `You're now enrolled in "${courseTitle}"`,
      confirmButtonText:  'Go to My Courses',
    }).then((result) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  enrollError(message: string) {
    Swal.fire({
      ...this.baseConfig,
      icon:  'error',
      title: 'Enrollment Failed',
      text:  message || 'Something went wrong. Please try again.',
    });
  }

  confirmBuyPackage(packageTitle: string, onConfirm: () => void) {
    Swal.fire({
      ...this.baseConfig,
      icon:               'question',
      title:              'Confirm Purchase',
      text:               `You're about to buy "${packageTitle}". All included courses will be added to My Courses.`,
      showCancelButton:   true,
      confirmButtonText:  'Yes, Buy Now',
      cancelButtonText:   'Cancel',
    }).then((result) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  packageBuySuccess(packageTitle: string, onConfirm: () => void) {
    Swal.fire({
      ...this.baseConfig,
      icon:               'success',
      title:              'Package Purchased! 🎉',
      text:               `"${packageTitle}" courses have been added to My Courses.`,
      confirmButtonText:  'Go to My Courses',
    }).then((result) => {
      if (result.isConfirmed) onConfirm();
    });
  }

  requireLoginToBuyPackage(packageSlug: string) {
    localStorage.setItem('pendingPackageSlug', packageSlug);
    Swal.fire({
      ...this.baseConfig,
      icon: 'info', title: 'Login Required',
      text: 'Please login to purchase this package',
      showCancelButton: true, confirmButtonText: 'Login Now', cancelButtonText: 'Later',
    }).then((result) => {
      if (result.isConfirmed) this.router.navigate(['/auth/login']);
    });
  }
}



