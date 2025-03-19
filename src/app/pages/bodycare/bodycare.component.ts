import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodycare',
  imports: [],
  templateUrl: './bodycare.component.html',
  styleUrl: './bodycare.component.scss',
})
export class BodycareComponent {
  constructor(private router: Router) {}

  navigateToAppointment() {
    this.router.navigate(['/appointment']);
  }
}
