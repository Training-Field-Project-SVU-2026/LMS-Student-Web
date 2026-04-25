import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { RouterModule } from '@angular/router';
import { VerifyEmail } from './verify-email/verify-email';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
  ]
})
export class AuthModule { }

