import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDeletionComponent } from './person-deletion.component';

describe('PersonDeletionComponent', () => {
  let component: PersonDeletionComponent;
  let fixture: ComponentFixture<PersonDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDeletionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
