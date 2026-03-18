import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarProfile } from '../side-bar-profile/side-bar-profile';
import { signal } from '@angular/core';
import { Student } from '../../models/user.models';
import { Settings } from '../../user-services/settings';
import { ThemeService } from '../../core/theme';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarProfile],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
   student = signal<Student | null>(null);

  constructor(private settings: Settings, private theme: ThemeService) {}

  ngOnInit(): void {
    this.settings.getProfile().subscribe({
      next: (s) => this.student.set(s),
      error: () => {},
    });
  }

    toggleTheme() {
    this.theme.toggleTheme();
  }

get isDark() {
  return document.documentElement.classList.contains('dark');
}

  get fullName(): string {
    const s = this.student();
    return s ? `${s.first_name} ${s.last_name}` : '';
  }

  get initials(): string {
    const s = this.student();
    if (!s) return '';
    return `${s.first_name[0]}${s.last_name[0]}`.toUpperCase();
  }

}
