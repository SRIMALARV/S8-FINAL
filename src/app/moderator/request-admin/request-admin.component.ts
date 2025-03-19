import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminRequestService } from '../../services/admin-request.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-admin',
  imports: [
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    NgFor,
    ReactiveFormsModule,
    RouterModule,
    RouterLink,
  ],
  templateUrl: './request-admin.component.html',
  styleUrl: './request-admin.component.scss',
})
export class RequestAdminComponent implements OnInit {
  requestForm!: FormGroup;
  states: string[] = [];
  cities: string[] = [];
  outlets: string[] = [];
  requests: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  isDialogOpen: boolean = false;
  dialogTitle: string = '';
  dialogType: string = '';
  dialogData: any;

  constructor(
    private fb: FormBuilder,
    private adminRequestService: AdminRequestService
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      outlet: ['', Validators.required],
      services: this.fb.array([]),
      stylists: this.fb.array([]),
    });

    this.fetchStates();
    const selectedOutlet = localStorage.getItem('selectedOutlet');
    if (selectedOutlet) {
      this.getModeratorRequests(selectedOutlet);
    }
  }

  fetchStates() {
    this.adminRequestService
      .getStates()
      .subscribe((data) => (this.states = data));
  }

  fetchCities() {
    const state = this.requestForm.get('state')?.value;
    if (state) {
      this.adminRequestService
        .getCities(state)
        .subscribe((data) => (this.cities = data));
    }
  }

  fetchOutlets() {
    const city = this.requestForm.get('city')?.value;
    if (city) {
      this.adminRequestService
        .getOutlets(city)
        .subscribe((data) => (this.outlets = data));
    }
  }

  get services(): FormArray {
    return this.requestForm.get('services') as FormArray;
  }

  addService() {
    this.services.push(
      this.fb.group({
        serviceName: ['', Validators.required],
        cost: ['', Validators.required],
        gender: ['', Validators.required],
      })
    );
  }

  get stylists(): FormArray {
    return this.requestForm.get('stylists') as FormArray;
  }

  addStylist() {
    this.stylists.push(
      this.fb.group({
        name: ['', Validators.required],
        gender: ['', Validators.required],
      })
    );
  }

  submitRequest() {
    if (this.requestForm.valid) {
      this.adminRequestService
        .submitModeratorRequest(this.requestForm.value)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Request Sent',
            text: 'Your request has been successfully sent to the admin.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });

          this.requestForm.reset();
        });
    }
  }

  getModeratorRequests(outlet: string) {
    this.adminRequestService.getModeratorRequests(outlet).subscribe((data) => {
      this.requests = data;
      this.totalPages = Math.ceil(this.requests.length / this.itemsPerPage);
      this.currentPage = 1;
    });
  }

  get paginatedRequests(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.requests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  openDialog(type: string, data: any) {
    this.isDialogOpen = true;
    this.dialogType = type;
    this.dialogData = data;

    switch (type) {
      case 'service':
        this.dialogTitle = 'Service Details';
        break;
      case 'stylist':
        this.dialogTitle = 'Stylist Details';
        break;
      case 'message':
        this.dialogTitle = 'Admin Message';
        break;
    }
  }
  closeDialog() {
    this.isDialogOpen = false;
  }
}
