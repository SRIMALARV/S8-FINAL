import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-haircare',
  imports: [],
  templateUrl: './haircare.component.html',
  styleUrl: './haircare.component.scss',
})
export class HaircareComponent {
  constructor(private router: Router) {}

  navigateToAppointment() {
    this.router.navigate(['/appointment']);
  }
}
