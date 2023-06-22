import { Component, ViewChild } from '@angular/core';
import {
  CredentialsType,
  SignInDialogComponent,
} from './sign-in-dialog/sign-in-dialog.component';
import { ApiService } from './api.service';
import { UserSessionStorage, blankUserSession } from '../lib/user-session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private api: ApiService) {}

  @ViewChild(SignInDialogComponent) dialog!: SignInDialogComponent;

  session: UserSessionStorage = new UserSessionStorage();

  signInClicked = () => {
    this.dialog.showSignIn();
  };

  signIn = (credentials: CredentialsType) => {
    this.api
      .post({ path: 'auth/login', body: credentials })
      .subscribe((result: any) => {
        const { Name, SessionId, Token, UUID, UserName } = result;
        this.session.data = {
          Name,
          SessionId,
          Token,
          UUID,
          UserName,
          signedIn: true,
        };
      });
    this.dialog.hideSignIn();
  };

  signOut = () => {
    this.session.data = blankUserSession;
  };
}
