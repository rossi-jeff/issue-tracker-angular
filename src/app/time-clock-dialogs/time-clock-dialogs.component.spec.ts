import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockDialogsComponent } from './time-clock-dialogs.component';

describe('TimeClockDialogsComponent', () => {
  let component: TimeClockDialogsComponent;
  let fixture: ComponentFixture<TimeClockDialogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClockDialogsComponent]
    });
    fixture = TestBed.createComponent(TimeClockDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
