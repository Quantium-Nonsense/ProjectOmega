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
