import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueType } from '../../types/issue.type';
import { getFullName } from '../../lib/get-full-name';
import { UserSessionStorage } from '../../lib/user-session';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css'],
})
export class IssueCardComponent implements OnInit {
  @Input() issue!: IssueType;
  @Output() editIssue = new EventEmitter<string>();

  author: string = '';
  assignedTo: string = '';

  session: UserSessionStorage = new UserSessionStorage();

  editIssueClicked = () => {
    const { UUID } = this.issue;
    this.editIssue.emit(UUID);
  };

  ngOnInit(): void {
    this.author = this.issue.Author ? getFullName(this.issue.Author) : 'N/A';
    this.assignedTo = this.issue.AssignedTo
      ? getFullName(this.issue.AssignedTo)
      : 'N/A';
  }
}
