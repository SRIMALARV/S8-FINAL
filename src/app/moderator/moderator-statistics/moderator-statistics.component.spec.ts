import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorStatisticsComponent } from './moderator-statistics.component';

describe('ModeratorStatisticsComponent', () => {
  let component: ModeratorStatisticsComponent;
  let fixture: ComponentFixture<ModeratorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
