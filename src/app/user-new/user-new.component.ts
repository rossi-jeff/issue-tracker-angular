import { Component, ViewChild } from '@angular/core';
import { UserRoleArray } from '../../types/array.types';
import { FormControl, FormGroup } from '@angular/forms';
import { UserType } from '../../types/user.type';
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
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
})
export class UserNewComponent {
  roles = UserRoleArray;
  userForm = new FormGroup({
    Credentials: new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl(''),
    }),
    Name: new FormGroup({
      First: new FormControl(''),
      Middle: new FormControl(''),
      Last: new FormControl(''),
    }),
    Roles: new FormControl<string[]>([]),
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

  roleChecked = (ev: any) => {
    const { checked, value } = ev.target;
    const { Roles } = this.userForm.value;
    if (!Roles) return;
    if (checked) {
      Roles.push(value);
    } else {
      const idx = Roles.indexOf(value);
      if (idx != -1) Roles.splice(idx, 1);
    }
    this.userForm.patchValue({ Roles });
  };

  newPhone = () => {
    this.dialog.showNewPhone();
  };

  newEmail = () => {
    this.dialog.showNewEmail();
  };

  createPhone = (ev: PhoneFormType) => {
    console.log(ev);
    this.dialog.hideNewPhone();
  };

  createEmail = (ev: EmailFormType) => {
    console.log(ev);
    this.dialog.hideNewEmail();
  };
}
