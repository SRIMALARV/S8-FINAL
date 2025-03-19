import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorSignUpComponent } from './moderator-sign-up.component';

describe('ModeratorSignUpComponent', () => {
  let component: ModeratorSignUpComponent;
  let fixture: ComponentFixture<ModeratorSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
