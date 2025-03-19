// app/test-http.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-http',
  standalone: true,
  template: '<p>HttpClient test works.</p>',
})
export class TestHttpComponent {
  constructor(private http: HttpClient) {
  
  }
}
