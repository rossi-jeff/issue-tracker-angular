import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { IssueType } from '../../types/issue.type';
import { UserType } from '../../types/user.type';
import { ProjectType } from '../../types/project.type';
import {
  IssueDialogComponent,
  blankIssueForm,
} from '../issue-dialog/issue-dialog.component';
import { clone } from '../../lib/clone';
import { UserSessionStorage } from '../../lib/user-session';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent implements OnInit {
  issues: IssueType[] = [];
  users: UserType[] = [];
  projects: ProjectType[] = [];
  paginated: IssueType[] = [];

  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  editor: { [key: string]: IssueType } = {
    new: clone(blankIssueForm),
    edit: clone(blankIssueForm),
  };

  constructor(private api: ApiService) {}

  session: UserSessionStorage = new UserSessionStorage();

  @ViewChild(IssueDialogComponent) dialog!: IssueDialogComponent;

  loadIssues = () => {
    this.api.get({ path: 'issue ' }).subscribe((result: any) => {
      this.issues = result;
      this.count = this.issues.length;
      this.setPaginated();
    });
  };

  loadUsers = () => {
    this.api.get({ path: 'user' }).subscribe((result: any) => {
      this.users = result;
    });
  };

  loadProjects = () => {
    this.api.get({ path: 'project' }).subscribe((result: any) => {
      this.projects = result;
    });
  };

  pageChanged = (page: number) => {
    this.offset = (page - 1) * this.limit;
    this.setPaginated();
  };

  limitChanged = (perPage: number) => {
    this.limit = perPage;
    this.offset = 0;
    this.setPaginated();
  };

  setPaginated = () => {
    const { offset, limit } = this;
    this.paginated = this.issues.slice(offset, offset + limit);
  };

  filterIssues = (filter: { [key: string]: string }) => {
    if (Object.keys(filter).length) {
      this.api
        .get({ path: 'issue', params: filter })
        .subscribe((result: any) => {
          this.issues = result;
          this.count = this.issues.length;
          this.setPaginated();
        });
    } else this.loadIssues();
  };

  newIssue = () => {
    this.dialog.showNew();
  };

  editIssue = (uuid: string) => {
    const issue =
      this.issues.find((i) => i.UUID == uuid) || clone(blankIssueForm);
    this.editor['edit'] = clone(issue);
    this.dialog.showEdit();
  };

  ngOnInit(): void {
    this.loadIssues();
    this.loadUsers();
    this.loadProjects();
  }
}
