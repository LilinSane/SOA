import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsDataComponent } from './statistics-data.component';

describe('StatisticsDataComponent', () => {
  let component: StatisticsDataComponent;
  let fixture: ComponentFixture<StatisticsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
