import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockFilterComponent } from './time-clock-filter.component';

describe('TimeClockFilterComponent', () => {
  let component: TimeClockFilterComponent;
  let fixture: ComponentFixture<TimeClockFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClockFilterComponent]
    });
    fixture = TestBed.createComponent(TimeClockFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
