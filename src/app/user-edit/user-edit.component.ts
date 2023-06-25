import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { UserSessionStorage } from '../../lib/user-session';
import { UserRoleArray } from '../../types/array.types';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleType, UserType } from '../../types/user.type';
import { ActivatedRoute } from '@angular/router';
import {
  EmailFormType,
  PhoneFormType,
  UserDialogsComponent,
  blankEmailForm,
  blankPhoneForm,
} from '../user-dialogs/user-dialogs.component';
import { PhoneType } from '../../types/phone.type';
import { EmailType } from '../../types/email.type';
import { clone } from '../../lib/clone';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  constructor(private api: ApiService, private route: ActivatedRoute) {}

  session: UserSessionStorage = new UserSessionStorage();
  uuid!: string;
  roles = UserRoleArray;
  userForm = new FormGroup({
    Credentials: new FormGroup({
      Username: new FormControl(''),
    }),
    Name: new FormGroup({
      First: new FormControl(''),
      Middle: new FormControl(''),
      Last: new FormControl(''),
    }),
    Roles: new FormControl<RoleType[]>([]),
  });
  user: UserType = {
    Credentials: {},
    Name: {},
    Roles: [],
    Phones: [],
    Emails: [],
  };

  editor: {
    phone: { [key: string]: PhoneType };
    email: { [key: string]: EmailType };
  } = {
    phone: {
      new: clone(blankPhoneForm),
      edit: clone(blankPhoneForm),
    },
    email: {
      new: clone(blankEmailForm),
      edit: clone(blankEmailForm),
    },
  };

  @ViewChild(UserDialogsComponent) dialog!: UserDialogsComponent;

  roleChecked = (ev: any) => {};

  updateUserAttributes = () => {};

  newPhone = () => {
    this.dialog.showNewPhone();
  };

  newEmail = () => {
    this.dialog.showNewEmail();
  };

  createPhone = (ev: PhoneFormType) => {};

  createEmail = (ev: EmailFormType) => {};

  editPhone = (uuid: string) => {
    if (!this.user.Phones) this.user.Phones = [];
    const phone = this.user.Phones.find((p) => p.UUID == uuid);
    this.editor.phone['edit'] = phone ? clone(phone) : clone(blankPhoneForm);
    this.dialog.showEditPhone();
  };

  editEmail = (uuid: string) => {
    if (!this.user.Emails) this.user.Emails = [];
    const email = this.user.Emails.find((e) => e.UUID == uuid);
    this.editor.email['edit'] = email ? clone(email) : clone(blankEmailForm);
    this.dialog.showEditEmail();
  };

  deletePhone = (uuid: string) => {
    if (!this.user.Phones) this.user.Phones = [];
  };

  deleteEmail = (uuid: string) => {
    if (!this.user.Emails) this.user.Emails = [];
  };

  updatePhone = (ev: PhoneFormType) => {
    const { Number, Type, Usage, Public, UUID } = ev;
    if (!Number || !Type || !Usage || !UUID || Public == null) return;
    if (!this.user.Phones) this.user.Phones = [];
  };

  updateEmail = (ev: EmailFormType) => {
    const { Address, Usage, Public, UUID } = ev;
    if (!Address || !Usage || !UUID || Public == null) return;
    if (!this.user.Emails) this.user.Emails = [];
  };

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid') || '';
    if (this.uuid) {
      this.api.get({ path: `user/${this.uuid}` }).subscribe((result: any) => {
        console.log(result);
        this.user = result;
        this.userForm.patchValue({
          Credentials: { Username: result.Credentials.Username },
          Name: {
            First: result.Name.First,
            Middle: result.Name.Middle,
            Last: result.Name.Last,
          },
          Roles: result.Roles,
        });
      });
    }
  }
}
