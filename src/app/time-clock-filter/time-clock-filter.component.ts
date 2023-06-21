import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectType } from '../../types/project.type';
import { IssueType } from '../../types/issue.type';
import { UserType } from '../../types/user.type';
import { getFullName } from '../../lib/get-full-name';

@Component({
  selector: 'app-time-clock-filter',
  templateUrl: './time-clock-filter.component.html',
  styleUrls: ['./time-clock-filter.component.css'],
})
export class TimeClockFilterComponent {
  @Input() projects!: ProjectType[];
  @Input() issues!: IssueType[];
  @Input() users!: UserType[];
  @Output() filterTimeClocks = new EventEmitter<{ [key: string]: string }>();

  filter: { [key: string]: string } = {
    UserId: '',
    ProjectId: '',
    IssueId: '',
    StartDate: '',
    EndDate: '',
  };

  selectChanged = (ev: any, key: string) => {
    switch (key) {
      case 'UserId':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? this.users[ev.target.selectedIndex - 1].Id?.toString() || ''
            : '';
        break;
      case 'ProjectId':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? this.projects[ev.target.selectedIndex - 1].Id?.toString() || ''
            : '';
        break;
      case 'IssueId':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? this.issues[ev.target.selectedIndex - 1].Id?.toString() || ''
            : '';
        break;
      default:
        break;
    }
    this.filterChanged();
  };

  dateChanged = (ev: any, key: string) => {
    switch (key) {
      case 'StartDate':
        this.filter[key] = ev.target.value;
        break;
      case 'EndDate':
        this.filter[key] = ev.target.value;
        break;
      default:
        break;
    }
    this.filterChanged();
  };

  filterChanged = () => {
    let sanitized: { [key: string]: string } = {};
    for (const key in this.filter) {
      if (this.filter[key] != '') sanitized[key] = this.filter[key];
    }
    this.filterTimeClocks.emit(sanitized);
  };

  clearFilters = () => {
    for (const key in this.filter) this.filter[key] = '';
    this.filterChanged();
  };

  toggle = () => {
    const el = document.getElementById('time-clock-filter-content');
    if (el) el.classList.toggle('open');
  };

  fullName = getFullName;
}
