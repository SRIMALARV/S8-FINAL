import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonCreateComponent } from './salon-create.component';

describe('SalonCreateComponent', () => {
  let component: SalonCreateComponent;
  let fixture: ComponentFixture<SalonCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalonCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
