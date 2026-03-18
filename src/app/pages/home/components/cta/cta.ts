import { Component } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class Cta {
  constructor(private alertService: AlertService, private router: Router) {}
   onViewHome() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.alertService.requireLogin(
        'Please login first'
      );
      this.router.navigate(['/auth/login']);
      return;
    }

    this.router.navigate(['/home']);
  }

}
