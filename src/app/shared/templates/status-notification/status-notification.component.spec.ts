import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusNotificationComponent } from './status-notification.component';

describe('StatusNotificationComponent', () => {
  let component: StatusNotificationComponent;
  let fixture: ComponentFixture<StatusNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
