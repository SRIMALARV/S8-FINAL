import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminRequestComponent } from './create-admin-request.component';

describe('CreateAdminRequestComponent', () => {
  let component: CreateAdminRequestComponent;
  let fixture: ComponentFixture<CreateAdminRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdminRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAdminRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
