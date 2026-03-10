import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLayout } from './shared/auth-layout/auth-layout';
import { Register } from './register/register';
import { Login } from './login/login';
import { ForgetPass } from './forget-pass/forget-pass';
import { ResetPass } from './reset-pass/reset-pass';
import { VerifyEmail } from './verify-email/verify-email';

const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [

      { path: 'register', component: Register },
      { path: 'login', component: Login },
      { path: 'forgot-password', component: ForgetPass },
      { path: 'reset-password', component: ResetPass },
      { path: 'verify-email', component: VerifyEmail },

      { path: '', redirectTo: 'register', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}