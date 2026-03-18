import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth';
import { LoginResponse } from '../models/auth.models';   
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  showPassword = false;
  isLoading    = false;

  constructor(
    private fb:     FormBuilder,
    private authService:   AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  

  onSubmit() {

    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form',
        text: 'Please enter a valid email and password'
      });
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({

      next: (res: LoginResponse) => {
        this.isLoading = false;

        localStorage.setItem('access_token',  res.access);
        localStorage.setItem('refresh_token', res.refresh);

        localStorage.setItem('current_user', JSON.stringify(res));

        Swal.fire({
          icon: 'success',
          title: `Welcome Programming World!`,
          text: 'Logged in successfully',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/redirect']);  
        });
      },

      error: (err:HttpErrorResponse) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: err.error?.message || 'Invalid email or password'
        });
      }

    });
  }
}
  