import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointments.service';
import { Appointment } from '../../../models/appointments.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-appointments',
  templateUrl: './user-appointments.component.html',
  styleUrls: ['./user-appointments.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class UserAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedOutlet: string = '';
  statusOptions = ["Order Placed", "In Transit", "Dispatch", "Delivery"];

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.selectedOutlet = localStorage.getItem('selectedOutlet') || '';
    if (this.selectedOutlet) {
      this.fetchAppointments();
    }
  }

  updateStatus(appointmentId: string, newStatus: string | undefined): void {
    if (!newStatus) {
      console.error("Invalid status update request."); 
      return; // Prevent the API call if newStatus is undefined
    }
  
    this.appointmentService.updatePaymentStatus(appointmentId, newStatus).subscribe(
      response => {
        console.log("Payment status updated successfully:", response);
      },
      error => {
        console.error("Error updating payment status:", error);
      }
    );
  }
  

  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByOutlet(this.selectedOutlet).subscribe({
      next: (data) => {
        this.appointments = data;
        this.totalPages = Math.ceil(this.appointments.length / this.itemsPerPage);
        this.currentPage = 1; 
      },
    });
  }

  get paginatedAppointments(): Appointment[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.appointments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getServiceNames(appointment: Appointment): string {
    return appointment?.services?.map(service => service?.name).join(', ') || 'No Services';
  }

  getStylistNames(appointment: Appointment): string {
    return appointment?.stylists?.join(', ') || 'No Stylists';
  }
}
