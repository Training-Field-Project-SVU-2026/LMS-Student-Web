import { Component, inject, DestroyRef, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../../core/theme';
import { AuthService } from '../../../auth/services/auth';
import { AlertService } from '../../../shared/services/alert';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {


  private router = inject(Router);
  private theme = inject(ThemeService);
  private auth = inject(AuthService);
  private alert = inject(AlertService);
  private destroyRef = inject(DestroyRef);

  // ── UI state ────────────────────────────────────────────────────────────
  isProfileMenuOpen = false;
  isMobileMenuOpen = false;


  isLoggedIn = this.auth.isLoggedIn;

  username = computed(() => {
    const user = this.auth.currentUser();
    if (!user) return null;
    return `${user.first_name || ''} ${user.last_name || ''}`.trim() || null;
  });

  userAvatar = computed(() => {
    const user = this.auth.currentUser();
    return user?.first_name?.charAt(0).toUpperCase() ?? null;
  });

  isDark = signal(document.documentElement.classList.contains('dark'));

  constructor() {

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.isProfileMenuOpen = false;
      this.isMobileMenuOpen = false;
    });
  }

  // ── Close dropdown when clicking outside ────────────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu-wrapper')) {
      this.isProfileMenuOpen = false;
    }
  }

  // ── Theme ────────────────────────────────────────────────────────────────
  toggleTheme() {
    this.theme.toggleTheme();
    this.isDark.set(document.documentElement.classList.contains('dark'));
  }

  // ── Auth actions ─────────────────────────────────────────────────────────
  logout() {
    this.auth.logout();
    this.isProfileMenuOpen = false;
  }

  goLogin() {
    this.router.navigate(['/auth/login']);
    this.isMobileMenuOpen = false;
  }

  goMyCourses() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.alert.requireLogin('Please login to access My Courses.', '/user-dashboard');
    }
    this.isMobileMenuOpen = false;
  }

  goSignup() {
    this.router.navigate(['/auth/register']);
    this.isMobileMenuOpen = false;
  }

  goDashboard() {
    this.router.navigate(['/dashboard/profile']);
    this.isProfileMenuOpen = false;
  }


  // ── Mobile ───────────────────────────────────────────────────────────────
  toggleMobileMenu() { this.isMobileMenuOpen = !this.isMobileMenuOpen; }
  toggleProfileMenu() { this.isProfileMenuOpen = !this.isProfileMenuOpen; }
}
