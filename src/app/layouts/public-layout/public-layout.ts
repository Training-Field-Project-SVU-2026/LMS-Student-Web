// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavBar } from '../../components/shared/navbar/navbar';



import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/shared/navbar/navbar';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <router-outlet />
  `,
})
export class PublicLayout {}