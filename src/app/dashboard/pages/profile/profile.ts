import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap, catchError, EMPTY } from 'rxjs';
import { Settings } from '../../../user-services/settings';
import { AuthService } from '../../../auth/services/auth';
import { Student } from '../../../models/user.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  profile = signal<Student | null>(null);
  isEditing = signal(false);
  saveSuccess = signal(false);
  loading = signal(false);
  fetching = signal(true);

  editForm: FormGroup = this.buildForm();

  constructor(
    private settings: Settings,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.fetching.set(true);

    this.auth.authReady$.subscribe({
      next: () => {
        const student = this.auth.currentUser();
        if (student) {
          this.profile.set(student);
          this.editForm.patchValue({
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
          });
          this.fetching.set(false);
        } else {
          this.fetching.set(false);
        }
      },
      error: () => {
        this.fetching.set(false);
        Swal.fire({
          title: 'Error',
          text: 'Failed to load profile. Please try again.',
          icon: 'error',
        });
      }
    });
  }

  get fullName(): string {
    const p = this.profile();
    return p ? `${p.first_name} ${p.last_name}`.trim() : '';
  }

  get initials(): string {
    const p = this.profile();
    if (!p) return '';
    return `${p.first_name.charAt(0)}${p.last_name.charAt(0)}`.toUpperCase();
  }

  openEdit(): void {
    this.isEditing.set(true);
    this.saveSuccess.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    const p = this.profile();
    if (p) {
      this.editForm.patchValue({
        first_name: p.first_name,
        last_name: p.last_name,
        email: p.email,
      });
    }
    this.editForm.markAsPristine();
    this.editForm.markAsUntouched();
  }

  saveEdit(): void {
    this.editForm.markAllAsTouched();
    if (this.editForm.invalid) return;

    const p = this.profile();
    if (!p) return;

    this.loading.set(true);

    this.settings.updateProfile(p.slug, this.editForm.value).subscribe({
      next: (updated) => {
        this.profile.set(updated);
        this.auth.currentUser.set(updated);
        this.isEditing.set(false);
        this.loading.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: (err) => {
        this.loading.set(false);
        const serverErrors = err?.error;
        let errorText = 'Failed to update profile. Please try again.';
        if (serverErrors && typeof serverErrors === 'object') {
          const messages = Object.values(serverErrors).flat().join(' ');
          if (messages) errorText = messages;
        }
        Swal.fire({ title: 'Error', text: errorText, icon: 'error' });
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
      }
    });
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

    }