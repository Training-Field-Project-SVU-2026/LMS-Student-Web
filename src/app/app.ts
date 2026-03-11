import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/theme';
import { AuthModule } from './auth/auth-module';
import { LucideAngularModule } from 'lucide-angular';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AuthModule, LucideAngularModule],
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
   
 

}
