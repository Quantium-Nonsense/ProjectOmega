import { RoleModel } from '../role/role.model';

export class UserModel {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public roles: RoleModel[],
  ) {
  }
}
