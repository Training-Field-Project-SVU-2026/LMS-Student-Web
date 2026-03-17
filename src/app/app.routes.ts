import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',

        canActivate: [() => {
          const router = inject(Router);
          const token = localStorage.getItem('access_token');
          return token ? router.createUrlTree(['/dashboard']) : true;
        }],
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
      },
      {
        path: 'dashboard',

        loadComponent: () => import('./pages/user-dashboard/user-dashboard').then(m => m.UserDashboard),
        canActivate: [authGuard]
      },
      {
        path: 'explore',
        loadComponent: () => import('./pages/explore/explore').then(m => m.Explore),
        canActivate: [authGuard]
      },
      {
        path: 'course/:slug',
        loadComponent: () => import('./pages/course-details/course-details').then(m => m.CourseDetails)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
