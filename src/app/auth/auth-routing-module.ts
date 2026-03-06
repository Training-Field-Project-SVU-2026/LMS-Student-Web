import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './login/login';
import { Register } from './register/register';
import { ForgetPass } from './forget-pass/forget-pass';
import { ResetPass } from './reset-pass/reset-pass';
import { VerifyEmail } from './verify-email/verify-email';

const routes: Routes = [

 {
  path: '',
  children: [

   { path: 'login', component: Login },

   { path: 'register', component: Register },

   { path: 'forgot-password', component: ForgetPass },

   { path: 'reset-password', component: ResetPass },

   { path: 'verify-email', component: VerifyEmail },

   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   }

  ]
 }

];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule]
})

export class AuthRoutingModule {}