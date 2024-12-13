import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonStatisticsComponent } from './person-statistics.component';

describe('PersonStatisticsComponent', () => {
  let component: PersonStatisticsComponent;
  let fixture: ComponentFixture<PersonStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
