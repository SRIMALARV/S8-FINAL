import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorHubComponent } from './moderator-hub.component';

describe('ModeratorHubComponent', () => {
  let component: ModeratorHubComponent;
  let fixture: ComponentFixture<ModeratorHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorHubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
