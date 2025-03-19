import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [AppComponent,PaymentComponent],
  imports: [

    BrowserModule,
    NavbarComponent,
    NgbModule,
    HttpClientModule,
    LoginComponent,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
