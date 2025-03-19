import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminRequestService {
  private baseUrl = 'http://localhost:8080/admin-requests';
  private apiUrl = 'http://localhost:8080/salons';

  constructor(private http: HttpClient) {}


  getStates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/states`);
  }

  getCities(state: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cities/${state}`);
  }

  getOutlets(city: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/outlets/${city}`);
  }

  submitModeratorRequest(requestData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, requestData);
  }
  
  getModeratorRequests(outlet: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/outlet/${outlet}`);
  }
  

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  updateRequestStatus(requestId: string, status: string, message: string) {
    const url = `http://localhost:8080/admin-requests/update-status/${requestId}?status=${status}&message=${encodeURIComponent(message)}`;
    return this.http.put(url, {});
  }
   
}
