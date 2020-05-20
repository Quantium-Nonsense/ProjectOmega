import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../reducers/index';
import { ApiPathService } from '../../services/api-path.service';
import { PopupDialogComponent } from '../../shared/components/popup-dialog/popup-dialog.component';
import { PopupDialogDataModel } from '../../shared/model/popup-dialog-data.model';
import { RoleModel } from '../../shared/model/role/role.model';
import { UserModel } from '../../shared/model/user/user.model';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import { EditUserComponent } from '../edit-user/edit-user.component';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

  editUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.editUser),
      switchMap((action: Action & { user: UserModel }) => {
        return this.httpEditUser(action.user).pipe(
            switchMap((user: UserModel) => {
              return [
                UserActions.userSuccessfullyEdited(),
                ToolbarActions.stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              return [
                UserActions.hasErrorMessage({ error: error.message }),
                ToolbarActions.stopProgressBar()
              ];
            })
        );
      })
  ));

  getAllRoles$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.getAllUserRoles),
      switchMap((action: Action) => {
        return this.httpGetAllRoles().pipe(
            switchMap((roles: RoleModel[]) => {
              return [
                UserActions.setAllUserRoles({ roles }),
                ToolbarActions.stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              return [
                ToolbarActions.stopProgressBar(),
                UserActions.hasErrorMessage({ error: error.message })
              ];
            })
        );
      })
  ));

  showEditUserModal$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.showEditUserModal),
      map((action: Action & { user: UserModel }) => {
        this.dialog.open<EditUserComponent, { type: 'edit' | 'create', user: UserModel }>(EditUserComponent, {
          width: '60vw',
          data: {
            type: 'edit',
            user: action.user
          }
        });

        return UserActions.getAllUserRoles();
      })
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap((action: Action & { user: UserModel }) => {
        return this.httpDeleteUser(action.user.id).pipe(
            switchMap((user: UserModel) => {
              return [
                ToolbarActions.stopProgressBar(),
                UserActions.userDeleted()
              ];
            }),
            catchError((error: Error) => {
              return [
                ToolbarActions.stopProgressBar(),
                UserActions.hasErrorMessage({ error: error.message })
              ];
            })
        );
      })
  ));

  userDeleted$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.userDeleted),
      tap(() => this.snackBar.open('User deleted!', null, {
        duration: 3000
      }))
  ), { dispatch: false });

  showDeleteUserDialog$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.showDeleteUserDialog),
      map((action: Action & { user: UserModel }) =>
          this.dialog.open<PopupDialogComponent, PopupDialogDataModel>(PopupDialogComponent, {
            data: {
              title: environment.common.DELETE_USER_BUTTON_TEXT,
              description: environment.common.DELETE_USER_CONFIRM_TEXT,
              dialogActions: [
                {
                  action: () => {
                    this.dialog.closeAll();
                    this.store$.dispatch(UserActions.deleteUser({ user: action.user }));
                  },
                  text: environment.common.CONFIRMATION_TEXT,
                  color: 'warn'
                },
                {
                  action: () => this.dialog.closeAll(),
                  text: environment.common.CANCELLATION_TEXT,
                  color: 'primary'
                }
              ]
            }
          }))
      // Even though this indicates dispatch as false please note that the dispatch action on dialog actions will
      // infact be dispatched This is due that the modal is the one calling the function and its not contained within
      // this effect
  ), { dispatch: false });

  beginLoadingPage$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.beginLoadingUserPage),
      map((action: Action) => UserActions.loadAllUsers())
  ));

  showErrorMessage$ = createEffect(
      () => this.actions$.pipe(
          ofType(UserActions.hasErrorMessage),
          map((action: Action & { error: string }) => {
            this.snackBar.open(action.error, null, {
              duration: 3000
            });
          })
      ), { dispatch: false });

  loadUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.loadAllUsers),
      switchMap((action: Action) => {
        return this.httpGetAllUsers().pipe(
            switchMap((users: UserModel[]) => {
              return [
                UserActions.usersLoaded({ users }),
                ToolbarActions.stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              return [
                UserActions.hasErrorMessage({ error: error.message }),
                ToolbarActions.stopProgressBar()
              ];
            })
        );
      })
  ));

  constructor(
      private store$: Store<fromApp.State>,
      private actions$: Actions,
      private endPoint: ApiPathService,
      public dialog: MatDialog,
      private http: HttpClient,
      private snackBar: MatSnackBar
  ) {
  }

  httpEditUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(this.endPoint.getEditUserEndPoint(user.id), {
      ...user
    });
  }

  httpDeleteUser(userId: number): Observable<UserModel> {
    return this.http.delete<UserModel>(this.endPoint.getDeleteUserEndPoint(userId));
  }

  httpGetAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.endPoint.allUsersEndPoint);
  }

  httpGetAllRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.endPoint.allRolesEndPoint);
  }
}

