export type UserSessionType = {
  UUID: string | null;
  Name: string | null;
  Token: string | null;
  UserName: string | null;
  SessionId: string | null;
  signedIn: boolean;
};

export const blankUserSession: UserSessionType = {
  UUID: null,
  Name: null,
  Token: null,
  UserName: null,
  SessionId: null,
  signedIn: false,
};

export class UserSessionStorage {
  private readonly _key: string = 'issue-tracker-angular';
  private _data!: UserSessionType;

  constructor() {}

  get data() {
    this.retrieveData();
    return this._data;
  }

  set data(session: UserSessionType) {
    this._data = session;
    this.storeData();
  }

  private retrieveData() {
    if (localStorage) {
      const stored = localStorage.getItem(this._key);
      this._data = stored ? JSON.parse(stored) : blankUserSession;
    } else this._data = blankUserSession;
  }

  private storeData() {
    if (localStorage) {
      localStorage.setItem(this._key, JSON.stringify(this._data));
    }
  }
}
