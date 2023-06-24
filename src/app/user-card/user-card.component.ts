import { Component, Input, OnInit } from '@angular/core';
import { UserType } from '../../types/user.type';
import { getFullName } from '../../lib/get-full-name';
import { UserSessionStorage } from '../../lib/user-session';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: UserType;

  name: string = '';

  session: UserSessionStorage = new UserSessionStorage();

  ngOnInit(): void {
    this.name = getFullName(this.user);
  }
}
