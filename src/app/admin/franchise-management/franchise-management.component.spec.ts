import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseManagementComponent } from './franchise-management.component';

describe('FranchiseManagementComponent', () => {
  let component: FranchiseManagementComponent;
  let fixture: ComponentFixture<FranchiseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FranchiseManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FranchiseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
