import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class PreferenceService {
  private readonly THEME_KEY = 'pref_theme';
  private readonly LANG_KEY = 'pref_lang';
  private readonly NOTIF_KEY = 'pref_notif';

  theme = signal<ThemeMode>((localStorage.getItem(this.THEME_KEY) as ThemeMode) || 'system');
  language = signal<string>(localStorage.getItem(this.LANG_KEY) || 'English');
  notifications = signal<boolean>(localStorage.getItem(this.NOTIF_KEY) !== 'false');

  constructor() {
    // Automatically persist changes
    effect(() => {
      localStorage.setItem(this.THEME_KEY, this.theme());
    });
    effect(() => {
      localStorage.setItem(this.LANG_KEY, this.language());
    });
    effect(() => {
      localStorage.setItem(this.NOTIF_KEY, this.notifications().toString());
    });
  }

  init() {
    this.applyTheme(this.theme());
  }

  setTheme(mode: ThemeMode) {
    this.theme.set(mode);
    this.applyTheme(mode);
  }

  private applyTheme(mode: ThemeMode) {
    let actualMode = mode;
    if (mode === 'system') {
      actualMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (actualMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
