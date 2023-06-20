import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClocksComponent } from './time-clocks.component';

describe('TimeClocksComponent', () => {
  let component: TimeClocksComponent;
  let fixture: ComponentFixture<TimeClocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeClocksComponent]
    });
    fixture = TestBed.createComponent(TimeClocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
