import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockCardComponent } from './time-clock-card.component';

describe('TimeClockCardComponent', () => {
  let component: TimeClockCardComponent;
  let fixture: ComponentFixture<TimeClockCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClockCardComponent]
    });
    fixture = TestBed.createComponent(TimeClockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
