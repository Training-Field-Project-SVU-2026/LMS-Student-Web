import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth';
import { AlertService } from '../../../../shared/services/alert';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private alert =inject(AlertService)


  onStartLearning() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.alert.requireLogin('You need to be logged in to access the dashboard.', '/user-dashboard');
    }
  }


  onBrowseCourses() {
    this.router.navigate(['/explore']);
  }
}
