import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserType } from '../../types/user.type';
import { UserSessionStorage } from '../../lib/user-session';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserType[] = [];
  paginated: UserType[] = [];

  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(private api: ApiService, private titleService: Title) {
    this.titleService.setTitle('Issue Tracker | Users');
  }

  session: UserSessionStorage = new UserSessionStorage();

  loadUsers = () => {
    this.api.get({ path: 'user' }).subscribe((result: any) => {
      this.users = result;
      this.count = this.users.length;
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
    this.paginated = this.users.slice(offset, offset + limit);
  };

  ngOnInit(): void {
    this.loadUsers();
  }
}
