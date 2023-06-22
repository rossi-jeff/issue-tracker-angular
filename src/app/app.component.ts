import { Component, ViewChild } from '@angular/core';
import {
  CredentialsType,
  SignInDialogComponent,
} from './sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'issue-tracker-angular';

  @ViewChild(SignInDialogComponent) dialog!: SignInDialogComponent;

  signInClicked = () => {
    this.dialog.showSignIn();
  };

  signIn = (credentials: CredentialsType) => {
    console.log(credentials);
    this.dialog.hideSignIn();
  };
}
