import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar";
import { ThemeService } from './core/theme';
//navbar is not used
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
    constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.initTheme(); 
  }
}
