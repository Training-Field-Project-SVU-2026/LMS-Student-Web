import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';
import { AuthLayout } from './auth/shared/auth-layout/auth-layout';
import { authGuard, guestGuard } from './auth/guards/auth-guard';
import { AuthService } from './auth/services/auth';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
        canActivate: [() => {
          const auth = inject(AuthService);
          const router = inject(Router);

          return auth.isLoggedIn() ? router.createUrlTree(['/user-dashboard']) : true;
        }],
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: 'course/:slug',
        loadComponent: () =>
          import('./pages/course-details/course-details').then(m => m.CourseDetails),
      },
      {
        path: 'explore',
        loadComponent: () => import('./pages/explore/explore').then(m => m.Explore),
      },
      {
        path: 'explore/packages/:slug',
        loadComponent: () => import('./pages/package-details/package-details').then(m => m.PackageDetails),
      },
    ],
  },


  {
    path: 'auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () => import('./auth/login/login').then(m => m.Login),
      },
      {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () => import('./auth/register/register').then(m => m.Register),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./auth/forget-pass/forget-pass').then(m => m.ForgetPass),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./auth/reset-pass/reset-pass').then(m => m.ResetPass),
      },
      {
        path: 'verify-email',
        loadComponent: () => import('./auth/verify-email/verify-email').then(m => m.VerifyEmail),
      },
    ],
  },

  // Private — User dashboard
  {
    path: 'user-dashboard',
    component: PrivateLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/user-dashboard/user-dashboard').then(m => m.UserDashboard)
      }
    ]
  },
  {
    path: 'my-courses',
    component: PrivateLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./user-features/pages/my-courses/my-courses').then(m => m.MyCourses)
      }
    ]
  },
  {
    path: 'CourseWorkspace/:slug',
    component: PrivateLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./user-features/pages/course-workspace/course-workspace').then(m => m.CourseWorkspace)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'explore',
    component: PrivateLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/explore/explore').then(m => m.Explore)
      },
      {
        path: 'packages/:slug',
        loadComponent: () =>
          import('./pages/package-details/package-details').then(m => m.PackageDetails)
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.Home)
  },


  // Catch all
  { path: '**', redirectTo: '' },
];
