import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.scss'],
})
export class AdminSignupComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    this.success = '';
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      roles: ['mod'],
    };

    this.authService.signup(userData).subscribe({
      next: (res) => {
        this.success = res.message || 'Moderator account created successfully.';
        Swal.fire({
          title: 'Success!',
          text: 'Moderator account has been created successfully.',
          icon: 'success',
          confirmButtonColor: '#DAA520',
        });
        this.username = '';
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        this.error = err.error.message || 'Signup failed';
        Swal.fire({
          title: 'Error!',
          text: this.error,
          icon: 'error',
          confirmButtonColor: '#8B5A2B',
        });
      },
    });
  }
}
