import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../core/api-endpoints';
import { Auth } from '../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  

  
  showPassword = false;
  showConfirm = false;
  registerForm!: FormGroup;


  constructor(private fb: FormBuilder, private http: HttpClient, private auth: Auth) {

    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirm() {
    this.showConfirm = !this.showConfirm;
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid form',
        text: 'Please fill all fields correctly'
      });
      return;
    }

    const { first_name, last_name, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password mismatch',
        text: 'Passwords do not match'
      });
      return;
    }

    const body = {
      first_name,
      last_name,
      email,
      password
    };

    this.auth.register(body).subscribe({

      next: (res: any) => {

        Swal.fire({
          icon: 'success',
          title: 'Account created!',
          text: res.message
        });

        this.registerForm.reset();

      },

      error: (err) => {

        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: err.error?.message || 'Something went wrong'
        });

      }

    });

  }
}

