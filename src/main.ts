
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AdminGuard } from './app/guards/admin-guard.guard';
import { ModeratorGuard } from './app/guards/moderator-guard.guard';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    AdminGuard,
    ModeratorGuard, provideCharts(withDefaultRegisterables()), provideCharts(withDefaultRegisterables()), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
