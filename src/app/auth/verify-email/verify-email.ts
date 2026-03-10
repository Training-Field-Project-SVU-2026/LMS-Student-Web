import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail {


  otpForm!: FormGroup;
  otpControls = Array(6);     
  isLoading = false;
  countdown = 90;               
  private timer: any;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    const group: any = {};
    for (let i = 0; i < 4; i++) {
      group[`digit${i}`] = ['', [Validators.required, Validators.pattern(/^\d$/)]];
    }
    this.otpForm = this.fb.group(group);
  }

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }


  startCountdown() {
    this.countdown = 60;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  get formattedCountdown(): string {
    const m = Math.floor(this.countdown / 60).toString().padStart(2, '0');
    const s = (this.countdown % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }


  onDigitInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');           
    input.value = value;
    this.otpForm.get(`digit${index}`)?.setValue(value);

    if (value && index < 3) {
      const next = document.querySelectorAll<HTMLInputElement>('input[formcontrolname]');
      next[index + 1]?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      const current = this.otpForm.get(`digit${index}`);
      if (!current?.value && index > 0) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[formcontrolname]');
        inputs[index - 1]?.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 4) ?? '';
    const inputs = document.querySelectorAll<HTMLInputElement>('input[formcontrolname]');
    pasted.split('').forEach((char, i) => {
      this.otpForm.get(`digit${i}`)?.setValue(char);
      if (inputs[i]) inputs[i].value = char;
    });
    inputs[Math.min(pasted.length, 3)]?.focus();
  }


  resendOtp() {
    const email = sessionStorage.getItem('reset_email') ?? '';

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.startCountdown();
        Swal.fire({
          icon: 'success',
          title: 'Code resent!',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: err.error?.message || 'Could not resend code'
        });
      }
    });
  }


  onSubmit() {

    if (this.otpForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete code',
        text: 'Please enter all 4 digits'
      });
      return;
    }

    this.isLoading = true;
    const otp = Object.values(this.otpForm.value).join('');
    const email = sessionStorage.getItem('reset_email') ?? '';

    // this.auth.verifyOtp({ email, otp }).subscribe({

    //   next: (res: any) => {
    //     this.isLoading = false;
    //     sessionStorage.removeItem('reset_email');

    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Verified!',
    //       text: res.message || 'Identity confirmed',
    //       timer: 1500,
    //       showConfirmButton: false
    //     });

    //     this.router.navigate(['/auth/reset-password']);
    //   },

    //   error: (err) => {
    //     this.isLoading = false;
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Invalid OTP',
    //       text: err.error?.message || 'The code is incorrect or expired'
    //     });
    //   }

    // });
  }

}
