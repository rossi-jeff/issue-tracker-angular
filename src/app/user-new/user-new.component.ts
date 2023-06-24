import { Component } from '@angular/core';
import { UserRoleArray } from '../../types/array.types';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

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
}
