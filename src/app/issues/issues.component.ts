import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IssueType } from '../../types/issue.type';
import { UserType } from '../../types/user.type';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent implements OnInit {
  issues: IssueType[] = [];
  users: UserType[] = [];
  paginated: IssueType[] = [];

  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(private api: ApiService) {}

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

  ngOnInit(): void {
    this.loadIssues();
    this.loadUsers();
  }
}
