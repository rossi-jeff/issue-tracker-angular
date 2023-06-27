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
import { Title } from '@angular/platform-browser';
import { getFullName } from '../../lib/get-full-name';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('Issue Tracker | Edit User');
  }

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
    const { Username } = Credentials;
    this.user.Roles = Roles;
    if (!this.user.Name) this.user.Name = { First: '', Middle: '', Last: '' };
    this.user.Name.First = First || '';
    this.user.Name.Middle = Middle || '';
    this.user.Name.Last = Last || '';
    if (!this.user.Credentials)
      this.user.Credentials = { Username: '', Password: '' };
    this.user.Credentials.Username = Username || '';
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
    this.api
      .post({
        path: `user/${this.uuid}/phone`,
        body: { Number, Type, Usage, Public },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((phone) => {
        if (!this.user.Phones) this.user.Phones = [];
        this.user.Phones.push(phone);
        this.editor.phone['new'] = clone(blankPhoneForm);
        this.dialog.hideNewPhone();
      });
  };

  createEmail = (ev: EmailFormType) => {
    const { Address, Usage, Public } = ev;
    if (!Address || !Usage || Public == null) return;
    this.api
      .post({
        path: `user/${this.uuid}/email`,
        body: { Address, Usage, Public },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((email) => {
        if (!this.user.Emails) this.user.Emails = [];
        this.user.Emails.push(email);
        this.editor.email['new'] = clone(blankEmailForm);
        this.dialog.hideNewEmail();
      });
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
    this.api
      .delete({
        path: `phone/${uuid}`,
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe(() => {
        if (!this.user.Phones) this.user.Phones = [];
        const idx = this.user.Phones.findIndex((p) => p.UUID == uuid);
        if (idx != -1) {
          this.user.Phones.slice(idx, 1);
        }
      });
  };

  deleteEmail = (uuid: string) => {
    this.api
      .delete({
        path: `email/${uuid}`,
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe(() => {
        if (!this.user.Emails) this.user.Emails = [];
        const idx = this.user.Emails.findIndex((e) => e.UUID == uuid);
        if (idx != -1) {
          this.user.Emails.splice(idx, 1);
        }
      });
  };

  updatePhone = (ev: PhoneFormType) => {
    const { Number, Type, Usage, Public, UUID } = ev;
    if (!Number || !Type || !Usage || !UUID || Public == null) return;
    this.api
      .patch({
        path: `phone/${UUID}`,
        body: { Number, Type, Usage, Public },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((phone) => {
        if (!this.user.Phones) this.user.Phones = [];
        const idx = this.user.Phones.findIndex((p) => p.UUID == UUID);
        if (idx != -1) {
          this.user.Phones[idx] = phone;
        }
        this.dialog.hideEditPhone();
      });
  };

  updateEmail = (ev: EmailFormType) => {
    const { Address, Usage, Public, UUID } = ev;
    if (!Address || !Usage || !UUID || Public == null) return;
    this.api
      .patch({
        path: `email/${UUID}`,
        body: { Address, Usage, Public },
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((email) => {
        if (!this.user.Emails) this.user.Emails = [];
        const idx = this.user.Emails.findIndex((e) => e.UUID == UUID);
        if (idx != -1) {
          this.user.Emails[idx] = email;
        }
        this.dialog.hideEditEmail();
      });
  };

  updateUser = () => {
    const { Credentials, Name, Roles, UUID } = this.user;
    this.api
      .patch({
        path: `user/${UUID}`,
        body: {},
        token: this.session.data.Token ? this.session.data.Token : undefined,
      })
      .subscribe((user: any) => {
        this.user = user;
        this.userForm.patchValue({
          Credentials: { Username: user.Credentials.Username },
          Name: {
            First: user.Name.First,
            Middle: user.Name.Middle,
            Last: user.Name.Last,
          },
          Roles: user.Roles,
        });
      });
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
        this.titleService.setTitle(`Issue Tracker | ${getFullName(this.user)}`);
      });
    }
  }
}
