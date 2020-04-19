import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import * as fromApp from '../../reducers/index';
import { PopupDialogComponent } from '../../shared/components/popup-dialog/popup-dialog.component';
import { PopupDialogDataModel } from '../../shared/model/popup-dialog-data.model';
import { UserModel } from '../../shared/model/user.model';
import * as UserActions from './user.actions';
import { selectFocusedUser, selectUsers } from './user.reducer';

@Injectable()
export class UserEffects {

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteFocusedUser),
    switchMap((action: Action) => {

      let newUsers: UserModel[] = [];
      let currentUser: UserModel;

      this.store.select(selectFocusedUser).pipe(take(1)).subscribe(user => currentUser = user);
      this.store.select(selectUsers).pipe(take(1)).subscribe(users => {
        newUsers = users.filter(u => u.id !== currentUser.id)
      });

      return of(UserActions.userDeleted({newUserList: newUsers})).pipe(delay(2000));
    })
  ));

  showDeleteUserDialog$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.showDeleteUserDialog),
    map((action: Action & { user: UserModel }) =>
      this.dialog.open<PopupDialogComponent, PopupDialogDataModel>(PopupDialogComponent, {
        data: {
          title: 'Delete user',
          description: 'Are you sure you want to delete this user?',
          dialogActions: [
            {
              action: () => {
                this.dialog.closeAll();
                this.store.dispatch(UserActions.deleteFocusedUser());
              },
              text: 'Confirm',
              color: 'warn'
            },
            {
              action: () => this.dialog.closeAll(),
              text: 'Cancel',
              color: 'primary'
            }
          ]
        }
      }))
    // Even though this indicates dispatch as false please note that the dispatch action on dialog actions will infact be dispatched
    // This is due that the modal is the one calling the function and its not contained within this effect
  ), {dispatch: false});

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
    private actions$: Actions,
    public dialog: MatDialog
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

