import { Component, ViewChild } from '@angular/core';
import { UserRoleArray } from '../../types/array.types';
import { FormControl, FormGroup } from '@angular/forms';
import { RoleType, UserType } from '../../types/user.type';
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
import { ApiService } from '../api.service';
import { UserSessionStorage } from '../../lib/user-session';

export type CredentialsFormType = {
  Username?: string | null;
  Password?: string | null;
};

export type NameFormType = {
  First?: string | null;
  Middle?: string | null;
  Last?: string | null;
};

export type UserFormType = {
  Credentials?: CredentialsFormType | null;
  Name?: NameFormType | null;
  Roles?: RoleType[] | null;
};

export const blankUserForm: UserFormType = {
  Credentials: { Username: '', Password: '' },
  Name: { First: '', Middle: '', Last: '' },
  Roles: [],
};

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
})
export class UserNewComponent {
  constructor(private api: ApiService) {}

  session: UserSessionStorage = new UserSessionStorage();

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
    this.updateUserAttributes();
  };

  updateUserAttributes = () => {
    const { Credentials, Name, Roles } = this.userForm.value;
    if (!Name || !Credentials || !Roles) return;
    const { First, Middle, Last } = Name;
    const { Username, Password } = Credentials;
    this.user.Roles = Roles;
    if (!this.user.Name) this.user.Name = { First: '', Middle: '', Last: '' };
    this.user.Name.First = First || '';
    this.user.Name.Middle = Middle || '';
    this.user.Name.Last = Last || '';
    if (!this.user.Credentials)
      this.user.Credentials = { Username: '', Password: '' };
    this.user.Credentials.Username = Username || '';
    this.user.Credentials.Password = Password || '';
  };

  newPhone = () => {
    this.dialog.showNewPhone();
  };

  newEmail = () => {
    this.dialog.showNewEmail();
  };

  createPhone = (ev: PhoneFormType) => {
    const { Number, Type, Usage, Public } = ev;
    if (!Number || !Type || !Usage || Public == null) return;
    if (!this.user.Phones) this.user.Phones = [];
    const phone: PhoneType = {
      Number,
      Type,
      Usage,
      Public,
      UUID: crypto.randomUUID(),
    };
    this.user.Phones.push(phone);
    this.dialog.hideNewPhone();
  };

  createEmail = (ev: EmailFormType) => {
    const { Address, Usage, Public } = ev;
    if (!Address || !Usage || Public == null) return;
    if (!this.user.Emails) this.user.Emails = [];
    const email: EmailType = {
      Address,
      Usage,
      Public,
      UUID: crypto.randomUUID(),
    };
    this.user.Emails.push(email);
    this.dialog.hideNewEmail();
  };

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
    const idx = this.user.Phones.findIndex((p) => p.UUID == uuid);
    if (idx != -1) this.user.Phones.splice(idx, 1);
  };

  deleteEmail = (uuid: string) => {
    if (!this.user.Emails) this.user.Emails = [];
    const idx = this.user.Emails.findIndex((e) => e.UUID == uuid);
    if (idx != -1) this.user.Emails.splice(idx, 1);
  };

  updatePhone = (ev: PhoneFormType) => {
    const { Number, Type, Usage, Public, UUID } = ev;
    if (!Number || !Type || !Usage || !UUID || Public == null) return;
    if (!this.user.Phones) this.user.Phones = [];
    const idx = this.user.Phones.findIndex((p) => p.UUID == UUID);
    if (idx != -1) {
      const phone: PhoneType = { Number, Type, Usage, Public, UUID };
      this.user.Phones[idx] = phone;
      this.dialog.hideEditPhone();
    }
  };

  updateEmail = (ev: EmailFormType) => {
    const { Address, Usage, Public, UUID } = ev;
    if (!Address || !Usage || !UUID || Public == null) return;
    if (!this.user.Emails) this.user.Emails = [];
    const idx = this.user.Emails.findIndex((e) => e.UUID == UUID);
    if (idx != -1) {
      const email: EmailType = { Address, Usage, Public, UUID };
      this.user.Emails[idx] = email;
      this.dialog.hideEditEmail();
    }
  };

  createUser = () => {
    const { user } = this;
    this.api
      .post({
        path: 'register',
        body: user,
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((result) => {
        console.log(result);
        this.userForm.patchValue(clone(blankUserForm));
        this.user.Emails = [];
        this.user.Phones = [];
        this.user.UUID = undefined;
        this.user.Id = undefined;
        this.updateUserAttributes();
      });
  };
}
