import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographyComponent } from './demography.component';

describe('DemographyComponent', () => {
  let component: DemographyComponent;
  let fixture: ComponentFixture<DemographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
