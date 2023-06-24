import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clone } from '../../lib/clone';
import { PhoneTypeArray, UsageArray } from '../../types/array.types';
import { PhoneType } from '../../types/phone.type';
import { EmailType } from '../../types/email.type';

export type PhoneFormType = {
  Number?: string | null;
  Usage?: string | null;
  Type?: string | null;
  Public?: boolean | null;
  UUID?: string | null;
};

export const blankPhoneForm: PhoneFormType = {
  Number: '',
  Usage: '',
  Type: '',
  Public: false,
  UUID: '',
};

export type EmailFormType = {
  Address?: string | null;
  Usage?: string | null;
  Public?: boolean | null;
  UUID?: string | null;
};

export const blankEmailForm: EmailFormType = {
  Address: '',
  Usage: '',
  Public: false,
  UUID: '',
};

@Component({
  selector: 'app-user-dialogs',
  templateUrl: './user-dialogs.component.html',
  styleUrls: ['./user-dialogs.component.css'],
})
export class UserDialogsComponent {
  private _newPhone!: PhoneType;
  private _editPhone!: PhoneType;
  private _newEmail!: EmailType;
  private _editEmail!: EmailType;

  @Input()
  set newPhone(value: PhoneType) {
    this._newPhone = value;
    this.newPhoneForm.patchValue(clone(blankPhoneForm));
  }
  get newPhone() {
    return this._newPhone;
  }

  @Input()
  set editPhone(value: PhoneType) {
    this._editPhone = value;
    this.editPhoneForm.patchValue({
      Number: value.Number || '',
      Type: value.Type || '',
      Usage: value.Usage || '',
      Public: value.Public || false,
      UUID: value.UUID || '',
    });
  }
  get editPhone() {
    return this._editPhone;
  }

  @Input()
  set newEmail(value: EmailType) {
    this._newEmail = value;
    this.newEmailForm.patchValue(clone(blankEmailForm));
  }
  get newEmail() {
    return this._newEmail;
  }

  @Input()
  set editEmail(value: EmailType) {
    this._editEmail = value;
    this.editEmailForm.patchValue({
      Address: value.Address || '',
      Usage: value.Usage || '',
      Public: value.Public || false,
      UUID: value.UUID || '',
    });
  }
  get editEmail() {
    return this._editEmail;
  }

  @Output() createPhone = new EventEmitter<PhoneFormType>();
  @Output() createEmail = new EventEmitter<EmailFormType>();

  newPhoneForm = new FormGroup({
    Number: new FormControl(''),
    Usage: new FormControl(''),
    Type: new FormControl(''),
    Public: new FormControl(false),
    UUID: new FormControl(''),
  });
  editPhoneForm = new FormGroup({
    Number: new FormControl(''),
    Usage: new FormControl(''),
    Type: new FormControl(''),
    Public: new FormControl(false),
    UUID: new FormControl(''),
  });
  newEmailForm = new FormGroup({
    Address: new FormControl(''),
    Usage: new FormControl(''),
    Public: new FormControl(false),
    UUID: new FormControl(''),
  });
  editEmailForm = new FormGroup({
    Address: new FormControl(''),
    Usage: new FormControl(''),
    Public: new FormControl(false),
    UUID: new FormControl(''),
  });

  usages = UsageArray;
  types = PhoneTypeArray;

  showOverlay = () => {
    const overlay = document.getElementById('user-overlay');
    if (overlay) overlay.classList.add('open');
  };

  hideOverlay = () => {
    const overlay = document.getElementById('user-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  showNewPhone = () => {
    this.hideAll();
    this.showOverlay();
    const dialog = document.getElementById('new-phone-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideNewPhone = () => {
    const dialog = document.getElementById('new-phone-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  showEditPhone = () => {
    this.hideAll();
    this.showOverlay();
    const dialog = document.getElementById('edit-phone-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideEditPhone = () => {
    const dialog = document.getElementById('edit-phone-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  showNewEmail = () => {
    this.hideAll();
    this.showOverlay();
    const dialog = document.getElementById('new-email-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideNewEmail = () => {
    const dialog = document.getElementById('new-email-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  showEditEmail = () => {
    this.hideAll();
    this.showOverlay();
    const dialog = document.getElementById('edit-email-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideEditEmail = () => {
    const dialog = document.getElementById('edit-email-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  hideAll = () => {
    this.hideEditEmail();
    this.hideEditPhone();
    this.hideNewEmail();
    this.hideNewPhone();
  };

  createPhoneClicked = () => {
    this.createPhone.emit(this.newPhoneForm.value)
  }

  createEmailClicked = () => {
    this.createEmail.emit(this.newEmailForm.value)
  }
}
