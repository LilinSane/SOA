import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographyNationalityStatisticsComponent } from './demography-nationality-statistics.component';

describe('DemographyNationalityStatisticsComponent', () => {
  let component: DemographyNationalityStatisticsComponent;
  let fixture: ComponentFixture<DemographyNationalityStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographyNationalityStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographyNationalityStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
