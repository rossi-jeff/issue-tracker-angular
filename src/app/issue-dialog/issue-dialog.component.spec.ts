import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDialogComponent } from './issue-dialog.component';

describe('IssueDialogComponent', () => {
  let component: IssueDialogComponent;
  let fixture: ComponentFixture<IssueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueDialogComponent]
    });
    fixture = TestBed.createComponent(IssueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
