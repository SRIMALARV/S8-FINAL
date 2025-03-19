import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '../../services/appointments.service';
import { StylistResponse, ViewService } from '../../view-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.scss'],
  imports: [CommonModule, NgFor, ReactiveFormsModule],
})
export class ViewServicesComponent implements OnInit {
  selectedOutlet: string | null = null;
  selectedGender: string = 'Male';
  services: any[] = [];
  stylists: string[] = [];
  loadingServices: boolean = false;
  loadingStylists: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private viewService: ViewService
  ) {}

  ngOnInit(): void {
    this.selectedOutlet = localStorage.getItem('selectedOutlet');
    if (!this.selectedOutlet) {
      this.errorMessage =
        'No outlet selected. Please go back and select an outlet.';
      return;
    }

    this.fetchServices();
    this.fetchStylists();
  }

  fetchServices() {
    if (!this.selectedOutlet) return;
    this.loadingServices = true;

    this.appointmentService
      .getServices(this.selectedOutlet, this.selectedGender)
      .subscribe({
        next: (data) => {
          this.services = data;
          this.loadingServices = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load services.';
          this.loadingServices = false;
        },
      });
  }

  fetchStylists() {
    if (!this.selectedOutlet) {
      return;
    }

    this.loadingStylists = true;

    this.viewService
      .getStylists(this.selectedOutlet, this.selectedGender)
      .subscribe({
        next: (response: StylistResponse) => {
          this.stylists =
            this.selectedGender === 'Male'
              ? response.maleStylists || []
              : response.femaleStylists || [];

          this.loadingStylists = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load stylists.';
          this.loadingStylists = false;
        },
      });
  }

  onGenderChange(gender: string) {
    this.selectedGender = gender;
    this.fetchServices();
    this.fetchStylists();
  }
}
