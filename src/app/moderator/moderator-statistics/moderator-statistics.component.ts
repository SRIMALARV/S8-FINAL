import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AppointmentService } from '../../services/appointments.service';
import { Appointment } from '../../../models/appointments.model';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import moment from 'moment';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-moderator-statistics',
  templateUrl: './moderator-statistics.component.html',
  styleUrls: ['./moderator-statistics.component.scss'],
  imports: [CommonModule, NgFor, FormsModule],
})
export class ModeratorStatisticsComponent implements OnInit, AfterViewInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  selectedOutlet: string = '';
  filterType: string = 'day';
  totalRevenue: number = 0;
  totalAppointments: number = 0;
  uniqueCustomers: number = 0;
  stylistStats: { name: string; serviceCount: number; bonus: number }[] = [];
  selectedYear: string = moment().format('YYYY');
  selectedMonth: string = moment().format('MMMM');
  years: string[] = [];
  months: string[] = moment.months();

  serviceStats: { name: string; count: number }[] = [];
  @ViewChild('serviceChart') serviceChartRef!: ElementRef;
  serviceChart!: Chart;

  @ViewChild('revenueChart') revenueChartRef!: ElementRef;
  revenueChart!: Chart;

  constructor(private appointmentService: AppointmentService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.selectedOutlet = localStorage.getItem('selectedOutlet') || '';
    this.years = Array.from({ length: 5 }, (_, i) =>
      (moment().year() - i).toString()
    );
    if (this.selectedOutlet) {
      this.fetchAppointments();
    }
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.initServiceChart();
  }
  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByOutlet(this.selectedOutlet).subscribe({
      next: (data) => {
        console.log('Fetched Appointments:', data); // Debugging
        this.appointments = data.filter((appt) => {
          const apptDate = moment(appt.date, 'YYYY-MM-DD', true); // Ensure strict parsing
          const isValid = apptDate.isValid();
  
          if (!isValid) {
            console.warn(`Invalid date format: ${appt.date}`);
            return false;
          }
  
          return (
            apptDate.year().toString() === this.selectedYear &&
            apptDate.format('MMMM') === this.selectedMonth
          );
        });
  
        console.log('Filtered Appointments After Fetch:', this.appointments);
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
      },
    });
  }
  
  applyFilter(): void {
    console.log('Before Filtering:', this.appointments.length, this.appointments);
  
    const now = moment(); // Current date
    this.filteredAppointments = this.appointments.filter((appt) => {
      const appointmentDate = moment(appt.date, 'YYYY-MM-DD', true);
      const isValid = appointmentDate.isValid();
  
      if (!isValid) {
        console.warn(`Skipping invalid date format: ${appt.date}`);
        return false;
      }
  
      let matches = false;
      switch (this.filterType) {
        case 'day':
          matches = appointmentDate.isSame(now, 'day');
          break;
        case 'week':
          matches = appointmentDate.isSame(now, 'isoWeek'); // Ensure proper week comparison
          break;
        case 'month':
          matches = appointmentDate.isSame(now, 'month');
          break;
        case 'year':
          matches = appointmentDate.isSame(now, 'year');
          break;
        default:
          matches = true;
      }
  
      console.log(`Filter Type: ${this.filterType}, Matches: ${matches}`);
      return matches;
    });
  
    console.log('After Filtering:', this.filteredAppointments.length, this.filteredAppointments);
    this.calculateStatistics();
    this.cdRef.detectChanges();
  }
  
  calculateStatistics(): void {
    this.totalRevenue = this.filteredAppointments.reduce(
      (sum, appt) => sum + appt.totalCost,
      0
    );

    this.totalAppointments = this.filteredAppointments.length;

    const uniqueCustomerNames = new Set(
      this.filteredAppointments.map((appt) => appt.phone)
    );
    this.uniqueCustomers = uniqueCustomerNames.size;

    const stylistMap = new Map<string, number>();
    const serviceMap = new Map<string, number>();

    this.filteredAppointments.forEach((appt) => {
      appt.stylists.forEach((stylist) => {
        stylistMap.set(stylist, (stylistMap.get(stylist) || 0) + 1);
      });

      appt.services.forEach((service) => {
        serviceMap.set(service.name, (serviceMap.get(service.name) || 0) + 1);
      });
    });

    this.stylistStats = Array.from(stylistMap, ([name, serviceCount]) => ({
      name,
      serviceCount,
      bonus: serviceCount >= 5 ? Math.floor(serviceCount / 5) * 2 : 0,
    }));

    this.serviceStats = Array.from(serviceMap, ([name, count]) => ({
      name,
      count,
    }));

    this.updateServiceChart();
    this.updateChart();
  }

  setFilter(filter: string): void {
    this.filterType = filter;
    this.fetchAppointments();
  }
  
  initServiceChart(): void {
    this.serviceChart = new Chart(this.serviceChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Material Booking Count',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateServiceChart(): void {
    if (this.serviceChart) {
      this.serviceChart.destroy(); // Destroy old instance
    }
  
    const labels = this.serviceStats.map((s) => s.name);
    const data = this.serviceStats.map((s) => s.count);
  
    this.serviceChart = new Chart(this.serviceChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Service Booking Count',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }
  

  updateChart(): void {
    if (this.revenueChart) {
      this.revenueChart.destroy(); // Destroy old instance
    }
  
    const monthlyRevenue: { [key: string]: number } = {};
    this.months.forEach((month) => (monthlyRevenue[month] = 0));
  
    this.filteredAppointments.forEach((appt) => {
      const month = moment(appt.date, 'YYYY-MM-DD').format('MMMM');
      monthlyRevenue[month] += appt.totalCost;
    });
  
    this.revenueChart = new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Monthly Revenue',
            data: this.months.map((month) => monthlyRevenue[month]),
            backgroundColor: '#d4a373',
            borderColor: '#6d4c41',
            borderWidth: 1,
          },
        ],
      },
    });
  }
  
  
  initChart(): void {
    this.revenueChart = new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Monthly Revenue',
            data: [],
            backgroundColor: '#d4a373',
            borderColor: '#6d4c41',
            borderWidth: 1,
          },
        ],
      },
    });
  }
}