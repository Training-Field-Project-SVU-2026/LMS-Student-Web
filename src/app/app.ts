import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar";
import { ThemeService } from './core/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
    constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.initTheme(); 
  }
}
