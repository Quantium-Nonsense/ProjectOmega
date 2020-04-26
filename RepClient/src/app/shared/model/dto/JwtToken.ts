import { PrivilegeModel } from './privilege.model';

/**
 * This is the user that is returned after decoding the jwt token
 */
export class JwtToken {
  id: string;
  exp: string;
  iat: string;
  email: string;
  roles: PrivilegeModel[];

  constructor(id: string, exp: string, iat: string, email: string, roles: PrivilegeModel[]) {
    this.id = id;
    this.exp = exp;
    this.iat = iat;
    this.email = email;
    this.roles = roles;
  }
}
