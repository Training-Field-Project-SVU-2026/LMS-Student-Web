import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';
import { authGuard } from './auth/guards/auth-guard';
import { Profile } from './dashboard/profile/profile';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Notifications } from './dashboard/notifications/notifications';
import { Security } from './dashboard/security/security';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home').then(m => m.Home),
      },
      {
        path: 'explore',
        loadComponent: () =>
          import('./pages/explore/explore').then(m => m.Explore),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth-module').then(m => m.AuthModule),
      },
    ],
  },

  {
    path: 'app',
    component: PrivateLayout,
    canActivate: [authGuard],
    children: [

      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }


    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'profile', component: Profile },
      { path: 'notifications', component: Notifications },
      { path: 'security', component: Security },
    ],
  },

  { path: '**', redirectTo: '' },
];