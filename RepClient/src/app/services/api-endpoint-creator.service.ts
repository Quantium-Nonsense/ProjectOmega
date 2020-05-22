import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointCreatorService {

  private readonly endPoint: string;

  constructor() {
    this.endPoint = environment.common.apiRoot();
  }

  getUpdateOrderEndPoint(id): string {
    return `${ this.endPoint }/order/update/${ id }`;
  }

  get createNewOrderEndPoint(): string {
    return `${ this.endPoint }/order/create`;
  }

  get createNewProductEndPoint(): string {
    return `${ this.endPoint }/product/create`;
  }

  get allCustomersEndPoint(): string {
    return `${ this.endPoint }/client/get`;
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
    return `${ this.endPoint }/role/get`;
  }

  get createNewSupplierEndPoint(): string {
    return `${ this.endPoint }/supplier/create`;
  }

  get allProductsEndPoint(): string {
    return `${ this.endPoint }/product/get`;
  }

  get createNewUserEndPoint(): string {
    return `${ this.endPoint }/registration`;
  }

  getDeleteUserEndPoint(userId: number): string {
    return `${ this.endPoint }/user/delete/${ userId }`;
  }

  getEditUserEndPoint(userId: number): string {
    return `${ this.endPoint }/user/update/${ userId }`;
  }

  getEditSupplierEndPoint(supplierId: number): string {
    return `${ this.endPoint }/supplier/update/${ supplierId }`;
  }

  getDeleteSupplierEndPoint(supplierId: number): string {
    return `${ this.endPoint }/supplier/delete/${ supplierId }`;
  }

  getDeleteProductEndPoint(productId: number): string {
    return `${ this.endPoint }/product/delete/${ productId }`;
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

  getEditProductEndPoint(id: number): string {
    return `${ this.endPoint }/product/update/${ id }`;
  }

  getDeleteCustomerEndPoint(id: number): string {
    return `${ this.endPoint }/client/delete/${ id }`;
  }

  get createCustomerEndPoint(): string {
    return `${ this.endPoint }/client/create`;
  }

  getEditCustomerEndPoint(id: number): string {
    return `${ this.endPoint }/client/update/${ id }`;
  }

  allOrdersEndPoint(): string {
    return `${ this.endPoint }/order/get`;
  }
}
