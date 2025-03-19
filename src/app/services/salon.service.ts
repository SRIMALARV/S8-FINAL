import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Service {
  name: string;
  cost: number;
  gender: string;
}

interface Salon {
  id?: string;
  state: string;
  city: string;
  outletName: string;
  services: Service[];
  maleStylists: string[];
  femaleStylists: string[];
  moderator: string;
}

@Injectable({
  providedIn: 'root',
})
export class SalonService {
  private apiUrl = 'http://localhost:8080/salons';

  constructor(private http: HttpClient) {}

  getSalons(page: number, size: number, sortBy: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}`
    );
  }

  getSalonById(id: string): Observable<Salon> {
    return this.http.get<Salon>(`${this.apiUrl}/${id}`);
  }

  createSalon(salon: Salon): Observable<Salon> {
    return this.http.post<Salon>(this.apiUrl, salon);
  }

  updateSalon(salon: any): Observable<any> {
    return this.http.put(`http://localhost:8080/salons/${salon.id}`, salon);
  }

  deleteSalon(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
