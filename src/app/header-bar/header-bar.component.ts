import { Component, ViewChild } from '@angular/core';
import {
  CredentialsType,
  SignInDialogComponent,
} from '../sign-in-dialog/sign-in-dialog.component';
import { UserSessionStorage, blankUserSession } from '../../lib/user-session';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css'],
})
export class HeaderBarComponent {
  constructor(private api: ApiService) {}

  @ViewChild(SignInDialogComponent) dialog!: SignInDialogComponent;

  session: UserSessionStorage = new UserSessionStorage();

  signInClicked = () => {
    this.dialog.showSignIn();
  };

  signOut = () => {
    this.session.data = blankUserSession;
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
}
