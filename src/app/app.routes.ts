import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Explore } from './pages/explore/explore';

export const routes: Routes = [
//   { path: '', redirectTo: 'auth', pathMatch: 'full' },
//   { path: 'home', component: Home },
//   { path: 'explore', component: Explore },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./auth/auth-module').then(m => m.AuthModule)
//   },
//   { path: '**', redirectTo: 'explore' }
// ];


  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then(m => m.AuthModule)
  }
];
