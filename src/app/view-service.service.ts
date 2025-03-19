import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StylistResponse {
  maleStylists: string[];
  femaleStylists: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private baseUrl = 'http://localhost:8080/salons'; // 🔹 Adjust base URL if needed

  constructor(private http: HttpClient) {}

  getStylists(outlet: string, gender: string): Observable<StylistResponse> {
    return this.http.get<StylistResponse>(`${this.baseUrl}/stylists/${outlet}`);
  }
}
