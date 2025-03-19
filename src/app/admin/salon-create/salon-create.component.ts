import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { SalonService } from '../../services/salon.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salon-create',
  templateUrl: './salon-create.component.html',
  styleUrls: ['./salon-create.component.scss'],
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  standalone: true,
})
export class SalonCreateComponent {
  salonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private salonService: SalonService,
    private router: Router
  ) {
    this.salonForm = this.fb.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      outletName: ['', Validators.required],
      services: this.fb.array([], Validators.required),
      maleStylists: this.fb.array([], Validators.required),
      femaleStylists: this.fb.array([], Validators.required),
      moderator: ['', Validators.required],
    });
  }

  get services(): FormArray {
    return this.salonForm.get('services') as FormArray;
  }

  get maleStylists(): FormArray {
    return this.salonForm.get('maleStylists') as FormArray;
  }

  get femaleStylists(): FormArray {
    return this.salonForm.get('femaleStylists') as FormArray;
  }

  addService(): void {
    const serviceGroup = this.fb.group({
      name: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
    });

    this.services.push(serviceGroup);
  }

  removeService(index: number): void {
    this.services.removeAt(index);
  }

  addMaleStylist(): void {
    this.maleStylists.push(new FormControl('', Validators.required));
  }

  removeMaleStylist(index: number): void {
    this.maleStylists.removeAt(index);
  }

  addFemaleStylist(): void {
    this.femaleStylists.push(new FormControl('', Validators.required));
  }

  removeFemaleStylist(index: number): void {
    this.femaleStylists.removeAt(index);
  }

  saveSalon(): void {
    if (this.salonForm.invalid) {
      Object.keys(this.salonForm.controls).forEach((key) => {
        const controlErrors = this.salonForm.get(key)?.errors;
        if (controlErrors) {
          console.warn(`Validation error in ${key}:`, controlErrors);
        }
      });

      Swal.fire({
        title: 'Error!',
        text: 'Please fill all required fields correctly.',
        icon: 'error',
        confirmButtonColor: '#f44336',
        confirmButtonText: 'Try Again',
      });

      return;
    }

    this.salonService.createSalon(this.salonForm.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Salon has been successfully created.',
          icon: 'success',
          confirmButtonColor: '#ecd540',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['admin/salon-management']);
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while saving the salon. Please try again.',
          icon: 'error',
          confirmButtonColor: '#f44336',
          confirmButtonText: 'OK',
        });
      },
    });
  }
}
