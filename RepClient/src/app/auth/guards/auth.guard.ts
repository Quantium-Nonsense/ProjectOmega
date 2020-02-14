import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../reducers';
import * as AuthActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private jwtHelperService: JwtHelperService,
    private store: Store<fromApp.State>
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const canRedirect = this.isAuthenticated();
    console.log(canRedirect);
    if (!canRedirect) {
      this.store.dispatch(AuthActions.loginRejected({errorMessage: 'Session expired please log-in again.'}));

      return false;
    }

    return true;
  }

  isAuthenticated = (): boolean => {
    // Decode token once token is implemented
    // Check if token expired or not
    // Return true or false
    // let user: User;

    // In try catch as token received might be in an invalid form
    try {
      // Token exists
      if (localStorage.getItem(environment.ACCESS_TOKEN)) {
        // Once we get a valid backend JWT token use this
        // user = this.jwtHelperService.decodeToken(localStorage.getItem(environment.ACCESS_TOKEN));
        // For now we just cache in localStorage the ACCESS_TOKEN value
        // So if that exists assume user is logged in
      } else {
        // Not needed once a JWT token is served from backend
        // This else block exists only until that is provided
        return false;
      }
    } catch (e) {
      return false;
    }

    // If a user could be decoded and token is not expired return true
    // For now as no JWT token exists simply if we reach this stage assume true
    return true;
    // Uncomment this once valid JWT token exists
    // return !(!user || this.jwtHelperService.isTokenExpired(localStorage.getItem(environment.ACCESS_TOKEN)));
  };
}
