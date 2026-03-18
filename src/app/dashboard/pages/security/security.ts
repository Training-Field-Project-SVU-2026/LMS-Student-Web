import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Settings } from '../../../user-services/settings';
import Swal from 'sweetalert2';
import { signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth';


@Component({
  selector: 'app-security',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './security.html',
  styleUrl: './security.css',
})
export class Security {
 form: FormGroup;
  showCurrent = signal(false);
  showNew     = signal(false);
  showConfirm = signal(false);
  successMsg  = signal('');
  errorMsg    = signal('');
  loading     = signal(false);

  constructor(
    private fb: FormBuilder,
    private settings: Settings,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group(
      {
        old_password:     ['', Validators.required],
        new_password:     ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  private passwordsMatch(g: FormGroup) {
    const np = g.get('new_password')?.value;
    const cp = g.get('confirm_password')?.value;
    return np === cp ? null : { mismatch: true };
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading.set(true);
    this.successMsg.set('');
    this.errorMsg.set('');

    const { old_password, new_password } = this.form.value;
    this.settings.changePassword({ old_password, new_password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.form.reset();
        Swal.fire({
          title: 'Password Updated',
          text: 'Your password has been changed successfully.',
          icon: 'success',
        });
      },
      error: () => {
        this.loading.set(false);
        this.errorMsg.set('Failed to update password. Please check your current password and try again.');
      },
    });
  }

  onSignOut(): void {
    Swal.fire({
      title: 'Sign Out',
      text: 'Are you sure you want to sign out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
         this.auth.logout();
        // const refresh = localStorage.getItem('refresh_token') ?? '';
        // this.settings.logout({ refresh }).subscribe({
        //   next: () => { localStorage.clear(); this.router.navigate(['/auth/login']); },
        //   error: () => { localStorage.clear(); this.router.navigate(['/auth/login']); },
        // });
      }
    });
  }


   get f() { return this.form.controls; }
}
