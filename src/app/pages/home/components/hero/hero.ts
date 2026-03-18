import { Component } from '@angular/core';
import { AlertService } from '../../../../shared/services/alert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  constructor(
    private alertService: AlertService,
    private router: Router
  ) {}

  onViewCourses() {

    const token = localStorage.getItem('token');

    if (!token) {
      this.alertService.requireLogin(
        'Please login first to view all courses'
      );
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
      return;
    }

    this.router.navigate(['/courses']);
  }
    onViewHome() {

    const token = localStorage.getItem('token');

    if (!token) {
      this.alertService.requireLogin(
        'Please login first'
      );
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/home']);
  }
}
