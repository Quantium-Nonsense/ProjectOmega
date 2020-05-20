import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPathService {

  private readonly endPoint: string;

  constructor() {
    this.endPoint = environment.common.apiRoot();
  }

  /**
   * Returns the end point to log in the user
   */
  get registerEndPoint(): string {
    return `${ this.endPoint }/registration`;
  }

  get allUsersEndPoint(): string {
    return `${ this.endPoint }/user/get`;
  }

  get allRolesEndPoint(): string {
    return `${this.endPoint}/role/get`
  }

  get createNewSupplierEndPoint(): string {
    return `${ this.endPoint }/supplier/create`;
  }

  getEditUserEndPoint(userId: number) {
    return `${this.endPoint}/user/update/${userId}`
  }

  getEditSupplierEndPoint(supplierId: number) {
    return `${ this.endPoint }/supplier/update/${ supplierId }`;
  }

  getDeleteSupplierEndPoint(supplierId: number) {
    return `${ this.endPoint }/supplier/delete/${ supplierId }`;
  }

  /**
   * returns the login end point
   */
  get loginEndPoint(): string {
    return `${ this.endPoint }/authenticate`;
  }

  /**
   * The end point for all suppliers
   *
   * @returns All suppliers end point
   */
  get allSuppliers(): string {
    return `${ this.endPoint }/supplier/get`;
  }
}
