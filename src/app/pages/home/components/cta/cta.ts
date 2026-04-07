import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth';
import { AlertService } from '../../../../shared/services/alert';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [],
  templateUrl: './cta.html',
  styleUrl: './cta.css',
})
export class Cta {
  private auth   = inject(AuthService);
  private router = inject(Router);
  private alert = inject(AlertService);
  onJoinNow() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.alert.requireLogin('You need to be logged in to join now.', '/user-dashboard');
    }
  }
}
