import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule,RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,RouterLinkActive],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
        text: 'Please enter a valid email and password',
      });
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({

      next: () => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: 'Welcome!',
          text: 'Logged in successfully',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {


          const pendingCourse = localStorage.getItem('pendingCourseSlug');
          if (pendingCourse) {
            localStorage.removeItem('pendingCourseSlug');
            this.router.navigate(['/course', pendingCourse]);
            return;
          }
          const pendingPackage = localStorage.getItem('pendingPackageSlug');
          if (pendingPackage) {
            localStorage.removeItem('pendingPackageSlug');
            this.router.navigate(['/explore/packages', pendingPackage]);
            return;
          }
          const redirectUrl = localStorage.getItem('redirectUrl') || '/user-dashboard';
          localStorage.removeItem('redirectUrl');
          this.router.navigate([redirectUrl]);
        });
      },

      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: err.error?.detail || err.error?.message || 'Invalid email or password',
        });
      },

    });
  }
}
