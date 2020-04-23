import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import * as fromApp from '../reducers/index';
import {LoadingSpinnerService} from '../services/loading-spinner/loading-spinner.service';
import {UserModel} from '../shared/model/user/user.model';
import * as fromUser from './store/user.reducer';
import * as UserActions from './store/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  isLoading: Observable<boolean>;
  users: MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>([]);
  displayColumns: string[];

  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.State>,
    private spinnerService: LoadingSpinnerService,
  ) {
    this.displayColumns = ['email', 'role', 'companyId', 'actions'];
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.beginLoadingUserPage());
    this.isLoading = this.store.select(fromUser.selectIsLoading);
    this.spinnerService.observeNext(this.store.select(fromUser.selectIsLoading));
    this.subscription.add(
      this.store.select(fromUser.selectUsers).subscribe((users: UserModel[]) => {
        if (!users) {
          return;
        }
        this.users.data = users;
        this.users.paginator = this.paginator;
      })
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filteringAction = (user: UserModel, filterValue: string) => {
    return user.email.toLowerCase().includes(filterValue)
      || user.role.toLowerCase().includes(filterValue)
      || user.companyId.toLowerCase().includes(filterValue);
  };

  editUser(user: UserModel) {
    this.store.dispatch(UserActions.showEditUserModal({user}));
  }

  deleteUser(user: UserModel) {
    this.store.dispatch(UserActions.showDeleteUserDialog({user}));
  }
}
