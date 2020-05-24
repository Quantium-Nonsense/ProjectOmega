export class User {
  private _email = '';
  private _roles: string[] = [];

  constructor(email: string, roles: string[]) {
    this._email = email;
    this._roles = roles;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get roles(): string[] {
    return this._roles;
  }

  set roles(value: string[]) {
    this._roles = value;
  }
}
