import { Component, Input, OnInit } from '@angular/core';
import { IssueType } from '../../types/issue.type';
import { getFullName } from 'src/lib/get-full-name';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css'],
})
export class IssueCardComponent implements OnInit {
  @Input() issue!: IssueType;

  author: string = '';
  assignedTo: string = '';

  ngOnInit(): void {
    this.author = this.issue.Author ? getFullName(this.issue.Author) : 'N/A';
    this.assignedTo = this.issue.AssignedTo
      ? getFullName(this.issue.AssignedTo)
      : 'N/A';
  }
}
