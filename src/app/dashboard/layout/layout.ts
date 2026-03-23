import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarProfile } from '../side-bar-profile/side-bar-profile';
import { Student } from '../../models/user.models';
import { ThemeService } from '../../core/theme';
import { AuthService } from '../../auth/services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarProfile],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  private auth = inject(AuthService);
  student = this.auth.currentUser;

  constructor(private theme: ThemeService) {}

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
