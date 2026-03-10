import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../services/auth';

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

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
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
        text: 'Please enter a valid email and password'
      });
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login({ email, password }).subscribe({

      next: (res: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Welcome back!',
          text: res.message || 'Logged in successfully',
          timer: 1500,
          showConfirmButton: false
        });


        this.router.navigate(['/']);

      },

      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Login failed',
          text: err.error?.message || 'Invalid email or password'
        });

      }

    });

  }

}