import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeratorDashboardComponent } from './moderator-dashboard/moderator-dashboard.component';
import { RequestAdminComponent } from './request-admin/request-admin.component';
import { UserAppointmentsComponent } from './user-appointments/user-appointments.component';
import { ViewServicesComponent } from './view-services/view-services.component';
import { ModeratorStatisticsComponent } from './moderator-statistics/moderator-statistics.component';
import { CreateAdminRequestComponent } from './create-admin-request/create-admin-request.component';

const routes: Routes = [
  {
    path: '',
    component: ModeratorDashboardComponent, 
    children: [
      {path : 'create-admin-request',component:CreateAdminRequestComponent},
      { path: 'dashboard', component: ModeratorDashboardComponent },
      { path: 'request-admin', component: RequestAdminComponent },
      { path: 'user-appointments', component: UserAppointmentsComponent },
      { path: 'view-services', component: ViewServicesComponent },
      { path: 'moderator-statistics', component: ModeratorStatisticsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeratorRoutingModule { }
