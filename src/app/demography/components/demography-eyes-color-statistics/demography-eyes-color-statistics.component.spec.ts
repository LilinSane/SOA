import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographyEyesColorStatisticsComponent } from './demography-eyes-color-statistics.component';

describe('DemographyEyesColorStatisticsComponent', () => {
  let component: DemographyEyesColorStatisticsComponent;
  let fixture: ComponentFixture<DemographyEyesColorStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographyEyesColorStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographyEyesColorStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
