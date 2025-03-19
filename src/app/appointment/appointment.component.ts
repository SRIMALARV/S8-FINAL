import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointments.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { RazorpayService } from '../services/razorpay.service';
import { PaymentComponent } from '../payment/payment.component';

import Swal from 'sweetalert2';
declare var Razorpay: any;
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [CommonModule, NgFor, ReactiveFormsModule, PaymentComponent, FormsModule],
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  states: string[] = [];
  cities: string[] = [];
  outlets: string[] = [];
  services: any[] = [];
  stylists: string[] = [];
  selectedServices: any[] = [];
  selectedStylists: string[] = [];
  totalCost: number = 0;
  appointmentData: any = {};
  paymentStatus?: 'success';

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private razorpayService: RazorpayService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStates();
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      outlet: ['', Validators.required],
      gender: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: [''],
    });
  }

  loadStates() {
    this.appointmentService.getStates().subscribe((data: string[]) => {
      this.states = data || [];
    });
  }

  onStateChange(event: any) {
    const state = event.target.value;
    if (!state) return;
    this.appointmentForm.patchValue({ state, city: '', outlet: '' });
    this.cities = [];
    this.outlets = [];
    this.stylists = [];
    this.appointmentService.getCities(state).subscribe((data: string[]) => {
      this.cities = data || [];
    });
  }

  onCityChange(event: any) {
    const city = event.target.value;
    if (!city) return;
    this.appointmentForm.patchValue({ city, outlet: '' });
    this.outlets = [];
    this.stylists = [];
    this.appointmentService.getOutlets(city).subscribe((data: string[]) => {
      this.outlets = data || [];
    });
  }

  onOutletChange(event: any) {
    const outlet = event.target.value;
    if (!outlet) return;
    this.appointmentForm.patchValue({ outlet });
    this.loadServicesAndStylists();
  }

  onGenderChange(event: any) {
    const gender = event.target.value;
    if (!gender) return;
    this.appointmentForm.patchValue({ gender });
    this.loadServicesAndStylists();
  }

  loadServicesAndStylists() {
    const outlet = this.appointmentForm.get('outlet')?.value;
    const gender = this.appointmentForm.get('gender')?.value;

    if (outlet && gender) {
      this.appointmentService.getServices(outlet, gender).subscribe(
        (response: any) => {
          this.services = Array.isArray(response) ? response : [];
        },
        () => {
          this.services = [];
        }
      );
      this.appointmentService.getStylists(outlet, gender).subscribe(
        (response: any) => {
          this.stylists =
            response && typeof response === 'object'
              ? gender === 'Male'
                ? response.maleStylists
                : response.femaleStylists
              : [];
        },
        () => {
          this.stylists = [];
        }
      );
    }
  }

  toggleStylistSelection(stylist: string) {
    const index = this.selectedStylists.indexOf(stylist);
    if (index > -1) {
      this.selectedStylists.splice(index, 1);
    } else {
      this.selectedStylists.push(stylist);
    }
  }

  toggleServiceSelection(service: any) {
    service.selected = !service.selected; // Toggle selection state
  
    if (service.selected) {
      service.quantity = 1; // Set default quantity
      this.selectedServices.push(service);
    } else {
      this.selectedServices = this.selectedServices.filter((s) => s !== service);
    }
  
    this.calculateTotalCost();
  }
  
  updateQuantity(service: any) {
    if (service.quantity < 1 || isNaN(service.quantity)) {
      service.quantity = 1; // Prevent invalid values
    }
    this.calculateTotalCost();
  }
  
  calculateTotalCost() {
    this.totalCost = this.selectedServices.reduce(
      (sum, service) => sum + service.cost * (service.quantity || 1),
      0
    );
  }
  
  submitAppointment() {
    if (
      this.appointmentForm.invalid ||
      this.selectedServices.length === 0 ||
      this.selectedStylists.length === 0
    ) {
      Swal.fire(
        'Validation Error',
        'Please fill in all details and make sure the correct format is given.',
        'warning'
      );
      return;
    }

    const localDate = this.appointmentForm.value.date;
    const localTime = this.appointmentForm.value.time;

    const localDateTime = new Date(`${localDate}T${localTime}:00`);

    const utcDateTime = new Date(
      localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
    );

    const formattedUTCDateTime = utcDateTime.toISOString();

    this.appointmentData = {
      state: this.appointmentForm.value.state,
      city: this.appointmentForm.value.city,
      outlet: this.appointmentForm.value.outlet,
      gender: this.appointmentForm.value.gender,
      services: this.selectedServices,
      stylists: this.selectedStylists,
      date: this.appointmentForm.value.date,
      time: this.appointmentForm.value.time,
      name: this.appointmentForm.value.name,
      email: this.appointmentForm.value.email,
      phone: this.appointmentForm.value.phone,
      message: this.appointmentForm.value.message,
      totalCost: this.totalCost,
      dateTime: formattedUTCDateTime,
    };
    this.initiatePayment(this.appointmentData);
  }

  initiatePayment(appointmentData: any) {
    this.razorpayService.createOrder(appointmentData.totalCost).subscribe(
      (response: any) => {
        if (!response || !response.id) {
          Swal.fire(
            'Error',
            'Failed to create order. Please try again.',
            'error'
          );
          return;
        }

        const options = {
          key: this.razorpayService.getRazorpayKey(),
          amount: response.amount,
          currency: 'INR',
          name: 'EcoTrace',
          description: 'order Booking Payment',
          order_id: response.id,
          handler: (paymentResponse: any) => {
            Swal.fire('Success', 'Payment successful!', 'success');

            this.appointmentData = {
              ...this.appointmentData,
              paymentStatus: 'Successful',
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpaySignature: paymentResponse.razorpay_signature,
            };

            this.postAppointment(appointmentData);
          },
          prefill: {
            name: appointmentData.name,
            email: appointmentData.email,
            contact: appointmentData.phone,
          },
          theme: {
            color: '#F37254',
          },
        };

        const razorpay = new Razorpay(options);

        razorpay.on('payment.failed', (response: any) => {
          Swal.fire('Error', 'Payment failed. Please try again.', 'error');
        });

        razorpay.open();
      },
      (error) => {
        Swal.fire('Error', 'Error creating order.', 'error');
      }
    );
  }

  postAppointment(appointmentData: any) {
    if (!appointmentData || Object.keys(appointmentData).length === 0) {
      Swal.fire('Error', 'Order data is missing!', 'error');
      return;
    }

    this.appointmentService.bookAppointment(appointmentData).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Order confirmed!', 'success');
        this.sendEmailConfirmation(appointmentData);
        this.appointmentForm.reset();
        this.selectedServices = [];
        this.selectedStylists = [];
        this.totalCost = 0;
        this.services = [];
        this.stylists = [];
      },
      error: (error) => {
        Swal.fire('Error', 'Error booking order', 'error');
      },
      complete: () => {},
    });
  }
  sendEmailConfirmation(appointmentData: any) {
    this.appointmentService.sendEmailConfirmation(appointmentData).subscribe({
      next: (response) => {},
      error: (error) => {},
    });
  }
}
