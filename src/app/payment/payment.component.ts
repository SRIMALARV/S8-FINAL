import { Component, Input, OnInit } from '@angular/core';
import { RazorpayService } from '../services/razorpay.service';
import { AppointmentService } from '../services/appointments.service';
import Swal from 'sweetalert2';

declare let Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() appointmentData: any;

  constructor(
    private razorpayService: RazorpayService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {}

  initiatePayment() {
    if (!this.appointmentData) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Details',
        text: 'Appointment details are missing!',
      });
      return;
    }

    const amountInPaise = this.appointmentData.totalCost * 100;
    this.razorpayService.createOrder(amountInPaise).subscribe(
      (response: any) => {
        if (!response || !response.id) {
          Swal.fire({
            icon: 'error',
            title: 'Order Creation Failed',
            text: 'Failed to create order. Please try again.',
          });
          return;
        }

        const options = {
          key: this.razorpayService.getRazorpayKey(),
          amount: response.amount,
          currency: 'INR',
          name: 'EcoTrace',
          description: 'Booking Payment',
          order_id: response.id,
          handler: (paymentResponse: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful!',
              text: 'Your payment has been received successfully.',
            });

            this.appointmentData.paymentStatus = 'Successful';
            this.appointmentData.razorpay_order_id =
              paymentResponse.razorpay_order_id;
            this.appointmentData.razorpay_payment_id =
              paymentResponse.razorpay_payment_id;
            this.appointmentData.razorpay_signature =
              paymentResponse.razorpay_signature;
            this.bookAppointment(this.appointmentData);
          },
          prefill: {
            name: this.appointmentData.name,
            email: this.appointmentData.email,
            contact: this.appointmentData.phone,
          },
          theme: {
            color: '#F37254',
          },
        };

        const razorpay = new Razorpay(options);
        razorpay.on('payment.failed', (response: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Payment Failed',
            text: 'Payment failed. Please try again.',
          });
        });

        razorpay.open();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error creating order. Please check the console.',
        });
      }
    );
  }

  private bookAppointment(appointmentData: any) {
    this.appointmentService.bookAppointment(appointmentData).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Order Confirmed',
          text: 'Your Order has been successfully booked!',
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Error booking Order. Please try again.',
        });
      }
    );
  }
}
