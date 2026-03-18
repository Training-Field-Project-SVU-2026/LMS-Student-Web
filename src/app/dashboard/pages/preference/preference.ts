import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { signal } from '@angular/core';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preference',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './preference.html',
  styleUrl: './preference.css',
})
export class Preference {

form: FormGroup;
  saved = signal(false);

  languages = ['English', 'Arabic'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      language: ['English'],
      theme: ['system'],
      emailNotifications: [true],
    });
  }

  save(): void {
    Swal.fire({
      title: 'Preferences Saved',
      text: 'Your preferences have been updated successfully.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2500);
  }
}
