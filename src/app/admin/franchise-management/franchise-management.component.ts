import { Component, OnInit } from '@angular/core';
import { AdminRequestService } from '../../services/admin-request.service';
import { CommonModule, NgFor } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-franchise-management',
  imports: [CommonModule, NgFor],
  templateUrl: './franchise-management.component.html',
  styleUrl: './franchise-management.component.scss',
  standalone: true,
})
export class FranchiseManagementComponent implements OnInit {
  requests: any[] = [];
  paginatedRequests: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  showServiceDialog: boolean = false;
  showStylistDialog: boolean = false;

  selectedServices: any[] = [];
  selectedMaleStylists: string[] = [];
  selectedFemaleStylists: string[] = [];

  constructor(private adminRequestService: AdminRequestService) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.adminRequestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data.map((req) => ({
          ...req,
          _id: req._id || req.id || req.requestId,
        }));
        this.updatePagination();
      },
      error: () => {
        Swal.fire('Error', 'Failed to fetch requests.', 'error');
      },
    });
  }

  updateStatus(requestId: string | undefined, status: string, message: string) {
    if (!requestId) {
      Swal.fire(
        'Error',
        'Unable to update request due to missing ID.',
        'error'
      );
      return;
    }

    this.adminRequestService
      .updateRequestStatus(requestId, status, message)
      .subscribe({
        next: () => {
          Swal.fire('Success', 'Request updated successfully.', 'success');
          this.getRequests();
        },
        error: () => {
          Swal.fire(
            'Error',
            'Failed to update request. Please try again.',
            'error'
          );
        },
      });
  }
  viewServices(services: any[]): void {
    this.selectedServices = services || [];
    this.showServiceDialog = true;
  }

  viewStylists(stylists: any[]): void {
    this.selectedMaleStylists = stylists
      .filter((stylist) => stylist.gender === 'Male')
      .map((stylist) => stylist.stylistName);

    this.selectedFemaleStylists = stylists
      .filter((stylist) => stylist.gender === 'Female')
      .map((stylist) => stylist.stylistName);

    this.showStylistDialog = true;
  }

  closeDialog(): void {
    this.showServiceDialog = false;
    this.showStylistDialog = false;
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRequests = this.requests.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.requests.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
