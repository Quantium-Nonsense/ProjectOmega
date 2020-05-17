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

  /**
   * Returns the end point to log in the user
   */
  get register(): string {
    return `${ this.endPoint }/registration`;
  }

  get allCompanies(): string {
    return `${ this.endPoint }/supplier/get`;
  }

  /**
   * returns the login end point
   */
  get login(): string {
    return `${ this.endPoint }/authenticate`;
  }
}
