import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueType } from '../../types/issue.type';
import { getFullName } from '../../lib/get-full-name';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css'],
})
export class DashboardCardComponent implements OnInit {
  @Input() issue!: IssueType;
  @Input() draggable!: boolean;
  @Input() from!: string;
  @Output() dragStart = new EventEmitter<any>();

  project: string = '';
  author: string = '';
  assignedTo: string = '';

  toggle = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
  };

  toggleContent = () => {
    this.toggle(`dashboard-card-content-${this.issue.Id}`);
  };

  toggleDescription = () => {
    this.toggle(`dashboard-card-description-${this.issue.Id}`);
  };

  toggleDetails = () => {
    this.toggle(`dashboard-card-details-${this.issue.Id}`);
  };

  onDragStart = (ev: any) => {
    this.dragStart.emit(ev);
  };

  ngOnInit(): void {
    const { issue } = this;
    this.project = issue.Project ? issue.Project.Name || 'N/A' : 'N/A';
    this.author = issue.Author ? getFullName(issue.Author) : 'N/A';
    this.assignedTo = issue.AssignedTo ? getFullName(issue.AssignedTo) : 'N/A';
  }
}
