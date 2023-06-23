import { Component, Input } from '@angular/core';
import { UserType } from '../../types/user.type';
import { IssueType } from '../../types/issue.type';
import { ProjectType } from '../../types/project.type';
import { clone } from '../../lib/clone';
import { FormControl, FormGroup } from '@angular/forms';
import { getFullName } from '../../lib/get-full-name';
import { TimeClockType } from '../../types/time-clock.type';

export type ClockFormType = {
  Date?: string | null;
  Time?: string | null;
};

export type TimeClockFormType = {
  Start?: ClockFormType | null;
  End?: ClockFormType | null;
  ProjectId?: string | null;
  IssueId?: string | null;
  UserId?: string | null;
  UUID?: string | null;
};

export const blankTimeClockForm = {
  Start: { Date: '', Time: '' },
  End: { Date: '', Time: '' },
  ProjectId: '',
  IssueId: '',
  UserId: '',
  UUID: '',
};

@Component({
  selector: 'app-time-clock-dialogs',
  templateUrl: './time-clock-dialogs.component.html',
  styleUrls: ['./time-clock-dialogs.component.css'],
})
export class TimeClockDialogsComponent {
  private _users!: UserType[];
  private _issues!: IssueType[];
  private _projects!: ProjectType[];
  private _newTimeClock!: TimeClockType;
  private _editTimeClock!: TimeClockType;

  @Input()
  set newTimeClock(value: TimeClockType) {
    this._newTimeClock = value;
    this.newTimeClockForm.patchValue(clone(blankTimeClockForm));
  }
  get newTimeClock() {
    return this._newTimeClock;
  }

  @Input()
  set editTimeClock(value: TimeClockType) {
    this._editTimeClock = value;
    const { Start, End, UUID, ProjectId, IssueId, UserId } = value;
    this.editTimeClockForm.patchValue({
      Start,
      End,
      UUID,
      ProjectId,
      IssueId,
      UserId,
    });
    this.filterEditIssues();
  }
  get editTimeClock() {
    return this._editTimeClock;
  }

  @Input()
  set users(value: UserType[]) {
    this._users = value;
  }
  get users() {
    return this._users;
  }

  @Input()
  set projects(value: ProjectType[]) {
    this._projects = value;
  }
  get projects() {
    return this._projects;
  }

  @Input()
  set issues(value: IssueType[]) {
    this._issues = value;
    this.filterNewIssues();
    this.filterEditIssues();
  }
  get issues() {
    return this._issues;
  }

  newIssues: IssueType[] = [];
  editIssues: IssueType[] = [];

  newTimeClockForm = new FormGroup({
    Start: new FormGroup({
      Date: new FormControl(''),
      Time: new FormControl(''),
    }),
    End: new FormGroup({
      Date: new FormControl(''),
      Time: new FormControl(''),
    }),
    ProjectId: new FormControl(''),
    IssueId: new FormControl(''),
    UserId: new FormControl(''),
    UUID: new FormControl(''),
  });

  editTimeClockForm = new FormGroup({
    Start: new FormGroup({
      Date: new FormControl(''),
      Time: new FormControl(''),
    }),
    End: new FormGroup({
      Date: new FormControl(''),
      Time: new FormControl(''),
    }),
    ProjectId: new FormControl(''),
    IssueId: new FormControl(''),
    UserId: new FormControl(''),
    UUID: new FormControl(''),
  });

  filterNewIssues = () => {
    const { ProjectId, IssueId } = this.newTimeClockForm.value;
    if (ProjectId) {
      this.newIssues = [];
      let found = false;
      for (const issue of this.issues) {
        if (issue.ProjectId == ProjectId) {
          if (issue.Id && issue.Id.toString() == IssueId) found = true;
          this.newIssues.push(issue);
        }
      }
      if (!found) this.newTimeClockForm.patchValue({ IssueId: '' });
    } else {
      this.newIssues = clone(this.issues);
      this.newTimeClockForm.patchValue({ IssueId: '' });
    }
  };

  filterEditIssues = () => {
    const { ProjectId, IssueId } = this.editTimeClockForm.value;
    if (ProjectId) {
      this.editIssues = [];
      let found = false;
      for (const issue of this.issues) {
        if (issue.ProjectId == ProjectId) {
          if (issue.Id && issue.Id.toString() == IssueId) found = true;
          this.editIssues.push(issue);
        }
      }
      if (!found) this.editTimeClockForm.patchValue({ IssueId: '' });
    } else {
      this.editIssues = clone(this.issues);
      this.editTimeClockForm.patchValue({ IssueId: '' });
    }
  };

  showOverlay = () => {
    const overlay = document.getElementById('time-clock-overlay');
    if (overlay) overlay.classList.add('open');
  };

  hideOverlay = () => {
    const overlay = document.getElementById('time-clock-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  showNew = () => {
    this.hideEdit();
    this.showOverlay();
    const dialog = document.getElementById('new-time-clock-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideNew = () => {
    const dialog = document.getElementById('new-time-clock-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  showEdit = () => {
    this.hideNew();
    this.showOverlay();
    const dialog = document.getElementById('edit-time-clock-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideEdit = () => {
    const dialog = document.getElementById('edit-time-clock-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  fullName = (user: UserType) => getFullName(user);
}
