import { Component, effect, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from '../../../core/theme';
import { AlertService } from '../../../shared/services/alert';
import { AuthService } from '../../../auth/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html'
})
export class NavbarComponent {

  private router = inject(Router);
  private theme = inject(ThemeService);
  private alert = inject(AlertService);
  private authService = inject(AuthService);
  // 🔹 Auth & UI State
  isProfileMenuOpen = false;
  isMobileMenuOpen = false;

  currentUrl: string = '';
  username: string | null = null;
  userAvatar: string | null = null;
  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });

    effect(() => {
      if (this.authService.isLoggedIn()) {
        const user = this.authService.getUserFromToken();
        this.username = user?.username || null;

        this.userAvatar = this.username
          ? `https://ui-avatars.com/api/?name=${this.username}`
          : null;

      } else {
        this.username = null;
        this.userAvatar = null;
      }
    });
  }


  // 🔹 Theme
  toggleTheme() {
    this.theme.toggleTheme();
  }

  get isDark() {
    return document.documentElement.classList.contains('dark');
  }
  // 🔹 Auth Actions
  logout() {
    this.authService.logout();
    this.alert.success('You have logged out 👋');
  }

  goLogin() {
    this.router.navigate(['/auth/login']);
    this.isMobileMenuOpen = false;
  }

  goSignup() {
    this.router.navigate(['/auth/register']);
    this.isMobileMenuOpen = false;
  }

  // 🔹 Mobile Menu Toggle
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  // 🔹 Check if we are in Explore page
  get isExplorePage() {
    return this.currentUrl ? this.currentUrl.includes('/explore') : false;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  goDashboard() {
    this.router.navigate(['/dashboard/profile']);
  }

}
