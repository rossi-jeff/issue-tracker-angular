import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { TimeClockType } from '../../types/time-clock.type';
import { IssueType } from '../../types/issue.type';
import { UserType } from '../../types/user.type';
import { ProjectType } from '../../types/project.type';
import {
  TimeClockDialogsComponent,
  TimeClockFormType,
  blankTimeClockForm,
} from '../time-clock-dialogs/time-clock-dialogs.component';
import { UserSessionStorage } from '../../lib/user-session';
import { clone } from '../../lib/clone';

@Component({
  selector: 'app-time-clocks',
  templateUrl: './time-clocks.component.html',
  styleUrls: ['./time-clocks.component.css'],
})
export class TimeClocksComponent implements OnInit {
  timeClocks: TimeClockType[] = [];
  paginated: TimeClockType[] = [];
  issues: IssueType[] = [];
  users: UserType[] = [];
  projects: ProjectType[] = [];

  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  editor: { [key: string]: TimeClockType } = {
    new: clone(blankTimeClockForm),
    edit: clone(blankTimeClockForm),
  };

  constructor(private api: ApiService) {}

  session: UserSessionStorage = new UserSessionStorage();

  @ViewChild(TimeClockDialogsComponent) dialog!: TimeClockDialogsComponent;

  loadTimeClocks = () => {
    this.api.get({ path: 'timeclock' }).subscribe((result: any) => {
      this.timeClocks = result;
      this.count = this.timeClocks.length;
      this.setPaginated();
    });
  };

  loadUsers = () => {
    this.api.get({ path: 'user' }).subscribe((result: any) => {
      this.users = result;
    });
  };

  loadIssues = () => {
    this.api.get({ path: 'issue ' }).subscribe((result: any) => {
      this.issues = result;
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
    this.paginated = this.timeClocks.slice(offset, offset + limit);
  };

  filterTimeClocks = (filter: { [key: string]: string }) => {
    if (Object.keys(filter).length) {
      this.api
        .get({ path: 'timeclock', params: filter })
        .subscribe((result: any) => {
          this.timeClocks = result;
          this.count = this.timeClocks.length;
          this.setPaginated();
        });
    } else this.loadTimeClocks();
  };

  newTimeClock = () => {
    this.dialog.showNew();
  };

  editTimeClock = (uuid: string) => {
    const timeClock =
      this.timeClocks.find((t) => t.UUID == uuid) || clone(blankTimeClockForm);
    this.editor['edit'] = clone(timeClock);
    this.dialog.showEdit();
  };

  createTimeClock = (ev: TimeClockFormType) => {
    const { Start, End, ProjectId, UserId, IssueId } = ev;
    this.api
      .post({
        path: 'timeclock',
        body: { Start, End, ProjectId, UserId, IssueId },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((result: any) => {
        this.timeClocks.push(result);
        this.count = this.timeClocks.length;
        this.setPaginated();
        this.dialog.hideNew();
        console.log(result);
      });
  };

  updateTimeClock = (ev: TimeClockFormType) => {
    const { Start, End, ProjectId, UserId, IssueId, UUID } = ev;
    this.api
      .patch({
        path: `timeclock/${UUID}`,
        body: { Start, End, ProjectId, UserId, IssueId },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((result: any) => {
        const idx = this.timeClocks.findIndex((t) => t.UUID == UUID);
        if (idx != -1) {
          this.timeClocks[idx] = result;
          this.setPaginated();
          this.dialog.hideEdit();
        }
      });
  };

  ngOnInit(): void {
    this.loadTimeClocks();
    this.loadUsers();
    this.loadIssues();
    this.loadProjects();
  }
}
