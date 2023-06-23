import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDialogsComponent } from './dashboard-dialogs.component';

describe('DashboardDialogsComponent', () => {
  let component: DashboardDialogsComponent;
  let fixture: ComponentFixture<DashboardDialogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDialogsComponent]
    });
    fixture = TestBed.createComponent(DashboardDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
