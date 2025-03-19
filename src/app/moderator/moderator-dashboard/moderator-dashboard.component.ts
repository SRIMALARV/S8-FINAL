import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-moderator-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './moderator-dashboard.component.html',
  styleUrl: './moderator-dashboard.component.scss',
})
export class ModeratorDashboardComponent {}
