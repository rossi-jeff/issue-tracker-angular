import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserType } from '../../types/user.type';
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from '../../types/array.types';
import { getFullName } from '../../lib/get-full-name';

@Component({
  selector: 'app-issue-filter',
  templateUrl: './issue-filter.component.html',
  styleUrls: ['./issue-filter.component.css'],
})
export class IssueFilterComponent {
  @Input() users!: UserType[];
  @Output() filterIssues = new EventEmitter<{ [key: string]: string }>();

  filter: { [key: string]: string } = {
    Priority: '',
    Status: '',
    Type: '',
    Complexity: '',
    AuthorId: '',
    AssignedToId: '',
  };

  priorities = PriorityArray;
  statuses = StatusArray;
  types = IssueTypeArray;
  complexities = ComplexityArray;

  selectChanged = (ev: any, key: string) => {
    switch (key) {
      case 'Priority':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? PriorityArray[ev.target.selectedIndex - 1]
            : '';
        break;
      case 'Status':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? StatusArray[ev.target.selectedIndex - 1]
            : '';
        break;
      case 'Type':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? IssueTypeArray[ev.target.selectedIndex - 1]
            : '';
        break;
      case 'Complexity':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? ComplexityArray[ev.target.selectedIndex - 1]
            : '';
        break;
      case 'AuthorId':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? this.users[ev.target.selectedIndex - 1].Id?.toString() || ''
            : '';
        break;
      case 'AssignedToId':
        this.filter[key] =
          ev.target.selectedIndex > 0
            ? this.users[ev.target.selectedIndex - 1].Id?.toString() || ''
            : '';
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
    this.filterIssues.emit(sanitized);
  };

  clearFilters = () => {
    for (const key in this.filter) this.filter[key] = '';
    this.filterChanged();
  };

  toggle = () => {
    const el = document.getElementById('issue-filter-content');
    if (el) el.classList.toggle('open');
  };

  fullName = getFullName;
}
