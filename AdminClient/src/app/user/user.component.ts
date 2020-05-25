import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import * as fromApp from '../reducers/index';
import { getSessionID } from '../session-id';
import { UserModel } from '../shared/model/user/user.model';
import * as ToolbarActions from '../toolbar/store/toolbar.actions';
import * as UserActions from './store/user.actions';
import * as fromUser from './store/user.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  users: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>([]);
  displayColumns: string[];

  private subscription: Subscription;

  constructor(
      private store: Store<fromApp.State>,
      private logger: NGXLogger,
  ) {
    this.logger.info(`Session ID: ${getSessionID()} - Constructing users page`);
    this.displayColumns = ['email', 'roles', 'actions', 'id'];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Initializing users page`);
    this.store.dispatch(ToolbarActions.beginProgressBar());
    this.store.dispatch(UserActions.getAllUsers());
    this.subscription.add(
        this.store.select(fromUser.selectUsers).subscribe((users: UserModel[]) => {
          if (!users) {
            this.logger.error(`Session ID: ${getSessionID()} - No users were found`);
            return;
          }
          this.users.data = users;
          this.users.paginator = this.paginator;
          this.logger.info(`Session ID: ${getSessionID()} - Users loaded`);
        })
    );
  }

  ngOnDestroy(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Users screen destroyed`);
    this.subscription.unsubscribe();
  }

  filteringAction = (user: UserModel, filterValue: string) => {
    this.logger.info(`Session ID: ${getSessionID()} - Filtering users with: `, filterValue);
    return user.email.toLowerCase().includes(filterValue)
           || user.roles.some(r => r.name.toLowerCase().includes(filterValue));
  };

  editUser(user: UserModel) {
    this.logger.info(`Session ID: ${getSessionID()} - Opening edit user dialog`);
    this.store.dispatch(UserActions.showEditUserModal({ user }));
  }

  deleteUser(user: UserModel) {
    this.logger.info(`Session ID: ${getSessionID()} - Opening delete user dialog`);
    this.store.dispatch(UserActions.showDeleteUserDialog({ user }));
  }

  handleCreate(): void {
    this.logger.info(`Session ID: ${getSessionID()} - Opening create user dialog`);
    this.store.dispatch(UserActions.showEditUserModal({ user: null }));
  }
}
