import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FranchiseManagementComponent } from './franchise-management/franchise-management.component';
import { SalonManagementComponent } from './salon-management/salon-management.component';
import { SalonCreateComponent } from './salon-create/salon-create.component';
import { AdminSignupComponent } from '../admin-sign-up/admin-sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent, 
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'create-salon', component: SalonCreateComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'franchise', component: FranchiseManagementComponent },
      { path: 'salon-management', component: SalonManagementComponent },
      { path: 'create-moderator', component: AdminSignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
