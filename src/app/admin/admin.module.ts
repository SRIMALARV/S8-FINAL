import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FranchiseManagementComponent } from './franchise-management/franchise-management.component';
import { SalonManagementComponent } from './salon-management/salon-management.component';
import { SalonCreateComponent } from './salon-create/salon-create.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DashboardComponent,
    StatisticsComponent,
    FranchiseManagementComponent,
    SalonManagementComponent,
    SalonCreateComponent,
    HttpClientModule
  ]
})
export class AdminModule { }
