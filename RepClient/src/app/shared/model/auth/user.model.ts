import { RoleModel } from '../dto/role.model';

export class UserModel {
  constructor(
      public id?: string,
      public firstName?: string,
      public lastName?: string,
      public email?: string,
      public password?: string,
      public roles?: RoleModel) {
  }
}
