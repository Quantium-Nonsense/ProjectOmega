import { PrivilegeModel } from '../privilage/privilege.model';

export class RoleModel {
  constructor(
      public id: number,
      public name: string,
      public privileges: PrivilegeModel[]
  ) {
  }

}
