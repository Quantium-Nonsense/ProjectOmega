import { PrivilegeModel } from './privilege.model';

export class RoleModel {
  constructor(
      public id: string,
      public name: string,
      public privileges: PrivilegeModel[]
  ) {
  }
}
