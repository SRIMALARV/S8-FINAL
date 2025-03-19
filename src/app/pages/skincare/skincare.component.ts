import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skincare',
  imports: [],
  templateUrl: './skincare.component.html',
  styleUrl: './skincare.component.scss',
})
export class SkincareComponent {
  constructor(private router: Router) {}

  navigateToAppointment() {
    this.router.navigate(['/appointment']);
  }
}
