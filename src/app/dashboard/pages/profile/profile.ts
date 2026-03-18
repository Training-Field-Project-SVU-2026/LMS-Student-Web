import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Settings } from '../../../user-services/settings';
import Swal from 'sweetalert2';
import { Student } from '../../../models/user.models';
import { AuthService } from '../../../auth/services/auth';


@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit { profile  = signal<Student | null>(null);
  isEditing   = signal(false);
  saveSuccess = signal(false);
  loading     = signal(false);

  editForm!: FormGroup;

  constructor(
    private settings: Settings,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.settings.getProfile().subscribe({
      next: (student) => {
        this.profile.set(student);
        this.editForm = this.fb.group({
          first_name: [student.first_name, Validators.required],
          last_name:  [student.last_name,  Validators.required],
          email:      [student.email, [Validators.required, Validators.email]],
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load profile. Please try again.',
          icon: 'error',
        });
      },
    });
  }

  get fullName(): string {
    const p = this.profile();
    return p ? `${p.first_name} ${p.last_name}` : '';
  }

  get initials(): string {
    const p = this.profile();
    if (!p) return '';
    return `${p.first_name[0]}${p.last_name[0]}`.toUpperCase();
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
        last_name:  p.last_name,
        email:      p.email,
      });
    }
  }

  saveEdit(): void {
    if (this.editForm.invalid) return;
    const p = this.profile();
    if (!p) return;

    this.loading.set(true);
    this.settings.updateProfile(p.slug, this.editForm.value).subscribe({
      next: (updated) => {
        this.profile.set(updated);
        this.isEditing.set(false);
        this.loading.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: () => {
        this.loading.set(false);
        Swal.fire({
          title: 'Error',
          text: 'Failed to update profile. Please try again.',
          icon: 'error',
        });
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
        //   next:  () => { localStorage.clear(); this.router.navigate(['/auth/login']); },
        //   error: () => { localStorage.clear(); this.router.navigate(['/auth/login']); },
        // });
      }
    });
  }
}