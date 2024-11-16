import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonsDetailsComponent } from './all-persons-details.component';

describe('AllPersonsDetailsComponent', () => {
  let component: AllPersonsDetailsComponent;
  let fixture: ComponentFixture<AllPersonsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPersonsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPersonsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
