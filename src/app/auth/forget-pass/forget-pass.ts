import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-pass',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-pass.html',
  styleUrl: './forget-pass.css',
})
export class ForgetPass {

  forgotForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

    if (this.forgotForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid email',
        text: 'Please enter a valid email address'
      });
      return;
    }

    this.isLoading = true;
    const { email } = this.forgotForm.value;

    this.auth.forgotPassword(email).subscribe({

      next: (res: any) => {
        this.isLoading = false;
        sessionStorage.setItem('reset_email', email);

        Swal.fire({
          icon: 'success',
          title: 'Please check your email !',
          text: res.message || 'We have sent you a OTP',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/auth/reset-pass']);
        });
      },

      error: (err) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: err.error?.message || 'Something went wrong. Please try again.'
        });
      }

    });
  }

}
