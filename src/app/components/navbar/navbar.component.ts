import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  currentUser$: Observable<User | null>;

  constructor(public authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$;
  }

  navigateToAppointment() {
    this.router.navigate(['/appointment']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
