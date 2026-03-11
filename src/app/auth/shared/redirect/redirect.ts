import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './redirect.html',
  styleUrl: './redirect.css',
})
export class Redirect implements OnInit {
   user = {
    first_name: 'rawan',
    last_name:  'bahaa',
    email:      'rawan@example.com',
    role:       'Student',
    slug:       'rawan-bahaa'
  };
  // user: any | null = null;
  greeting = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('current_user');
    if (stored) {
      this.user = JSON.parse(stored);
    } else {
      this.router.navigate(['/auth/login']);
      return;
    }

    const hour = new Date().getHours();
    if (hour < 12)      this.greeting = 'Good morning';
    else if (hour < 18) this.greeting = 'Good afternoon';
    else                this.greeting = 'Good evening';
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth/login']);
  }
}