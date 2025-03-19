
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminRequestService } from '../../services/admin-request.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-admin-request',
  imports: [
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    NgFor,
    ReactiveFormsModule,
  ],
  templateUrl: './create-admin-request.component.html',
  styleUrl: './create-admin-request.component.scss'
})
export class CreateAdminRequestComponent implements OnInit {
 requestForm!: FormGroup;
   states: string[] = [];
   cities: string[] = [];
   outlets: string[] = [];
   requests: any[] = [];
  router: any;
 
   constructor(
     private fb: FormBuilder,
     private adminRequestService: AdminRequestService
   ) {}
   ngOnInit(): void {
     this.requestForm = this.fb.group({
       state: ['', Validators.required],
       city: ['', Validators.required],
       outlet: ['', Validators.required],
       services: this.fb.array([]),
       stylists: this.fb.array([]),
     });
 
     this.fetchStates();
   }
 
   fetchStates() {
     this.adminRequestService
       .getStates()
       .subscribe((data) => (this.states = data));
   }
 
   fetchCities() {
     const state = this.requestForm.get('state')?.value;
     if (state) {
       this.adminRequestService
         .getCities(state)
         .subscribe((data) => (this.cities = data));
     }
   }
 
   fetchOutlets() {
     const city = this.requestForm.get('city')?.value;
     if (city) {
       this.adminRequestService
         .getOutlets(city)
         .subscribe((data) => (this.outlets = data));
     }
   }
 
   get services(): FormArray {
     return this.requestForm.get('services') as FormArray;
   }
 
   addService() {
     this.services.push(
       this.fb.group({
         serviceName: ['', Validators.required],
         cost: ['', Validators.required],
         gender: ['', Validators.required],
       })
     );
   }
 
   get stylists(): FormArray {
     return this.requestForm.get('stylists') as FormArray;
   }
 
   addStylist() {
     this.stylists.push(
       this.fb.group({
         name: ['', Validators.required],
         gender: ['', Validators.required],
       })
     );
   }
 
   submitRequest() {
     if (this.requestForm.valid) {
       this.adminRequestService
         .submitModeratorRequest(this.requestForm.value)
         .subscribe(() => {
           Swal.fire({
             icon: 'success',
             title: 'Request Sent',
             text: 'Your request has been successfully sent to the admin.',
             confirmButtonColor: '#3085d6',
             confirmButtonText: 'OK',
           });
 
           this.requestForm.reset();
         });
     }
   }

}
