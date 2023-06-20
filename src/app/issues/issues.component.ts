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

  constructor(private api: ApiService) {}

  loadIssues = () => {
    this.api.get({ path: 'issue ' }).subscribe((result: any) => {
      this.issues = result;
    });
  };

  ngOnInit(): void {
    this.loadIssues();
  }
}
