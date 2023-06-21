import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFilterComponent } from './issue-filter.component';

describe('IssueFilterComponent', () => {
  let component: IssueFilterComponent;
  let fixture: ComponentFixture<IssueFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueFilterComponent]
    });
    fixture = TestBed.createComponent(IssueFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
