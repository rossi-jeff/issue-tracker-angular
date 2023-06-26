import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogsComponent } from './user-dialogs.component';

describe('UserDialogsComponent', () => {
  let component: UserDialogsComponent;
  let fixture: ComponentFixture<UserDialogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDialogsComponent]
    });
    fixture = TestBed.createComponent(UserDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
