import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type CredentialsType = {
  Username?: string | null;
  Password?: string | null;
};

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.css'],
})
export class SignInDialogComponent {
  @Output() signIn = new EventEmitter<CredentialsType>();
  
  signInForm = new FormGroup({
    Username: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
  });

  showOverlay = () => {
    const overlay = document.getElementById('sign-in-overlay');
    if (overlay) overlay.classList.add('open');
  };

  hideOverlay = () => {
    const overlay = document.getElementById('sign-in-overlay');
    if (overlay) overlay.classList.remove('open');
  };

  showSignIn = () => {
    this.showOverlay();
    const dialog = document.getElementById('sign-in-dialog');
    if (dialog) dialog.classList.add('open');
  };

  hideSignIn = () => {
    const dialog = document.getElementById('sign-in-dialog');
    if (dialog) dialog.classList.remove('open');
    this.hideOverlay();
  };

  signInClicked = () => {
    if (this.signInForm.invalid) return;
    this.signIn.emit(this.signInForm.value);
  };
}
