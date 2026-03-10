import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from '../../../core/theme';
import { AlertService } from '../../../shared/services/alert';
import { Button } from '../button/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, Button, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html'
})
export class NavbarComponent {

  private router = inject(Router);
  private theme = inject(ThemeService);
  private alert = inject(AlertService);

  // 🔹 Auth & UI State
  isProfileMenuOpen = false;
  isMobileMenuOpen = false;

  username = 'Reham';

  // 🔹 Current Page
  currentUrl: string = '';

  constructor() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
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
    this.alert.success('You have logged out 👋');
  }

  goLogin() {
    this.router.navigate(['/login']);
    this.isMobileMenuOpen = false;
  }

  goSignup() {
    this.router.navigate(['/register']);
    this.isMobileMenuOpen = false;
  }

  // 🔹 Mobile Menu Toggle
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // 🔹 Check if we are in Explore page
 get isExplorePage() {
  return this.currentUrl ? this.currentUrl.includes('/explore') : false;
}


  get isLoggedInTemp() {
    return this.isExplorePage;
      // return true;
  }
}
