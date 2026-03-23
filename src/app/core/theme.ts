import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private mediaQuery: MediaQueryList;

  constructor() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
  }

  initTheme() {
    const saved = localStorage.getItem('theme');

    if (saved) {
      if (saved === 'system') {
        this.setSystemTheme();
      } else {
        this.setTheme(saved);
      }
    } else {
      this.setSystemTheme();
    }
  }

  private handleSystemThemeChange(event: MediaQueryListEvent) {
    const saved = localStorage.getItem('theme');
    if (saved === 'system') {
      this.setTheme(event.matches ? 'dark' : 'light');
    }
  }

  private setSystemTheme() {
    const prefersDark = this.mediaQuery.matches;
    this.setTheme(prefersDark ? 'dark' : 'light');
    localStorage.setItem('theme', 'system');
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    this.setTheme(isDark ? 'light' : 'dark');
  }

  setTheme(theme: string) {
    if (theme === 'system') {
      this.setSystemTheme();
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }
}