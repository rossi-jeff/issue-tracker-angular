import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IssueType } from '../../types/issue.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  issues: IssueType[] = [];
  types: string[] = ['New', 'Assigned', 'Accepted', 'Fixed', 'Other'];
  sorted: { [key: string]: IssueType[] } = {};

  constructor(private api: ApiService) {}

  loadIssues = () => {
    this.api.get({ path: 'issue ' }).subscribe((result: any) => {
      this.issues = result;
      this.sortIssues();
    });
  };

  sortIssues = () => {
    for (const type of this.types) this.sorted[type] = [];
    for (const issue of this.issues) {
      switch (issue.Status) {
        case 'New':
          this.sorted['New'].push(issue);
          break;
        case 'Assigned':
          this.sorted['Assigned'].push(issue);
          break;
        case 'Accepted':
          this.sorted['Accepted'].push(issue);
          break;
        case 'Fixed':
          this.sorted['Fixed'].push(issue);
          break;
        default:
          this.sorted['Other'].push(issue);
          break;
      }
    }
  };

  ngOnInit(): void {
    this.loadIssues();
  }
}
