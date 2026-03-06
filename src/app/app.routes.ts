import { Routes } from '@angular/router';
import { ThemeService } from './core/theme';
import { AuthModule } from './auth/auth-module';

export const routes: Routes = [

    {
        path: '',
        component: ThemeService
    },
     {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-module').then(m => m.AuthModule)
  },
];
