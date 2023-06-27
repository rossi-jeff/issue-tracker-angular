import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { IssueType } from '../../types/issue.type';
import { UserSessionStorage } from '../../lib/user-session';
import { clone } from '../../lib/clone';
import { DashboardDialogsComponent } from '../dashboard-dialogs/dashboard-dialogs.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  issues: IssueType[] = [];
  types: string[] = ['New', 'Assigned', 'Accepted', 'Fixed', 'Other'];
  sorted: { [key: string]: IssueType[] } = {};
  tmp: { uuid: string; from: string; to: string } = {
    uuid: '',
    from: '',
    to: '',
  };

  constructor(private api: ApiService, private titleService: Title) {
    this.titleService.setTitle('Issue Tracker | Dashboard');
  }

  session: UserSessionStorage = new UserSessionStorage();

  @ViewChild(DashboardDialogsComponent) dialog!: DashboardDialogsComponent;

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

  dragStart = (event: any) => {
    if (event.target) event.dataTransfer.setData('text', event.target.id);
    else if (event.detail)
      event.detail.dataTransfer.setData('text', event.detail.target.id);
  };

  dragOver = (event: any) => {
    event.preventDefault();
  };

  dragEnter = (event: any) => {
    let { target } = event;
    if (target) {
      while (!target.classList.contains('dashboard-column'))
        target = target.parentElement;
      target.classList.add('over');
      setTimeout(() => {
        target.classList.remove('over');
      }, 500);
    }
  };

  drop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const data = event.dataTransfer.getData('text');
    const [from, uuid] = data.split('_');
    let to = '';
    let { target } = event;
    if (target) {
      while (!target.classList.contains('dashboard-column'))
        target = target.parentElement;
      to = target.id.split('-')[1];
    }
    this.moveIssue(uuid, from, to);
    this.setIssueStatus(uuid, from, to);
  };

  moveIssue = (uuid: string, from: string, to: string) => {
    let idx: number, issue: IssueType | undefined;
    switch (from) {
      case 'New':
        idx = this.sorted['New'].findIndex((s) => s.UUID == uuid);
        if (idx != -1) {
          issue = this.sorted['New'][idx];
          this.sorted['New'].splice(idx, 1);
        }
        break;
      case 'Assigned':
        idx = this.sorted['Assigned'].findIndex((s) => s.UUID == uuid);
        if (idx != -1) {
          issue = this.sorted['Assigned'][idx];
          this.sorted['Assigned'].splice(idx, 1);
        }
        break;
      case 'Accepted':
        idx = this.sorted['Accepted'].findIndex((s) => s.UUID == uuid);
        if (idx != -1) {
          issue = this.sorted['Accepted'][idx];
          this.sorted['Accepted'].splice(idx, 1);
        }
        break;
      case 'Fixed':
        idx = this.sorted['Fixed'].findIndex((s) => s.UUID == uuid);
        if (idx != -1) {
          issue = this.sorted['Fixed'][idx];
          this.sorted['Fixed'].splice(idx, 1);
        }
        break;
      case 'Other':
        idx = this.sorted['Other'].findIndex((s) => s.UUID == uuid);
        if (idx != -1) {
          issue = this.sorted['Other'][idx];
          this.sorted['Other'].splice(idx, 1);
        }
        break;
    }
    if (issue) {
      switch (to) {
        case 'New':
          this.sorted['New'].unshift(issue);
          break;
        case 'Assigned':
          this.sorted['Assigned'].unshift(issue);
          break;
        case 'Accepted':
          this.sorted['Accepted'].unshift(issue);
          break;
        case 'Fixed':
          this.sorted['Fixed'].unshift(issue);
          break;
        case 'Other':
          this.sorted['Other'].unshift(issue);
          break;
      }
    }
    this.sorted = clone(this.sorted);
  };

  setIssueStatus = (uuid: string, from: string, to: string) => {
    let issue = this.findIssue(uuid, to);
    if (!issue) issue = this.findIssue(uuid, from);
    if (issue) {
      if (to == 'Other') {
        this.tmp = { uuid, from, to };
        this.selectOtherStatus();
      } else {
        issue.Status = to;
        this.updateIssue(issue);
      }
    }
  };

  selectOtherStatus = () => {
    this.dialog.showOther();
  };

  setOtherStatus = (status: string) => {
    const { uuid, from, to } = this.tmp;
    let issue = this.findIssue(uuid, to);
    if (!issue) issue = this.findIssue(uuid, from);
    if (issue) {
      issue.Status = status;
      this.updateIssue(issue);
      this.dialog.hideOther();
    }
  };

  findIssue = (uuid: string, key: string) => {
    return this.sorted[key].find((i) => i.UUID == uuid);
  };

  updateIssue = (issue: IssueType) => {
    const { Status, UUID } = issue;
    this.api
      .patch({
        path: `issue/${UUID}`,
        body: { Status },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((result) => {
        const idx = this.issues.findIndex((i) => i.UUID == UUID);
        if (idx != -1) {
          this.issues[idx] = result;
          this.sortIssues();
        }
      });
  };

  ngOnInit(): void {
    this.loadIssues();
  }
}
