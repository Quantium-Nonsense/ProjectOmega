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
  get registerEndPoint(): string {
    return `${ this.endPoint }/registration`;
  }

  /**
   * returns the login end point
   */
  get loginEndPoint(): string {
    return `${ this.endPoint }/authenticate`;
  }
}
