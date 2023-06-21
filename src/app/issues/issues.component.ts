import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IssueType } from '../../types/issue.type';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent implements OnInit {
  issues: IssueType[] = [];
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

  ngOnInit(): void {
    this.loadIssues();
  }
}
