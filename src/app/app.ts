import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme';
import Swal from 'sweetalert2';
import { Button } from "./components/shared/button/button";
import { NavbarComponent } from "./components/shared/navbar/navbar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private themeService: ThemeService) {}
  ngOnInit() {
    this.themeService.initTheme();
  }
  protected readonly title = signal('lms-student-web');
    testAlert() {
    Swal.fire({
      title: 'Done 🎉',
      text: 'Operation completed successfully',
      icon: 'success'
    });
  }
  toggleTheme() {
  document.documentElement.classList.toggle('dark');
}
}
