import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moderator-signup',
  standalone: true,
  templateUrl: './moderator-sign-up.component.html',
  styleUrls: ['./moderator-sign-up.component.scss'],
  imports: [NgIf, CommonModule, FormsModule],
})
export class ModeratorSignupComponent {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.error = '';
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.signup(userData).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Success!',
          text: res.message || 'User account created successfully.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          this.username = '';
          this.email = '';
          this.password = '';
        });
      },
      error: (err) => {
        this.error = err.error.message || 'Signup failed';
      },
    });
  }
}
