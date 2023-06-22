import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IssueType } from '../../types/issue.type';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectType } from '../../types/project.type';
import { UserType } from '../../types/user.type';
import { getFullName } from '../../lib/get-full-name';
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from '../../types/array.types';
import { clone } from '../../lib/clone';

export type IssueFormType = {
  Title?: string | null;
  Details?: string | null;
  Type?: string | null;
  Status?: string | null;
  Priority?: string | null;
  Complexity?: string | null;
  AssignedToId?: string | null;
  ProjectId?: string | null;
  UUID?: string | null;
};

export const blankIssueForm: IssueFormType = {
  Title: '',
  Details: '',
  Type: '',
  Status: '',
  Priority: '',
  Complexity: '',
  AssignedToId: '',
  ProjectId: '',
  UUID: '',
};

@Component({
  selector: 'app-issue-dialog',
  templateUrl: './issue-dialog.component.html',
  styleUrls: ['./issue-dialog.component.css'],
})
export class IssueDialogComponent {
  private _newIssue!: IssueType;
  private _editIssue!: IssueType;

  @Input() projects!: ProjectType[];
  @Input() users!: UserType[];

  @Input()
  set newIssue(value: IssueType) {
    this._newIssue = value;
    this.newIssueForm.patchValue(clone(blankIssueForm));
  }
  get newIssue() {
    return this._newIssue;
  }

  @Input()
  set editIssue(value: IssueType) {
    this._editIssue = value;
    this.editIssueForm.patchValue({
      Title: value.Title || '',
      Details: value.Details || '',
      Type: value.Type || '',
      Status: value.Status || '',
      Priority: value.Priority || '',
      Complexity: value.Complexity || '',
      AssignedToId: value.AssignedToId || '',
      ProjectId: value.ProjectId || '',
      UUID: value.UUID || '',
    });
  }
  get editIssue() {
    return this._editIssue;
  }

  @Output() createIssue = new EventEmitter<IssueFormType>();
  @Output() updateIssue = new EventEmitter<IssueFormType>();

  newIssueForm = new FormGroup({
    Title: new FormControl(''),
    Details: new FormControl(''),
    Type: new FormControl(''),
    Status: new FormControl(''),
    Priority: new FormControl(''),
    Complexity: new FormControl(''),
    AssignedToId: new FormControl(''),
    ProjectId: new FormControl(''),
    UUID: new FormControl(''),
  });

  editIssueForm = new FormGroup({
    Title: new FormControl(''),
    Details: new FormControl(''),
    Type: new FormControl(''),
    Status: new FormControl(''),
    Priority: new FormControl(''),
    Complexity: new FormControl(''),
    AssignedToId: new FormControl(''),
    ProjectId: new FormControl(''),
    UUID: new FormControl(''),
  });

  fullName = (user: UserType) => getFullName(user);

  priorities = PriorityArray;
  statuses = StatusArray;
  types = IssueTypeArray;
  complexities = ComplexityArray;

  showOverlay = () => {
    const overlay = document.getElementById('issue-overlay');
    if (overlay) overlay.classList.add('open');
  };

  hideOverlay = () => {
    const overlay = document.getElementById('issue-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  showNew = () => {
    this.hideEdit();
    this.showOverlay();
    const dialog = document.getElementById('new-issue-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideNew = () => {
    const dialog = document.getElementById('new-issue-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  showEdit = () => {
    this.hideNew();
    this.showOverlay();
    const dialog = document.getElementById('edit-issue-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideEdit = () => {
    const dialog = document.getElementById('edit-issue-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  createIssueClicked = () => {
    this.createIssue.emit(this.newIssueForm.value);
  };

  updateIssueClicked = () => {
    this.updateIssue.emit(this.editIssueForm.value);
  };
}
