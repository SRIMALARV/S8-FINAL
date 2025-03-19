import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Appointment } from '../../models/appointments.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/salons';
  private apiUrl = 'http://localhost:8080/appointments';

  constructor(private http: HttpClient) {}

  getStates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/states`);
  }

  getCities(state: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/cities/${state}`);
  }

  getOutlets(city: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/outlets/${city}`);
  }

  getServices(outlet: string, gender: string): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.baseUrl}/services/${outlet}/${gender}`
    );
  }

  getStylists(outlet: string, gender: string) {
    return this.http.get<string[]>(`${this.baseUrl}/stylists/${outlet}`);
  }
  sendEmailConfirmation(appointmentData: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/payments/confirm-payment',
      appointmentData
    );
  }

  bookAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, appointmentData);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/all`).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Failed to load appointments.'));
      })
    );
  }

  getAppointmentById(id: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
  }

  createPaymentOrder(amount: number): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/payments/create-order?amount=${amount}`,
      {}
    );
  }

  updatePaymentStatus(paymentId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${paymentId}/update-status`, {
      status,
    });
  }

  getAppointmentsByOutlet(outlet: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/outlet/${outlet}`).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Failed to load appointments.'));
      })
    );
  }
}
