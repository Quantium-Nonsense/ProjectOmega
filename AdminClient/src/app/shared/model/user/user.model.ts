export class UserModel {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: string,
    public companyId: string,
  ) {
  }
}
