import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AppointmentService } from '../services/appointments.service';
import { Router } from '@angular/router';
import { CommonModule,NgFor } from '@angular/common';

@Component({
  selector: 'app-moderator-hub',
  templateUrl: './moderator-hub.component.html',
  styleUrls: ['./moderator-hub.component.scss'],
  imports : [CommonModule,NgFor,ReactiveFormsModule]

})
export class ModeratorHubComponent implements OnInit {
  states: string[] = [];
  cities: string[] = [];
  outlets: string[] = [];
  
  moderatorForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    this.moderatorForm = this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      outlet: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchStates();
  }

  fetchStates(): void {
    this.appointmentService.getStates().subscribe({
      next: (data) => this.states = data,
    });
  }

  fetchCities(): void {
    const selectedState = this.moderatorForm.get('state')?.value;
    if (selectedState) {
      this.appointmentService.getCities(selectedState).subscribe({
        next: (data) => this.cities = data,
      });
    }
  }

  fetchOutlets(): void {
    const selectedCity = this.moderatorForm.get('city')?.value;
    if (selectedCity) {
      this.appointmentService.getOutlets(selectedCity).subscribe({
        next: (data) => this.outlets = data,
      });
    }
  }

  proceed(): void {
    if (this.moderatorForm.valid) {
      const selectedOutlet = this.moderatorForm.value.outlet;
      localStorage.setItem('selectedOutlet', selectedOutlet);
      this.router.navigate(['/moderator/moderator-statistics']);
    } 
  }
}
