import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../reducers/index';
import { UserModel } from '../shared/model/user.model';
import * as fromUser from './store/user.reducer';
import * as UserActions from './store/user.actions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  isLoading: Observable<boolean>;
  users: MatTableDataSource<UserModel>;
  displayColumns: string[];

  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.State>
  ) {
    this.displayColumns = ['email', 'role', 'companyId', 'actions'];
    this.users = new MatTableDataSource<UserModel>([]);
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.beginLoadingUserPage());
    this.isLoading = this.store.select(fromUser.selectIsLoading);
    this.subscription.add(
      this.store.select(fromUser.selectUsers).subscribe(users => {
        this.users.data = users;
        this.users.paginator = this.paginator;
      })
    );
  }

}
