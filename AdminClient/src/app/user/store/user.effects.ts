import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { UserModel } from '../../shared/model/user.model';
import * as UserActions from './user.actions';
import * as fromApp from '../../reducers/index';

@Injectable()
export class UserEffects {

  beginLoadingPage$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.beginLoadingUserPage),
    map((action: Action) => UserActions.loadAllUsers())
  ));

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadAllUsers),
    switchMap((action: Action) => of(UserActions.usersLoaded({users: this.createMockUsers()})).pipe(delay(2000)))
  ));

  constructor(
    private store: Store<fromApp.State>,
    private actions$: Actions
  ) {
  }

  /**
   * Creates 50 dummy users for display
   *
   * @returns UserModel[]
   */
  createMockUsers = (): UserModel[] => {
    const mockUsers: UserModel[] = [];

    for (let i = 0; i < 50; i++) {
      mockUsers.push(
        new UserModel(
          (Math.random() * 153000).toString(),
          `bla${i}@bla.com`,
          `longasspass${i}`,
          ['Admin', 'Rep'][Math.floor(Math.random() * 2)],
          'Company 1'));
    }

    return mockUsers;
  };
}
