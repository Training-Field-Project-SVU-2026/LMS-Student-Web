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
    const token = localStorage.getItem('access_token'); 

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
  
  
  onViewHome() {
    const token = localStorage.getItem('access_token');

    if (!token) {
      this.alertService.requireLogin('Please login first');
      return;
    }

    this.router.navigate(['/home']);
  }
}
