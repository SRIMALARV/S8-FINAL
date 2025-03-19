import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salon-management',
  templateUrl: './salon-management.component.html',
  styleUrls: ['./salon-management.component.scss'],
  imports: [CommonModule, NgFor, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class SalonManagementComponent implements OnInit {
  salons: any[] = [];
  page: number = 0;
  size: number = 4;
  sortBy: string = 'outletName';
  totalPages: number = 0;

  showServiceDialog: boolean = false;
  showStylistDialog: boolean = false;
  showEditDialog: boolean = false;

  uniqueServices: any[] = [];

  selectedServices: { name: string; cost: number | string; gender: string }[] =
    [];
  selectedMaleStylists: string[] = [];
  selectedFemaleStylists: string[] = [];
  editableSalon: any = {};

  constructor(private salonService: SalonService, private router: Router) {}

  ngOnInit(): void {
    this.loadSalons();
  }

  loadSalons(): void {
    this.salonService
      .getSalons(this.page, this.size, this.sortBy)
      .subscribe((response) => {
        this.salons = response.content;
        this.totalPages = response.totalPages;
      });
  }

  createSalon(): void {
    this.router.navigate(['/admin/create-salon']);
  }
  closeEditDialog(): void {
    Swal.fire({
      title: 'Cancel Edit?',
      text: 'Unsaved changes will be lost. Do you want to cancel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showEditDialog = false;
        Swal.fire('Cancelled', 'Changes were not saved.', 'info');
      }
    });
  }

  saveSalon(): void {
    Swal.fire({
      title: 'Save Changes?',
      text: 'Are you sure you want to save these changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.editableSalon.services = this.uniqueServices;
        this.salonService.updateSalon(this.editableSalon).subscribe(() => {
          this.loadSalons();
          this.closeEditDialog();
          Swal.fire('Saved!', 'Your changes have been saved.', 'success');
        });
      }
    });
  }

  deleteSalon(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This salon will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.salonService.deleteSalon(id).subscribe(() => {
          this.loadSalons();
          Swal.fire('Deleted!', 'Salon has been removed.', 'success');
        });
      }
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadSalons();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.loadSalons();
    }
  }

  removeDuplicates(services: any[]): any[] {
    if (!services || services.length === 0) {
      return [];
    }

    const seen = new Set();
    return services.filter((service) => {
      if (!service || !service.name) return false;
      const key = `${service.name}-${service.cost}-${service.gender}`;
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      }
      return false;
    });
  }

  viewServices(services: any[]): void {
    if (!services || services.length === 0) {
      this.selectedServices = [];
    } else if (typeof services[0] === 'string') {
      this.selectedServices = services.map((service) => ({
        name: service,
        cost: 'N/A',
        gender: 'N/A',
      }));
    } else {
      this.selectedServices = services as {
        name: string;
        cost: number;
        gender: string;
      }[];
    }
    this.showServiceDialog = true;
  }

  viewStylists(maleStylists: string[], femaleStylists: string[]): void {
    this.selectedMaleStylists = maleStylists;
    this.selectedFemaleStylists = femaleStylists;
    this.showStylistDialog = true;
  }

  openEditDialog(salon: any): void {
    this.editableSalon = { ...salon };

    this.editableSalon.maleStylists = this.editableSalon.maleStylists || [];
    this.editableSalon.femaleStylists = this.editableSalon.femaleStylists || [];
    this.editableSalon.services = this.editableSalon.services || [];

    this.uniqueServices = this.removeDuplicates(salon.services);
    this.showEditDialog = true;
  }

  addNewService(): void {
    this.uniqueServices.push({ name: '', cost: 0, gender: 'Male' });
  }

  removeService(index: number): void {
    this.uniqueServices.splice(index, 1);
  }

  addNewMaleStylist(): void {
    this.editableSalon.maleStylists.push('');
  }

  removeMaleStylist(index: number): void {
    this.editableSalon.maleStylists.splice(index, 1);
  }

  addNewFemaleStylist(): void {
    this.editableSalon.femaleStylists.push('');
  }

  removeFemaleStylist(index: number): void {
    this.editableSalon.femaleStylists.splice(index, 1);
  }

  closeDialog(): void {
    this.showServiceDialog = false;
    this.showStylistDialog = false;
  }
}
