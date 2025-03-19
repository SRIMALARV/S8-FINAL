import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminSignupComponent } from './admin-sign-up/admin-sign-up.component';
import { ModeratorSignupComponent } from './admin/moderator-sign-up/moderator-sign-up.component';
import { AdminGuard } from './guards/admin-guard.guard';
import { ModeratorGuard } from './guards/moderator-guard.guard';
import { ModeratorHubComponent } from './moderator-hub/moderator-hub.component';


export const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'moderator', loadChildren: () => import('./moderator/moderator.module').then(m => m.ModeratorModule) },
      { path: 'admin/signup', component: AdminSignupComponent, canActivate: [AdminGuard] },
      { path: 'moderator/signup', component: ModeratorSignupComponent, canActivate: [ModeratorGuard] },
      { path: 'moderator-hub', component: ModeratorHubComponent, canActivate: [ModeratorGuard] },
      { path: 'haircare', loadComponent: () => import('./pages/haircare/haircare.component').then(m => m.HaircareComponent) },
      { path: 'appointment', loadComponent: () => import('./appointment/appointment.component').then(m => m.AppointmentComponent) },
      { path: 'skincare', loadComponent: () => import('./pages/skincare/skincare.component').then(m => m.SkincareComponent) },
      { path: 'bodycare', loadComponent: () => import('./pages/bodycare/bodycare.component').then(m => m.BodycareComponent) },
      
    ];
    