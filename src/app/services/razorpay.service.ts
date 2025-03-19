
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  private paymentApiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  createOrder(amount: number): Observable<any> {
    const payload = { amount: amount * 100, currency: 'INR' }; 
    return this.http.post(`${this.paymentApiUrl}/create-order`, payload);
  }

  getRazorpayKey(): string {
    return 'rzp_test_ntXczTSfQC6BP2'; 
  }
}
