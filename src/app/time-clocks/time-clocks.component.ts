import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TimeClockType } from '../../types/time-clock.type';
import { IssueType } from '../../types/issue.type';
import { UserType } from '../../types/user.type';
import { ProjectType } from '../../types/project.type';

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

  constructor(private api: ApiService) {}

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

  ngOnInit(): void {
    this.loadTimeClocks();
    this.loadUsers();
    this.loadIssues();
    this.loadProjects();
  }
}
