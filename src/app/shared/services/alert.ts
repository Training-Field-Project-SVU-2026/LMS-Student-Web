import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) {}

  private baseConfig = {
    confirmButtonColor: 'var(--primary)',
    cancelButtonColor: 'var(--disabled-button)',
    customClass: {
      popup: 'swal-popup'
    }
  };

  requireLogin(message: string = 'You need to login first!') {
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
       
        localStorage.setItem('redirectUrl', this.router.url);

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

}
