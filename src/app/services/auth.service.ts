
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { MyHttpService } from './my-http.service'; 

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();


  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: MyHttpService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signin`, { username, password }).pipe(
      tap(response => {
        this.currentUserSubject.next({
          id: response.id,
          username: response.username,
          email: response.email,
          roles: response.roles,
          token: response.token
        });
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/signup`, userData);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.roles.includes(role) : false;
  }
}
