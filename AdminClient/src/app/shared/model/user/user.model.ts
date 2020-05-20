import { RoleModel } from '../../../models/role/role.model';

export class UserModel {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public roles: RoleModel[],
    public companyId: number,
  ) {
  }
}
