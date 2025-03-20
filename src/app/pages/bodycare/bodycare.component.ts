import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bodycare',
  imports: [FormsModule, CommonModule],
  templateUrl: './bodycare.component.html',
  styleUrl: './bodycare.component.scss',
})
export class BodycareComponent {
  private baseUrl = 'http://localhost:8080/appointments';

  constructor(private http: HttpClient) {}

  getAppointmentsByName(name: string): Observable<any> {
    const encodedName = encodeURIComponent(name.trim()); // Encode spaces and special characters
    return this.http.get(`${this.baseUrl}/name/${encodedName}`);
  }
  

  industryName: string = '';
  appointments: any[] = [];
  errorMessage: string = '';


  fetchAppointments() {
    if (this.industryName.trim()) {
      this.getAppointmentsByName(this.industryName).subscribe(
        (data: any) => {
          this.appointments = data;
          console.log(data);
          if(data.length === 0)
          this.errorMessage = 'No orders found for this industry.';
        else
        this.errorMessage = '';
        },
        (error: any) => {
          this.errorMessage = 'No orders found for this industry.';
          this.appointments = [];
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid Industry Name.';
    }
  }
}
