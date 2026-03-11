import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { Register } from './register/register';
import { RouterModule } from '@angular/router';
import { Login } from './login/login';
import { ForgetPass } from './forget-pass/forget-pass';
import { ResetPass } from './reset-pass/reset-pass';
import { VerifyEmail } from './verify-email/verify-email';
import { Redirect } from './shared/redirect/redirect';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    Login,
    Register,
    ForgetPass,
    ResetPass,
    VerifyEmail,
    Redirect
  ]
})
export class AuthModule { }
