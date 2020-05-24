/**
 * This is the user that is returned after decoding the jwt token
 */
import { RoleModel } from './role/role.model';

export class JwtToken {
  id: string;
  exp: string;
  iat: string;
  email: string;
  roles: RoleModel;

  constructor(id: string, exp: string, iat: string, email: string, roles: RoleModel) {
    this.id = id;
    this.exp = exp;
    this.iat = iat;
    this.email = email;
    this.roles = roles;
  }
}
