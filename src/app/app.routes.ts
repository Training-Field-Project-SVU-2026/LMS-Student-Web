import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';
import { authGuard, guestGuard } from './auth/guards/auth-guard';

export const routes: Routes = [

  //  Public — landing + explore 
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
    ],
  },

  // Auth —
  {
    path: 'auth',
    component: PublicLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./auth/login/login').then(m => m.Login),
      },
      {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./auth/register/register').then(m => m.Register),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./auth/forget-pass/forget-pass').then(m => m.ForgetPass),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./auth/reset-pass/reset-pass').then(m => m.ResetPass),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./auth/verify-email/verify-email').then(m => m.VerifyEmail),
      },
    ],
  },

  // Private —--> home-user /dashboard
  {
    path: '',
    component: PrivateLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home-user',
        loadComponent: () =>
          import('./pages/home-user/home-user').then(m => m.HomeUser),
      },
    ],
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },


  { path: '**', redirectTo: '' },
];