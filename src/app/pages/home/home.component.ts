import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
