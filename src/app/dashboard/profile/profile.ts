import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Settings } from '../user-services/settings';
@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
 profile = signal<UserProfile | null>(null);
  isEditing = signal(false);
  saveSuccess = signal(false);
 
  editForm!: FormGroup;
 
  constructor(private settings: Settings, private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.settings.getProfile().subscribe(p => {
      this.profile.set(p);
      this.editForm = this.fb.group({
        fullName: [p.fullName, Validators.required],
        email: [p.email, [Validators.required, Validators.email]],
      });
    });
  }
 
  openEdit(): void {
    this.isEditing.set(true);
    this.saveSuccess.set(false);
  }
 
  cancelEdit(): void {
    this.isEditing.set(false);
    const p = this.profile();
    if (p) this.editForm.patchValue({ fullName: p.fullName, email: p.email });
  }
 
  saveEdit(): void {
    if (this.editForm.invalid) return;
    this.settings.updateProfile(this.editForm.value).subscribe(updated => {
      this.profile.set(updated);
      this.isEditing.set(false);
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3000);
    });
  }


    signedOut = signal(false);
  deleted = signal(false);
 
  constructor(private profileService: ProfileService) {}
 
  onSignOut(): void {
    this.profileService.signOut().subscribe(() => {
      this.signedOut.set(true);
    });
  }
 
  onDeleteAccount(): void {
    const confirmed = window.confirm(
      'Are you sure? This will permanently delete your account and all data.'
    );
    if (confirmed) {
      this.profileService.deleteAccount().subscribe(() => {
        this.deleted.set(true);
      });
    }
  }

}
