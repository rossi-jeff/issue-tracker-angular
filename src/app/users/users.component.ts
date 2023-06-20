import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserType } from '../../types/user.type';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserType[] = [];

  constructor(private api: ApiService) {}

  loadUsers = () => {
    this.api.get({ path: 'user' }).subscribe((result: any) => {
      this.users = result;
    });
  };

  ngOnInit(): void {
    this.loadUsers();
  }
}
