import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Settings } from '../user-services/settings';
@Component({
  selector: 'app-security',
  imports: [],
  templateUrl: './security.html',
  styleUrl: './security.css',
})
export class Security {
form: FormGroup;
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);
  successMsg = signal('');
  errorMsg = signal('');
  loading = signal(false);
 
  constructor(private fb: FormBuilder, private settings: Settings) {
    this.form = this.fb.group(
      {
        old_password: ['', Validators.required],
        new_password: ['', [Validators.required, Validators.minLength(8)]],
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.successMsg.set('');
    this.errorMsg.set('');
 
    const { old_password, new_password } = this.form.value;
    this.settings.changePassword({ old_password, new_password }).subscribe({
      next: res => {
        this.successMsg.set(res.message);
        this.form.reset();
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set('Failed to update password. Please try again.');
        this.loading.set(false);
      },
    });
  }
 
  get f() { return this.form.controls; }
}
