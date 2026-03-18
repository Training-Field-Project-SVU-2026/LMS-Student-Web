import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-pass.html',
  styleUrl: './reset-pass.css',
})
export class ResetPass implements OnInit, OnDestroy {

  resetForm!: FormGroup;

  isLoading = false;
  showPassword = false;
  showConfirm = false;

  otpControls = Array(6);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    const group: any = {};

    for (let i = 0; i < 6; i++) {
      group[`digit${i}`] = ['', [Validators.required, Validators.pattern(/^\d$/)]];
    }

    group['new_password'] = ['', [Validators.required, Validators.minLength(8)]];
    group['confirm_password'] = ['', Validators.required];

    this.resetForm = this.fb.group(group, { validators: this.passwordMatchValidator });
  }

  ngOnDestroy() { }

  passwordMatchValidator(group: AbstractControl) {
    const pw = group.get('new_password')?.value;
    const cpw = group.get('confirm_password')?.value;
    return pw === cpw ? null : { passwordMismatch: true };
  }

  get pw(): string {
    return this.resetForm?.get('new_password')?.value ?? '';
  }

  get hasMinLength(): boolean { return this.pw.length >= 8; }
  get hasNumber(): boolean { return /[0-9]/.test(this.pw); }
  get hasSpecial(): boolean { return /[@#$%^&*!]/.test(this.pw); }

  onDigitInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value;
    this.resetForm.get(`digit${index}`)?.setValue(value);


    if (value && index < 5) {
      const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
      inputs[index + 1]?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      const current = this.resetForm.get(`digit${index}`);
      if (!current?.value && index > 0) {
        const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
        inputs[index - 1]?.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) ?? '';
    const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
    pasted.split('').forEach((char, i) => {
      this.resetForm.get(`digit${i}`)?.setValue(char);
      if (inputs[i]) inputs[i].value = char;
    });
    inputs[Math.min(pasted.length, 5)]?.focus();
  }

  // ── Submit ─────
  onSubmit() {

    const otpInvalid = [0, 1, 2, 3, 4, 5].some(i =>
      this.resetForm.get(`digit${i}`)?.invalid
    );

    if (otpInvalid) {
      Swal.fire({ icon: 'error', title: 'Incomplete OTP', text: 'Please enter all 6 digits.' });
      return;
    }

    if (this.resetForm.get('new_password')?.invalid) {
      Swal.fire({ icon: 'error', title: 'Weak password', text: 'Password must be at least 8 characters.' });
      return;
    }

    if (this.resetForm.hasError('passwordMismatch')) {
      Swal.fire({ icon: 'error', title: 'Mismatch', text: 'Passwords do not match.' });
      return;
    }

    this.isLoading = true;

    const otp = [0, 1, 2, 3, 4, 5].map(i => this.resetForm.get(`digit${i}`)?.value).join('');
    const newPassword = this.resetForm.get('new_password')?.value;

    this.authService.resetPassword({ otp, new_password: newPassword }).subscribe({

      next: (res: any) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: 'Password reset!',
          text: res.message || 'You can now log in with your new password.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/auth/login']);
        });
      },

      error: (err: HttpErrorResponse) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'error',
          title: 'Reset failed',
          text: err.error?.message || 'Invalid OTP or something went wrong.'
        });
      }

    });
  }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirm() { this.showConfirm = !this.showConfirm; }
}